import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router";

function KnowledgeCardEdition ({ knowledge }) {
  const history = useHistory()
  const [edition, setEdition] = useState(knowledge)

  useEffect(() => {
    setEdition(knowledge)
  }, [knowledge])

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3001/knowledges', {
      method: 'POST',
      body: JSON.stringify(edition),
      headers:{
        'Content-Type': 'application/json',
      },
    })
      .then(r => r.json())
      .then(d => {
        console.log(d)
        history.push('/')
      })
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setEdition({...edition, [name]: value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <legend>We parse the following information from the page, you can change it and save as you want adding notes !</legend>
      <label htmlFor="title">Title</label><br></br>
      <input id="title" type="text" name="title" onChange={handleChange} value={edition.title}></input><br></br>
      <label htmlFor="description">Description</label><br></br>
      <input id="description" type="text" name="description" onChange={handleChange} value={edition.description}></input><br></br>
      <label htmlFor="notes">Notes</label><br></br>
      <textarea id="notes" type="textarea" name="notes" onChange={handleChange} value={edition.notes}></textarea><br></br>
      <button type="submit">Save</button>
    </form>
  )
}

export default KnowledgeCardEdition