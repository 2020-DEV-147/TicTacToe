export const isWon = squares => {
  if (squares[0] && squares[0] === squares[1] && squares[0] === squares[2]) {
    return true
  }
  if (squares[3] && squares[3] === squares[4] && squares[3] === squares[5]) {
    return true
  }
  return false
}
