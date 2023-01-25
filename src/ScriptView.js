import React from 'react';
import './index.css';

const ScriptView = ({ generatedScript, part1, part2, part3, part4, image1 }) => {
  return (
    <div className="script-view-container">
      <h1 className="title">Generated Script</h1>
      <textarea className="generated-script" value={generatedScript} readOnly cols="50" rows="20"/>
      <div className="parts-container">
        <p>{part1}</p>
        <p>{part2}</p>
        <p>{part3}</p>
        <p>{part4}</p>    
      </div>
      <h1 className="title">Generated Images</h1>
      <img src={image1} alt="part1" />
    </div>
  );
};



export default ScriptView;
