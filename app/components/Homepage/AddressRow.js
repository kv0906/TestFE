import React from 'react'
import PropTypes from 'prop-types'
require('./HomePage.scss')
require('./AddressRow.scss')

export default class AddressRow extends React.Component {
  constructor (props) {
    super(props)
    this.data = props.data
    this.id = props.id
    this.key = props.key
  }
  render () {
    return (
      <tr>
        <td>{this.data.streetname}</td>
        <td>{this.data.ward}</td>
        <td>{this.data.district}</td>
        <td>{this.data.city}</td>
        <td>{this.data.country}</td>
      </tr>
    )
  }
}

AddressRow.propTypes = {
  data: PropTypes.object
}
