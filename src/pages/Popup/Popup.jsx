import React, { Component } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import Setter from '../../containers/Setter/Setter';
import './Popup.css';

// const Popup = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/pages/Popup/Popup.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React!
//         </a>
//       </header>
//       <Setter />
//       <Greetings />
//     </div>
//   );
// };

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

    chrome.storage.sync.get('data', function (items) {
      if (Object.keys(items).length > 0) {
        this.setState({ data: items.data });
        console.log(this.state);
      }
    }.bind(this));
  }

  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }

  // async handleSubmit(event) {
  //   set(1, this.state.value);
  //   alert('A name was submitted: ' + (await get(1)));
  //   event.preventDefault();
  // }

  render() {
    console.log('render');
    console.log(this.state)
    const listItems = this.state.data.map((redo) => <li>{redo.uri}</li>);
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Changed here
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

export default Popup;
