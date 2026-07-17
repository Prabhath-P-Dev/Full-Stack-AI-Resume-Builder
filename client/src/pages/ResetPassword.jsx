import React from "react";
import { useState } from "react";
const ResetPassword = () => {
 
    const [password, setPassword] = useState("")

    const handleChange = () => {
        setPassword(e.target.value)
    }

    
    

    return(
        <>
         <div className="flex items-center justify-center min-h-screen">
            <div>
                <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col p-2 gap-5 w-[300px]  ">
                <input className="border border-2 border-gray-700 p-3 " type="password" placeholder="Enter new password" value={password} onChange={handleChange}/>
                <button className="p-4 bg-green-600 rounded-lg">Change Password </button>
                </form>
            </div>
         </div>
        </>
    )
}

export default ResetPassword;