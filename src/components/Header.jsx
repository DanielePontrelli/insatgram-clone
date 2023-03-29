import styles from "../style/Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const Header = ({isAuthenticated}) => {
    return (
        <div className={styles.container}>
            <div>
                <Link to="/" className={styles.logo} style={{textDecoration: 'none', color: 'white'}}>
                    <FontAwesomeIcon size='2x' color='#e7b928' icon={faCameraRetro} />
                    <p style={{fontFamily:'cursive', paddingLeft:'5px'}}> | <span style={{color: '#e7b928'}}>P</span>olaroid</p>
                </Link>
            </div>        
            <div className={styles.personalData}>
                {isAuthenticated ? 
                <Link to="/logout" style={{color: 'white', textDecoration: 'none'}}>
                    <p style={{marginRight: '10px'}}>Logout</p>
                </Link> :
                <Link to="/auth" style={{color: 'white', textDecoration: 'none'}}>
                    <p style={{marginRight: '10px'}}>Accedi</p>
                </Link>} 
                <Link to="profile" style={{color: '#e7b928', textDecoration: 'none'}}>
                    <p style={{marginRight: '10px'}}>il mio profilo</p>
                </Link>
            </div>
        </div>
   )
}


export default Header;