import {FETCH_PEOPLE } from '../actions'; 
const initialState = {};

export default function people(state = initialState, action) {
	switch( action.type ) {
		case FETCH_PEOPLE:
			return action.payload.people;
		default:
		return state;
	}
}
