import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import StackDetails from './StackDetails';

class App extends React.Component {
  static propTypes = {
    initialData: PropTypes.object.isRequired
  };

  state = this.props.initialData;

  render() {
    return (
      <div className="App">
        <ul>
          {console.log(this.state)}
          {<h4>{this.state.headline}</h4>}
          {<ul> data: {this.state.data}</ul>}
        </ul>

        <StackDetails />
      </div>
    );
  }
}

export default App;
