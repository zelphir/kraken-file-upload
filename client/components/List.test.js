import React from 'react'
import { shallow } from 'enzyme'
import List from './List'

function setup(nextProps = {}) {
  const props = {
    data: [],
    onDelete: jest.fn(),
    onUpload: jest.fn(),
    hasQuery: false,
    ...nextProps
  }
  const wrapper = shallow(<List {...props} />)

  return {
    props,
    wrapper
  }
}

describe('<List />', () => {
  it('should match the snapshot', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('should render the empty message if no data', () => {
    const { wrapper } = setup()
    expect(wrapper.find('NonIdealState')).toHaveLength(1)
    expect(wrapper.find('NonIdealState').props().visual).toBe('folder-open')
  })

  it('should render the no results message if no data', () => {
    const { wrapper } = setup({ hasQuery: true })
    expect(wrapper.find('NonIdealState')).toHaveLength(1)
    expect(wrapper.find('NonIdealState').props().visual).toBe('search')
  })

  it('should render the table if data', () => {
    const { wrapper } = setup({
      data: [{ _id: 1, filename: 'a.txt', originalName: 'b.txt', type: 'txt', size: 1 }]
    })
    expect(wrapper.find('NonIdealState')).toHaveLength(0)
    expect(wrapper.find('table')).toHaveLength(1)
  })
})
