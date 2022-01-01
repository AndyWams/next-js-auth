
import styles from '../styles/Layout.module.scss'

function Layout({children}) {
    return (
        <main>
         <div className={styles.container}>
            {children}
        </div>
      </main>
      
    )
}

export default Layout
