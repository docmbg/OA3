import { combineReducers } from 'redux';
import StageReducer from './reducer_stage';

const rootReducer: any = combineReducers({
    stage: StageReducer,
});

export default rootReducer;
