import React, {useState} from 'react';
import Card from './components/Card'
import './App.css';


function App() {
  const [userList, setUserList] = useState([]);

  const swapUser = (prevUser= null,newUser = null) => {
    let newlist = userList.slice();
    newlist = prevUser? removeUser(prevUser,newlist):newlist;
    newlist = newUser? addUser(newUser,newlist):newlist;
    console.log(newlist)
    setUserList(newlist);
  }

  const removeUser = (user,list) => {
    let newlist = list.slice();
    let name = user.login;
      let name_found = false;
      let i;
      for (i = 0;i<list.length;i++){
        if(userList[i].name === name){
          name_found = true;
          break;
        }
      }
      name_found && newlist.splice(i,1);
    return newlist
  }

  const addUser = (user,list) => {
    let newlist = list.slice();
    let {login,public_repos,followers} = user;
    newlist.push({name:login,score:public_repos+followers});
    return newlist;
  }

  const determineWinner = ()=>{
    if (userList.length < 2) return null;
    let newlist = userList.slice();
    newlist.sort((a,b)=>b.score - a.score);
    if(newlist[0].score === newlist[1].score) return null;
    return newlist[0].name;
  }
  return (
    <div className="container">
      <Card winner={determineWinner()} swapuser={swapUser}/>
      <Card winner={determineWinner()} swapuser={swapUser}/>
    </div>
  );
}

export default App;
