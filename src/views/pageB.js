
import React from 'react';
import { Link } from 'react-router-dom';

class PageB extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    }
  }

  render() {
    return (
      <div className="App">
        <Link to="/pageA">pageA</Link>
        <h1>BBBBBBBBBBBBB</h1>
        <h1>BBBBBBBBBBBBB</h1>
        <h1>BBBBBBBBBBBBB</h1>
        <h1>BBBBBBBBBBBBB</h1>
      </div>
    );
  }
}

export default PageB;
