import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getFiles } from '../redux/files/actions'

class App extends React.PureComponent {
  static propTypes = {
    files: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      data: PropTypes.array.isRequired,
      error: PropTypes.string
    }),
    getFiles: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getFiles()
  }

  render() {
    const { data, isLoading, error } = this.props.files

    if (error) return <h2>:-( Ops, something went wrong! Try again.</h2>

    return isLoading ? (
      <div>loading...</div>
    ) : (
      <React.Fragment>
        {!data.length ? <h2>:-( Ops, no files found! Add one!</h2> : <div>file list</div>}
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ files }) => ({ files })
const mapDispatchToProps = dispatch => ({ getFiles: () => dispatch(getFiles()) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
