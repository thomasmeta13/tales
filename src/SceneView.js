// SceneView.js
import React from 'react';

const SceneView = ({ scene1, scene2, scene3, scene4 }) => {
  return (
    <div>
      <h2>Scene 1</h2>
      <p>{scene1}</p>
      <h2>Scene 2</h2>
      <p>{scene2}</p>
      <h2>Scene 3</h2>
      <p>{scene3}</p>
      <h2>Scene 4</h2>
      <p>{scene4}</p>
    </div>
  )
}

export default SceneView;

