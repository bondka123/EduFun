import React from 'react';

function ProgressChart({ progress }) {
  return (
    <div>
      <h3>Progression</h3>
      <progress value={progress} max="100" />
    </div>
  );
}

export default ProgressChart;
