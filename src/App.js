import React, { Component } from 'react';
import './App.css';
import Header from './Header.js'
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'
import _ from 'lodash'; 
import { DateTime } from "luxon";
import 'react-table/react-table.css'
import ReactTable from "react-table";

ReactChartkick.addAdapter(Chart)

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			month: 'all',
			person: 'all'
		};
		this.changeMonth = this.changeMonth.bind(this);
		this.changePerson = this.changePerson.bind(this);
	}

	changeMonth(event) {
		this.setState({
			month: event.target.value,
			person: 'all' 
		});
	}
	changePerson(selectedOption) {
		this.setState({
			month: 'all',
			person: selectedOption.value
		});
	}
	getChartData( data, limit ){
		let chartData = {};
		let max = 0;
		const iteratableData = ( 'all' === limit ) ? data.months : data.people[ limit ];
		_.each( iteratableData, ( c, m ) => {
			const date = DateTime.fromFormat( m, 'yyyyLL' );	
			const month = date.toISO();  
			const amount = ( 'all' === limit ) ? Object.keys( c ).length : c;

			chartData[ month ] = amount;
			if ( amount > max ){
				max = amount;
			}
		});
		return { chartData, max };
	}
	getTableData( data, limit ){

		if ( 'all' === limit ){
			return _.map( data.people, ( c, p ) => {
				const months = Object.keys( c ).length;
				const total = _.reduce( c, (sum,n) => {
					return sum + n;
				}, 0 );
				const highest = _.reduce( c, (sum,n) => {
					if ( sum > n ) {
						return sum;
					}
					return n;
				}, 0 );
				return { 'name' : p, 'months' : months, 'highest' : highest, 'total': total };
			})
		} else {
			return _.map( data.months[ limit ], (c, p) => {
				return { 'name': p, 'total': c }	
			})
		}

	}
	getTableColumns( limit ){
		let columns = [];
		if ( 'all' === limit ) {
			columns = [{
				'Header' : 'User Name',
				'accessor' : 'name'
			},{
				'Header' : 'Months On Trac',
				'accessor' : 'months'
			},{
				'Header' : 'Most Activity in a Month',
				'accessor' : 'highest'
			},{
				'Header' : 'Total Events',
				'accessor' : 'total'
			}
			]
		} else {
			columns = [{
				'Header' : 'User Name',
				'accessor' : 'name'
			},{
				'Header' : 'Total Events',
				'accessor' : 'total'
			}]
		}
		return columns;
	}

  render( ) {
	let data = this.props.data;
	const { chartData, max } = this.getChartData( data, this.state.person );
	const chartSettings = {
		
	}
	const tableData = this.getTableData( data, this.state.month );
	const columns = this.getTableColumns( this.state.month );
    return (
      <div className="App">
	  	<Header monthChange={this.changeMonth} peopleChange={this.changePerson} data={this.props.data} />
		<main>
			{ 'all' === this.state.month && 
				<LineChart library={ chartSettings } max={max + 10} data={chartData} />
			}
			{ 'all' === this.state.person && 
				<ReactTable
					data={tableData}
					columns={columns}
				/>
			}
		</main>
      </div>
    );
  }
}

export default App;
