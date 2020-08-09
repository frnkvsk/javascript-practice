import React, {useState} from 'react'
import './EightBall.css';

const answers = [
  { msg: "It is certain.", color: "green" },
  { msg: "It is decidedly so.", color: "green" },
  { msg: "Without a doubt.", color: "green" },
  { msg: "Yes - definitely.", color: "green" },
  { msg: "You may rely on it.", color: "green" },
  { msg: "As I see it, yes.", color: "green" },
  { msg: "Most likely.", color: "green" },
  { msg: "Outlook good.", color: "green" },
  { msg: "Yes.", color: "green" },
  { msg: "Signs point to yes.", color: "goldenrod" },
  { msg: "Reply hazy, try again.", color: "goldenrod" },
  { msg: "Ask again later.", color: "goldenrod" },
  { msg: "Better not tell you now.", color: "goldenrod" },
  { msg: "Cannot predict now.", color: "goldenrod" },
  { msg: "Concentrate and ask again.", color: "goldenrod" },
  { msg: "Don't count on it.", color: "red" },
  { msg: "My reply is no.", color: "red" },
  { msg: "My sources say no.", color: "red" },
  { msg: "Outlook not so good.", color: "red" },
  { msg: "Very doubtful.", color: "red" },
];



const EightBall = () => {
  let [stats, setStats] = useState({"red":0, "green":0, "goldenrod":0});
  let [message, setMessage] = useState("Think of a Question");
  let [color, setColor] = useState("black");
  const nextAnswer = () => {
    const n = Math.floor(Math.random() * answers.length);
    setMessage(answers[n].msg);
    setColor(answers[n].color);
    stats[answers[n].color]++;
    setStats(stats);
  }
  const reset = () => {
    setMessage("Think of a Question");
    setColor("black");
    setStats({"red":0, "green":0, "goldenrod":0});
  }
  return (
    <div className="EightBall">
      <div className="EightBall-ball" onClick={nextAnswer} style={{background: color}}>
        <p>{message}</p>
      </div>

      <ul className="EightBall-ul">
        {Object.entries(stats).map(e => <li key={e[0]} style={{background: e[0]}}>{e[1]}</li>)}
      </ul>

      <button className="EightBall-button" onClick={reset}>Reset</button>
    </div>
  )
}

export default EightBall
