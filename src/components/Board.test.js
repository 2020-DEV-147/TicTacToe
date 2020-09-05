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
  })
})
