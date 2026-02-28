import {useState, useEffect, useMemo} from 'react'


function UserSearch() {

    const ITEMS_PER_PAGE = 10

    const [postList, setPostList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [query, setQuery] = useState('')
    const [debounceQuery, setDebounceQuery] = useState('')

    const fetchData = async() =>{
        const postsList = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (!postsList.ok) throw new Error('Failed to fetch posts')
        return postsList.json()
    }
    useEffect(()=>{
        const postData = async() => {
            const list = await fetchData()
            console.log(list)
            setPostList(list)
        }
        postData()
    },[])

    useEffect(()=>{
        setCurrentPage(1)
    },[debounceQuery])

    useEffect(()=>{
        const timerID = setTimeout(()=>{
            setDebounceQuery(query)
        },500)

        return ()=> clearTimeout(timerID)
    },[query])
    

    const searchPosts =  useMemo(()=>{
        if(!debounceQuery.trim()) return []

        return postList.filter((post:any)=>
            post.title.toLowerCase().includes(debounceQuery.toLowerCase())
        )
    }, [debounceQuery, postList])

    const paginationPost =useMemo(()=>{
        const startIndex = (currentPage-1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        return searchPosts.slice(startIndex, endIndex)
    },[searchPosts, currentPage])

    const totalPages = Math.ceil(searchPosts.length / ITEMS_PER_PAGE)

    return (
        <>
            <input
                placeholder='Search Posts'
                value={query}
                onChange={(e)=>{
                    setQuery(e.target.value)
                }}

            />
            {
                paginationPost && paginationPost.length >0 &&
                <ul>
                    {paginationPost.map((item:any)=>{
                        return(
                            <li key={item.id}>
                                {item.title}
                            </li>
                        )
                    })}
                </ul>
            }

            <div style={{ marginTop: '10px' }}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                >
                    Prev
                </button>

                <span style={{ margin: '0 10px' }}>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages || totalPages < 1}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>
        </>
    )

}


export default UserSearch