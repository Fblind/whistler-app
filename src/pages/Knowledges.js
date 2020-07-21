import React, { useState, useEffect } from 'react'
import KnowledgeCard from '../components/KnowledgeCard'
import './Knowledges.css'

function Knowledges () {
  const [knowledges, setKnowledges] = useState([])
  const [topics, setTopics] = useState([])
  useEffect(() => {
    fetch('/knowledges')
      .then(r => r.json())
      .then(knowledges => {
        setKnowledges(knowledges)
        const knowledgesTopics = knowledges
          .map(k => k.tags)
          .reduce((accum, t) => accum.concat(t), [])
        const _topics = [...new Set(knowledgesTopics)]
        setTopics(_topics)
      })
  }, [])

  return (
    <div className="mt-6 w-full px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Directory</h1>
      <h2 className="text-lg text-gray-600 font-bold">Topics</h2>
      <TopicCarousel topics={topics}></TopicCarousel>
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-lg text-gray-600 font-bold">Recents</h2>
        <a className="text-indigo-600 text-sm">View all</a>
      </div>
      {knowledges.map((knowledge) => {
        return (
          <KnowledgeCard key={knowledge.title} knowledge={knowledge} />
        )
      })}
    </div>
  )
}

export default Knowledges

function Carousel ({children}) {
  return (
    <section className="mb-6 overflow-x-scroll pb-6 flex">
      {children}
    </section>
  )
}

function TopicCarousel ({ topics }) {
  const getRandom = (list) => {
    const index = Math.floor(Math.random() * list.length)
    return list[index]
  }
  const TopicTag = (topic) => {
    const colors = ['red', 'blue', 'pink', 'yellow', 'green']
    const color = getRandom(colors)
    return (
      <div key={topic} className="shadow-lg rounded-lg mr-2 inline-block">
        <div className="m-w-24 h-24 p-2 flex flex-col justify-between">
          <div className={`w-3 h-3 bg-${color}-600 rounded-full`}></div>
          <p className="text-gray-900 font-bold">{topic}</p>
        </div>
      </div>
    )
  }
  return (
    <Carousel>
      {topics.map(topic => TopicTag(topic))}
    </Carousel>
  )
}