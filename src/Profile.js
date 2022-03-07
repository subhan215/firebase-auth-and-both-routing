import React, { useState } from 'react';
import { auth } from './config/firebase';
import './App.css'

const Profile = () => {
    const [currentEmail, setCurrentEmail] = useState("")
    auth.onAuthStateChanged(user => {if(user) {
        setCurrentEmail(user.email)
        console.log(user.uid)
       console.log(currentEmail)  }
    })
    return (
        <div className='profilediv'>
            <h3>Hello {currentEmail}</h3>
        </div>
    );
};



export default Profile;