import React, {useState,useMemo} from 'react';
import Card from './components/Card'
import './App.css';


function App() {
  const [userList, setUserList] = useState([null,null]);

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

  const removeCard = user =>{ 
    let newlist = userList.filter(item => item!==user);
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
