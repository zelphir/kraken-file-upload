import React from 'react'
import PropTypes from 'prop-types'
import { Button, NonIdealState, Tag } from '@blueprintjs/core'
import { getClassNameForExtension } from 'font-awesome-filetypes'

const List = ({ data }) => {
  return !data.length ? (
    <NonIdealState visual="folder-open" title="Your folder is empty!" className="spacer">
      <Button large icon="upload" text="Upload a new file" intent="primary" />
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
              <Button minimal className="filename">
                {file.originalName}
              </Button>
              <Tag minimal>
                <em>{Math.round(file.size * 100) / 100}kb</em>
              </Tag>
            </td>
            <td>
              <Button minimal icon="download" intent="primary" />
              <Button minimal icon="delete" intent="danger" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

List.propTypes = {
  data: PropTypes.array.isRequired
}

export default List
