import React from "react";
import { Link } from "react-router-dom";
const SUCCESS = "success";
const ERROR = "error";
const RESET = "reset";
const PROGRESS = "progress";

function searchReducer(state, action) {
  // action = {type, payload}
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload.results,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        results: [],
      };
    case RESET:
      return {
        ...state,
        loading: false,
        results: [],
      };
    case PROGRESS:
      return {
        ...state,
        loading: true,
        results: [],
      };
    default:
      return state;
  }
}

function search(knowledges, text) {
  return new Promise((resolve, reject) => {
    const results = knowledges.filter((knowledge) => {
      return knowledge.title.toLowerCase().includes(text.toLowerCase());
    });
    setTimeout(() => resolve(results), 1 * 1000);
  });
}

function KnowledgeSearch({ className = "", knowledges = [] }) {
  const [state, dispatch] = React.useReducer(searchReducer, {
    loading: false,
    results: [],
  });
  const handleSearch = (event, options = {}) => {
    const value = event.target.value;
    if (!value || !value.length) {
      dispatch({ type: RESET });
      return;
    }
    if (value.length > 3 || options.force) {
      dispatch({ type: PROGRESS });
      search(knowledges, value).then((results) => {
        dispatch({
          type: SUCCESS,
          payload: { results },
        });
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = event.target.elements.search.value;
    handleSearch({ target: { value: text } }, { force: true });
  };
  return (
    <div className={`${className} flex shadow p-2`}>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="w-full"
            type="text"
            name="search"
            placeholder="Search..."
            onChange={handleSearch}
          ></input>
          {state.loading && (
            <svg
              className="animate-spin h-6 w-6 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </div>
        <SearchResults results={state.results}></SearchResults>
      </form>
    </div>
  );
}

function SearchResults({ results }) {
  if (!results.length) return null;
  return (
    <ul className="bg-white w-full mt-2">
      {results.map((result) => {
        return (
          <li
            key={result._id}
            className="pr-2 py-1 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
          >
            <Link to={`/knowledges/${result._id}`} className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              {/* <span className={`font-bold text-red-600 text-xs`}>
                # javascript
              </span>{" "} */}
              {result.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export { KnowledgeSearch };
export default KnowledgeSearch;
