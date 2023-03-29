import styles from '../style/SingleResult.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner';
import { useSelector } from 'react-redux';
import { useState } from 'react';


const SingleResult = ({user, picture, id, random, doesExist, addPost, loading, error}) => { 

    const buttonColor = doesExist ? '#e7b928' : 'black';
    const cursor = doesExist ? 'not-allowed' : 'pointer';

    const token = useSelector(state => state.authReducer.token); 
    
    const [randomNumber,  setRandomNumber] = useState(Math.round(Math.random()*60))

    return (
        <div className={styles.container}>
            <div style={{padding: '5px', height: '80px', display: 'flex'}}>
                <img src={picture} alt="" style={{marginRight: '10px', height: '70px', width: '70px', borderRadius: '50%'}}/>
                <p style={{fontSize: '25px'}}>{user}</p>                
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={`https://picsum.photos/id/${randomNumber}/500/450`} alt="" />
            </div>
            
            {loading ? (
                <Spinner />
            ) : (
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {token ? (<FontAwesomeIcon onClick={() =>addPost(doesExist, id, user, randomNumber, picture)} 
                    style={{margin : '5px 20px', cursor: cursor, color: buttonColor}} 
                    size='2x' icon={faBookmark} />) : null}
                    {error ? (<p>errore di network</p>) : null}
                </div>
                
            )}
        </div>
    )
}

export default SingleResult;