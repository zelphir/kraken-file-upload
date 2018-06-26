import React from 'react'
import { shallow } from 'enzyme'
import DownloadButton from './DownloadButton'

function setup(nextProps = {}) {
  const props = {
    filename: 'a.txt',
    ...nextProps
  }
  const wrapper = shallow(<DownloadButton {...props} />)

  return {
    props,
    wrapper
  }
}

describe('<DownloadButton />', () => {
  it('should match the snapshot', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('should render the AnchorButton with the icon if icon', () => {
    const { wrapper } = setup({ icon: 'search' })
    expect(wrapper.find('AnchorButton')).toHaveLength(1)
    expect(wrapper.find('AnchorButton').props().icon).toEqual('search')
  })

  it('should render the AnchorButton with a text if children', () => {
    const { wrapper } = setup({ children: 'MyButton' })
    expect(wrapper.find('AnchorButton')).toHaveLength(1)
    expect(wrapper.find('AnchorButton').props().children).toEqual('MyButton')
  })
})
