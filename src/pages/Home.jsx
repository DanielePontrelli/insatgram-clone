import Results from "../components/Results";
import {fetchPostData, saveNewPost} from '../store/actions/handlePostData';
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


function App() {

  const data = useSelector(state => state.postReducer.postData);
  const savedIDs = useSelector(state => state.postReducer.savedIDs);
  const error = useSelector(state => state.postReducer.error);
  const loading = useSelector(state => state.postReducer.loading);
  const userToken = useSelector(state => state.authReducer.token);
  // console.log('dati importati in home', data);
 
  const dispatch = useDispatch();

    const fetchData = () => {
      dispatch(fetchPostData());
    }

    useEffect(() => {
      fetchData()
    },[])
 

// aggiungere post
const savePost = async (doesExist, id, user, randomNumber, picture, myPost) => {
  if (doesExist) {
      alert('Post salvato in precedenza')
      return
  }
  dispatch(saveNewPost(id, user, userToken, randomNumber, picture, myPost));
};

  const showResults = () => {
      return error ? (
      <Message message='ERRORE DI NETWORK' error />
      ) : loading ? (
      <Message text='Sta caricando...' />
      ) : (<Results loading={loading} error={error} savePost={savePost} savedIDs={savedIDs} data={data}  />) 
  }

  return (
    <div>
      {showResults()}
    </div>
  );
}

export default App;