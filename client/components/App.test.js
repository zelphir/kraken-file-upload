import React from 'react'
import { shallow } from 'enzyme'
import { App } from './App'
import { initialState } from '../redux/files/reducers'

function setup(nextProps = {}) {
  const props = {
    getFiles: jest.fn(),
    deleteFile: jest.fn(),
    uploadFile: jest.fn(),
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
    expect(wrapper.find('Spinner')).toHaveLength(1)
  })

  it('should render the files list after fetching data', () => {
    const file = {
      id: 1,
      filename: 'myfilename.pdf',
      originalName: 'aaaa-bbbb-cccc-dddd.pdf',
      size: 0.05
    }
    const { wrapper } = setup({ isLoading: false, data: [file] })
    expect(wrapper.find('List')).toHaveLength(1)
  })

  it('should render the error message on error', () => {
    const { wrapper } = setup({ error: ':-( Ops, something went wrong! Try again.' })
    expect(wrapper.find('Callout')).toHaveLength(1)
  })

  it('handleDeleteFile should call deleteFile', () => {
    const { wrapper, props } = setup()
    wrapper.instance().handleDeleteFile({ currentTarget: { value: 1 }, preventDefault: jest.fn() })
    expect(props.deleteFile.mock.calls.length).toBe(1)
  })

  it('handleUploadFile should call uploadFile', () => {
    const { wrapper, props } = setup()
    wrapper.instance().handleUploadFile({
      target: { files: [{ file: Buffer.alloc(1) }], length: 1 },
      preventDefault: jest.fn()
    })
    expect(props.uploadFile.mock.calls.length).toBe(1)
  })

  it('handleUploadFile should not call uploadFile if files.length === 0', () => {
    const { wrapper, props } = setup()
    wrapper.instance().handleUploadFile({
      target: { files: [], length: 0 },
      preventDefault: jest.fn()
    })
    expect(props.uploadFile.mock.calls.length).toBe(0)
  })
})
