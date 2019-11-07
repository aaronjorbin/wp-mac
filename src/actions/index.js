export const FETCH_DATE = 'FETCH_DATE';
export const FETCH_PEOPLE = 'FETCH_PEOPLE';
export const ACTIVE_DATE = 'ACTIVE_DATE';
export const ACTIVE_PEOPLE = 'ACTIVE_PEOPLE';


export const activeDate = () => {

}

export const fetchDate =  () => {
	return dispatch => {
		fetch( '/data.json' )
			.then( response => response.json() )
			.then( data => {
				dispatch({  
					type: FETCH_DATE,
					payload: data
				})
			});
	}
}

export const fetchPeople =  () => {
	return dispatch => {
		fetch( '/data.json' )
			.then( response => response.json() )
			.then( data => {
				dispatch({  
					type: FETCH_PEOPLE,
					payload: data
				})
			});
	}
}
