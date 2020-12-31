import React from 'react';
import ReactDom from 'react-dom';
import { Button, Switch } from 'antd';

import './common/css/normalize.less';

const Div = document.createElement('div');

Div.setAttribute('id', 'root');

document.body.appendChild(Div);

ReactDom.render(
    <div>
        <h1>hello, world!</h1>
        <Button type="primary">Primary</Button>
        <Switch defaultChecked />
        <br />
    </div>,
    document.getElementById('root')
);
