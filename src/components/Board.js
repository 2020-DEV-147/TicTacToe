import React, { useState } from 'react'
import Square from './Square'
import { constants } from '../constants'
import { isWon, isDraw } from '../utils/gameStatus'

const boardStyle = {
  border: '4px solid',
  width: '250px',
  height: '250px',
  margin: '5px auto',
  display: 'grid',
  gridTemplate: 'repeat(3, 1fr)/repeat(3, 1fr)'
}

const restartButtonStyle = {
  border: '2px solid',
  fontSize:'20px',
  fontWeight: '800',
}

const Board = () => {
  const emptyBoard = Array(constants.TOTAL_SQUARES).fill(null);
  const firstPlayer = constants.PLAYER_X
  const [squares, setSquares] = useState(emptyBoard)
  const [activePlayer, setActivePlayer] = useState(firstPlayer)
  const [winner, setWinner] = useState(null)
  
  const registerMove = (position) => {
    const filledSquares = [...squares]
    filledSquares[position] = activePlayer    
    setSquares(filledSquares)

    if (isWon(filledSquares)) setWinner(activePlayer)
  }

  const getGameStatus = () => {
    if (winner) return `${winner} ${constants.GAME_WIN}`

    if (isDraw(winner, squares)) return constants.GAME_DRAW

    return `${constants.CURRENT_PLAYER}: ${activePlayer}`
  }

  const isFilledSquare = (squares, position) => !!squares[position]

  const handleMove = position => {
    if (winner || isFilledSquare(squares, position)) return

    registerMove(position)

    setActivePlayer(prevActivePlayer => prevActivePlayer === constants.PLAYER_X ? constants.PLAYER_O : constants.PLAYER_X)
  }

  const resetBoard = () => {
    setSquares(emptyBoard)
    setActivePlayer(firstPlayer)
    setWinner(null)
  }

  return (
    <>
      <div>{getGameStatus()}</div>
      <div style={boardStyle}>
        {squares.map((square, position) => (
          <Square key={position} move={square} onMove={() => handleMove(position)} />
        ))}
      </div>
      <button style={restartButtonStyle} onClick={resetBoard}>{constants.GAME_RESTART}</button>
    </>
  )
}

export default Board
