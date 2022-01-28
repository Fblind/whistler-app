// TODO: api client project (check sos-patita)
import config from "./config";

function postParser({ url }) {
  return fetch(`${config.apiUrl}/parser`, {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

function getKnowledges() {
  return fetch(`${config.apiUrl}/knowledges`).then(handleResponse);
}

function getKnowledgeById(id) {
  return fetch(`${config.apiUrl}/knowledges/${id}`).then(handleResponse);
}

function postKnowledge({ knowledge }) {
  return fetch(`${config.apiUrl}/knowledges`, {
    method: "POST",
    body: JSON.stringify(knowledge),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

function getTags() {
  return fetch(`${config.apiUrl}/tags`).then(handleResponse);
}

function postTag({ tag }) {
  return fetch(`${config.apiUrl}/tags`, {
    method: "POST",
    body: JSON.stringify(tag),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

async function throwErrors(response) {
  const responseBody = await response.json();
  throw responseBody;
}

async function handleResponse(response) {
  if (!response.ok) {
    return await throwErrors(response);
  }
  return await response.json();
}

export {
  postParser,
  getKnowledges,
  getKnowledgeById,
  postKnowledge,
  getTags,
  postTag,
};
