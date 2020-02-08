import React from 'react'
import styles from './BlankCard.module.css'

export default function BlankCard({onClick}) {
    return (
        <div className={styles.blank_card} onClick={onClick}>
            <div className={styles.vertical}>
                <div className={styles.horizontal}></div>
            </div>
        </div>
    )
}
