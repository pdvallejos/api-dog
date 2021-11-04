const initialState = {
    allDogs:[],
    oneDogs:[],
    Temperaments:[],
    detail:[],
    loading:false,
    data: '',
    filterTemp: ""
};
function rootReducer(state = initialState, action){

    switch(action.type){

        case 'SET_LOADING':
            return{
                ...state,
                loading:true
            };
        case 'GET_DOGS':
            return{
                ...state,
                loading:false,
                allDogs: action.payload,
                oneDogs: action.payload
            };
        case 'GET_BY_NAME':
            return{
                ...state,
                oneDogs: action.payload
            };
        case 'GET_BY_ID':
            return{
                ...state,
                detail: action.payload,
                loading: false
            };
        case 'RESET_ID':
            return{
                ...state,
                detail: action.payload
            };
        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                Temperaments: action.payload
            };
        case 'SELECT_DATA':
            return{
                ...state,
                data: action.payload
            };
        case 'RESET_PAGE':
            return{
                ...state,
                payload: 1
            };
            // eslint-disable-next-line
        case 'ORDER_DOGS':{
            if (action.payload === 'AZ') return { ...state, oneDogs: [...state.oneDogs].sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1)}
            else if (action.payload === 'ZA')return {...state, oneDogs: [...state.oneDogs].sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? -1 : 1)}
            else if (action.payload === 'High') return {...state, oneDogs: [...state.oneDogs].sort((d1, d2) => d1.weight.slice(-2) > d2.weight.slice(-2) ? -1 : 1)}
            else if (action.payload === 'Low') return {...state, oneDogs: [...state.oneDogs].sort((d1, d2) => d1.weight.slice(0, 3) > d2.weight.slice(0, 3) ? 1 : -1)}
            break
            };
        case 'ORDER_TEMPERAMENT':{
            let Total = state.allDogs;
            const maping = Total.map( g => {
                return {...g, temperament: g.temperament}
            })
            const filtro = action.payload === 'All' ? Total : maping.filter( e => {
                return e.temperament?.includes(action.payload) // hago el filtro por cada genero que se elija en la opcion del select
            })
            return {
                ...state,
                oneDogs: filtro
            }
        }
            
        default:
            return state
    }
}

export default rootReducer;