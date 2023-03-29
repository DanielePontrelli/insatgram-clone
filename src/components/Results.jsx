import styles from '../style/Results.module.css';
import SingleResult from './SingleResult';
import { useState } from 'react';


const Results = ({data, savedIDs, addPost}) => { 

    // const [randomNumber,  setRandomNumber] = useState(Math.round(Math.random()*60))

    // function generateRandomNumber() {
    //     setRandomNumber(Math.round(Math.random() * 60));
    //   }

    const renderData = () => {   
        const myData = data.results;
        
        return myData?.map((post) => {
            const doesExist = savedIDs.includes(post.user.md5);
                return (
                    <SingleResult 
                    key={post.user.md5}
                    id={post.user.md5} 
                    addPost={addPost}
                    doesExist={doesExist}
                    user={post.user.username} 
                    picture={post.user.picture.thumbnail}
                   />

                );                 
        });   
    };

    return (
        <div className={styles.container}>
            <div className={styles.resultsContainer}>
                {renderData()}
            </div>     
        </div>
    )
}

export default Results;