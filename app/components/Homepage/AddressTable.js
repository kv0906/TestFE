import React from 'react'
import PropTypes from 'prop-types'
require('./AddressTable.scss')
import AddressRow from 'AddressRow'
require('./AddressTable.scss')

export default class AddressTable extends React.Component {
  render () {
    return (
      <div className="address-table">
        <h2>Result</h2>
        <div className="inner-content">
          <table id="addresses">
            <tr className="category">
              <th>Streetname</th>
              <th>Ward</th>
              <th>District</th>
              <th>City</th>
              <th>Country</th>
            </tr>
            <AddressRow/>

          </table>
        </div>
      </div>
    )
  }
}

AddressTable.propTypes = {
  route: PropTypes.object,
  params: PropTypes.object
}
