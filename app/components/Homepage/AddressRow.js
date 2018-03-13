import React from 'react'
import PropTypes from 'prop-types'
require('./HomePage.scss')
require('./AddressRow.scss')

export default class AddressRow extends React.Component {
  render () {
    return (
      <tr>
        <td>Berglunds snabbköp</td>
        <td>Christina Berglund</td>
        <td>Sweden</td>
        <td>Maria Anders</td>
        <td>Germany</td>
      </tr>
    )
  }
}

AddressRow.propTypes = {
  route: PropTypes.object,
  params: PropTypes.object
}
