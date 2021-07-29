import { Button } from 'antd';
import { React } from '../../framework/Util';
import './style/index.less';

function MyFirst() {
    return (
        <div className="hello">
            <Button>test my planet</Button>
        </div>
    );
}

MyFirst.propTypes = {};

MyFirst.defaultPorps = {};

export default MyFirst;
