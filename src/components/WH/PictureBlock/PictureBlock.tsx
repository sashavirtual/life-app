import React, { useState } from 'react'
import './pictureBlock.css';
import howToPlay1 from '../style/howToPlay1.png'
import howToPlay2 from '../style/howToPlay2.png'
import howToPlay3 from '../style/howToPlay3.png'
const PictureBlock = (props: any) => {
    const [pic, setPic] = useState(0)
    let picArray = [howToPlay1, howToPlay2, howToPlay3]
    const zoomIn = () => {
        console.log(typeof props.instructionCalled)
        if (pic === 2) {
            props.setInstructionCalled(false)
            setPic(0)
        } else {
            setPic(prev => prev + 1)
        }
    }
    return (
        <div className='WH__pictureBlock'>
            <img className="WH__pictureBlock-pic" id={"howToPlayPic"} onClick={zoomIn} alt="how to play?" src={picArray[pic]} />
        </div>
    )
}

export default PictureBlock