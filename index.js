// Using Github Repos and trac, let's generate monthly active contributors for core

const { DateTime } = require('luxon');
const got = require('got');
const PQueue = require('p-queue');
const xml2js = require('xml2js');
const fs = require( 'fs' );
const names = require( './name.js' );

const queue = new PQueue({
	concurrency: 1,
	intervalCap: 2,
	interval: 2,
	carryoverConcurrencyCount: true
});
const parser = new xml2js.Parser()
const startDate = DateTime.local( 2003, 4, 1 );
const endDate = DateTime.local();
const data = {
	people : {},
	months : {}
};

let files = [];
let currentDate = startDate;

while( currentDate.toISODate() !== endDate.toISODate() ) {
	const from = currentDate.toLocaleString(DateTime.DATE_SHORT); 
	const url = 'https://core.trac.wordpress.org/timeline?from=' + encodeURIComponent( from ) + '&daysback=0&authors=&milestone=on&ticket=on&ticket_details=on&changeset=on&repo-=on&repo-design=on&repo-tests=on&wiki=on&sfp_email=&sfph_mail=&max=999&update=Update&format=rss';
	const fileName = 'tracData/' + currentDate.toFormat( 'yyyyLLdd' ) + '.xml';
	const since = currentDate.toISO();
	files.push( fileName );

	if ( false === fs.existsSync( fileName ) ) {
		console.log( 'Fetching: ' + since );
		queue.add(() => got( url ).then( response => {
			fs.writeFileSync( fileName, response.body, { encoding:'utf8'} );
		}).catch( err => {
			console.log( 'ERROR' );
			console.log( from );
			console.log( err );	
		}));
	} else {
		console.log( 'Skipped: ' + from );
	}
//*/
	
	currentDate = currentDate.plus({ days: 1 });
}
queue.onIdle().then( () => {
	files.forEach( file => {
		const xml = fs.readFileSync( file ); 
		console.log( 'Reading: ' + file );
		parser.parseString( xml, ( err, result ) => {
			if ( result.rss.channel[0].item ) {
				result.rss.channel[0].item.forEach( events => {
					if ( !  events[ 'dc:creator' ] && ! events[ 'author' ] )
						return;
					// date
					const date = DateTime.fromHTTP( events.pubDate[0] ); 
					const month = date.toFormat( 'yyyyLL' )
					// person
					const name =  events[ 'dc:creator' ] ? events[ 'dc:creator' ][0] : events[ 'author' ][0];
					const person = names.getName( name );

					if ( ! name ) {
						return;
					}

					if ( ! data.months[ month ] ){
						data.months[ month ] = {};
					}
					if ( ! data.months[ month ][ person ] ){
						data.months[ month ][ person ] = 0;
					}
					if ( ! data.people[ person ] ) {
						data.people[ person ] = {};
					}
					if ( ! data.people[ person ][ month ] ){
						data.people[ person ][ month ] = 0
					}
					data.months[ month ][ person ]++;
					data.people[ person ][ month ]++;
				});
			}
		});
	});
	fs.writeFileSync( 'src/data.json', JSON.stringify( data ), { encoding:'utf8'}  ); 
});
