import { useContext, useState } from 'react'
import MainContext from '../MainContext'

function NoteBox() {


    const { boxPosition, setBoxVisible, setMode, notes, setNotes, types} = useContext(MainContext)
    const [color, setColor] = useState(types[0].color)
    const [note, setNote] = useState('')

    const changeColor = (e) => {
        setColor(e.target.value)
    }

    const addNote = () => {
        const currrentNote = {
            note,
            number: notes.length + 1,
            color,
            position: {
                x: boxPosition.x,
                y: boxPosition.y
            }
        }
            setNotes([...notes, currrentNote])
            setBoxVisible(false)
            setMode(true)
    }

    return(
        <div onMouseEnter={() => setMode(false)} onMouseLeave={() => setMode(true)} className="note-box"
		     style={{'--color': color, position: 'absolute', top: boxPosition.y, left: boxPosition.x}}>
			<span className="note-box-number">{notes.length + 1}</span>
			<select onChange={changeColor}>
				{types.map(type => (
					<option value={type.color}>{type.text}</option>
				))}
			</select>
			<textarea onChange={(e) => setNote(e.target.value)} cols="30" rows="5"/>
			<button onClick={addNote} disabled={!note}>Ekle</button>
		</div>
    )

}

export default NoteBox