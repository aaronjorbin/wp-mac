import {FETCH_DATE } from '../actions'; 
const initialState = {};

export default function date(state = initialState, action) {
	switch( action.type ) {
		case FETCH_DATE:
			return action.payload.months;
		default:
		return state;
	}
}
