import React from 'react'
import PropTypes from 'prop-types'
import MapWithASearchBox from './MapWithASearchBox'
// Assets
require('./AddressAdd.scss')
export default class AddressAdd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        newAddress: {
        streetname: '',
        ward: '',
        district: '',
        country: '',
        city: ''
      }
    }
  }
    handleChangeFor = (propertyName) => (event) => {
        const { newAddress } = this.state;
        const newAddressAdding = {
            ...newAddress,
            [propertyName]: event.target.value
        };
        this.setState({ newAddress: newAddressAdding });
  }
  updateAddress = (e) => {
    e.preventDefault()
    this.props.addNewAddress(this.state.newAddress)
    //    Reset state
    this.setState({
      newAddress: {
        streetname: '',
        ward: '',
        district: '',
        country: '',
        city: ''
      }
    })
  }

  autoFillForm = (streetname, city, country) => {
      this.setState({
          newAddress: {
              streetname: streetname,
              ward: '',
              district: '',
              city: city,
              country: country,
          }
      })
  }

  render () {
      return (
      <div>
        <h2>Form</h2>
          <div className="mapWrapper">
              <MapWithASearchBox autoFillForm={this.autoFillForm}/>
          </div>
        <form ref="addressForm">
          <div className="form-group">
            <input id="street_number" onChange={this.handleChangeFor('streetname')} type="text" placeholder="Street name" value={this.state.newAddress.streetname}/>
            <input id="ward" onChange={this.handleChangeFor('ward')} type="text" placeholder="Ward"value={this.state.newAddress.ward}/>
            <input id="district"  onChange={this.handleChangeFor('district')} type="text" placeholder="District"value={this.state.newAddress.district}/>
            <input id="locality" onChange={this.handleChangeFor('city')} type="text" placeholder="City"value={this.state.newAddress.city}/>
            <input id="country"  onChange={this.handleChangeFor('country')} type="text" placeholder="Country"value={this.state.newAddress.country}/>
          </div>
          <button onClick={this.updateAddress} type="submit" className="btn-general">Add new address</button>
        </form>
      </div>

    )
  }
}

AddressAdd.propTypes = {
  route: PropTypes.object,
  params: PropTypes.object,
}
