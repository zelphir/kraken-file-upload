import React from 'react'
import { shallow } from 'enzyme'
import Nav from './Nav'

function setup(nextProps = {}) {
  const props = {
    hasData: false,
    hasQuery: false,
    onUpload: jest.fn(),
    handleFilter: jest.fn(),
    ...nextProps
  }
  const wrapper = shallow(<Nav {...props} />)

  return {
    props,
    wrapper
  }
}

describe('<Nav />', () => {
  it('should match the snapshot', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('should render the divider and Add file button if has data', () => {
    const { wrapper } = setup({ hasData: true })
    expect(wrapper.find('UploadButton')).toHaveLength(1)
    expect(wrapper.find('NavbarDivider')).toHaveLength(1)
  })
})
