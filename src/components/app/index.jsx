import config from '../../config';
import { lazyload } from '../../framework';
import { React, Redirect, Route, Switch } from '../../framework/Util';

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
