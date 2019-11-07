import { combineReducers } from 'redux';
import date from './date.js'; 
import people from './people.js'; 

const rootReducer = combineReducers({
	date,
	people,
});

export default rootReducer;
