import { useEffect} from 'react';
import Message from '../components/Message';
import { useSelector, useDispatch } from "react-redux";
import {fetchSavedPost} from '../store/actions/handlePostData';
import styles from '../style/MyProfile.module.css';
import { useNavigate } from "react-router-dom";

import { CreatePost } from "../components/CreatePost";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function MyProfile() {

  const postData = useSelector(state => state.postReducer.savedPost);
  const loading = useSelector(state => state.postReducer.loading);
  const error = useSelector(state => state.postReducer.error);

  const token = useSelector(state => state.authReducer.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSavedPost());
  }, []);  
  
  
  // creare postcd
let click = false;  
const [isOpen, setIsOpen] = useState(click)


  const renderPostItem = (post) => {
    console.log(post)
    return (
        <div key={post.id} className={styles.container} >
          <div className={styles.topBar}>
              <img src={post.picture} alt="" className={styles.profilePicture} />
              <p style={{fontSize: '25px'}}>{post.user}</p>
            </div>  
            {post.randomNumber !== undefined ? (
            <div className={styles.photo}>
              <img src={`https://picsum.photos/id/${post.randomNumber}/500/450`} alt="" />
            </div>  
          ) : (
            <div className={styles.photo}>
              <img style={{width: '500px', height: '450px'}} src={post.myPost} alt="" />
            </div>
          )}     
        </div>          
    )
  }

  const renderListPost = () => {
    return postData.map((item) => {
      return renderPostItem(item) 
    })
  }

  if (!token) {
    return navigate("/auth")
  } else {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 30px'}}>
        <h1 style={{background: 'white', padding: '5px', boxShadow: '5px 8px #8b8b8be6'}}><span style={{color: '#e7b928'}}>𝓟𝓸𝓼𝓽</span> 𝓢𝓪𝓵𝓿𝓪𝓽𝓲</h1>

        <div style={{zIndex: '99', cursor: 'pointer', background: 'black', color: '#e7b928',borderRadius: '100%', border: 'solid 2px black', position: 'fixed', right: '5%', bottom: '5%'}}>
          <FontAwesomeIcon icon={faPlusCircle} size='3x'  onClick={() => {setIsOpen(click = !click)}} />   
        </div>    

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', widht: '80%'}}>  
        {error ? (
        <Message message='Errore di Network' error />
        ) : loading ? (
        <Message message="CARICAMENTO..." />
        ) : (renderListPost())}
      </div>
      {isOpen && <CreatePost setIsOpen={setIsOpen} />} 
      </div>
      
    )
  }
    
}

export default MyProfile;