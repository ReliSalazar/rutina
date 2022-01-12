import React, { useState, useEffect } from "react";
import "./App.css";

const audio = new Audio(
  "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
);
const maxSessions = 14;
const tasks = [
  { name: "rodillas", time: 15 },
  { name: "puños", time: 15 },
  { name: "talones", time: 15 },
  { name: "saltos", time: 15 },
  { name: "descanso", time: 30 },
];

function App() {
  const [running, setRunning] = useState(false);
  const [session, setSession] = useState(1);
  const [taskIndex, setTaskIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(tasks[taskIndex].time);
  const [timer, setTimer] = useState();
  const [percent, setPercent] = useState(0);

  const start = () => {
    setRunning(true);
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
    }, 1000);
    setTimer(timer);
  };

  useEffect(() => {
    if (session === maxSessions && taskIndex === 4 && secondsLeft === 0) {
      clearInterval(timer);
      setRunning(false);
    } else if (taskIndex === 4 && secondsLeft === 0) {
      setSecondsLeft(tasks[0].time);
      setTaskIndex(0);
      setSession((session) => session + 1);
    } else if (secondsLeft === 0) {
      const index = taskIndex + 1;
      setTaskIndex(index);
      setSecondsLeft(tasks[index].time);
      audio.play();
    }
  }, [secondsLeft, session, taskIndex, timer]);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  useEffect(() => {
    const total = Math.floor(
      ((tasks[taskIndex].time - secondsLeft) / tasks[taskIndex].time) * 100
    );
    setPercent(total);
  }, [secondsLeft, taskIndex]);

  return (
    <div className="app center">
      <div className="container center">
        <h1>
          Sesión actual: {session} de {maxSessions}
        </h1>
        <h2>{tasks[taskIndex].name}</h2>
        <hr />
        <p>tiempo restante: {secondsLeft}</p>
        <div className="timebar">
          <div className="loading" style={{ width: `${percent}%` }}></div>
          <div className="percent center">
            <p>{percent}%</p>
          </div>
        </div>
        <button onClick={start}>{running ? "running" : "start"}</button>
      </div>
    </div>
  );
}

export default App;
