import React, { Component } from 'react';
import icon from '../../assets/img/icon-128.png';

import { set, get } from './../../storage';

class SetterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    chrome.storage.sync.set({ 2: 'test' }, function () {
      console.log('Value is set to ' + 'test');
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    set(1, this.state.value);
    alert('A name was submitted: ' + (await get(1)));
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SetterComponent;
