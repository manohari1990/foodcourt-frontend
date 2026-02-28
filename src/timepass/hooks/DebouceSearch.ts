import { useEffect, useState, useMemo } from "react";

export function useDebouceSearch(data:any, delay=500){

    const [query, setQuery] = useState('')
    const [debouceQuery, setDebouceQuery] = useState('')

    // Debounce functionality
    useEffect(()=>{
        console.log(query)
        const timer = setTimeout(()=>{
            setDebouceQuery(query)
        },delay)

        return () => clearTimeout(timer)

    },[query])

    // Filter in Data
    const fetchItems = useMemo(()=>{
        if (!debouceQuery.trim()) return []

        return data.filter((item:string)=>{
            return item.toLowerCase().includes(debouceQuery.toLowerCase())
        })
    }, [data, debouceQuery])
    
    return {
        query,
        setQuery,
        results: fetchItems,
        isSearching: query !== debouceQuery
    };
}
