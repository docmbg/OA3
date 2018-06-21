import { combineReducers } from 'redux';
import StageReducer from './reducer_stage';
import AllUsersReducer from './reducer_allUsers';

const rootReducer: any = combineReducers({
    stage: StageReducer,
    users: AllUsersReducer
});

export default rootReducer;
