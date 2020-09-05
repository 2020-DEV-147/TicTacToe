import React from 'react';
import { shallow } from 'enzyme'
import Board from './Board'
import Square from './Square'
import { constants } from '../constants'

const getWrapper = () => {
  return shallow(<Board />)
} 

const playerX = {
  move: (position, wrapper) => {
    wrapper.find(Square).at(position).simulate('move')
  }
}

const playerO = {
  move: (position, wrapper) => {
    wrapper.find(Square).at(position).simulate('move')
  }
}

const simulateMove = (wrapper, positions) => {
  for (let position=0;position<positions.length;position++) {
    if (position % 2) {
      playerO.move(positions[position], wrapper)
    }
    else {
      playerX.move(positions[position], wrapper)
    }
  }  
}

const PLAYER_X_WIN = `${constants.PLAYER_X} ${constants.GAME_WIN}`
const PLAYER_O_WIN = `${constants.PLAYER_O} ${constants.GAME_WIN}`

describe('Board Component', ()=> {
  const wrapper = getWrapper()

  it('Should render 9 Square in the Board and properties for each square', () => {
    expect(wrapper.find(Square).length).toEqual(constants.TOTAL_SQUARES)
    expect(wrapper.find(Square).at(0).props()).toEqual({
      move: null,
      onMove: expect.any(Function)
    })
  })

  it('Should display status as Current Player: X', () => {
    expect(wrapper.find('div').at(0).text()).toEqual(`${constants.CURRENT_PLAYER}: ${constants.PLAYER_X}`)
  })

  it('Should render player move in sqaure if user click on it', () => {
    const wrapper = getWrapper()
    playerX.move(0, wrapper)
    expect(wrapper.find(Square).at(0).prop('move')).toEqual(constants.PLAYER_X)
    playerO.move(1, wrapper)
    expect(wrapper.find(Square).at(1).prop('move')).toEqual(constants.PLAYER_O)
  })

  it('Should render same move if player click twice on the same square', () => {
    const wrapper = getWrapper()
    playerX.move(0, wrapper)
    expect(wrapper.find(Square).at(0).prop('move')).toEqual(constants.PLAYER_X)
    playerX.move(0, wrapper)
    expect(wrapper.find(Square).at(0).prop('move')).toEqual(constants.PLAYER_X)
  })

  it('Should display status as "X win" if player X fill three squares in first row', () => {
    const wrapper = getWrapper()
    simulateMove(wrapper, [0, 4, 1, 5, 2])
    expect(wrapper.find('div').at(0).text()).toEqual(PLAYER_X_WIN)
  })

  it('Should display status as "O win" if player O fill three squares in first row', () => {
    const wrapper = getWrapper()
    simulateMove(wrapper, [3, 0, 4, 1, 6, 2])
    expect(wrapper.find('div').at(0).text()).toEqual(PLAYER_O_WIN)
  })
})
