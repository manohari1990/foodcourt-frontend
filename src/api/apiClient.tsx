import axios from 'axios'

export const baseUrl = 'http://localhost:8000'// import.meta.env.VITE_API_URL
export const headers = {"Content-Type": "application/json"}

/************************* FETCH *****************************
 * FETCH IS USEFULL FOR - 
 * Small demo apps
 * One or two API calls
 * No auth
 * No global error handling needed
 */
export const apiClient = async(requestModule:string, method:string, data?:any ) => {
    const apiOptions:RequestInit = { method: method, headers: headers }
    if (method != 'GET')
        apiOptions.body = JSON.stringify(data)
    
    const url = baseUrl+requestModule
    const apiResponse = await fetch( url, apiOptions )
    if(!apiResponse.ok) throw new Error('Something went wrong, Try again!')
    return apiResponse.json()
}

/************************************************************
 ************************ AXIOS *****************************
 * Axios is preferred over fetch in production apps because it provides automatic JSON handling, 
 * built-in error handling, request/response interceptors, and cleaner API abstractions. 
 * Interceptors allow centralized authentication, logging, and error handling, which makes 
 * applications easier to scale and maintain.
 */

 export const apiAxiosClient = axios.create({
    baseURL: baseUrl,
    timeout: 1000
 })