import React, { useContext, useState} from 'react'
import Modal from 'react-modal'
import MainContext from '../MainContext'

function ChanceImports(note) {

    const { notes, setNotes, types} = useContext(MainContext)
    const [color, setColor] = useState(note.color)

    const changeColor = (e) => {
        //setColor(e.target.value)
        const newNotes = notes.map(n => {
            if (n.number === note.number){
                n.color = e.target.value || "";
            }
            return n
        })
        setNotes(newNotes)
    }



    return(
       <div  className="about-modal">
                     <select className="select-color" onChange={changeColor}>
				{types.map(type => (
					<option value={type.color}>{type.text}</option>
                     
				))}
			</select>
           
       </div>
    );

}
export default ChanceImports