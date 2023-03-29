import { useEffect} from 'react';
import Message from '../components/Message';
import { useSelector, useDispatch } from "react-redux";
import {fetchSavedPost} from '../store/actions/handlePostData';
import styles from '../style/MyProfile.module.css'

function MyProfile() {

  const postData = useSelector(state => state.postReducer.savedPost);
  const loading = useSelector(state => state.postReducer.loading);
  const error = useSelector(state => state.postReducer.error);

  const token = useSelector(state => state.authReducer.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSavedPost());
  }, []);

  const renderPostItem = (post) => {
    return (
        <div key={post.id} className={styles.container} >
          <div style={{padding: '5px', height: '80px', display: 'flex'}}>
              <img src={post.picture} alt="" style={{marginRight: '10px' ,height: '70px', width: '70px', borderRadius: '50%'}} />
              <p style={{fontSize: '25px'}}>{post.user}</p>
            </div>  
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img style={{padding: '10px'}} src={`https://picsum.photos/id/${post.randomNumber}/500/450`} alt="S" />
            </div>         
        </div>     
    )
  }

  const renderListPost = () => {
    return postData.map((item) => {
      return renderPostItem(item) 
    })
  }

  if (!token) {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red', fontSize: '30px'}}>
        <p>Fai il login per salvare i tuoi post preferiti</p>
      </div>
    )
  }
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#A6A6A6'}}>
        <h1>Post salvati</h1>
        {error ? (
        <Message message='Errore di Network' error />
        ) : loading ? (
        <Message message="CARICAMENTO..." />
        ) : (renderListPost())}
      </div>
    )
}

export default MyProfile;