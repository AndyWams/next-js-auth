import React from 'react'
import styles from '../../styles/Auth.module.scss';
import RegisterForm from '../../components/RegisterForm';


function Register() {
    return (
     <div className={styles.authwrap}>
        <div className={styles.leftpanel}>
            <ul>
            <li>
                <span className={styles.icon}><ion-icon name="checkmark-circle-outline"></ion-icon></span>
                Quick and free sign-up <span> Enter your email address to create an account</span>
            </li>
            <li>
                <span className={styles.icon}><ion-icon name="checkmark-circle-outline"></ion-icon></span>
                Cross-platform solution<span> Preview your newsletter on any device before sending them out</span>
            </li>
            <li>
                <span className={styles.icon}><ion-icon name="checkmark-circle-outline"></ion-icon></span>
                Start sending emails<span>Use our API or pick our pre-built templates</span>
            </li>
        
            </ul>
        </div>
        <div className={styles.rightpanel}>
            <h1 className="mb-4">Create your account</h1>
            <RegisterForm />
        </div>
    </div>
    )
}

export default Register
