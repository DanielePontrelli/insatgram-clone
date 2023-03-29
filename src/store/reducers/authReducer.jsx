import * as actionType from '../actions/handleAuth'; 

const initialState = {
    loading: false,
    error: false,
    token: null,
    userId: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_START:
            return {
                ...state,
                loading: true
            };

        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                token: action.token,
                userId: action.userId
            };

        case actionType.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
            
        case actionType.LOGOUT: 
            return {
                ...state,
                token: null
            }
    
        default:
            return state;
    }
}

export default reducer;