import { apiAxiosClient } from "./apiClient";


export async function getMenuByStall({pageParam = 0, queryKey}:any) {
    
    const [_key,  LIMIT, stallId] = queryKey
    if (!stallId) {
        throw new Error("stallId is missing");
    }
    // const offset = (page-1) * LIMIT
    try{
        const response = await apiAxiosClient.get(`/menu/${stallId}?limit=${LIMIT}&offset=${pageParam}`)
        return response.data
    }catch(error){
        console.error('Error: ', error)
        throw error
    }

}
