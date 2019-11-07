import React, { Component } from 'react';
import MonthsDropdown from './MonthsDropdown.js';
import PeopleDropdown from './PeopleDropdown.js';
import { Link } from "react-router-dom";

export default class Header extends Component {
	render() { 
		return (
			<nav>
			  <MonthsDropdown change={this.props.monthChange} />
			  <PeopleDropdown change={this.props.peopleChange} data={this.props.data} />
			  <ul>
				<li>
				  <Link to="/">all</Link>
				</li>
				<li>
				  <Link to="/min10">Min10</Link>
				</li>
			  </ul>
			</nav>
		)
	}
}
