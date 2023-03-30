import axios from "axios";

const firebase = axios.create({
    baseURL: "https://instagram-clone-103f2-default-rtdb.firebaseio.com/postData.json"            
})

const instaPost = axios.create({
    baseURL: "https://randomuser.me/api/0.8/?results=51"
})

export {
    firebase,
    instaPost,
}