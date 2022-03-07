import React, { useState, useEffect , useRef } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { auth, db } from './config/firebase';

import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const useKey = (key , cb) => {
    const callBackRef = useRef(cb);

    useEffect(() => {
        callBackRef.current = cb
    });

    useEffect(() => {
        function handle(event) {
            if(event.code === key) {
                callBackRef.current(event)
            }
        }
        document.addEventListener("keypress" , handle);
        return () => document.removeEventListener("keypress" , handle)
    } , [key])
}
const Login = () => {
    const handleEnter = () => {
        LogIn()
    }
    useKey("Enter" , handleEnter)
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false)
    const passValid = () => {
        !showPass ? setShowPass(true) : setShowPass(false)
    }
    
    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const LogIn = () => {
        auth.signInWithEmailAndPassword(state.email, state.password)
            .then((success) => {
                navigate('/profile');
            })
            .catch((error) => {
                console.log(error, "error")
            })
    }
    let location = window.location.href;
    console.log(location)
    return <section>


        <h1 className="mainh1">Log In</h1>
        <form >
            <input
                onChange={(e) => setState({ ...state, email: e.target.value })}
                placeholder="Enter Email"
                value={state.email}
                type="email" />
            <div className="passdiv">
                <input
                    onChange={(e) => setState({ ...state, password: e.target.value })}
                    placeholder="Enter Password"
                    value={state.password}
                    type={!showPass ? "password" : "text"}
                    id='pass' />
                <button className='eyebtn' onClick={passValid} type="button" style={{ backgroundColor: "transparent !important" }}>

                    {!showPass ? <FontAwesomeIcon icon={faEye} style={{ background: "whitesmoke" }} />
                        :
                        <FontAwesomeIcon icon={faEyeSlash} style={{ background: "whitesmoke" }} />}
                </button>
            </div>
        </form>
        <button onClick={LogIn} className="btn btn-info mybtn" >Log In</button>
        <p> Note: If you dont't have any account then click on below
            sign up button </p>
        <button type="button" className="btn btn-primary mybtn signupbtn" data-toggle="modal" data-target="#exampleModal">
            <NavLink to="/signup" style={{ background: "transparent", color: "whitesmoke", textDecoration: "none" }}>Sign Up</NavLink>
        </button>



    </section>



};



export default Login;