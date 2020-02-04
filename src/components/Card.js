import React, {useState,useRef,useEffect} from 'react'
import UserStat from './UserStat'
import axios from 'axios'
import './Card.css'


export default function Card({winner,updateScoreList}) {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("initial");
    const [value, setValue] = useState("");
    const cancel = useRef(null);

    useEffect(() => {
        if(status !== "success"){
            updateScoreList("empty");
        }else if(user.public_repos && user.followers){
            console.log("updated")
            updateScoreList(user.public_repos + user.followers);
        }
    }, [user,status])

    const search = e => {
        cancel.current && cancel.current();
        e.preventDefault();
        setStatus("loading");
        axios.get(`https://api.github.com/users/${value}`,{
            cancelToken:new axios.CancelToken(c => cancel.current = c)
        }).then(res=>{
            setUser(res.data);
            setStatus("success");
        }).catch(() =>{
            setStatus("error");
        })
    }

    const changeValue = e => {
        const username = e.target.value;
        setValue(username);
    }

    const displayinfo = ()=>{
        switch(status){
            case "initial":
                return <span>Waiting For Input</span>
            case "loading":
                return <span>Loading</span>
            case "success":
                return user&&<UserStat user = {user} winner={winner}/>
            case "error":
                return <span>User Does Not Exist</span>
            default:
                return;
        }
    }

    return (
        <div className="card">
            <form onSubmit={search}>
                <input type="text" value={value} onChange={changeValue}/>
            </form>
            {displayinfo()}
        </div>
    )
}
