import axios from 'axios';

export function setLoading(){
    return{
        type: 'SET_LOADING'
    }
};

export function getDogs(){
    return async function(dispatch){
        dispatch(setLoading());
        var res = await axios.get('http://localhost:3001/dogs', []);

        return dispatch({
            type: 'GET_DOGS',
            payload: res.data
        })
    }
};

export function getByName(name){
    return async function(dispatch){
        try {
            var res = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            
            return dispatch({
                type: 'GET_BY_NAME',
                payload: res.data
            })
        } catch (error) {
            alert('Dog name not exist');
        }
    }
};

export function getDetails(id){
    return async function(dispatch){
        try {
            var det = await axios.get(`http://localhost:3001/dogs/${id}`)
            
            return dispatch({
                type: 'GET_BY_ID',
                payload: det.data
            })
        } catch (error) {
            alert('Dog not found')
        }
    }
};
export function resetDetails(){
    return function(dispatch){
        dispatch({
            type: 'RESET_ID',
            payload: ""
        })
    }
};

export function getTemperaments(){
    return async function(dispatch){
        try {
            var theTemp = await axios.get('http://localhost:3001/temperament');

            return dispatch({
                type: 'GET_TEMPERAMENTS',
                payload: theTemp.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};
export function selectData(data){
    return function(dispatch){
        dispatch({
            type: 'SELECT_DATA',
            payload: data
        })
    }
};
export function resetPage(){
    return function(dispatch){
        dispatch({
            type: 'RESET_PAGE',
            payload: 1
        })
    }
};
export function orderDogs(order){
    return function(dispatch){
        dispatch({
            type: 'ORDER_DOGS',
            payload: order
        })
    }
};
export function filterTemperament(payload){
    return function(dispatch){
        dispatch({
            type: 'ORDER_TEMPERAMENT',
            payload
        })
    }
};