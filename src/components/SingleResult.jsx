import styles from '../style/SingleResult.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner';
import { useSelector } from 'react-redux';
import { useState } from 'react';


const SingleResult = ({user, picture, id, doesExist, savePost, loading, error}) => { 

    const buttonColor = doesExist ? '#e7b928' : 'black';
    const cursor = doesExist ? 'not-allowed' : 'pointer';

    const token = useSelector(state => state.authReducer.token);
     

    const [isLiked, setIsLiked] = useState(false);  
    const changeColor = () => {
      setIsLiked(!isLiked);
    };  
    const likeColor = isLiked ? "red" : "black";

    
    const [randomNumber,  setRandomNumber] = useState(Math.round(Math.random()*60))


    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <img src={picture} alt="" className={styles.profilePicture}/>
                <p style={{fontSize: '25px'}}>{user}</p>                
            </div>
            <div>
                <img src={`https://picsum.photos/id/${randomNumber}/500/450`} alt="" />
            </div>
            
            {loading ? (
                <Spinner />
            ) : (
                <div className={styles.bottomBar}>
                    <div>
                        <FontAwesomeIcon size='2x' icon={faHeart} style={{margin : '5px 20px', cursor: cursor, color: likeColor}} onClick={changeColor} />
                    </div>
                    <div>
                        {token ? (<FontAwesomeIcon onClick={() =>savePost(doesExist, id, user, randomNumber, picture)} 
                        style={{margin : '5px 20px', cursor: cursor, color: buttonColor}} 
                        size='2x' icon={faBookmark} />) : null}
                        {error ? (<p>errore di network</p>) : null} 
                    </div>        
                </div>
                
            )}
        </div>
    )
}

export default SingleResult;