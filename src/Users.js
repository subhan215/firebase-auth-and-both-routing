import React, { useEffect, useState } from 'react';
import { db } from './config/firebase';


const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        let arr = [];
        db.ref("/").child("users").on("child_added", (data) => {
            console.log(data.val())
            var obj = data.val();
            obj.id = data.key;
            arr.push(obj);
            setUsers([...arr])

        })
    })


    const [showDisplay, setShowDisplay] = useState({ display: "inline" })
    const [hideDisplay, setHideDisplay] = useState({ display: "none" });
    const [editValue, setEditValue] = useState("")
    function edit(id) {
        setHideDisplay({ display: "inline" })
        setShowDisplay({ display: "none" })
    }
    function del(id) {
        db.ref("/").child("users").child(id).remove()
    }
    const confirmEdit = (id) => {
        db.ref("/").child("users").child(id).update({
            email: editValue
        })
       
        setHideDisplay({ display: "none" });
        setShowDisplay({ display: "inline" })
    }


return (
    <div>
        <h1>Users </h1>
        {users.map((val) => {
            return <li key={val.id}>
                <span style={showDisplay}>  {val.email}</span>
                <input style={hideDisplay}  onChange={(e) => setEditValue(e.target.value)} />
                <button onClick={() => confirmEdit(val.id)} style={hideDisplay}>Confirm</button>
                <button onClick={() => edit(val.id)} style={showDisplay}>Edit</button>
                <button onClick={() => del(val.id)} style={showDisplay}>Delete</button>
            </li>
        })}
    </div>
);
}



export default Users;