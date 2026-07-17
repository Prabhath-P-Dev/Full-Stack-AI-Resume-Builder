import React, { useState } from "react";
import api from "../configs/api.js";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const {data} = await api.post("/api/users/forgot-password", {email});
          alert(data.message)
        }catch(error){
            alert(error.response?.data?.message || "something went wrong")
        }
    }

    
    return(
      <div className="min-h-screen flex items-center justify-center">
       <form 
       onSubmit={(e)=>handleSubmit(e)}
       className="w-full max-w-md p-6 shadow-lg rounded-lg" >
         <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
         <p className="text-sm text-gray-500 mb-6">Enter your registered email address amd we'll send you a password reset link</p>
          <input 
            type="email" 
            placeholder="enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border p-3 rounded mb-4"
            required
            />
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded"
            > 
              send reset link
            </button>
        </form>
      </div>
    )
}

export default ForgotPassword;