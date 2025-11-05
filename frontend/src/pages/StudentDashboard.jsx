import React from 'react';
import BadgeDisplay from '../components/BadgeDisplay';
import ProgressChart from '../components/ProgressChart';

function StudentDashboard() {
  const badges = ['Explorateur', 'Maître du QCM'];
  const progress = 65;

  return (
    <div>
      <h2>Espace Enfant</h2>
      <ProgressChart progress={progress} />
      <BadgeDisplay badges={badges} />
    </div>
  );
}

export default StudentDashboard;
