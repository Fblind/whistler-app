import React, { useState, useEffect } from 'react'
import KnowledgeCard from '../components/KnowledgeCard'

function Knowledges () {
  const [knowledges, setKnowledges] = useState([])
  useEffect(() => {
    fetch('http://localhost:3001/knowledges')
      .then(r => r.json())
      .then(d => setKnowledges(d))
  }, [])

  return (
    <>
      {knowledges.map((knowledge) => {
        return (
          <KnowledgeCard key={knowledge.title} knowledge={knowledge} />
        )
      })}
    </>
  )
}

export default Knowledges