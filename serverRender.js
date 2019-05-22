import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';
import StackDetails from './src/components/StackDetails';

import config from './config';
import axios from 'axios';
import { runInNewContext } from 'vm';

const getApiUrl = () => {
  console.log(`URL: ${config.serverUrl}/api/initial-data`)
    return `${config.serverUrl}/api/initial-data`;
};

const getInitialData = (apiData) => {
    return apiData;
};

const serverRender = () =>
  {
    return axios.get(getApiUrl())
    .then(resp => {
        console.log(`resp.data: ${JSON.stringify(resp.data)}`)
        const initialData = getInitialData(resp.data);
        return {
          initialMarkup: ReactDOMServer.renderToString(
            <App initialData={initialData} />
        ),
          initialData
      };
    })
  .catch((err) => {throw err;});
};

export default serverRender;
