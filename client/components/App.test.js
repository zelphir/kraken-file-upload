import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe.skip('<App />', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should call fetchData in componentDidMount', () => {
    const fetchDataSpy = jest.spyOn(App.prototype, 'fetchData')
    shallow(<App />)
    expect(fetchDataSpy).toHaveBeenCalledTimes(1)
  })

  it('should render the loading message on mount', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.text()).toBe('loading...')
  })

  it('should render the files list after fetching data', () => {
    const file = {
      id: 1,
      filename: 'myfilename.pdf',
      originalName: 'aaaa-bbbb-cccc-dddd.pdf',
      size: 0.05
    }
    const wrapper = shallow(<App />)
    wrapper.setState({ isLoading: false, files: [file] })
    expect(wrapper.children()).toHaveLength(1)
  })

  it('should render the no files message if empty array', () => {
    const wrapper = shallow(<App />)
    wrapper.setState({ isLoading: false, files: [] })
    expect(wrapper.childAt(0).text()).toBe(':-( Ops, no files found! Add one!')
  })

  it('should render the error message on error', () => {
    const wrapper = shallow(<App />)
    wrapper.setState({ isError: true })
    expect(wrapper.text()).toBe(':-( Ops, something went wrong! Try again.')
  })
})
