import React, { Component } from 'react';
import Select from 'react-select';
import _ from 'lodash'; 

class PeopleDropdown extends Component {
  render() {
	const options = _.map( this.props.data.people, (d,p) => {
		return { value: p, label: p };
	});

	options.unshift( { value: 'all', label: 'All Contributors' } );

    return (
		<Select onChange={this.props.change} options={options} />
	)
  }
}

export default PeopleDropdown;
