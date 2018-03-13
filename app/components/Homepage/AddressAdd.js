import React from 'react'
import PropTypes from 'prop-types'
// Assets
import googleMapIcon from '../../vendor/images/google-map.png'
require('./AddressAdd.scss')

export default class AddressAdd extends React.Component {
  render () {
    return (
      <div>
        <h2>Form</h2>
        <form ref="addressForm" onSubmit={this.createFruit}>
          <div className="form-group">
            <input type="text" placeholder="Street name" ref="fruitName"/>
            <input type="text" placeholder="Ward" ref="fruitName" />
            <input type="text" placeholder="District" ref="fruitName" />
            <input type="text" placeholder="City" ref="fruitName" />
            <input type="text" placeholder="Country" ref="fruitName" />
          </div>
          <button type="submit" className="submit-btn">Add</button>
          <div className="chooseFromMap">
          </div>
        </form>
      </div>

    )
  }
}

AddressAdd.propTypes = {
  route: PropTypes.object,
  params: PropTypes.object
}
