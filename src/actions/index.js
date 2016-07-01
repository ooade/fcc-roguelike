import { CREATE_BOULDERS } from './types';

export function createBoulders(id) {
  return {
    type: CREATE_BOULDERS,
    floor: id
  };
}

export function fillFloor() {
  return { type: 'FILL_FLOOR' };
}

export function testState(test) {
  return { type: 'TEST_STATE', test };
}
