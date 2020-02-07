import React from 'react'
import styles from './CloseButton.module.css'

export default function CloseButton({style={},onClick=null}) {
    const {background,top,bottom,left,right,center,transform} = styles;
    return (
        <div className={background} onClick={onClick} style={style}>
            <div className={transform}>
                <div className={top}></div>
                <div className={bottom}></div>
                <div className={center}></div>   
                <div className={right}></div> 
                <div className={left}></div>        
            </div>
        </div>
    )
}
