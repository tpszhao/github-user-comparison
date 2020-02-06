import React, {useState,useRef} from 'react'
import UserStat from './UserStat'
import axios from 'axios'
import './Card.css'


export default function Card({winner = false,user=null,idx,updateUser}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");
    const cancel = useRef(null);

    const search = async e => {
        cancel.current && cancel.current();
        e.preventDefault();
        setLoading(true);
        setError(false);
        let user = null;
        try{
            const response = await axios.get(`https://api.github.com/users/${value}`,{
                cancelToken:new axios.CancelToken(c => cancel.current = c)
            })
            user = response.data
        }catch{
            setError(true);
        }finally{
            updateUser(idx,user);
            setLoading(false);
        }
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
            {
                loading?<span>Loading</span>:
                error?<span>Error</span>:
                user&&<UserStat user = {user} winner={winner}/>
            }
        </div>
    )
}
