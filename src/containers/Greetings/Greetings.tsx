import React from 'react';
import icon from '../../assets/img/icon-128.png';

export const Greetings = () => {
  const state = {
    name: 'dev',
  };

  return (
    <div>
      <p>Hello, {state.name}!</p>
      <img src={icon} alt="extension icon" />
    </div>
  );
};
