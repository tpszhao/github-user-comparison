import React, {useState,useRef,useEffect} from 'react'
import UserStat from './UserStat'
import axios from 'axios'
import './Card.css'


export default function Card({winner,updateScoreList}) {
    const [user, setUser] = useState({});
    const [status, setStatus] = useState("initial");
    const cancel = useRef(null);

    useEffect(() => {
        if(status !== "success"){
            updateScoreList("empty");
        }else if(user.public_repos && user.followers){
            console.log("updated")
            updateScoreList(user.public_repos + user.followers);
        }
    }, [user,status])

    const enterKeyPressed = e => {
        if (e.key === 'Enter') search(e);
    }

    const search = e => {
        cancel.current && cancel.current();
        let username = e.target.value;
        setStatus("loading");
        axios.get(`https://api.github.com/users/${username}`,{
            cancelToken:new axios.CancelToken(c => cancel.current = c)
        }).then(res=>{
            setStatus("success");
            setUser(res.data);
        }).catch(() =>{
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
                return <UserStat user = {user} winner={winner}/>
            case "error":
                return <span>User Does Not Exist</span>
            default:
                return;
        }
    }

    return (
        <div className="card">
            <input type="text" onKeyUp={enterKeyPressed}/>
            {displayinfo()}
        </div>
    )
}
