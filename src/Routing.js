import React from 'react';
import { Routes,Route, Navigate } from 'react-router-dom';
import { auth } from './config/firebase';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';
import Users from './Users';
const PvtRoute = () => {
    const currentUser = auth.currentUser
    console.log(currentUser)
   if(currentUser) {
    
    return <Profile />
   
     
   } else{
    return <Navigate to = "/login" />
   }
}
const Routing = () => {
    return (
        <div>
            <Routes>
                <Route path='/signup' element = {<SignUp /> }/>
                <Route path='/users' element = {<Users />} />
                <Route path='/login' element = {<Login />} />
                <Route index element = {<Login />} />
                <Route path='/profile' element = {<PvtRoute />} />
            </Routes>
        </div>
    );
};



export default Routing;