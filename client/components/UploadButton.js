import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@blueprintjs/core'

const UploadButton = ({ large, onUpload }) => {
  return (
    <React.Fragment>
      <input type="file" name="file" id="file" className="inputfile" onChange={onUpload} />
      <label htmlFor="file" className={`pt-button pt-intent-primary${large ? ' pt-large' : ''}`}>
        <Icon icon="upload" />
        <span>Upload a new file!</span>
      </label>
    </React.Fragment>
  )
}

UploadButton.propTypes = {
  large: PropTypes.bool,
  onUpload: PropTypes.func.isRequired
}

export default UploadButton
