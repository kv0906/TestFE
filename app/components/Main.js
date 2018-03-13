import React from 'react'
import PropTypes from 'prop-types'

export default class Main extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

Main.propTypes = {
  children: PropTypes.element.isRequired
}
