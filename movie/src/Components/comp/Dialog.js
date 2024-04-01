import React from 'react'
import '../css/Dialog.css'

export default function Dialog({ title, close, info }) {

    const closeDialog = ()=>{
        close();
    }

    return (
        <div className='dialog-main' >

            <div className="dialog-container">

                <div className="title-container-dialog">
                    <h1>{title}</h1>
                </div>


                <div className="info-container-dialog">
                    <p>{info}</p>
                </div>

                <div className="button-container-dialog">

                    <button onClick={closeDialog} >Ok</button>

                </div>

            </div>

        </div>
    )
}
