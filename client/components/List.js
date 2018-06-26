import React from 'react'
import PropTypes from 'prop-types'
import { Button, NonIdealState, Tag } from '@blueprintjs/core'
import { getClassNameForExtension } from 'font-awesome-filetypes'
import DownloadButton from './DownloadButton'
import UploadButton from './UploadButton'

const List = ({ data, onDelete, onUpload, hasQuery }) => {
  if (!data.length && hasQuery)
    return <NonIdealState visual="search" title="No result!" className="spacer" />

  return !data.length ? (
    <NonIdealState visual="folder-open" title="Your folder is empty!" className="spacer">
      <UploadButton large onUpload={onUpload} />
    </NonIdealState>
  ) : (
    <table className="pt-html-table pt-html-table-striped">
      <thead>
        <tr>
          <th>File</th>
          <th style={{ width: 100 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(file => (
          <tr key={file._id}>
            <td>
              <i className={`fa ${getClassNameForExtension(file.type)} fa-lg`} />
              <DownloadButton className="filename" filename={file.filename}>
                {file.originalName}
              </DownloadButton>
              <Tag minimal>
                <em>{Math.round(file.size * 100) / 100}kb</em>
              </Tag>
            </td>
            <td>
              <DownloadButton icon="download" intent="primary" filename={file.filename} />
              <Button
                minimal
                className="delete"
                icon="delete"
                intent="danger"
                onClick={onDelete}
                value={file.filename}
              >
                {file.filename}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  hasQuery: PropTypes.bool.isRequired
}

export default List
