export const isWon = squares => {
  if (squares[0] && squares[0] === squares[1] && squares[0] === squares[2]) {
    return true
  }
  return false
}
