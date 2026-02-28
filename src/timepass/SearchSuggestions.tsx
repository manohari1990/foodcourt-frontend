// import { useEffect, useMemo, useState } from "react";
import { useDebouceSearch } from "./hooks/DebouceSearch";


const items = ['Korean outfit', 'Korean Jewellery', 'Traditional Jewellery', 'Traditional outfit', 'Modern Saree', 'Casual Wear'];

function SearchSuggestions(){

    // const [searchKey, setSearchKey] = useState('')
    // const [deabounceSearch, setDeabounceSearch] = useState('')
    // const [showSuggestion, setShowSuggestion] = useState(false)

    // useEffect(()=>{
    //     const timerId = setTimeout(()=>{
    //         setDeabounceSearch(searchKey)
    //     }, 300)

    //     return () => clearTimeout(timerId)
    // }, [searchKey])

    // const filteredItems = useMemo(()=>{
    //     if(!deabounceSearch.trim()) return []

    //     return items.filter(item=> 
    //         item.toLocaleLowerCase().includes(deabounceSearch.toLocaleLowerCase())
    //     )
    // },[deabounceSearch])
    // console.log(filteredItems)

    const {query, setQuery, results, isSearching} = useDebouceSearch(items, 300)

    return (
        <div style={{ position: 'relative', width: '300px' }}>
            <input
                type="text"
                value={query}
                onChange={(e)=>{
                    setQuery(e.target.value)
                    // setShowSuggestion(true)
                }}
                placeholder="Search items..."
                style={{ width: '100%', padding: '8px' }}
            />
            {isSearching && <>Tinking...</>}
            {!isSearching && results.length > 0 &&
                <ul>
                    {results.map((item:string, index:number)=>{
                        return (
                            <li
                                key={index}
                                onClick={()=>{
                                    setQuery(item)
                                    // setShowSuggestion(false)
                                }}
                            >
                                {item}
                            </li>
                        )
                    })}
                </ul>
            }
            <button
                onClick={()=>{
                    // setShowSuggestion(false)
                    setQuery('')
                    // setDeabounceSearch('')
                }}
            >Clear Search</button>
        </div>
    )
}


export default SearchSuggestions