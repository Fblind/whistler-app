import React from "react";

function Player({ knowledge }) {
  return knowledge.embed ? (
    <div dangerouslySetInnerHTML={{ __html: knowledge.embed }}></div>
  ) : null;
}

export { Player };
