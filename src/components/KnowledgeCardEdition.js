import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { postKnowledge } from "../api-client";

function KnowledgeCardEdition({ knowledge }) {
  const history = useHistory();
  const [edition, setEdition] = useState(knowledge);

  useEffect(() => {
    setEdition(knowledge);
  }, [knowledge]);

  const handleSubmit = (event) => {
    event.preventDefault();
    postKnowledge({ knowledge: edition }).then((d) => {
      history.push("/");
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setEdition({ ...edition, [name]: value });
  };

  const handleTagChange = (tags) => {
    setEdition({ ...edition, tags: tags });
  };

  const handleTagClose = (e, tag) => {
    e.preventDefault();
    setEdition({
      ...edition,
      tags: edition.tags.filter((_tag) => _tag !== tag),
    });
  };

  return (
    <form className="flex flex-col mb-2" onSubmit={handleSubmit}>
      <legend>We were able to get the following information</legend>
      <label className="text-sm text-gray-600" htmlFor="title">
        Title
      </label>
      <input
        className="w-full border-solid border-2 rounded-md mb-2 py-2 px-4"
        id="title"
        type="text"
        name="title"
        onChange={handleChange}
        value={edition.title}
      ></input>
      <label className="text-sm text-gray-600" htmlFor="description">
        Description
      </label>
      <input
        className="w-full border-solid border-2 rounded-md mb-2 py-2 px-4"
        id="description"
        type="text"
        name="description"
        onChange={handleChange}
        value={edition.description}
      ></input>
      <label className="text-sm text-gray-600" htmlFor="tags">
        Tags
      </label>
      <Tags tags={edition.tags} onChange={handleTagChange}>
        {(tags) =>
          tags.map((tag) => (
            <span
              className="border-solid border-2 p-1 mr-1 bg-indigo-600 text-white rounded-md flex"
              key={tag}
            >
              {tag}
              <button
                className="ml-2 mr-1 text-xs self-start justify-end"
                onClick={(e) => handleTagClose(e, tag)}
              >
                x
              </button>
            </span>
          ))
        }
      </Tags>
      <label className="text-sm text-gray-600" htmlFor="type">
        Type
      </label>
      <div className="inline-block relative w-full">
        <select
          className="block appearance-none w-full bg-white px-4 py-2 pr-8 rounded-md border-solid border-2 mb-2"
          id="type"
          name="type"
          value={edition.type}
          onChange={handleChange}
        >
          <option value="article">Article</option>
          <option value="book">Book</option>
          <option value="course">Course</option>
          <option value="influencer">Influencer</option>
          <option value="podcast">Podcast</option>
          <option value="tool">Tool</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
          </svg>
        </div>
      </div>
      <label className="text-sm text-gray-600" htmlFor="notes">
        Notes
      </label>
      <textarea
        className="w-full border-solid border-2 rounded-md mb-2 py-2 px-4"
        id="notes"
        type="textarea"
        name="notes"
        onChange={handleChange}
        value={edition.notes}
      ></textarea>
      <button
        className="bg-indigo-600 text-white font-semibold py-2 px-4 border border-indigo-400 rounded shadow"
        type="submit"
      >
        Save
      </button>
    </form>
  );
}

export default KnowledgeCardEdition;

function Tags({ tags = [], onChange, children }) {
  // TODO: allSuggestions from GET /tags
  const allSuggestions = [
    "bash",
    "node",
    "javascript",
    "nodejs",
    "git",
    "test",
  ];
  const [_currentSuggestionIndex, setCurrentSuggestionIndex] = useState(-1);
  const [_suggestions, setSuggestions] = useState([]);
  const [_tags, setTags] = useState(tags);
  const [_currentValue, setCurrentValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setTags(tags);
  }, [tags]);

  const handleChange = (event) => {
    // const name = event.target.name
    const value = event.target.value;
    if (value.length === 0) {
      setSuggestions([]);
      setCurrentSuggestionIndex(-1);
    } else {
      const _suggestionsFiltered = allSuggestions.filter((_option) => {
        return _option.includes(value) && !_tags.includes(_option);
      });
      setSuggestions(_suggestionsFiltered);
      if (!_suggestionsFiltered.length) {
        setCurrentSuggestionIndex(-1);
      }
    }
    setCurrentValue(value);
  };

  const reset = () => {
    setCurrentValue("");
    setCurrentSuggestionIndex(-1);
  };

  const addTag = (tag) => {
    if (!_tags.includes(tag)) {
      setTags([..._tags, tag]);
    }
    setSuggestions([]);
    onChange([..._tags, tag]);
  };

  const removeTag = (tag) => {
    if (!tag && _tags.length) {
      const newTags = _tags.slice(0, _tags.length - 1);
      setTags(newTags);
      setSuggestions([]);
      onChange(newTags);
    }
  };

  const goDown = (tag) => {
    if (_currentSuggestionIndex === _suggestions.length - 1) {
      setCurrentSuggestionIndex(0);
    } else {
      setCurrentSuggestionIndex(_currentSuggestionIndex + 1);
    }
  };

  const goUp = () => {
    if (_currentSuggestionIndex === 0) {
      setCurrentSuggestionIndex(_suggestions.length - 1);
    } else {
      setCurrentSuggestionIndex(_currentSuggestionIndex - 1);
    }
  };

  const handleEnterTab = (tag) => {
    if (_currentSuggestionIndex !== -1) {
      addTag(_suggestions[_currentSuggestionIndex]);
    } else {
      addTag(tag);
    }
  };

  const handleKeyDown = (event) => {
    const BACKSPACE = 8;
    const ENTER = 13;
    const TAB = 9;
    const ADD_KEYS = [ENTER, TAB];
    const REMOVE_KEYS = [BACKSPACE];
    const DOWN_KEY = 40;
    const UP_KEY = 38;
    const SELECT_KEYS = [DOWN_KEY, UP_KEY];
    const keysActions = {
      13: handleEnterTab,
      9: handleEnterTab,
      8: removeTag,
      [DOWN_KEY]: goDown,
      [UP_KEY]: goUp,
    };
    const fireAction = () => {
      event.preventDefault();
      keysActions[event.keyCode](event.target.value);
      reset();
    };

    if (ADD_KEYS.includes(event.keyCode) && event.target.value) fireAction();
    if (REMOVE_KEYS.includes(event.keyCode) && !event.target.value)
      fireAction();
    if (SELECT_KEYS.includes(event.keyCode)) {
      event.preventDefault();
      keysActions[event.keyCode](event.target.value);
    }
  };

  const handleSuggestionInsert = (_tag) => {
    addTag(_tag);
    reset();
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full border-solid border-2 rounded-md mb-2 py-2 px-4 cursor-text flex flex-wrap">
      {children(_tags)}
      {/* {_tags.map(tag => <span className="border-solid border-2 p-1 mr-1" key={tag}>{tag}</span>)} */}
      <div>
        <input
          className="outline-none"
          type="text"
          value={_currentValue}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          ref={inputRef}
        ></input>
        <Suggestions
          list={_suggestions}
          onClick={handleSuggestionInsert}
          selectedIndex={_currentSuggestionIndex}
        />
      </div>
    </div>
  );
}

function Suggestions({ list = [], onClick, selectedIndex = -1 }) {
  function getLiTagClassNames(index, size) {
    if (size === 1 && index === 0) return "py-2 rounded-lg";
    if (index === 0) return "pt-2 pb-1 rounded-t-lg";
    if (index === size) return "pt-1 pb-2 rounded-b-lg";
    return "py-1";
  }

  return (
    <div
      className={`absolute rounded-lg shadow-lg ${
        !list.length ? "hidden" : ""
      } select-none z-10`}
    >
      <ul className="bg-white">
        {list.map((item, i) => {
          return (
            <li
              className={`px-4 hover:bg-gray-100 cursor-pointer ${getLiTagClassNames(
                i,
                list.length
              )} ${selectedIndex === i ? "bg-gray-100" : ""}`}
              key={i}
              onClick={() => onClick(item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
