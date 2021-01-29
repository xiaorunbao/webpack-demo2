/**
 * 功能：受限组件入口
 */
import { React, Route, Redirect, Switch } from '../../framework/Util';
import config from '../../config';
import { lazyload } from '../../framework';

function App() {
    return (
        <div id="chief">
            <Switch>
                <Route path={config.url.app.first.path} component={lazyload(import('../../first/components'))} />
                <Redirect to={config.url.app.first.path} />
            </Switch>
        </div>
    );
}

export default App;
