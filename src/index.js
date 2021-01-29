import './common/css/normalize.less';
import projectInit from './framework/init';

projectInit(document.querySelector('#container'), () => {
    console.log('工程初始化完成！！');
});
