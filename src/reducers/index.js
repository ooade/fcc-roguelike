import { combineReducers } from 'redux';
import gameReducers from './game_reducers';

const rootReducer = combineReducers({
  game: gameReducers
});

export default rootReducer;
