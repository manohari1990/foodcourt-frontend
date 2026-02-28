import {apiClient, apiAxiosClient} from './apiClient'


// export async function getStalls (){
//     const result = await apiClient("/stalls", 'GET')
// }
/**
 * Axios handles HTTP communication such as headers, authentication, and errors, 
 * while React Query manages server state including caching, synchronization, and background updates. 
 * In production applications, Axios is commonly used as the HTTP client and 
 * React Query sits on top of it to efficiently manage API data within React.
 */


export async function getStalls ({queryKey}:any){
    const [_key, page, LIMIT] = queryKey
    const offset = (page-1)*LIMIT
    try{
        const result = await apiAxiosClient.get(`/stalls?limit=${LIMIT}&offset=${offset}`) // ?limit=10&offset=0
        return result.data
    }catch(error){
        console.error('Error', error)
        throw error
    }
}


export async function createStall(data:any) {
    const result = await apiClient("/stalls", 'POST', data)
    return result
}
