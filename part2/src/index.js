import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Note from './components/Note'

// const xhttp = new XMLHttpRequest()
// xhttp.onreadystatechange = function() {
//   if(this.readyState == 4 && this.status == 200) {
//     const data = JSON.parse(this.responseText)
//   }
// }
// xhttp.open('GET', '/data.json', true)
// xhttp.send()

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effected')
    axios
      .get('http://localhost:3001/notes')
      .then(res => {
        console.log('promise fullfilled')
        setNotes(res.data)
      })
  }

  useEffect(hook, [])

  console.log('rendering notes')
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note}/>
          )}
      </ul>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
