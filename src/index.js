import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const {remote} = window.require('electron')
remote.require('electron-context-menu')({ showInspectElement: true })

registerServiceWorker();

function render(Component) {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    render(NextApp);
  })
}
