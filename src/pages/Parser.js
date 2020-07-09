import React, { useState } from 'react'
import KnowledgeCardEdition from '../components/KnowledgeCardEdition'

function Parser (props) {
  const [url, setUrl] = useState('')
  const [knowledge, setKnowledge] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3001/parser', {
      method: 'POST',
      body: JSON.stringify({url}),
      headers:{
        'Content-Type': 'application/json',
      },
    })
      .then(r => r.json())
      .then(d => setKnowledge(d))
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">Agrega la url para parsear</label><br></br>
        <input id="url" type="url" name="url" title="url to parse" value={url} onChange={handleUrlChange}/>
      </form>
      {knowledge && <KnowledgeCardEdition knowledge={knowledge}/>}
    </>
  )
}

export default Parser