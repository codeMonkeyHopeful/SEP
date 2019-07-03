import React, { Component } from 'react';

export class Navbar extends Component {
  render() {
    return (
      <div>
        <button onClick={console.log('clicked HOME')}>
          <span>Home</span>
        </button>
        <button>
          <span>Students</span>
        </button>
      </div>
    );
  }
}

export default Navbar;
