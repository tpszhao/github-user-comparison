import React from 'react'
import './UserStat.css'

export default function UserStat(props) {
    const {user} = props;
    return (
        <>
            <div className="avatar" style={{backgroundImage: `url(${user.avatar_url})`}}></div>
            <div className="userStat">
                <span>{user.login}</span> 
                <span className="item">{`Repositories: ${user.public_repos}`}</span>
                <span className="item">{`Followers: ${user.followers}`}</span>
                <span>{`Score: ${user.public_repos + user.followers}`}</span>
            </div>
            <a className="button" href={user.html_url}>Profile</a>
        </>
    )
}
