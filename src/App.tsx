import { useState } from 'react';
import './App.css';
import Board from './components/board/board'
import BottomPanel from './components/bottomPanel/BottomPanel';
import WH from './components/WH/WH'
const App = () => {
  const [rect, setRect] = useState([0, 0])
  const [currentColor, setCurrentColor] = useState('green')
  const [chosenCells, setChosenCells] = useState([])
  const sendData = (e: any, w: string, h: string) => {
    if (!w || w.length < 2) {
      w = '10'
    }
    if (!h || h.length < 2) {
      h = '10'
    }
    document.querySelector('.green')?.classList.add('chosenColor')
    e.preventDefault()
    let el = document.querySelector(':root')
    let scw = window.innerWidth
    let sch = window.innerHeight
    if (scw > sch && Number(w) <= Number(h)) {
      let z = w
      w = h
      h = z
    } else if (sch > scw && Number(h) <= Number(w)) {
      let z = w
      w = h
      h = z
    }
    let board: HTMLElement | null = document.querySelector('.board')
    let form: HTMLElement | null = document.querySelector('.WH__form')
    let botPanel: HTMLElement | null = document.querySelector('.bottomPanel')

    let max = Number(w) > Number(h) ? w : h
    let coef = scw < sch ? sch / scw : scw / sch
    //нужно минимальную высоту/ширину экрана разделить на максимальную высоту/ширину клетки
    let cellParams = scw > sch ? Math.floor(sch / Number(max) * coef) : Math.floor(scw / Number(max) * coef)
    // let cellParams2 = w < h ? Math.floor(scw / Number(max) * 10) / 12 : Math.floor(sch / Number(max) * 10) / 12
    setRect([Number(w), Number(h)])
    if (Number(w) * cellParams >= window.innerWidth * 0.9) {
      cellParams = window.innerWidth / Number(w) * 0.9
    }
    if (Number(h) * cellParams >= window.innerHeight * 0.9) {
      cellParams = window.innerHeight / Number(h) * 0.9
    }
    if (el) {
      el.setAttribute("style", `--params:${cellParams}px`)
    }

    botPanel?.setAttribute("style", 'display:flex')
    board?.setAttribute("style", `width:${Number(w) * cellParams}px; height:${Number(h) * cellParams}px`)

    form?.setAttribute("style", 'display:none')
  }
  return (
    <div className="App">
      <WH sendData={sendData} />
      <Board chosenCells={chosenCells} setChosenCells={setChosenCells} currentColor={currentColor} rect={rect} />
      <BottomPanel setChosenCells={setChosenCells} chosenCells={chosenCells} rect={rect} currentColor={currentColor} setCurrentColor={setCurrentColor} />
    </div>
  );
}

export default App;
