import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7 
    },
    {
      name: 'State of a component',
      exercises: 14
    } 
  ] 
}

const Hello = ({name, age}) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - age
  }
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old, born {bornYear()}
      </p>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.tit} - {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part tit={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part tit={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part tit={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
    </div>
  )
}

const Display = ({counter}) => 
  (
    <div>{counter}</div>
  )


const Button = ({text, handleClick}) => 
  (
    <button onClick={handleClick}>{text}</button>
  )

const History = ({allClicks}) => {
  if(allClicks.length === 0) {
    return (
      <div>Please press the button</div>
    )
  }

  return (
    <div>{allClicks.join(' ')}</div>
  )
}

const App = () => {
  const name = "Sting",
        age = 27

  const [ counter, setCounter ] = useState(0)

  const [clicks, setClicks] = useState({left: 0, right: 0})

  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setClicks({...clicks, left: clicks.left + 1});
    setAll(allClicks.concat('L'))
  }   

  const handleRightClick = () => {
    setClicks({...clicks, right: clicks.right +1});
    setAll(allClicks.concat('R'))
  }

  const handleClick = () => {
    setCounter(counter + 1)
  }

  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000
  // )
  console.log('rendering...', counter);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <Hello name="Bill" age="18" />
      <Hello name={name} age={age} />
      <h3>useState</h3>
      <Display counter={counter}></Display>
      <Button handleClick={handleClick} text="plus" />
      <Button handleClick={() => setCounter(0)} text="reset" />
      <h3>Complex state</h3>
      {clicks.left}
      <Button handleClick={handleLeftClick} text="Left" />
      <Button handleClick={handleRightClick} text="Right" />
      {clicks.right}
      <br></br>
      <History allClicks={allClicks} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));