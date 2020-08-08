import React from 'react'

const Person = (props) => {
  const voteText = props.age > 17 ? "please go vote!" : "you must be 18";
  const name = props.name.length > 8 ? props.name.slice(0, 6) : props.name;
  const hobbies = props.hobbies.map(hobby => <li>{hobby}</li>);
  return (
    <div>
      <p>Learn some information about this person</p>
      <ul>
        <li>Name: {name}</li>
        <li>Age: {props.age}</li>
        <ul>
          Hobbies {hobbies}
        </ul>
      </ul>
      <h3>{voteText}</h3>
    </div>
  )
}

export default Person;
