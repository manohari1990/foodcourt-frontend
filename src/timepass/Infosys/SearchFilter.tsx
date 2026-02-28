// Search Filter
// Filter a list of names as user types
// Time took to write this: 10-15 minutes

import {useEffect, useMemo, useState} from 'react'

const SearchFilter = () =>{

    const [query, setQuery] = useState('')
    const [debQuery, setDebQuery] = useState(query)
    const [isCurrent, setIsCurrent] = useState(false)
    const nameList = ["React", "Angular", "Vue", "Svelte"]

    useEffect(()=>{
        const debTime = setTimeout(()=>{
            setIsCurrent(true)
            setDebQuery(query)
        },1000)
        return () => {
            clearTimeout(debTime)
            setIsCurrent(false)
        }
    },[query])
    
    const searchedItem = useMemo(()=>{
        return nameList.filter(item=> item.toLowerCase().includes(debQuery))
    }, [debQuery])

    return (
        <>
            <input 
                placeholder='search name' 
                onChange={(e)=>setQuery(e.target.value)}
            />
            {isCurrent && searchedItem.length > 0 &&
                <ul>
                    {searchedItem.map((item)=>{
                        return <li>{item}</li>
                    })}
                </ul>
            }
        </>
    )

}

export default SearchFilter