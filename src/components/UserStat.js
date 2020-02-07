import React from 'react'
import styles from './UserStat.module.css'
import './UserStat.module.css'

export default function UserStat({user,winner}) {
    const {span} = styles;
    const score = {flex:'0 1 100%', fontSize:'1.0em'};
    const login = {...score,fontSize:'1.1em'};


    if (!user) return;
    return (
        <>
            <div className={styles.avatar} style={{backgroundImage: `url(${user.avatar_url})`}}></div>
            <div className={styles.userStat}>
                <span className={span} style={login}>{user.login}</span> 
                <span className={span}>{`Repositories: ${user.public_repos}`}</span>
                <span className={span}>{`Followers: ${user.followers}`}</span>
                <span className={span} style={score}>{`Score: ${user.public_repos + user.followers}`}</span>
            </div>
            <a className={styles.button} href={user.html_url}>Profile</a>
            {winner&&(winner === user.login)&&<span style={span}>Winner</span>}
        </>
    )
}
