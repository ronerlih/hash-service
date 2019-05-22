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
          {<li> server rendering, for disabled javascript mode (for google collection and other bots)</li>}
        </ul>
      </div>
    );
};

export default StackDetails;