import React, {useState,useRef} from 'react'
import UserStat from './UserStat'
import axios from 'axios'
import './Card.css'


export default function Card() {
    const [user, setUser] = useState({});
    const [status, setStatus] = useState("initial")
    const cancel = useRef(null);

    const search = e => {
        cancel.current && cancel.current();
        let username = e.target.value;
        setStatus("loading");
        axios.get(`https://api.github.com/users/${username}`,{
            cancelToken:new axios.CancelToken(c => cancel.current = c)
        }).then(res=>{
            setStatus("success");
            setUser(res.data)
        }).catch(error=>{
            setStatus("error");
        })
    }

    const displayinfo = ()=>{
        switch(status){
            case "initial":
                return <span>Waiting For Input</span>
            case "loading":
                return <span>Loading</span>
            case "success":
                return <UserStat user = {user}/>
            case "error":
                return <span>User Does Not Exist</span>
            default:
                return;
        }
    }

    return (
        <div className="card">
            <input type="text" onKeyUp={search}/>
            {displayinfo()}
        </div>
    )
}
