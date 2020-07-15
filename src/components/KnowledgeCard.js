import React from 'react'

function KnowledgeCard ({ knowledge }) {
  const truncate = (word, max) => {
    if (word.length > max) {
      return word.substring(0, max - 3) + '...'
    }
    return word
  }

  return (
    <article className="w-full rounded-lg flex border-solid shadow-2xl mb-6">
      <div className="w-1/3">
        <img className="h-32 w-40 object-cover rounded-l-lg"
          src={knowledge.imageUrl} alt={knowledge.title}/>
      </div>
      <div className="w-2/3 p-2">
        <h2 className="text-gray-900 font-bold">{truncate(knowledge.title, 25)}</h2>
        <p className="text-xs text-gray-600">
          {truncate(knowledge.description, 100)}
        </p>
      </div>
    </article>
  )
}

export default KnowledgeCard