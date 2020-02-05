import React, {useState,useRef,useEffect} from 'react'
import UserStat from './UserStat'
import axios from 'axios'
import './Card.css'


export default function Card({winner = false,swapuser}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");
    const cancel = useRef(null);

    const prevUser = useRef(null);

    useEffect(() => {
        swapuser(prevUser.current,user);
    }, [user])

    const search = e => {
        cancel.current && cancel.current();
        e.preventDefault();
        setLoading(true);
        setError(false);
        axios.get(`https://api.github.com/users/${value}`,{
            cancelToken:new axios.CancelToken(c => cancel.current = c)
        }).then(res=>{
            prevUser.current = user;
            setLoading(false);
            setUser(res.data);
        }).catch(() =>{
            prevUser.current = null;
            setUser(null);
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
