import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./Knowledge.css";
import { useParams } from "react-router-dom";
import { Player } from "../components/Player";
import { getKnowledgeById } from "../api-client";
import config from "../config";

function Knowledge(props) {
  const { id } = useParams();
  const [knowledge, setKnowledge] = useState({});
  useEffect(() => {
    getKnowledgeById(id).then((knowledge) => setKnowledge(knowledge));
  }, [id]);

  const tagLayout = (tag) => {
    const getRandom = (list) => {
      const index = Math.floor(Math.random() * list.length);
      return list[index];
    };
    const colors = ["red", "blue", "pink", "yellow", "green"];
    const color = getRandom(colors);
    return (
      <li key={tag} className="inline mr-2 text-sm text-gray-600">
        <span className={`font-bold text-${color}-600`}>#</span>
        {tag}
      </li>
    );
  };

  const fixImageUrl = (event) => {
    if (event.target && event.target.src) {
      event.target.src = config.defaultImageUrl;
    }
  };

  return (
    <div>
      <img
        className="m-auto inset-x-0"
        title={knowledge.title}
        src={knowledge.imageUrl || config.defaultImageUrl}
        alt={knowledge.title}
        onError={fixImageUrl}
      />
      <div className="article p-4">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          {knowledge.title}
        </h1>
        <p className="text-sm text-indigo-600 text-center mb-6">
          <a href={knowledge.url}>Go to original</a>
        </p>
        <ul>
          {knowledge.tags && knowledge.tags.length > 0
            ? knowledge.tags.map((tag) => tagLayout(tag))
            : null}
        </ul>
        <div className="mt-2">
          <h2 className="text-lg text-gray-600 font-bold">Description</h2>
          <p className="text-gray-900">{knowledge.description}</p>
          <hr className="mt-4"></hr>
        </div>
        {knowledge.type === "video" ? (
          <div className="mt-2">
            <h2 className="text-lg text-gray-600 font-bold">Video</h2>
            {/* TODO: pasarlo a su propio componenet */}
            <div className="video-responsive">
              <ReactPlayer
                url={knowledge.url}
                width="100%"
                height="100%"
                controls
              />
            </div>
            <hr className="mt-4"></hr>
          </div>
        ) : null}
        {knowledge.type === "audio" ? (
          <div className="mt-2">
            <h2 className="text-lg text-gray-600 font-bold">Audio</h2>
            <Player knowledge={knowledge} />
            <hr className="mt-4"></hr>
          </div>
        ) : null}
        <div className="mt-2">
          <h2 className="text-lg text-gray-600 font-bold">Notes</h2>
          <p className="text-gray-900">{knowledge.notes}</p>
          <hr className="mt-4"></hr>
        </div>
      </div>
    </div>
  );
}

export default Knowledge;
