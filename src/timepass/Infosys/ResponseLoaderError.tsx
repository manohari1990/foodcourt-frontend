// API List with Loader & Error (very frequent)
// Fetch users from API and show loading and error states
// Time took to write this: 22 minutes

import {useState, useEffect} from 'react'

function ResponseLoaderError () {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [response, setResponse] = useState([])

    async function fetchUsers() {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) {
            return {
                response: res,
                status_code: 500,
                message: "Error while fetching the data"
            }
        }

        return res.json()
    }

    useEffect(()=>{

        const usersList = async() => {
            try{
                setIsLoading(true)
                const result = await fetchUsers()
                setResponse(result)
            }catch(e){
                setError('Error')
            }finally{
                setIsLoading(false)
            }
            
        }

        usersList()
    }, [])


    return (
        <>
            {isLoading && <div>Fetching data..</div>}
            {error && <div>{error}</div>}
            {
                response && response.length > 0 &&
                <ul>
                    {response.map((item:any)=>{
                        return <li>
                            {item.name} - {item.website} - {item.company.name}
                        </li>
                    })}
                </ul>
            }
        </>
    )
}

export default ResponseLoaderError
