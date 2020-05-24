import React, { useState, useMemo } from "react";
import { Card, BlankCard } from "./components";
import "./App.css";

function App() {
  const [userList, setUserList] = useState([Symbol(), Symbol()]);

  const updateUser = (idx, user) => {
    let newlist = userList.slice();
    newlist.splice(idx, 1, user);
    setUserList(newlist);
  };

  const userScore = (user) => {
    let score;
    switch (typeof user) {
      case "symbol":
        console.log("test");
        score = -1;
        break;
      default:
        score = user.public_repos + user.followers;
    }
    return score;
  };

  const determineWinner = () => {
    if (userList.length < 2) return null;
    let newlist = userList.slice();
    newlist.sort((a, b) => userScore(b) - userScore(a));
    let firstUser = newlist[0];
    let secondUser = newlist[1];
    let winner = null;

    switch (userScore(secondUser)) {
      case -1:
      case userScore(firstUser):
        break;
      default:
        winner = firstUser && firstUser.login;
    }
    return winner;
  };

  const winner = useMemo(() => determineWinner(), [userList]);

  const addCard = () => {
    let newlist = userList.slice();
    newlist.push(Symbol());
    setUserList(newlist);
  };

  const removeCard = (user) => {
    let newlist = userList.filter((item) => item !== user);
    setUserList(newlist);
  };

  return (
    <div className="container">
      {userList.map((user, i) => {
        return (
          <Card
            winner={winner}
            user={user}
            key={i}
            removeCard={removeCard}
            updateUser={(user) => updateUser(i, user)}
          />
        );
      })}
      <BlankCard onClick={addCard} />
    </div>
  );
}

export default App;
