import LoginForm from '../../components/LoginForm';
import styles from '../../styles/Auth.module.scss';
function login() {
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
            <h1 className="mb-4">Login into your account</h1>
            <LoginForm />
        </div>
    </div>
    )
}

export default login
