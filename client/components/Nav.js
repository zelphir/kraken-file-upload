import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavbarGroup, NavbarDivider, NavbarHeading } from '@blueprintjs/core'
import UploadButton from './UploadButton'
import logo from './kraken.png'

const Nav = ({ hasData, hasQuery, onUpload, handleFilter }) => {
  return (
    <Navbar className="pt-dark" fixedToTop>
      <NavbarGroup>
        <NavbarHeading>
          <img src={logo} className="logo" />Kraken test
        </NavbarHeading>
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
            disabled={!hasData && !hasQuery}
            className="pt-input pt-fill"
            style={{ minWidth: 240 }}
            type="search"
            placeholder="Search by name or type"
            onChange={handleFilter}
            dir="auto"
          />
        </div>
      </NavbarGroup>
    </Navbar>
  )
}

Nav.propTypes = {
  hasData: PropTypes.bool.isRequired,
  hasQuery: PropTypes.bool.isRequired,
  onUpload: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired
}

export default Nav
