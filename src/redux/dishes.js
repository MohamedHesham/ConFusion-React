import * as ActionTypes from './ActionTypes';

export const Dishes = (state = {
    isLoading: true, //true because dishes is an empty array
    errMess: null, //if fetching didn't work
    dishes: [] //filled by addDishes
    }, action) =>
{
    switch(action.type){
        case ActionTypes.ADD_DISHES:
            return{...state, isLoading:false, errMess: null, dishes: action.payload} // still immutable

        case ActionTypes.DISHES_LOADING:
            return{...state, isLoading:true, errMess: null, dishes: []} // still immutable
            
        case ActionTypes.DISHES_FAILED:
            return{...state, isLoading:false, errMess: action.payload, dishes: []} // still immutable
            
        default:
            return state;
    }
}