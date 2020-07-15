import React, { useState, useEffect } from 'react'
import KnowledgeCard from '../components/KnowledgeCard'

function Knowledges () {
  const [knowledges, setKnowledges] = useState([])
  useEffect(() => {
    fetch('/knowledges')
      .then(r => r.json())
      .then(d => setKnowledges(d))
  }, [])

  return (
    <div className="mt-6 w-full px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Directory</h1>
      <h2 className="text-lg text-gray-600">Topics</h2>
      <section className="mb-6 flex flex-row overflow-y-scroll pb-6">
        <div className="m-w-24 h-24 flex flex-col justify-between p-2 shadow-lg rounded-lg mr-2">
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          <p className="text-gray-900 font-bold">Javascript</p>
        </div>
        <div className="m-w-24 h-24 flex flex-col justify-between p-2 shadow-lg rounded-lg mr-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <p className="text-gray-900 font-bold">Node</p>
        </div>
        <div className="m-w-24 h-24 flex flex-col justify-between p-2 shadow-lg rounded-lg mr-2">
          <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
          <p className="text-gray-900 font-bold">Design</p>
        </div>
        <div className="m-w-24 h-24 flex flex-col justify-between p-2 shadow-lg rounded-lg mr-2">
          <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
          <p className="text-gray-900 font-bold">HTML</p>
        </div>
        <div className="m-w-24 h-24 flex flex-col justify-between p-2 shadow-lg rounded-lg mr-2">
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          <p className="text-gray-900 font-bold">Programming</p>
        </div>
      </section>
      <h2 className="text-lg text-gray-600">Recents</h2>
      {knowledges.map((knowledge) => {
        return (
          <KnowledgeCard key={knowledge.title} knowledge={knowledge} />
        )
      })}
    </div>
  )
}

export default Knowledges