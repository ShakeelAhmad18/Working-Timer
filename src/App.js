import { useEffect, useMemo, useState } from "react";
import ToggleSound from "./components/ToggleSound";
import Calculater from "./components/Calculater";


function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function App() {

  const [time,setTime]=useState(formatTime(new Date()))
  const [allowSound,setAllowSound]=useState(true)
  const partofDay=time.slice(-2)


  const workout=useMemo( ()=>{ 
    return [
    {
      name:"Full body workout",
      numexercise: partofDay === 'AM' ? 9 : 8
    },
    {
      name:"Arm + Legs",
      numexercise: 6,
    },
    {
      name:"Arms only",
      numexercise:3,
    },
    {
      name:"Core only",
      numexercise:6,
    }
  ]},[])


  useEffect(function () {
    const id = setInterval(function () {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (

    <main>
       <h1>Working Timer</h1>
        <time>for your workout on {time}</time>
        <ToggleSound allowSound={allowSound} setAllowSound={setAllowSound}/>
        <Calculater workout={workout} allowSound={allowSound}/>
    </main>
  );
}

export default App;
