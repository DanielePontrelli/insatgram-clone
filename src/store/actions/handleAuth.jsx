import Axios from 'axios';
const AUTH_START = "AUTH_START";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_FAIL = "AUTH_FAIL";
const LOGOUT = "LOGOUT";



export const auth = (email, password, isSignup) => {
    return async dispatch => {
        dispatch(authStart());
        try {
            // console.log(email, password)
            const key = 'AIzaSyCwltygHqPLg93sm3VhHasFgE_9TxEjRk0' // firebase -> ingranaggio panoramica del progetto -> impostazioni progetto -> Chiave API web
            let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`

            if (!isSignup) {
                url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
            }
            const response = await Axios.post(url, {
            email,
            password,
            returnSecureToken: true,
            })
            console.log(response.data);
            localStorage.setItem('token', response.data.idToken); //per salvare i dati nel proprio browser
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data));
        } catch (error) {
            dispatch(authFail(error));
            console.log(error)
        }
        
    }
};

export const authStart = () => {
    return {
        type: AUTH_START
    }
}

export const authSuccess = (userData) => {
    return {
        type: AUTH_SUCCESS,
        token: userData.idToken,
        userId: userData.localId
    }
}

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    }
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return{
        type: LOGOUT,
    }
}

export const authCheck = () => { // il ceck si fa al refresh della pagina quindi si inserisce questa funzione in app.jsx
    return dispatch => {
        const idToken = localStorage.getItem('token');
        if (!idToken) {
            return;
        }
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess({idToken, localId: userId}))
    }
}

export {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    LOGOUT
};