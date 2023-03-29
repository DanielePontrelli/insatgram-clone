import * as actionType from '../actions/handlePostData';

const initialState = {
    postData: [],
    savedIDs: [],
    loading: false,
    error: false,
    savedPost: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        //fetch post data
        case actionType.FETCH_POST_DATA_START:
            return {
                ...state,
                loading: true
            };

        case actionType.FETCH_POST_DATA_SUCCESS:
            // console.log('DATI REDUCER:', action.postData);
            
            return {
                ...state,
                postData: action.postData,
                loading: false,
                error: false
            };
            

        case actionType.FETCH_POST_DATA_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }

        // fetch saved post
        case actionType.FETCH_SAVED_POST_START:
            return {
                ...state,
                loading: true
            };
    
        case actionType.FETCH_SAVED_POST_SUCCESS:
            return {
                ...state,
                savedPost: action.savedPost,
                loading: false,
                error: false
            };
    
        case actionType.FETCH_SAVED_POST_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }


            
        case actionType.GET_SAVED_POST_IDS:
            return {
                ...state,
                savedIDs: action.savedIDs
            }    
    
        default:
            return state;
    }
}

export default reducer;