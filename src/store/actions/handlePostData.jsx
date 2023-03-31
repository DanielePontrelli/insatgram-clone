import {instaPost} from '../../Axios'; 
import { firebase } from '../../Axios';
const GET_SAVED_POST_IDS = "GET_SAVED_POST_IDS";

const FETCH_POST_DATA_START = "FETCH_POST_DATA_START";
const FETCH_POST_DATA_SUCCESS = "FETCH_POST_DATA_SUCCESS";
const FETCH_POST_DATA_FAIL = "FETCH_POST_DATA_FAIL";

const FETCH_SAVED_POST_START = "FETCH_SAVED_POST_START";
const FETCH_SAVED_POST_SUCCESS = "FETCH_SAVED_POST_SUCCESS";
const FETCH_SAVED_POST_FAIL = "FETCH_SAVED_POST_FAIL";

// FETCH POST DATA
export const fetchPostData =  () => {
    
    return async dispatch => { 
    dispatch(fetchPostDataStart());
    // la richiesta inizia
        try {
            await dispatch(getSavedPostIDs());
            const myData = await instaPost.get();
            // console.log(myData)
            dispatch(fetchPostDataSuccess(myData.data));
        // la richiesta e' stata fatta
        } catch (error) {
            console.log(error);
            dispatch(fetchPostDataFail(error));
            // c'e' stato un errore
        };
        
    };
};


//START DATA
export const fetchPostDataStart = () => {
    return {
        type: FETCH_POST_DATA_START,
    }
}

// SUCCESS DATA
export const fetchPostDataSuccess = (postData) => {
    // console.log('dati da postData', postData)
    return {
        type: FETCH_POST_DATA_SUCCESS,
        postData: postData,
    }
}

//FAIL DATA
export const fetchPostDataFail = (error) => {
    return {
        type: FETCH_POST_DATA_FAIL,
        error: error,
    }
};

// SAVED POST ID
export const getSavedPostIDs = () => {
    return async dispatch => {
       try {
            const response = await firebase.get();       
            const data = response.data;
            // console.log(data)
            const allIDs = [];
            for (let key in data) {
                allIDs.push(data[key].PostId);
            }
            // console.log(allIDs)

            dispatch({
                type: GET_SAVED_POST_IDS,
                savedIDs: allIDs
            })

        } catch (error) {
        console.log(error);
        } 
    }
}

// FETCH SAVED POST
export const fetchSavedPost =  () => {
    return async dispatch => {
        dispatch(fetchSavedPostStart())
        try {
            const response = await firebase.get();
            const PostList = [];
            for (let key in response.data) {
            //   console.log(response.data)  
              PostList.push({ 
                key: key, 
                user: response.data[key].PostUser,
                id: response.data[key].PostId,
                randomNumber: response.data[key].PostRandom,
                picture: response.data[key].PostPicture,
                myPost: response.data[key].MyPost
              })
            }
            dispatch(fetchSavedPostSuccess(PostList))
          } catch (error) {
            console.log(error);
            dispatch(fetchSavedPostFail(error))
          }
        
    };
};

export const fetchSavedPostStart = () => {
    return {
        type: FETCH_SAVED_POST_START
    }
}

export const fetchSavedPostSuccess = (savedPost) => {
    return {
        type: FETCH_SAVED_POST_SUCCESS,
        savedPost: savedPost
    }
}

export const fetchSavedPostFail = (error) => {
    return {
        type: FETCH_SAVED_POST_FAIL,
        error: error
    }
}


// // Save NEW Post
export const saveNewPost = (id, user, token,randomNumber, picture, myPost) => {
    return async (dispatch) => {  
        try {
            const data = await firebase.post(`?auth=${token}`, {
            PostId: id,
            PostUser: user,
            PostRandom: randomNumber,
            PostPicture: picture,
            MyPost: myPost
        });
        await dispatch(getSavedPostIDs());
        console.log('saveNewPost', data);
        } catch (error) {
            console.log(error);
        } 
    }   
}


// CREATE post




export {
    GET_SAVED_POST_IDS,

    FETCH_POST_DATA_START,
    FETCH_POST_DATA_SUCCESS,
    FETCH_POST_DATA_FAIL,
    
    FETCH_SAVED_POST_START,
    FETCH_SAVED_POST_SUCCESS,
    FETCH_SAVED_POST_FAIL
}