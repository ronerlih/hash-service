import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';

const StackDetails = () => {
//   static propTypes = {
//     initialData: PropTypes.object.isRequired
//   };

//   state = this.props.initialData;

    return (
      <div className="StackDetails">
        <ul> Details:
          <li>(server rendering)</li>
        </ul>
      </div>
    );
};

export default StackDetails;