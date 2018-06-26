import React from 'react'
import PropTypes from 'prop-types'
import { AnchorButton } from '@blueprintjs/core'
import { apiUrl } from '../consts'

const DownloadButton = ({ filename, children, ...props }) => {
  return (
    <AnchorButton minimal {...props} href={`${apiUrl}/files/${filename}`}>
      {children}
    </AnchorButton>
  )
}

DownloadButton.propTypes = {
  filename: PropTypes.string.isRequired,
  children: PropTypes.string
}

export default DownloadButton
