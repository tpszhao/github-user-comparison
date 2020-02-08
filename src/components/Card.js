import React, {useState,useRef,useEffect} from 'react'
import {UserStat,CloseButton,LoadingScreen,ErrorScreen} from './Card/'
import axios from 'axios'
import styles from './Card.module.css'


export default function Card(props) {
    const {winner=false,user,updateUser,removeCard} = props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");
    const cancel = useRef(null);

    useEffect(() => {
        let newValue = typeof user == "symbol" ? "": user.login;
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
            updateUser(user);
            setLoading(false);
        }
    }

    const changeValue = e => {
        const username = e.target.value;
        setValue(username);
    }


    return (
        <div className={styles.card}>
            <CloseButton style={{top:'12px',right:'24px'}} onClick={()=>removeCard(user)}/>
            <form onSubmit={search} className={styles.form}>
                <input 
                    type="text" 
                    className={styles.input}
                    value={value} 
                    onChange={changeValue} />
            </form>
            {loading&&<LoadingScreen/>}
            {!loading&&error&&<ErrorScreen/>}
            {!loading&&(typeof user !== "symbol")&&<UserStat user = {user} winner={winner}/>}
        </div>
    )
}
