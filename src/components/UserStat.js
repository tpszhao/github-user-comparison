import React from 'react'
import styles from './UserStat.module.css'

export default function UserStat({user,winner}) {
    const {span,score,login} = styles;

    if (!user) return;
    return (
        <>
            <div className={styles.avatar} style={{backgroundImage: `url(${user.avatar_url})`}}></div>
            <div className={styles.userStat}>
                <span className={login}>{user.login}</span> 
                <span className={span}>{`Repositories: ${user.public_repos}`}</span>
                <span className={span}>{`Followers: ${user.followers}`}</span>
                <span className={score}>{`Score: ${user.public_repos + user.followers}`}</span>
            </div>
            <a className={styles.button} href={user.html_url}>Profile</a>
            {winner&&(winner === user.login)&&<span className={span} style={{color:'black'}}>Winner</span>}
        </>
    )
}
