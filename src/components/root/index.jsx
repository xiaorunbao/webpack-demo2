/**
 * 功能：根组件
 */

import { React, Route, Redirect, Switch, hot } from 'framework/Util';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import config from 'conf';
import Dialog from '../../framework/dialog/container';
import Loading from '../../framework/loading/container';
import { lazyload } from '../../framework';

const { url } = config;
const MainAppView = lazyload(import('../app'));
const NotFindView = lazyload(import('../error'));

const RootRoutesView = function () {
    return (
        <ConfigProvider locale={zhCN}>
            <div className="containerchild">
                <Switch>
                    <Route path={url.root} exact render={() => <Redirect to={url.app.root.path} />} />
                    <Route path={url.app.root.path} component={MainAppView} />
                    <Route component={NotFindView} />
                </Switch>
                <Dialog />
                <Loading />
            </div>
        </ConfigProvider>
    );
};

export default hot(module)(RootRoutesView);
