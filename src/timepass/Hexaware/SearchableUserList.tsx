
import axios from 'axios'
import React, {useState, useEffect, useMemo, useCallback} from 'react'

interface User{
    id: number,
    name: string,
    email: string
}

const apiAxiosClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout:1000
})

async function fetchUsers () {
    try{
        const res = await apiAxiosClient.get('/users')
        return res
    }catch(e){
        console.log(e)
        throw e
    }
}

const UserList = React.memo(({data}:any) => {
    console.log(data)
    return (
        <>
            {data && data.length > 0 ?
                <ul>
                    {data.map((user:User) => {
                        return <li key={user.id}>
                            <p>{user.name} - <span>{user.email}</span></p>
                        </li>
                    })}
                </ul>
                : <div>No Users Found</div>
            }
        </>
    )
})

function SearchableUserList() {

    const [users, setUsers] = useState<User[]>([])
    const [query, setQuery] = useState('')
    const [debQuery, setDebQuery] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetchUsers()
            .then((res:any)=>{
                setUsers(res.data)
            }).catch((error)=>{
                console.error(error)
            }).finally(()=>{
                setLoading(false)
            })
    },[])

    useEffect(()=>{
        const time = setTimeout(()=>{
            setDebQuery(query)
        }, 300)

        return () => clearTimeout(time)
    },[query])

    const filteredUsers = useMemo(()=>{
        return users.filter((user:User)=>{
            return user.name.toLowerCase().includes(debQuery.toLowerCase())
        })
    },[debQuery, users])

    const handleChange = useCallback((e:any)=>{
        setQuery(e.target.value)
    }, [])

    return (
        <div>
            <input type='text' placeholder='Search user by name' value={query} onChange={handleChange} /><br/><br/>
            {loading ? <div>Loading...</div> : <UserList data={filteredUsers} /> }
        </div>
    )
}


export default SearchableUserList