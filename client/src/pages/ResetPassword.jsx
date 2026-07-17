import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const {token} = useParams();
    const navigate = useNavigate()
 
    const [password, setPassword] = useState("")
    const [isLoading, setIsloading]= useState(false)

    const handleChange = () => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setIsloading(true)
            const {data} = await api.post(`/api/users/reset-password/${token}`,{password});
            alert(data.message)
            navigate("/login")

        }catch(error){
            alert(error.response?.data?.message || "Something went wrong");
        }finally{
            setIsloading(false)
        }
    }

    
    

    return(
        <>
         <div className="flex items-center justify-center min-h-screen">
            <div>
                <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col p-2 gap-5 w-[300px]  ">
                <input className="border border-2 border-gray-700 p-3 " type="password" placeholder="Enter new password" value={password} onChange={handleChange}/>
                <button className="p-4 bg-green-600 rounded-lg">{isLoading ? "updating..." : "Reset Password"}</button>
                </form>
            </div>
         </div>
        </>
    )
}

export default ResetPassword;