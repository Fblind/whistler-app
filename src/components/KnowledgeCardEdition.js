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
    fetch('/knowledges', {
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
    <form className="flex flex-col mb-2"
      onSubmit={handleSubmit}>
      <legend>We were able to get the following information</legend>
      <label className="text-sm text-gray-600"
        htmlFor="title">Title</label>
      <input className="w-full border-solid border-2 rounded-md mb-2 py-2 px-4"
        id="title" type="text" name="title" onChange={handleChange} value={edition.title}></input>
      <label className="text-sm text-gray-600"
        htmlFor="description">Description</label>
      <input className="w-full border-solid border-2 rounded-md mb-2 py-2 px-4"
        id="description" type="text" name="description" onChange={handleChange} value={edition.description}></input>
      <label className="text-sm text-gray-600"
        htmlFor="notes">Notes</label>
      <textarea className="w-full border-solid border-2 rounded-md mb-2 py-2 px-4"
        id="notes" type="textarea" name="notes" onChange={handleChange} value={edition.notes}></textarea>
      <button className="bg-indigo-600 text-white font-semibold py-2 px-4 border border-indigo-400 rounded shadow"
        type="submit">Save</button>
    </form>
  )
}

export default KnowledgeCardEdition