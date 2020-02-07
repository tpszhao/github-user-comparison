import React, {useState,useRef,useEffect} from 'react'
import UserStat from './UserStat'
import axios from 'axios'
import styles from './Card.module.css'


export default function Card(props) {
    const {winner=false,user=null,idx,updateUser} = props;
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
        <div className={styles.card}>
            <form onSubmit={search} className={styles.form}>
                <input 
                    type="text" 
                    className={styles.input}
                    value={value} 
                    onChange={changeValue} />
            </form>
            {/* {
                loading?<span>Loading</span>:
                error?<span>Error</span>:
                user&&<UserStat user = {user} winner={winner}/>
            } */}
                {loading&&<span>Loading</span>}
                {!loading&&error&&<span>Error</span>}
                {!loading&&!error&&user&&<UserStat user = {user} winner={winner}/>}
        </div>
    )
}
