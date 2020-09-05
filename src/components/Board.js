import React, { useState } from 'react'
import Square from './Square'
import { constants } from '../constants'
import { isWon } from '../utils/gameStatus'

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
  const [activePlayer, setActivePlayer] = useState(constants.PLAYER_X)
  const [winner, setWinner] = useState(null)
  
  const registerMove = (position) => {
    const filledSquares = [...squares]
    filledSquares[position] = activePlayer    
    setSquares(filledSquares)

    if (isWon(filledSquares)) setWinner(activePlayer)
  }

  const getGameStatus = () => {
    if (winner) return `${winner} ${constants.GAME_WIN}`

    return `${constants.CURRENT_PLAYER}: ${activePlayer}`
  }

  const isFilledSquare = (squares, position) => !!squares[position]

  const handleMove = position => {
    if (winner || isFilledSquare(squares, position)) return

    registerMove(position)

    setActivePlayer(prevActivePlayer => prevActivePlayer === constants.PLAYER_X ? constants.PLAYER_O : constants.PLAYER_X)
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
