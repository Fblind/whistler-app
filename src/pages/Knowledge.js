import React, { useEffect, useState } from 'react'
import './Knowledge.css'
import { useParams } from 'react-router-dom'

function Knowledge (props) {
  const { id } = useParams()
  const [knowledge, setKnowledge] = useState({})
  useEffect(() => {
    fetch(`/knowledges/${id}`)
      .then(r => r.json())
      .then(knowledge => setKnowledge(knowledge))
  }, [id])

  const tagLayout = (tag) => {
    const getRandom = (list) => {
      const index = Math.floor(Math.random() * list.length)
      return list[index]
    }
    const colors = ['red', 'gray', 'blue']
    const color = getRandom(colors)
    return (
      <li className="inline mr-2 text-sm text-gray-600">
        <span className={`font-bold text-${color}-600`}>#</span>{tag}
      </li>
    )
  }

  return (
    <div>
      <img alt="" title="" src={knowledge.imageUrl} />
      <div className="article p-4">
        <h1 className="text-center text-2xl font-bold text-gray-900">{knowledge.title}</h1>
        <p className="text-sm text-indigo-600 text-center mb-6"><a href={knowledge.url}>Go to original</a></p>
        <ul>
          {knowledge.tags && knowledge.tags.length && knowledge.tags.map(tag => tagLayout(tag))}
        </ul>
        <div className="mt-2">
          <h2 className="text-lg text-gray-600 font-bold">Description</h2>
          <p className="text-gray-900">{knowledge.description}</p>
          <hr className="mt-4"></hr>
        </div>
        <div className="mt-2">
          <h2 className="text-lg text-gray-600 font-bold">Notes</h2>
          <p className="text-gray-900">{knowledge.notes}</p>
          <hr className="mt-4"></hr>
        </div>
      </div>
    </div>
  )
}

export default Knowledge