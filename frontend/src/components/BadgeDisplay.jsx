import React from 'react';

function BadgeDisplay({ badges }) {
  return (
    <div>
      <h3>Badges</h3>
      <ul>
        {badges.map((badge, i) => <li key={i}>{badge}</li>)}
      </ul>
    </div>
  );
}

export default BadgeDisplay;
