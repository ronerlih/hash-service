import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';

class App extends React.Component {
  static propTypes = {
    initialData: PropTypes.object.isRequired
  };

  state = this.props.initialData;

  render() {
    return (
      <div className="App">
        <ul>
          {Object.entries(this.state.items).map(([itemId, item]) =>
            <li key={itemId}>{item.title}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
