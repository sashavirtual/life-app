import React, { useState } from 'react'
import './WH.css';
import question from './style/question.png'
import PictureBlock from './PictureBlock/PictureBlock';

function WH({ sendData }: any) {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [instructionCalled, setInstructionCalled] = useState(false)
    const changeWH = (e: any) => {
        if (e.target.value[0] === '0') {
            e.target.value = ''
        }
        if (/\D/.test(e.target.value)) {
            e.target.value = e.target.value.replace(/\D/g, '')
        }
        if (Number(e.target.value) > 50) {
            e.target.value = '50'
        }
        e.target.id === 'width' ? setWidth(e.target.value) : setHeight(e.target.value)
    }
    const howToPlay = () => {
        setInstructionCalled(!instructionCalled)
    }
    return (
        <div>
            {
                instructionCalled && <PictureBlock instructionCalled={instructionCalled} setInstructionCalled={setInstructionCalled} />
            }
            <div className='WH__form-howToPlay' onClick={howToPlay}>
                <img className="WH__questionMark" alt="question mark" src={question} />
                <p>how to play?</p>
            </div>
            <form className='WH__form'>

                <h1 className='WH__heading'>Width</h1>
                <input className='WH__input' id="width" placeholder='width...' onChange={changeWH} />
                <h1 className='WH__heading'>Height</h1>
                <input className='WH__input' id="height" placeholder='height...' onChange={changeWH} />
                <button className='WH__submit' type='submit' onClick={(e) => sendData(e, width, height)}>GO</button>
                <p className='WH__paragraph'>Width and Height values have to be in a range of 10-50</p>
            </form>
        </div>
    )
}

export default WH