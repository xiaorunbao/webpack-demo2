/**
 * 功能： loading视图
 */

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Loading from '../components';

const mapStateToProps = (state) => state.loading;
const selector = createSelector([mapStateToProps], (loadingState) => ({
    ...loadingState,
}));

export default connect(selector)(Loading);
