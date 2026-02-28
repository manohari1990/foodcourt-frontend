
import { useEffect, useMemo } from 'react';
import { useState } from 'react'

function RetryFunctionCall() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const PAGE_LIMIT = 8

    async function fetchData() {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')

        if (!res.ok) throw new Error('Error')

        return res.json()
    }

    async function retries(fn: any, retryCount = 1, delay = 500) {
        try {
            const res = await fn()
            console.log(res)
            setData(res)
            return
        } catch (err) {
            if (retryCount <= 0) throw 'Error: Maxnimum retries count exhausted'
            await new Promise(r => setTimeout(r, delay))
            return retries(fn, retryCount - 1)
        }
    }

    useEffect(() => {
        retries(fetchData)
    }, [])

    
    const paginatedData = useMemo(() => {
        const start = (page - 1) * PAGE_LIMIT
        const totalPageCount = Math.ceil(data.length / PAGE_LIMIT)
        console.log(page)
        setTotalPages(totalPageCount)
        return data.slice(start, start + PAGE_LIMIT)
    }, [data, page])

    useEffect(() => {
        console.log(paginatedData)
    }, [paginatedData])

    return (
        <div>
            {paginatedData && paginatedData.length > 0 &&
                <ul>
                    {paginatedData.map((item: any, index: number) => {
                        return (
                            <li key={index}>
                                {item.id}
                                {/* {item.body} */}
                            </li>
                        )
                    })}
                </ul>
            }

            <button
                disabled={page==1}
                onClick={()=>setPage(p=>p-1)}
            >prev</button>
            <button
                disabled={page == totalPages || totalPages < 1}
                onClick={()=>setPage(p=>p+1)}
            >next</button>
        </div>
    )
}

export default RetryFunctionCall