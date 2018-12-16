import React, { Component } from 'react';
import { DateTime } from "luxon";
import data from './data';
import _ from 'lodash'; 

class MonthsDropdown extends Component {

  render() {
	const options = _.map( data.months, (d,m) => {
		const date = DateTime.fromFormat( m, 'yyyyLL' );	
		return <option key={ m } value={ m }>{ date.toFormat( 'MMMM yyyy' ) }</option>
	});

    return (
		<select>
			{options}	
		</select>

	)
  }
}

export default MonthsDropdown;
