import React, { useState } from 'react'
import './WH.css';

function WH({ sendData }: any) {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const changeWH = (e: any) => {
        if (e.target.value[0] === '0') {
            e.target.value = ''
        }
        if (/\D/.test(e.target.value)) {
            e.target.value = e.target.value.replace(/\D/g, '')
        }
        if (Number(e.target.value) > 75) {
            e.target.value = '75'
        }
        e.target.id === 'width' ? setWidth(e.target.value) : setHeight(e.target.value)
    }
    return (
        <div>
            <form className='WH__form'>
                <h1 className='WH__heading'>Width</h1>
                <input className='WH__input' id="width" placeholder='width...' onChange={changeWH} />
                <h1 className='WH__heading'>Height</h1>
                <input className='WH__input' id="height" placeholder='height...' onChange={changeWH} />
                <button className='WH__submit' type='submit' onClick={(e) => sendData(e, width, height)}>GO</button>
                <p className='WH__paragraph'>Width and Height values have to be in a range of 10-75</p>
            </form>
        </div>
    )
}

export default WH