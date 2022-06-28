import React from 'react'
import './board.css'
interface IBoardProps {
    rect: number[],
    currentColor: string,
    setChosenCells: Function,
    chosenCells: IBoardProps
}
const Board = ({ rect, setChosenCells, currentColor, chosenCells }: any) => {
    // const Board: React.FC<IBoardProps> = (props: IBoardProps) => {
    let chooseCell = (e: any) => {
        let id = e.target.id
        e.target?.classList.remove('yellow', 'crimson', 'green', 'blue', 'black', 'orange', 'pink', 'white', 'lightGreen', 'crab', 'lightBlue', 'brightRed')
        e.target?.classList.add(currentColor)
        let hyphenInd = id.indexOf('-')
        let widthHeight = [Number(id.slice(2, hyphenInd)), Number(id.slice(hyphenInd + 1))]
        setChosenCells((prev: any) => [...prev, [widthHeight]])
    }
    let board = new Array(rect[0] * rect[1]).fill(null)
    return (
        <div className='board'>
            {board.map((item, index) => ( //id15-25
                <div className='nullCell' key={index} id={`id${(index) % rect[0] + 1}-${Math.floor((index) / rect[0]) + 1}`} onClick={(e) => chooseCell(e)}> </div>
            ))
            }
        </div >
    )
}

export default Board