import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

import axios from "axios"

const RequiredAuth = ({children, requiredRole}) =>{
    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(null)

    useEffect(()=>{
        const checkAuthorization = async()=>{
            const token = localStorage.getItem("jwttoken")
            
            //check token
            if(!token){
                setAuthorized(false)
                setLoading(false)
                return;
            }
            //sending token to backend server for authentication and authorization
            try {
                const response = await axios(`${import.meta.env.VITE_BASE_URL}/api/admin/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setAuthorized(true)
                // console.log("response-data: ", response.data)
            } catch (error) {
                console.log("Authorization error: ", error.response?.data?.msg  || error.response?.data?.message || "An unknown error occurred.")
                if(error.response){
                    const status = error.response.status;
                    if(status === 401 || status === 404){
                        setAuthorized(false)
                    }
                }else{
                    //network error
                    setAuthorized(false)
                }
            }finally{
                setLoading(false)
            }
        }
        checkAuthorization()
    }, [requiredRole])

    if(loading){
        return <div>Loading...</div>
    }
    if(!authorized){
        return <Navigate to="/admin/login" replace />
    }
    return children
}
export default RequiredAuth