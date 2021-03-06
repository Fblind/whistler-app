import React, { useState, useEffect } from "react";
import { getKnowledges } from "../api-client";
import KnowledgeCard from "../components/KnowledgeCard";
import KnowledgeSearch from "../components/KnowledgeSearch";
import "./Knowledges.css";

function Knowledges() {
  const [knowledges, setKnowledges] = useState([]);
  const [allKnowledges, setAllKnowledges] = useState([]);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getKnowledges().then((knowledges) => {
      setKnowledges(knowledges);
      setAllKnowledges(knowledges);
      const knowledgesTopics = knowledges
        .map((k) => k.tags)
        .reduce((accum, t) => accum.concat(t), []);
      const _topics = [...new Set(knowledgesTopics)];
      setTopics(_topics);
    });
  }, []);

  const handleTopicClick = (topic) => {
    const newKnowledges = allKnowledges.filter((kb) => kb.tags.includes(topic));
    setKnowledges(newKnowledges);
  };

  const resetKnowledges = () => {
    setKnowledges(allKnowledges);
  };

  return (
    <div className="mt-6 w-full px-4">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Directory</h1>
        <a
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded shadow"
          href="/parser"
        >
          Add
        </a>
      </div>
      <KnowledgeSearch className="mb-6" knowledges={knowledges} />
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-lg text-gray-600 font-bold">Topics</h2>
        <button
          className="text-indigo-600 text-sm cursor-pointer"
          onClick={resetKnowledges}
        >
          View all
        </button>
      </div>
      <TopicCarousel
        topics={topics}
        onTopicClick={handleTopicClick}
      ></TopicCarousel>
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-lg text-gray-600 font-bold">Recents</h2>
        <button className="text-indigo-600 text-sm">View all</button>
      </div>
      {knowledges.map((knowledge) => {
        return <KnowledgeCard key={knowledge.title} knowledge={knowledge} />;
      })}
    </div>
  );
}

export default Knowledges;

function Carousel({ children }) {
  return (
    <section className="mb-6 overflow-x-scroll pb-6 flex">{children}</section>
  );
}

function TopicCarousel({ topics, onTopicClick }) {
  const getRandom = (list) => {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
  };
  const TopicTag = (topic) => {
    const colors = ["red", "blue", "pink", "yellow", "green"];
    const color = getRandom(colors);
    return (
      <div
        key={topic}
        className="shadow-lg rounded-lg mr-2 inline-block cursor-pointer"
        onClick={() => onTopicClick(topic)}
      >
        <div className="m-w-24 h-24 p-2 flex flex-col justify-between">
          <div className={`w-3 h-3 bg-${color}-600 rounded-full`}></div>
          <p className="text-gray-900 font-bold">{topic}</p>
        </div>
      </div>
    );
  };
  return <Carousel>{topics.map((topic) => TopicTag(topic))}</Carousel>;
}
