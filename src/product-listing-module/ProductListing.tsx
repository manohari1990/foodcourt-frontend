import {useState, useEffect, useMemo} from 'react'


interface RateObject{
    rate?: number;
    count?: number 
}
interface Product {
    id: number;
    title: string;
    category: string;
    rating?: RateObject | undefined;
    price: number;
}


const ProductListing = () => {

    const [loading, setLoading] = useState(false)
    const [productList, setProductList] = useState([])
    const [query, setQuery] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState('')
    const [debounceQuery, setDebounceQuery] = useState('')

    const fetchList = async () => {
        const response =  await fetch('https://fakestoreapi.com/products')
        if(!response.ok) throw new Error("Error")
        return response.json()
    }

    useEffect(()=>{
        const list = async() => {
            setLoading(true)
            try{
                const prodList = await fetchList()
                setProductList(prodList)
            }catch(e){
                console.error(e)
            }finally{
                setLoading(false)
            }
        }
        list()
    },[])

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounceQuery(query.toLowerCase())
        },300)
        return clearTimeout(timer)
    },[query])
    
    const filteredItems = useMemo(()=>{
        return productList.filter((item:Product)=>{
            const matchQuery = item.title.toLowerCase().includes(debounceQuery) 
                            || item.category.toLowerCase().includes(debounceQuery)
            const matchPrice = price ? item.price <=Number(price) : true
            const matchRating = rating && item.rating?.rate ? item.rating?.rate <= Number(rating) : true
            return matchQuery && matchPrice && matchRating
        })
    },[productList, debounceQuery, price, rating])
    

    return (
        <div>
            Search
            <input 
                type='text'
                value={query}
                placeholder='Search Name or Category'
                onChange={(e)=>setQuery(e.target.value)}
            />
            
            Filter By
            <select onChange={(e)=> setPrice(e.target.value)}>
                <option value=''>Select Price </option>
                <option value={99}>Under 99</option>
                <option value={199}>Under 199</option>
                <option value={299}>Under 299</option>
            </select>
            <select onChange={(e)=> setRating(e.target.value)}>
                <option>Select Rating </option>
                <option value={2}>more than 2</option>
                <option value={3}>more than 3</option>
                <option value={4}>more than 4</option>
            </select>
            <br />
            <br />
            <br />
            {!loading && filteredItems.length > 0 && 
                <>
                    <table>
                        <thead>
                            <tr>
                                <td>Sr.</td>
                                <td>Name</td>
                                <td>Category</td>
                                <td>Price</td>
                                <td>Rating</td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item:Product, index) => {
                                return (
                                    <tr key={index}>
                                    <td>{item.id}</td> 
                                    <td>{item.title}</td> 
                                    <td>{item.category}</td> 
                                    <td>{item.price}</td> 
                                    <td>{item?.rating?.rate || undefined}</td> 
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>    

                </>
            }
            {loading && 
                <div>
                    loading....
                </div>
            }
        </div>
    )
}

export default ProductListing
