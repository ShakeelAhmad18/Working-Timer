import { memo, useEffect, useState } from "react"
import ClickSound from '../components/ClickSound.m4a'
function Calculater({workout,allowSound}) {
  const [number,setNumber]=useState(workout.at(0).numexercise)
  const [sets,setSets]=useState(3)
  const [speed,setSpeed]=useState(90)
  const [durationBreak,setDurationBreak]=useState(5);
  const [duration,setDuration]=useState(0);

  //const duration=(number * sets * speed)/60 + (sets - 1) * durationBreak
  useEffect(function(){
    document.title=`Your ${number}-exercise workout`
 },[number])


  useEffect(function(){

   setDuration((number * sets * speed)/60 + (sets - 1) * durationBreak);

  },[number,sets,speed,durationBreak])

 useEffect(function(){
    const playSound=function(){
        if(!allowSound) return;
        const sound=new Audio(ClickSound)
        sound.play()
    }
    playSound();
 },[duration,allowSound])


 
  const min=Math.floor(duration)
  const sec=(duration - min) * 60;

   
function handleInc(){
    setDuration((duration)=>Math.floor(duration) + 1);
}

function handldec(){
    setDuration(duration=> duration > 1 ? Math.ceil(duration) - 1 : 0)
    
}
    return (
        <>
            <form>
                <div>
                    <label>Type of workout</label>
                    <select value={number} onChange={(e)=>setNumber(+e.target.value)}>
                      {workout.map((workout)=><option value={workout.numexercise} key={workout.name}>
                           {workout.name} {workout.numexercise} exercise
                      </option>)}
                    </select>
                </div>
                <div>
                    <label>How Many Sets</label>
                    <input type="range" min='1' max='5' value={sets} onChange={(e)=>setSets(e.target.value)}/>
                    <span>{sets}</span>
                </div>
                <div>
                    <label>How fast are you</label>
                    <input type="range" min='30' max="180" step='30' value={speed} onChange={(e)=>setSpeed(e.target.value)} />
                    <span>{speed} sec/exercise</span>
                </div>
                <div>
                    <label>Break Length</label>
                    <input type="range"  min='1' max='10' value={durationBreak} onChange={(e)=>setDurationBreak(e.target.value)}/>
                    <span>{durationBreak} minutes/break</span>
                </div>
            </form>
            <section>
                <button onClick={handldec}>-</button>
                 <p>
                    {min < 10 && '0'}
                    {min}:{sec < 10 && '0'}
                    {sec}
                 </p>
                 <button onClick={handleInc}>+</button>
            </section>

        </>
    )
}

export default memo(Calculater)
