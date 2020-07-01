import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Note from './components/Note'
import axios from 'axios'

const notes = [
  
]

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault()
    const newNoteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    axios.post('http://localhost:3001/notes', newNoteObject)
      .then(res => {
        console.log(res)
        setNotes(notes.concat(res.data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event)=> {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    axios.put(url, changedNote).then(res => {
      setNotes(notes.map(note => note.id!==id ? note : res.data))
    })
  }

  return (
    <div> 
      <h1>Notes</h1>
      <div>
        <button onClick={()=>setShowAll(!showAll)}>{showAll?'All':'important'}</button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => {toggleImportanceOf(note.id)}} />
          )}
      </ul>
      <form onSubmit={addNote}> 
          <input value={newNote} onChange={handleNoteChange} />
          <button type="submit">save</button>
      </form>
    </div>
  )
}

ReactDOM.render(
  <App notes={notes} />,
  document.getElementById('root')
)