import styles from "../style/Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const Header = ({isAuthenticated}) => {
    return (
        <div className={styles.container}>
            <div>
                <Link to="/" className={styles.logo}>
                    <FontAwesomeIcon size='2x' color='#e7b928' icon={faCameraRetro} />
                    <p style={{fontFamily:'cursive', paddingLeft:'5px'}}> | <span style={{color: '#e7b928'}}>𝓟</span>𝓸𝓵𝓪𝓻𝓸𝓲𝓭</p>
                </Link>
            </div>        
            <div className={styles.personalData}>
                {isAuthenticated ? 
                <Link to="/logout" style={{textDecoration: 'none'}}>
                    <p style={{color: 'white', marginRight: '10px'}}>Logout</p>
                </Link> :
                <Link to="/auth" style={{textDecoration: 'none'}}>
                    <p style={{color: 'white', marginRight: '10px'}}>Accedi</p>
                </Link>} 
                <Link to="profile" style={{textDecoration: 'none'}}>
                    <p style={{marginRight: '10px', color: '#e7b928'}}>il mio profilo</p>
                </Link>
            </div>
        </div>
   )
}


export default Header;