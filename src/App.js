import React, {useState,useMemo} from 'react';
import Card from './components/Card'
import './App.css';

const data={
  "login": "yoloOnTheBattlefield",
  "id": 22493808,
  "node_id": "MDQ6VXNlcjIyNDkzODA4",
  "avatar_url": "https://avatars2.githubusercontent.com/u/22493808?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/yoloOnTheBattlefield",
  "html_url": "https://github.com/yoloOnTheBattlefield",
  "followers_url": "https://api.github.com/users/yoloOnTheBattlefield/followers",
  "following_url": "https://api.github.com/users/yoloOnTheBattlefield/following{/other_user}",
  "gists_url": "https://api.github.com/users/yoloOnTheBattlefield/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/yoloOnTheBattlefield/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/yoloOnTheBattlefield/subscriptions",
  "organizations_url": "https://api.github.com/users/yoloOnTheBattlefield/orgs",
  "repos_url": "https://api.github.com/users/yoloOnTheBattlefield/repos",
  "events_url": "https://api.github.com/users/yoloOnTheBattlefield/events{/privacy}",
  "received_events_url": "https://api.github.com/users/yoloOnTheBattlefield/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Cristian Florea",
  "company": "RiskFirst",
  "blog": "https://calendly.com/cristianfloreadev/60min",
  "location": "London, Prague",
  "email": null,
  "hireable": true,
  "bio": "I help aspiring frontend developers to get a React job",
  "public_repos": 89,
  "public_gists": 8,
  "followers": 10,
  "following": 12,
  "created_at": "2016-09-28T08:42:36Z",
  "updated_at": "2020-02-02T22:05:31Z"
}

function App() {
  const [userList, setUserList] = useState([data,null]);

  const updateUser = (idx,user)=>{
    let newlist = userList.slice();
    newlist.splice(idx,1,user);
    setUserList(newlist);
  }

  const userScore = user=>{
    let score = user ? user.public_repos + user.followers : -1;
    return score;
  }

  const determineWinner = ()=>{
    if (userList.length < 2) return null;
    let newlist = userList.slice();
    newlist.sort((a,b)=>userScore(b) - userScore(a));
    let firstUser = newlist[0];
    let secondUser = newlist[1];
    let winner = null;

    switch(userScore(secondUser)){
      case -1:
      case userScore(firstUser):
        break;
      default:
        winner = firstUser&&firstUser.login;
    }
    return winner
  }

  const winner = useMemo(() => determineWinner(), [userList]);

  const addCard = ()=>{
    let newlist = userList.slice();
    newlist.push(null);
    setUserList(newlist);
  }

  const removeCard = idx =>{ 
    let newlist = userList.slice();
    newlist.splice(idx,1);
    setUserList(newlist);
  }

  return (
    <div className="container">
      {
        userList.map((user,i)=>{
          return <Card 
                    winner={winner} 
                    user={user} 
                    key={i} 
                    idx={i}
                    removeCard={removeCard}
                    updateUser={updateUser}/>
        })
      }
      <button onClick={addCard}>Add Card</button>
    </div>
  );
}

export default App;
