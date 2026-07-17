import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import  Layout  from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { setLoading, login } from "./app/features/authSlice";
import { useEffect } from "react";
import {Toaster} from "react-hot-toast" 
import api from "./configs/api.js"
import ForgotPassword from "./pages/ForgotPasswordPage.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const App = ()=>{
     const dispatch = useDispatch()

     const getUserData = async () => {
        const token = localStorage.getItem('token')
        try{
            if(token){
                const {data} = await api.get('/api/users/data', {headers:{Authorization:token}})
                if(data.user){
                   dispatch(login({token, user :data.user})) 
                }
                dispatch(setLoading(false))
            }else{
                dispatch(setLoading(false))
            }
        }catch(error){
            dispatch(setLoading(false))
            console.log(error.message)
        }
     }

     useEffect(()=>{
        getUserData();
     },[])
    return(
        <>
        <Toaster />
           <Routes>
              <Route path="/" element={<Home />} />
              <Route path="app" element={<Layout />}>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="builder/:resumeId" element={<ResumeBuilder />} />
              </Route>
              <Route path="forgot-password" element={<ForgotPassword/>} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
              <Route path="view/:resumeId" element={<Preview/>} />
              
           </Routes> 
        </>
    )
}

export default App;
