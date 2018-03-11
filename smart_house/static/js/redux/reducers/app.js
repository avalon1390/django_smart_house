
//states
let initialState = [];
// REDUCER
export default function sensorsData(state = initialState, action) {
  if (action.type == 'ADD_RECORD') {
    return [
      ...state,
      action.payload
    ];
  }
  else if (action.type == 'CLEAR_RECORD') {
    return [action.payload];
  }
  else{
  return state;
  }

}
