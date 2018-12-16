import React, { Component } from 'react';
import data from './data';
import _ from 'lodash'; 

class PeopleDropdown extends Component {

  render() {
	const options = _.map( data.people, (d,p) => {
		return <option key={ p } value={ p }>{ p }</option>
	});

    return (
		<select>
			{options}	
		</select>

	)
  }
}

export default PeopleDropdown;
