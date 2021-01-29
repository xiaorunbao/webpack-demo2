/**
 * 非业务底层无扩展封装
 */
// 公共js
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import pathToRegExp from 'path-to-regexp';
import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { NavLink, Link, HashRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { createSelector } from 'reselect';
import { AppContainer, hot } from 'react-hot-loader';
import Helper from '../common';
import PureComponent from './base/ReactComponentBase';

const noop = function () {};

const EmptyComponent = () => null;

export {
    axios,
    classNames,
    Helper,
    React,
    ReactDOM,
    PropTypes,
    PureComponent,
    Immutable,
    pathToRegExp,
    combineReducers,
    connect,
    createSelector,
    Router,
    Route,
    withRouter,
    NavLink,
    Link,
    Redirect,
    Switch,
    AppContainer,
    hot,
    noop,
    EmptyComponent,
};
