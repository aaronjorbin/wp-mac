import React, { Component } from 'react';
import './App.css';
import MonthsDropdown from './MonthsDropdown.js';
import PeopleDropdown from './PeopleDropdown.js';
import data from './data';
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'
import _ from 'lodash'; 
import { DateTime } from "luxon";
import 'react-table/react-table.css'
import ReactTable from "react-table";

ReactChartkick.addAdapter(Chart)

class App extends Component {
  render() {
	let chartData = {};
	_.each( data.months, ( c, m ) => {
		const date = DateTime.fromFormat( m, 'yyyyLL' );	
		const month = date.toISO();  
		const count = Object.keys( c ).length;

		chartData[ month ] = count;
	});
	const chartSettings = {
		
	}
	const tableData = _.map( data.people, ( c, p ) => {
		const months = Object.keys( c ).length;
		return { 'name' : p, 'months' : months };
	})
	const columns = [{
		'Header' : 'User Name',
		'accessor' : 'name'
	},{
		'Header' : 'Months On Trac',
		'accessor' : 'months'
	}]
    return (
      <div className="App">
        <header className="App-header">
		  <MonthsDropdown />
		  <PeopleDropdown />
        </header>
		<main>
			<LineChart library={ chartSettings } max={600} data={chartData} />
			<ReactTable
			    data={tableData}
				columns={columns}
		    />
		</main>
      </div>
    );
  }
}

export default App;
