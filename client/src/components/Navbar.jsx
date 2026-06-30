import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { logout } from "../app/features/authSlice";

const Navbar = ()=>{
    
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const logoutUser = ()=>{
        navigate('/')
        dispatch(logout())
    }
    
    return(
        <div className="shadow bg-white">
         <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        <Link to="/">
          <h1 className="w-50 text-2xl text-green-600 font-extrabold">ResumeForge<span className="text-red-400 font-extrabold" >.</span></h1>
        </Link>
        <div className="flex items-center gap-4 text-sm">
            <p>Hi, {user?.name}</p>
            <button onClick={logoutUser} className="bg-red-200 hover:bg-red-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all">logout</button>
        </div>
    </nav>
</div>
    )
}

export default Navbar;