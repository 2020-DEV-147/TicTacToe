import React, { useState } from 'react'
import Square from './Square'
import { constants } from '../constants'

const boardStyle = {
  border: '4px solid',
  width: '250px',
  height: '250px',
  margin: '5px auto',
  display: 'grid',
  gridTemplate: 'repeat(3, 1fr)/repeat(3, 1fr)'
}

const Board = () => {
  const emptyBoard = Array(constants.TOTAL_SQUARES).fill(null);
  const [squares, setSquares] = useState(emptyBoard)
  
  const registerMove = (position) => {
    const filledSquares = [...squares]
    filledSquares[position] = constants.PLAYER_X    
    setSquares(filledSquares)
  }

  const getGameStatus = () => {
    return `${constants.CURRENT_PLAYER}: ${constants.PLAYER_X}`
  }

  const handleMove = position => {
    registerMove(position)
  }

  return (
    <>
      <div>{getGameStatus()}</div>
      <div style={boardStyle}>
        {squares.map((square, position) => (
          <Square key={position} move={square} onMove={() => handleMove(position)} />
        ))}
      </div>
    </>
  )
}

export default Board
