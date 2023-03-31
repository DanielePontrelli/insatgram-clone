import styles from '../style/CreatePost.module.css';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {storage} from '../firebase'
import axios from 'axios';
import { useRef } from 'react';

export const CreatePost = () => {
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);

    const inputRef = useRef(null);
    console.log(inputRef.current)

    const upload = async () => {
        if (image == null) return;
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef); // asincrona in quanto l'url non arriva in tempo al database quando clicco carica immagine
        setUrl(imageUrl);
        setImage(null);
        alert("Istantanea stampata");

        const id = crypto.randomUUID();
        const data = {
          PostId: id,
          PostPicture: 'https://i.pinimg.com/474x/40/39/0c/40390c87f48e21c92fa8feded8f0effa.jpg',
          PostUser: 'Il mio post',
          MyPost: imageUrl
        };
        const resp = await axios.post('https://instagram-clone-103f2-default-rtdb.firebaseio.com/postData.json', data);
        console.log(resp);
        setTimeout(() => { //funzione per far refreshare la pagina dato che il post viene visuallizzato dopo il refresh
          window.location.reload();
        }, 1000);
    };

    function previewImage(e) {
        setImage(e.target.files[0]);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreview(reader.result);
        };
    }

    return (
        <div className={styles.back}>
            <div className={styles.container}>
                {!preview && (<img style={{height: '300px', width:'350px'}} src="https://i.pinimg.com/564x/18/6f/0d/186f0dadfa59030e87c36dcdd4dd3975.jpg" alt="Preview" />)}
                {preview && <img style={{height: '300px', width:'350px'}} src={preview} alt="Preview" />}
                <div style={{display: 'flex', justifyContent: 'space-around', height: '70px'}}>
                    <div className={styles.left}> 
                       <button className={styles.input} onClick={() => inputRef.current.click()}>SCEGLI FOTO</button>
                       <input style={{display: 'none'}} ref={inputRef} type="file" onChange={(e) => previewImage(e)}  />   
                    </div>
                    <div className={styles.right}>
                        <button className={styles.button} onClick={upload} >SCATTA FOTO!</button>
                    </div>  
                </div>   
            </div>
        </div>
    );
};
