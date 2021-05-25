import './App.css';
import { useRef, useState, useEffect } from 'react'
import MainContext from './MainContext'
import Note from './components/Note'
import NoteBox from './components/NoteBox'
import LeaveCommentText from './components/LeaveCommentText'

function App() {
      
      const screen = useRef(null)
      const [mode, setMode] = useState(false)
      const [notes, setNotes] = useState(localStorage.notes && JSON.parse(localStorage.notes) || [])
      const [position, setPosition] = useState({
        x: 0,
        y: 0,
      })
      const [boxVisible, setBoxVisible] = useState(false)
      const [boxPosition, setBoxPosition] = useState({
        x: 0,
        y: 0,
      })

      useEffect(() => {
         // console.log(notes)
          localStorage.setItem('notes', JSON.stringify(notes))
      }, [notes])

      const handleKeyUp = (e) => {
        if(e.key === 'c'){
          setMode(!mode)
          setBoxVisible(false)
        }
        if(e.key === 'Escape'){
          setBoxVisible(false)
        }
      }

      const handleMouseMove = (e) => {
        setPosition({
          x: [e.pageX, e.clientX],
          y: [e.pageY, e.clientY],
        })
      }

      const handleClick = (e) => {
        if(mode) {
          setBoxPosition({
            x: position.x[0],
            y: position.y[0],
          })
          setBoxVisible(true)
        }
      }

      const types = [
        {
           name: 'comment',
           color: 'red',
           text: 'Yorum', 
        },
        {
            name: 'private-comment',
            color: '#999',
            text: 'Gizli Yorum',
        },
        {
            name: 'note',
            color: 'orange',
            text: 'Note',
        },
    ]
      
      const data = {
        position,
        boxPosition,
        setMode,
        setNotes,
        setBoxVisible,
        notes,
        types,
      }

      return (
            <MainContext.Provider value={data}>
                <div ref={screen} tabIndex={0} onClick={handleClick} onMouseMove={handleMouseMove} onKeyUp={handleKeyUp}
                className={`screen${mode ? ' editable' : ''}`}>
                  
                  <img style={{opacity: '.7',  width: '100%'}} src="https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1274&q=80" />

                  {mode && <LeaveCommentText/>}

                  {notes && notes.map((note, key) => <Note key={key} {...note}/>)}  

                  {boxVisible && <NoteBox/>}

                </div>
                <div className="sticky-bar">
                  <button onClick={() => setMode(!mode)} className={mode ? 'active' : ''}>Yorum Modu <code>c</code></button>
                  {boxVisible && <button onClick={() => setBoxVisible(false)} className="active">Kapat <code>Esc</code></button>}
                </div>

            </MainContext.Provider>
      );
}

export default App;
