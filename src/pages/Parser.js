import React, { useState } from "react";
import { postParser } from "../api-client";
import Alert from "../components/Alert";
import KnowledgeCardEdition from "../components/KnowledgeCardEdition";

function Parser(props) {
  const [url, setUrl] = useState("");
  const [knowledge, setKnowledge] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    postParser({ url }).then((d) => {
      setLoading(false);
      setKnowledge(d);
    });
  };

  const handleUrlChange = (event) => {
    if (!event.target.value) return;
    setUrl(event.target.value);
  };

  const handleKnowledgeCreationError = (error) => {
    const _alert = {
      type: "error",
      title: "An error has occured: " + error.code,
      message: "The url you are trying to add is already in the system",
    };
    setAlert(_alert);
    setTimeout(() => setAlert(null), 2 * 1000);
  };

  // TODO: hacerlo con state machine para probar

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="mt-6 w-full px-4">
        <h1 className="text-4xl font-bold text-center mb-6">
          Add digital <span className="text-indigo-600">knowledge</span> to your
          directory
        </h1>
        {!isLoading && (
          <form className="flex flex-col mb-2" onSubmit={handleSubmit}>
            <label className="text-sm text-gray-600 hidden" htmlFor="url">
              Add a knowledge url
            </label>
            <input
              className="w-full border-solid border-2 rounded-md mb-2 py-2 px-4"
              placeholder="Add a knowledge url"
              id="url"
              type="url"
              name="url"
              title="url to parse"
              value={url}
              required
              onChange={handleUrlChange}
            />
            <button
              className="bg-indigo-600 text-white font-semibold py-2 px-4 border border-indigo-400 rounded shadow"
              type="submit"
            >
              Search
            </button>
          </form>
        )}
        {isLoading && <div>Loading...</div>}
        {!isLoading && knowledge && (
          <div className="">
            <KnowledgeCardEdition
              knowledge={knowledge}
              onError={handleKnowledgeCreationError}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Parser;
