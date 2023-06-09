import styles from '../style/Results.module.css';
import SingleResult from './SingleResult';


const Results = ({data, savedIDs, savePost}) => { 

    const renderData = () => {   
        const myData = data.results;
        console.log(data)     
        return myData?.map((post) => {
            const doesExist = savedIDs.includes(post.user.md5);
                return (
                    <SingleResult 
                    key={post.user.md5}
                    id={post.user.md5} 
                    savePost={savePost}
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