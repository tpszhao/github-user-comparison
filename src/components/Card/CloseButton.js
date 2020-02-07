import React from 'react'
import styles from './CloseButton.module.css'

export default function CloseButton({style={},onClick}) {
    const {vertical,horizontal} = styles;
    return (
        <div className={vertical} onClick={onClick} style={style}>
            <div className={horizontal}></div>
        </div>
    )
}
