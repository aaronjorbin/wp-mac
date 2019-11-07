import React, { Component } from 'react';
import { DateTime } from "luxon";
import data from './data';
import _ from 'lodash'; 

class MonthsDropdown extends Component {
  render() {
	let options = _.map( data.months, (d,m) => {
		const date = DateTime.fromFormat( m, 'yyyyLL' );	
		return <option key={ m } value={ m }>{ date.toFormat( 'MMMM yyyy' ) }</option>
	});

	options.unshift( <option key={"yolo"} value={'all'}>All Time</option> );

    return (
		<select onChange={this.props.change}>
			{options}	
		</select>

	)
  }
}

export default MonthsDropdown;
