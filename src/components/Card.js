import React, {useState,useRef,useEffect} from 'react'
import UserStat from './UserStat'
import axios from 'axios'
import './Card.css'


export default function Card(props) {
    const {winner=false,user=null,idx,updateUser, removeCard} = props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");
    const prevSearch = useRef("");
    const cancel = useRef(null);

    useEffect(() => {
        let newValue = user? user.login:"";
        prevSearch.current = newValue;
        setValue(newValue);
    }, [user])

    const search = async e => {
        e.preventDefault();
        console.log("search")
        cancel.current && cancel.current();
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
            <button onClick={() => removeCard(idx)}>Remove Card</button>
        </div>
    )
}
