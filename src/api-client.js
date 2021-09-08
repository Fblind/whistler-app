// TODO: api client project
import config from "./config";

function postParser({ url }) {
  return fetch(`${config.apiUrl}/parser`, {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
}

function getKnowledges() {
  return fetch(`${config.apiUrl}/knowledges`).then((r) => r.json());
}

function getKnowledgeById(id) {
  return fetch(`${config.apiUrl}/knowledges/${id}`).then((r) => r.json());
}

function postKnowledge({ knowledge }) {
  return fetch(`${config.apiUrl}/knowledges`, {
    method: "POST",
    body: JSON.stringify(knowledge),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
}

export { postParser, getKnowledges, getKnowledgeById, postKnowledge };
