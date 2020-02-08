import React from 'react'
import styles from './ErrorScreen.module.css'

export default function ErrorScreen() {
    return (
        <div className={styles.error}>
            <p>Oops...</p>
            <p>Something Went Wrong</p>
        </div>
    )
}
