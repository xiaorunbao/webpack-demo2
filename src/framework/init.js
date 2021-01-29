import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { createHashHistory } from 'history';
import store from './store';
import RootRoutesView from '../components/root';

// 初始化工程
const projectInit = function (oContainer, callback = () => {}) {
    const history = createHashHistory();

    ReactDOM.render(
        <Provider store={store}>
            <Router hashHistory={history}>
                <RootRoutesView />
            </Router>
        </Provider>,
        oContainer,
        callback
    );
};

export default projectInit;
