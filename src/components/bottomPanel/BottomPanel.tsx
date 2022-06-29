import React, { useState } from 'react'
import './bottomPanel.css';
import speed1 from './speedButtons/speed1.png';
import speed2 from './speedButtons/speed2.png'
import speed3 from './speedButtons/speed3.png'
import pause from './speedButtons/pause.png'

const BottomPanel = ({ setCurrentColor, rect, currentColor, chosenCells, setChosenCells }: any) => {
    let colorButtons: string[] = ['crimson', 'brightRed', 'crab', 'orange', 'yellow', 'green', 'lightGreen', 'blue', 'pink', 'lightBlue', 'white', 'black']
    let previousSpeed = rect[0] * rect[1] >= 2500 ? 3 : rect[0] * rect[1] >= 625 ? 2 : 1
    const changeColor = (e: any) => {
        setCurrentColor(e.target.id.slice(2))

        colorButtons.map(item => document.querySelector('#id' + item)?.classList.remove('chosenColor'))
        e.target.classList.add('chosenColor')
    }
    const setNewParams = () => {
        clearInterval(int)
        let lifeStart = document.getElementById('lifeStart')
        lifeStart?.removeAttribute('disabled')
        let form: HTMLElement | null = document.querySelector('.WH__form') //534/12*10/20
        let board: HTMLElement | null = document.querySelector('.board')
        let botPanel: HTMLElement | null = document.querySelector('.bottomPanel')
        let cells = document.querySelectorAll('.nullCell')
        cells?.forEach(item => item.classList.remove(...colorButtons, 'chosenColor'))
        board?.setAttribute("style", 'display:none')
        form?.setAttribute("style", 'display:flex')
        botPanel?.setAttribute("style", 'display:none')
    }
    let chosenLength = chosenCells.length
    let count = 0
    const start = () => {
        let w: number, h: number
        if (count < chosenLength) {
            w = chosenCells[count][0][0]
            h = chosenCells[count][0][1]
            count++
        } else {
            w = Math.floor(Math.random() * (rect[0] - 1 + 1) + 1);
            h = Math.floor(Math.random() * (rect[1] - 1 + 1) + 1);
        }
        let rand = [`#id${w - 1}-${h}`, `#id${w + 1}-${h}`, `#id${w}-${h + 1}`, `#id${w}-${h - 1}`]
        let rdhw = Math.floor(Math.random() * 100)
        if (rdhw % 5 === 0) { rand.push(`#id${w - Math.floor(rdhw / 10)}-${h - 3}`, `#id${w + Math.floor(rdhw / 10)}-${h + 3}`) }
        // setChosenCells((prev: any) => [...prev, [w - 1, h], [w - 1, h - 1], [w, h], [w, h - 1]])
        let c = document.querySelector(`#id${w}-${h}`)
        // c?.classList.remove(...colorButtons)
        // c?.classList.add(colorButtons[Math.floor(Math.random() * (4 + 1))])
        if (c?.classList[1]) {
            let cl = c?.classList[1]
            rand.map(item => {
                if (c?.classList[1]) {
                    document.querySelector(item)?.classList.remove(...colorButtons)
                    document.querySelector(item)?.classList.add(cl)
                }
            })
        }

    }
    let int: NodeJS.Timer
    const startLife = () => {
        setChosenCells((prev: number[]) => prev.sort(() => Math.random() - 0.5))
        let lifeStart = document.getElementById('lifeStart')
        lifeStart?.setAttribute('disabled', '')
        let prevArr = [100, 35, 8, 1]
        int = setInterval(start, prevArr[previousSpeed])
    }

    const setSpeed = (speed: number, e: React.MouseEvent<Element, MouseEvent>) => {
        let ids = [0, 1, 2, 3]
        if (speed === 0) {
            clearInterval(int)
            let lifeStart = document.getElementById('lifeStart')
            lifeStart?.removeAttribute('disabled')
        }
        else if (speed === 1) {
            clearInterval(int)
            int = setInterval(start, 35)
            previousSpeed = 1
        } else if (speed === 2) {
            clearInterval(int)
            int = setInterval(start, 8)
            previousSpeed = 2
        } else if (speed === 3) {
            clearInterval(int)
            int = setInterval(start, 5)
            previousSpeed = 3
        }
        ids.map((item, index) => index !== speed ?
            document.querySelector("#buttonSpeed-" + String(index))?.classList.remove('speedActivatedGreen', 'speedActivatedRed')
            :
            document.querySelector("#buttonSpeed-" + String(index))?.classList.add('speedActivatedGreen')
        )
        speed === 0
            &&
            document.querySelector("#buttonSpeed-0")?.classList.add('speedActivatedRed')
            &&
            document.querySelector("#buttonSpeed-0")?.classList.remove('speedActivatedGreen')
    }
    // document.querySelector('.bottomPanel__button-start')?.addEventListener('click', startLife)
    return (
        <div className="bottomPanel">
            <div className='colorBox'>
                {colorButtons.map(color => (
                    <div className={color + " colors"} id={`id${color}`} onClick={changeColor}></div>
                ))}
            </div>
            <div className='bottomPanel__rightPart'>
                <div className="bottomPanel__rightPart-speed">
                    <img src={pause} className="speedActivatedRed" alt='pause' onClick={(e) => setSpeed(0, e)} id="buttonSpeed-0" />
                    <img src={speed1} alt='speed1' onClick={(e) => setSpeed(1, e)} id="buttonSpeed-1" />
                    <img src={speed2} alt='speed2' onClick={(e) => setSpeed(2, e)} id="buttonSpeed-2" />
                    <img src={speed3} alt='speed3' onClick={(e) => setSpeed(3, e)} id="buttonSpeed-3" />
                </div>
            </div>
            <div className="bottomPanel__rightPart-buttonPanel">
                <button className='bottomPanel__button' onClick={setNewParams}>Set new parameters</button>
            </div>
        </div>
    )
}

export default BottomPanel