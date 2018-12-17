const nameMap = {
	'saxmatt' : 'matt',
	'emc3' : 'dougal',
	'rboren' : 'ryan',
	'alex_t_king' : 'alexkingorg',
	'helenyhou' : 'helen',
};

const bots = {
	'bumpbot' : true,
	'potbot' : true,
	'slackbot' : true,
};

const getName = function( name ) {
	name = name.toLowerCase();

	if ( bots[ name ] )
		return false;
	if ( nameMap[ name ] )
		return nameMap[ name ];
	return name;
}


module.exports = { getName }
