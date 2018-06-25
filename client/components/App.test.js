import React from 'react'
import { shallow } from 'enzyme'
import { App } from './App'
import { initialState } from '../redux/files/reducers'

function setup(nextProps = {}) {
  const props = {
    getFiles: jest.fn(),
    ...initialState,
    ...nextProps
  }
  const wrapper = shallow(<App {...props} />)

  return {
    props,
    wrapper
  }
}

describe('<App />', () => {
  it('should match the snapshot', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('should call getFiles() in componentDidMount', () => {
    const { props } = setup()
    expect(props.getFiles.mock.calls.length).toBe(1)
  })

  it('should render the loading message on mount', () => {
    const { wrapper } = setup()
    expect(wrapper.text()).toBe('loading...')
  })

  it('should render the files list after fetching data', () => {
    const file = {
      id: 1,
      filename: 'myfilename.pdf',
      originalName: 'aaaa-bbbb-cccc-dddd.pdf',
      size: 0.05
    }
    const { wrapper } = setup({ isLoading: false, data: [file] })
    expect(wrapper.children()).toHaveLength(1)
  })

  it('should render the no files message if empty array', () => {
    const { wrapper } = setup({ isLoading: false, data: [] })
    expect(wrapper.childAt(0).text()).toBe(':-( Ops, no files found! Add one!')
  })

  it('should render the error message on error', () => {
    const { wrapper } = setup({ error: ':-( Ops, something went wrong! Try again.' })
    expect(wrapper.text()).toBe(':-( Ops, something went wrong! Try again.')
  })
})
