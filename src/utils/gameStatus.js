export const isWon = squares => {
  if (squares[0] && squares[0] === squares[1] && squares[0] === squares[2]) {
    return true
  }
  if (squares[3] && squares[3] === squares[4] && squares[3] === squares[5]) {
    return true
  }
  if (squares[6] && squares[6] === squares[7] && squares[6] === squares[8]) {
    return true
  }
  if (squares[0] && squares[0] === squares[3] && squares[0] === squares[6]) {
    return true
  }
  if (squares[1] && squares[1] === squares[4] && squares[1] === squares[7]) {
    return true
  }
  if (squares[2] && squares[2] === squares[5] && squares[2] === squares[8]) {
    return true
  }
  if (squares[0] && squares[0] === squares[4] && squares[0] === squares[8]) {
    return true
  }
  return false
}
