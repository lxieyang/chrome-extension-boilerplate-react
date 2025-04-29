import React from 'react';
import './Panel.css';

var links = [
  { endpoint: '/america' },
  { endpoint: '/canada' },
  { endpoint: '/norway' },
  { endpoint: '/bahamas' }
]

const Panel: React.FC = () => {


  const listItems = links.map((link) =>
    <li key={link.endpoint}>{link.endpoint}</li>
  );

  return (
    <div className="container">
      <h1>Dev Tools Panel v1</h1>
      <p>Riky</p>
      <ul>
        {listItems}
      </ul>
    </div>
  );
};

export default Panel;
