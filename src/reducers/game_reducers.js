import { CREATE_BOULDERS } from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  floor: [], // Fill the Floor
  test: []
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'FILL_FLOOR':
      return { ...state, floor: _.fill(Array(2500), 1) }
    case CREATE_BOULDERS:
      return { ...state, floor: action.floor };
    case 'TEST_STATE':
      console.log("testing...", state);
      return _.uniqBy([ ...state, action.test ], 'id');
  }

  return state;
}
