import React, { useState } from "react";
import {Eye, EyeOff, Lock, Mail, User2Icon} from "lucide-react"
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import { register } from "../app/features/authSlice";
import toast from "react-hot-toast";
import api from "../configs/api.js"
import { Link } from "react-router-dom";

const Login = () => {
     
    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get("state")

    const [state, setState] = React.useState( urlState ||"login")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })
   
    const buttonclick = ()=>{
        setShowPassword(prev=>!prev)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            setLoading(true)
          const {data} = await api.post(`/api/users/${state}`, formData)
          if(state==="login"){
            dispatch(login(data))
          }else if(state==="register"){
            dispatch(register(data))
          }
          localStorage.setItem('token', data.token)
          toast.success(data.message)
        } catch(error){
          toast(error?.response?.data?.message || error.message)
        }finally{
            setLoading(false)
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
                <p className="text-gray-500 text-sm mt-2">Please {state} to continue</p>
                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <User2Icon size={16} color="#6B7280" />
                        <input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0" value={formData.name} onChange={handleChange} required />
                    </div>
                )}
                <div className="flex  items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Mail size={13} color="#6B7280"/>
                    <input type="email"  autoComplete ="off" name="email" placeholder="Email id" className="border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />
                </div>
                <div className=" flex relative items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Lock size={13} color="#6B7280"/>
                    <input type={showPassword ? "text" :"password"} name="password" placeholder="Password" className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
                    <button type="button" onClick={buttonclick} className=" absolute right-3 top-3.5 -translate-y-0.5">{showPassword ? <EyeOff size={20} color="#6B7280"/> : <Eye size={20} color="#6B7280"/>}</button>
                </div>
                <div className="mt-4 text-left text-indigo-500">
                    <Link to="/forgot-password" className="text-sm" type="reset">Forget password?</Link>
                </div>
                <button type="submit" className={`mt-2 w-full h-11 rounded-full text-white ${loading ? "bg-green-800" :"bg-green-500"} hover:opacity-90 transition-opacity`}>
                    { !loading && (state === "login" ? "Login" : "Sign up")}
                    {loading && (
                        state === "login" ? "Logging.." :"Signing up..."
                    )}
                </button>
                <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-500 text-sm mt-3 mb-11">{state === "login" ? "Don't have an account?" : "Already have an account?"} <a href="#" className="text-indigo-500 hover:underline">click here</a></p>
            </form>
        </div>
    )
}

export default Login;
