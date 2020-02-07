import React, {useState,useRef,useEffect} from 'react'
import UserStat from './UserStat'
import CloseButton from './CloseButton'
import axios from 'axios'
import styles from './Card.module.css'
import {span} from './UserStat.module.css'


export default function Card(props) {
    const {winner=false,user=null,idx,updateUser,removeCard} = props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");
    const cancel = useRef(null);

    useEffect(() => {
        let newValue = user? user.login:"";
        setValue(newValue);
    }, [user])

    const search = async e => {
        e.preventDefault();
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
        <div className={styles.card}>
            <CloseButton style={{right:'20px'}} onClick={()=>{removeCard(idx)}}/>
            <form onSubmit={search} className={styles.form}>
                <input 
                    type="text" 
                    className={styles.input}
                    value={value} 
                    onChange={changeValue} />
            </form>
            {loading&&<span className={span}>Loading</span>}
            {!loading&&error&&<span className={span}>Error</span>}
            {!loading&&user&&<UserStat user = {user} winner={winner}/>}
        </div>
    )
}
