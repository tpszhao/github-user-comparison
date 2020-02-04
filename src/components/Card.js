import React, {useState,useRef,useEffect} from 'react'
import UserStat from './UserStat'
import axios from 'axios'
import './Card.css'


export default function Card({winner,updateScoreList}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");
    const cancel = useRef(null);

    useEffect(() => {
        if(loading || error){
            updateScoreList("empty");
        }else if(user&&user.public_repos&&user.followers){
            updateScoreList(user.public_repos + user.followers);
        }
    }, [user,loading,error])

    const search = e => {
        cancel.current && cancel.current();
        e.preventDefault();
        setLoading(true);
        setError(false);
        setUser(null);
        axios.get(`https://api.github.com/users/${value}`,{
            cancelToken:new axios.CancelToken(c => cancel.current = c)
        }).then(res=>{
            setLoading(false);
            setUser(res.data);
        }).catch(() =>{
            setError(true);
            setLoading(false);
        })
    }

    const changeValue = e => {
        const username = e.target.value;
        setValue(username);
    }

    return (
        <div className="card">
            <form onSubmit={search}>
                <input type="text" value={value} onChange={changeValue}/>
            </form>
            {loading&&<span>Loading</span>}
            {!loading&&error&&<span>Error</span>}
            {!loading&&user&&<UserStat user = {user} winner={winner}/>}
        </div>
    )
}
