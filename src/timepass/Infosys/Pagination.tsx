// Backend sends all records, implement frontend pagination
// Time took to write this: 40 mins

import {useState, useEffect, useMemo} from 'react'
const LIMIT = 2
function Pagination () {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const data = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org",
            "company_name": "Romaguera-Crona"
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "username": "Antonette",
            "email": "Shanna@melissa.tv",
            "phone": "010-692-6593 x09125",
            "website": "anastasia.net",
            "company_name": "Deckow-Crist"
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "username": "Samantha",
            "email": "Nathan@yesenia.net",
            "phone": "1-463-123-4447",
            "website": "ramiro.info",
            "company_name": "Romaguera-Jacobson"
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "username": "Karianne",
            "email": "Julianne.OConner@kory.org",
            "phone": "493-170-9623 x156",
            "website": "kale.biz",
            "company_name": "Robel-Corkery"
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "username": "Kamren",
            "email": "Lucio_Hettinger@annie.ca",
            "phone": "(254)954-1289",
            "website": "demarco.info",
            "company_name": "Keebler LLC"
        },
        {
            "id": 6,
            "name": "Mrs. Dennis Schulist",
            "username": "Leopoldo_Corkery",
            "email": "Karley_Dach@jasper.info",
            "phone": "1-477-935-8478 x6430",
            "website": "ola.org",
            "company_name": "Considine-Lockman"
        },
        {
            "id": 7,
            "name": "Kurtis Weissnat",
            "username": "Elwyn.Skiles",
            "email": "Telly.Hoeger@billy.biz",
            "phone": "210.067.6132",
            "website": "elvis.io",
            "company_name": "Johns Group"
        },
        {
            "id": 8,
            "name": "Nicholas Runolfsdottir V",
            "username": "Maxime_Nienow",
            "email": "Sherwood@rosamond.me",
            "phone": "586.493.6943 x140",
            "website": "jacynthe.com",
            "company_name": "Abernathy Group"
        },
        {
            "id": 9,
            "name": "Glenna Reichert",
            "username": "Delphine",
            "email": "Chaim_McDermott@dana.io",
            "phone": "(775)976-6794 x41206",
            "website": "conrad.com",
            "company_name": "Yost and Sons"
        },
        {
            "id": 10,
            "name": "Clementina DuBuque",
            "username": "Moriah.Stanton",
            "email": "Rey.Padberg@karina.biz",
            "phone": "024-648-3804",
            "website": "ambrose.net",
            "company_name": "Hoeger LLC"
        }
    ]


    useEffect(()=>{
        setTotalPages(data && data.length > 0 ? Math.ceil(data.length/LIMIT) : 0)
    },[data])
    const paginatedRecords = useMemo(()=>{
        
        if (totalPages > 0){
            const offset = ((page-1)*LIMIT)
            return data.slice(offset, (page * LIMIT))
        }

    }, [data, page])

    return (
        <>
            {paginatedRecords && paginatedRecords?.length > 0 && 
                <ul>
                    {paginatedRecords.map((item)=>{
                        return <li key={item.id}>{item.name}</li>
                    })}
                </ul>
            }

            <button key={'prevButton'} onClick={()=>setPage(p=>p-1)} disabled={page==1}>
                Prev
            </button>

            {Array.from({length:totalPages}).map((_,index)=>{
                return <button key={index} onClick={()=>setPage(index+1)} disabled={page==index+1 || page ==0}>
                    {index+1}
                </button>
            })} 
            <button key={'nextButton'} onClick={()=>setPage(p=>p+1)} disabled={page==totalPages}>
                Next
            </button>

        </>
    )
}

export default Pagination


