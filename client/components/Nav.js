import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavbarGroup, NavbarDivider, NavbarHeading } from '@blueprintjs/core'
import UploadButton from './UploadButton'

const Nav = ({ hasData, onUpload }) => {
  return (
    <Navbar className="pt-dark" fixedToTop>
      <NavbarGroup>
        <NavbarHeading>Kraken test</NavbarHeading>
        {hasData && (
          <React.Fragment>
            <NavbarDivider />
            <UploadButton onUpload={onUpload} />
          </React.Fragment>
        )}
      </NavbarGroup>
      <NavbarGroup align="right">
        <div className="pt-input-group">
          <span className="pt-icon pt-icon-search" />
          <input
            className="pt-input pt-fill"
            style={{ minWidth: 240 }}
            type="search"
            placeholder="Search by name or type"
            dir="auto"
          />
        </div>
      </NavbarGroup>
    </Navbar>
  )
}

Nav.propTypes = {
  hasData: PropTypes.bool.isRequired,
  onUpload: PropTypes.func.isRequired
}

export default Nav
