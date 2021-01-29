/**
 * 非业务底层扩展封装
 */
import { createAction, handleAction, handleActions as originalHandleActions, combineActions } from 'redux-actions';
import Loadable from 'react-loadable';
import qs from 'qs';
import axios from 'axios';
import { message as mesAntd } from 'antd';
import loading from './loading';
import ComLoading from './components/ComponentLoading';

const getCodeFromUrl = (url) => {
    const pathExp = '#/app/(\\w+)/';
    const realUrl = encodeURI(url);
    const resultArray = realUrl.match(pathExp);
    if (resultArray !== null) {
        return resultArray[1] || '';
    }
    return '';
};
// ajax 统一配置
axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

const instance = axios.create({
    method: 'get',
    baseURL: '',
    timeout: 0,
    responseType: 'json',
    withCredentials: true,
    crossDomain: true,
});

const handleWithParameter = function (url, { method = 'GET', contentType = 'application/json; charset=UTF-8', params = {}, data = {} }) {
    const { headers } = instance.defaults;
    instance.defaults.headers = {
        ...headers,
        'Content-Type': contentType,
        'X-Requested-With': 'XMLHttpRequest',
        'x-portal-resource-code': getCodeFromUrl(window.location.href),
    };

    // url替换参数
    let urlNew = url;
    const strParams = [];
    const paramsNew = { ...params };
    /*eslint-disable*/
    for (const key in params) {
        const reg = new RegExp(`:${key}`, 'g');
        if ({}.hasOwnProperty.call(params, key) && reg.test(urlNew)) {
            urlNew = urlNew.replace(reg, params[key]);
            delete paramsNew[key];
        } else {
            strParams.push(`${key}=${params[key]}`);
        }
    }

    switch (method.toLowerCase()) {
        case 'get':
            return instance.get(urlNew, { params: paramsNew });
        case 'delete':
            return instance.delete(urlNew, { params: paramsNew, data });
        case 'post':
            return instance.post(urlNew, data, { params: strParams.length > 0 ? paramsNew : {} });
        case 'put':
            return instance.put(urlNew, qs.stringify(data), { params: strParams.length > 0 ? paramsNew : {} });
        default: {
            const res = {
                then: (resolve) =>
                    resolve({
                        statusCode: 300,
                        message: 'method方式错误',
                    }),
            };
            return Promise.resolve(res);
        }
    }
};

/*
 * pre: ajax提交前
 * success: ajax连接成功返回正确结果后
 * error: ajax连接成功返回错误结果后
 * fail: ajax连接失败（网络错误）
 * always: ajax无论成功与失败都要执行
 */
const suffix = ['pre', 'success', 'error', 'fail', 'always'];

// 初始化工程中的所有state
const projectInitState = 'PROJECT_INIT_STATE_PUBLIC';

// 增强createActions, 可以配置{}
const createActions = function (actionMap) {
    const eventNames = Object.keys(actionMap);
    const fnsMap = {
        projectInit: createAction(projectInitState),
    };
    eventNames.forEach((eventName) => {
        const configOrFn = actionMap[eventName];
        if (typeof configOrFn !== 'function') {
            const config = { method: 'GET', actionType: 'hasNotConfigActionType', ...configOrFn };
            fnsMap[eventName] = (settings = {}) => (dispatch) => {
                // const loading = require('loading').default
                // const dialog = require('dialog').default

                if ((config.hasLoading || config.hasLoading === undefined) && !loading.getLoadingStatus()) loading.show();

                dispatch(createAction(`${config.actionType}_PRE`)(settings));
                return handleWithParameter(config.url, {
                    ...settings,
                    ...config,
                })
                    .then((res) => {
                        loading.hide();
                        const { code, message, result } = res.data;
                        const params = res.config.params === undefined ? res.config.data : res.config.params;
                        const dt = qs.parse(params);

                        let data = {};
                        // 是否需要接口传递的参数
                        if (config.needFormData) {
                            data = { data: res };
                        } else {
                            data = res.data.result === undefined ? { ...res.data, data: dt } : res.data;
                        }

                        // always只有在成功时才返回数据，非200或异常都不返回数据
                        if (code === 200) {
                            dispatch(createAction(`${config.actionType}_SUCCESS`)(data.result));
                            dispatch(createAction(`${config.actionType}_ALWAYS`)(data.result));
                            return res.data;
                        }

                        if (config.handleError || config.handleError === undefined) {
                            if (code === 10013 || code === 10032) {
                                //10013-cookie超时，重新登录
                                // 10032-非法请求，无权限
                                location.replace(`${result}`);
                            } else {
                                mesAntd.error(message);
                            }
                        }

                        dispatch(createAction(`${config.actionType}_ERROR`)(message));
                        dispatch(createAction(`${config.actionType}_ALWAYS`)());

                        return res.data;
                    })
                    .catch((error) => {
                        loading.hide();
                        if (error.response) {
                            dispatch(createAction(`${config.actionType}_FAIL`)());
                            dispatch(createAction(`${config.actionType}_ALWAYS`)());
                            // mesAntd.error(`${error.response.statusText}😂！`)
                            mesAntd.error('请求异常，请重试！');
                            return {
                                code: error.response.status,
                                message: error.response.statusText,
                            };
                        } else {
                            // mesAntd.error(`${error.message}！${error.stack}!`)
                            mesAntd.error(`网络超时，请重试！`);
                        }

                        return {
                            code: 500,
                            message: error.message,
                        };
                    });
            };
        } else {
            fnsMap[eventName] = configOrFn;
        }
    });
    return fnsMap;
};

// 增强handleActions，可以配置{}
const handleActions = function (reducerMap, defaultState) {
    const result = { ...reducerMap };
    Object.keys(result).forEach((actionType) => {
        const fnOrObject = result[actionType];
        if (fnOrObject && typeof fnOrObject !== 'function') {
            delete result[actionType];
            const keys = Object.keys(fnOrObject);
            // 补充没有的默认配置
            suffix.forEach((str) => {
                if (!keys.includes(str)) {
                    keys.push(str);
                    fnOrObject[str] = (state) => state;
                }
            });

            keys.forEach((suffixAction) => {
                result[`${actionType}_${suffixAction.toUpperCase()}`] = fnOrObject[suffixAction];
            });
        }
    });

    result[projectInitState] = function () {
        window.localStorage.clear();
        return defaultState;
    };

    return originalHandleActions(result, defaultState);
};

// 懒加载组件
const lazyload = (importUrl) =>
    Loadable({
        loading: ComLoading,
        loader: () => importUrl,
    });

export { createAction, createActions, handleAction, originalHandleActions, handleActions, combineActions, lazyload, getCodeFromUrl };
