import React from 'react'
import styles from './CloseButton.module.css'

export default function CloseButton({style={},onClick=null}) {
    const {background} = styles;
    return (
        <div className={background} onClick={onClick} style={style}>
        </div>
    )
}
