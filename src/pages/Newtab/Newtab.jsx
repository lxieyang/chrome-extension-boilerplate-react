import React, { Component } from 'react';
import './Newtab.css';

class Newtab extends Component {
  state = {
    reactVersion: '16.12',
    webpackVersion: '4',
  };
  render() {
    const { reactVersion, webpackVersion } = this.state;

    return (
      <div className="NewtabContainer">
        <p>This is the new tab page.</p>
        <p>
          It uses{' '}
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React {reactVersion}
          </a>{' '}
          and{' '}
          <a
            href="https://webpack.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Webpack {webpackVersion}
          </a>
          .
        </p>
      </div>
    );
  }
}

export default Newtab;
