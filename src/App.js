import React, {useState,useCallback} from 'react';
import Card from './components/Card'
import './App.css';


function App() {
  const [scoreList, setScoreList] = useState(["empty","empty"]);

  const updateScoreList = (idx,score) => {
    let newList = scoreList.slice();
    newList[idx] = score;
    setScoreList(newList);
    console.log(newList);
  }

  const ismax = idx =>{
    const compare_value = scoreList[idx];
    let result = true;
    for(let i = 0;i<scoreList.length;i++){
      if(i === idx){continue;}
      result = result && compare_value > scoreList[i];
      if(!result) return result;
    }
    return result;
  }

  return (
    <div className="container">
      <Card 
        winner={ismax(0)} 
        updateScoreList={score=>updateScoreList(0,score)}/>
      <Card 
        winner={ismax(1)} 
        updateScoreList={score=>updateScoreList(1,score)}/>      
    </div>
  );
}

export default App;
