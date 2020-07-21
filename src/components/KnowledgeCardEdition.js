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

  const handleTagChange = (tags) => {
    setEdition({...edition, tags: tags})
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
        htmlFor="tags">Tags</label>
      <Tags tags={edition.tags} onChange={handleTagChange}>
        {tags => (
          tags.map(tag => <span className="border-solid border-2 p-1 mr-1 bg-indigo-600 text-white rounded-md" key={tag}>{tag}</span>)
        )}
      </Tags>
      <label className="text-sm text-gray-600"
        htmlFor="type">Type</label>
        <div className="inline-block relative w-full">
          <select className="block appearance-none w-full bg-white px-4 py-2 pr-8 rounded-md border-solid border-2"
            id="type" name="type" value={edition.type} onChange={handleChange}>
            <option value="article">Article</option>
            <option value="book">Book</option>
            <option value="course">Course</option>
            <option value="influencer">Influencer</option>
            <option value="podcast">Podcast</option>
            <option value="tool">Tool</option>
            <option value="video">Video</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path></svg>
          </div>
        </div>
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


function Tags ({ tags = [], onChange, children }) {
  const [_tags, setTags] = useState(tags)
  const [_currentValue, setCurrentValue] = useState('')

  const handleChange = (event) => {
    // const name = event.target.name
    const value = event.target.value
    setCurrentValue(value)
  }

  const reset = () => {
    setCurrentValue('')
  }

  const addTag = (tag) => {
    setTags([..._tags, tag])
    onChange([..._tags, tag])
  }

  const removeTag = (tag) => {
    if (!tag && _tags.length) {
      const newTags = _tags.slice(0, _tags.length - 1)
      setTags(newTags)
      onChange(newTags)
    }
  }

  const handleKeyDown = (event) => {
    const BACKSPACE = 8
    const ENTER = 13
    const TAB = 9
    const ADD_KEYS = [ENTER, TAB]
    const REMOVE_KEYS = [BACKSPACE]
    const keysActions = {
      13: addTag,
      9: addTag,
      8: removeTag,
    }
    const fireAction = () => {
      event.preventDefault()
      keysActions[event.keyCode](event.target.value)
      reset()
    }

    if (ADD_KEYS.includes(event.keyCode) && event.target.value) fireAction()
    if (REMOVE_KEYS.includes(event.keyCode) && !event.target.value) fireAction()
  }

  return (
    <div className="w-full border-solid border-2 rounded-md mb-2 py-2 px-4 cursor-text flex flex-wrap">
      {children(_tags)}
      {/* {_tags.map(tag => <span className="border-solid border-2 p-1 mr-1" key={tag}>{tag}</span>)} */}
      <input className="outline-none" type="text"
        value={_currentValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      ></input>
    </div>
  )
}