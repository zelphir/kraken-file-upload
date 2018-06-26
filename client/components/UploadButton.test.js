import React from 'react'
import { shallow } from 'enzyme'
import UploadButton from './UploadButton'

function setup(nextProps = {}) {
  const props = {
    large: false,
    onUpload: jest.fn(),
    ...nextProps
  }
  const wrapper = shallow(<UploadButton {...props} />)

  return {
    props,
    wrapper
  }
}

describe('<UploadButton />', () => {
  it('should match the snapshot', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('should render the large version if large', () => {
    const { wrapper } = setup({ large: true })
    expect(wrapper.find('label').hasClass('pt-large')).toBe(true)
  })
})
