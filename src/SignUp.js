import React, { useState , useEffect , useRef } from 'react';
import "./App.css"
import { Modal, Button } from 'react-bootstrap';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { auth, db } from './config/firebase';
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
const Signup = () => {
    const navigate = useNavigate()
    const handleEnter = () => {
        SignUp()
    }
    useKey("Enter" , handleEnter)
    const [state, setState] = useState({
        email: "",
        password: ""
    })
    const [showPass, setShowPass] = useState(false)
    const passValid = () => {
        !showPass ? setShowPass(true) : setShowPass(false)
    }
   
    const [show, setShow] = useState(false);
    const [showSignUp , setShowSignUp] = useState(true)
    const handleClose = () => 
    {
        setShow(false)
        setShowSignUp(false)
    };
    const closeSignUp = () => {
        
       navigate("/login")
    }

    const SignUp = () => {
        let { email, password } = state;
        auth.createUserWithEmailAndPassword(email, password)
            .then((msg) => {
                db.ref('/').child('users').push({ email, password })
                console.log(msg, 'success')
                const handleShow = () => setShow(true);
                return handleShow()
                setShowSignUp(false)

            })
            .catch((error) => {
                console.log(error, 'error')
            })
        setState({ email: "", password: "" })
        

    }
    return (
        show ? <Modal show={show} onHide={handleClose} backdrop="static"  keyboard={false}>
            <Modal.Header closeButton className='whitesmokebg'>
                <Modal.Title className='modaltitle'>Congratulations!</Modal.Title>
            </Modal.Header >
            <Modal.Body className='whitesmokebg modalbody'> <p>You are now registered! </p></Modal.Body>
            <Modal.Footer className='whitesmokebg'>
                <Button variant="secondary" onClick={handleClose} className = "closebtn">
                    Close
                </Button>

            </Modal.Footer>
        </Modal> :
        <Modal show={showSignUp} onHide={closeSignUp} backdrop="static"  keyboard={false}>
       
        <Modal.Body className = "whitesmokebg"><section className='signupdiv'>
                <h1 className="mainh1">Sign Up</h1>
                <form>
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
                            type={!showPass ? "password" : "text"} />
                        <button className='eyebtn' onClick={passValid} type="button" style={{ backgroundColor: "transparent !important" }}>

                            {!showPass ? <FontAwesomeIcon icon={faEye} style={{ background: "whitesmoke" }} />
                                :
                                <FontAwesomeIcon icon={faEyeSlash} style={{ background: "whitesmoke" }} />}
                        </button>
                    </div>
                </form>
                <button onClick={SignUp} className="btn btn-info mybtn">Sign Up</button>
                <p>Already have an account Click on Log In</p>
                <button type="button" className="btn btn-primary mybtn signupbtn" data-toggle="modal" data-target="#exampleModal"><NavLink to="/login" style={{ background: "transparent", color: "whitesmoke", textDecoration: "none" }}>Log In</NavLink></button>



            </section></Modal.Body>
        <Modal.Footer className = "whitesmokebg">
            <Button variant="secondary" onClick={closeSignUp} className = "closebtn">
                Close
            </Button>

        </Modal.Footer>
    </Modal>
            
    );
};



export default Signup;