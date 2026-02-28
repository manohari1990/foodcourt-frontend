import { useQuery } from '@tanstack/react-query'
import { getStalls } from '../api/stall'
import FoodStallCard from './FoodStallCard'
import { useState } from 'react'

function FetchStalls() {

    const [page, setPage] = useState(1)
    const LIMIT = 5

    const { data: stalls, error, isLoading, isFetching } = useQuery({
        queryKey: ['stalls', page, LIMIT],
        queryFn: getStalls,
        staleTime: 5000 * 60
        //   keepPreviousData: false
    })

    console.log(stalls)

    // if (stalls && stalls?.pagination)
    const totalPages = stalls?.pagination ? Math.ceil(stalls.pagination.total / stalls.pagination.limit) : 0;

    if (isLoading) {
        return <div>Fetching Stalls...</div>
    }
    if (error) {
        return <div>An Error occured {error.message}</div>
    }

    return (
        <>
            {/* Food Stall List */}
            <div className="flex space-y-4 flex-col">
                {stalls && stalls.data && stalls.data.map((item: any) => (
                    <FoodStallCard
                        key={item.id}
                        stall={item}
                    // onMenuClick={onMenuClick}
                    />
                ))}
            </div>

            {/* Pagination Control */}
            <div
                className="mt-8 pb-8"
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                <button
                    onClick={() => { setPage((p) => Math.max(p - 1, 1)) }}
                    disabled={page === 1}
                    style={{
                        margin: '5px',
                        padding: '15px',
                        fontSize: '16px',
                        background: page === 1 ? '#bcbccb' : '#454551',
                        cursor:page === 1 ? '' : 'pointer',
                        borderRadius: '9px',
                        border: 'none',
                        color:'#fff'

                    }}
                >Prev</button>
                {isFetching && <>Fetching...</>}

                {Array.from({ length: totalPages }).map((_, index) => {
                    return <button
                        key={index}
                        onClick={() => {
                            setPage(index + 1)
                        }}
                        disabled={index + 1 == page}
                        style={{
                            margin: '5px',
                            padding: '15px',
                            fontSize: '16px',
                            background: index + 1 === page ? '#bcbccb' : '#454551',
                            cursor: index + 1 === page ? '' : 'pointer',
                            borderRadius: '9px',
                            border: 'none',
                            color:'#fff'

                        }}
                    >
                        {index + 1}
                    </button>
                })}


                <button
                    onClick={() => { setPage((p) => p + 1) }}
                    disabled={page === totalPages || totalPages === 0}
                    style={{
                        margin: '5px',
                        padding: '15px',
                        fontSize: '16px',
                        background: page === totalPages || totalPages === 0 ? '#bcbccb' : '#454551',
                        cursor: page === totalPages || totalPages === 0 ? '' : 'pointer',
                        borderRadius: '9px',
                        border: 'none',
                        color:'#fff'
                    }}
                >Next</button>
            </div>
        </>
    )
}

export default FetchStalls