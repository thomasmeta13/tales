import React from 'react';

const ScriptView = ({ generatedScript }) => {
  return (
    <div className="script-view-container">
      <h1 className="title">Generated Script</h1>
      <textarea className="generated-script" value={generatedScript} readOnly />
    </div>
  );
};



export default ScriptView;
