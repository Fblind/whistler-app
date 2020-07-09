import React from 'react'

function KnowledgeCard ({ knowledge }) {
  return (
    <article>
      <img src={knowledge.imageUrl} width="200px" alt={knowledge.title}/>
      <h2><a href={knowledge.url} title={knowledge.title}>{knowledge.title}</a></h2>
      <dl>
        <dt>Description</dt>
        <dd>{knowledge.description}</dd>
        <dt>Notes</dt>
        <dd>{knowledge.notes}</dd>
      </dl>
    </article>
  )
}

export default KnowledgeCard