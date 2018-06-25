import React from 'react'

class App extends React.PureComponent {
  state = {
    isLoading: true,
    isError: false,
    files: []
  }

  fetchData() {
    // call api
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const { isLoading, isError, files } = this.state

    if (isError) return <h2>:-( Ops, something went wrong! Try again.</h2>

    return isLoading ? (
      <div>loading...</div>
    ) : (
      <React.Fragment>
        {!files.length ? <h2>:-( Ops, no files found! Add one!</h2> : <div>file list</div>}
      </React.Fragment>
    )
  }
}

export default App
