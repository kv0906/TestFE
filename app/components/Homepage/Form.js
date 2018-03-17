import React from 'react'
import PropTypes from 'prop-types'
import MapWithASearchBox from './MapWithASearchBox'
// Assets
require('./Form.scss')
export default class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

        //validate state
        errorClass:'',
        errorClassCity:'',
        streetValid: false,
        formValid: false,
        wardValid: false,
        districtValid:false,
        cityValid: false,

        //Object address state
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
    validateInput = (e) => {
        e.preventDefault()

      //validate streetname
      if (this.state.newAddress.streetname.length > 0) {
          this.setState({
              streetValid: true,
              cityValid: true,
              errorClass: '',
              errorClassCity:'',
          })
      }
      if (this.state.newAddress.streetname.length > 0 && this.state.newAddress.ward.length > 0 && this.state.newAddress.district.length > 0) {
            this.setState({
                streetValid: true,
                cityValid: true,
                errorClass: '',
                errorClassCity:'',
            })
      }
      if (this.state.newAddress.streetname.length === 0) {
          this.setState({
              streetValid: false,
              errorClass: 'error',
              errorClassCity: ''
          })
      }
        if (this.state.newAddress.city.length === 0 && this.state.newAddress.ward.length > 0 && this.state.newAddress.district.length > 0) {
            this.setState({
                cityValid: true,
                errorClassCity: ''
            })
        }

      //Validate city
      if (this.state.newAddress.city.length > 0 || (this.state.newAddress.ward.length > 0 && this.state.newAddress.district.length > 0)) {
          this.setState({
              cityValid: true,
              errorClassCity: ''
          })
      }
      if (this.state.newAddress.city.length === 0 && this.state.newAddress.ward.length === 0 && this.state.newAddress.district.length === 0) {
          this.setState({
              errorClassCity: 'error'
          })
      }
      if (this.state.streetValid === true && this.state.cityValid === true) {
            this.setState({
                formValid: true
            },() => {
                this.updateAddress();
            });
      }
    }

  autoFillForm = (streetname, ward, district ,city, country) => {
      this.setState({
          newAddress: {
              streetname: streetname,
              ward: ward,
              district: district,
              city: city,
              country: country,
          }
      })
  }
  updateAddress = () => {
      this.props.addNewAddress(this.state.newAddress)

      //    Reset state
      this.setState({

          errorClass:'',
          errorClassCity:'',
          streetValid: false,
          wardValid: false,
          districtValid:false,
          cityValid: false,
          formValid:false,

          newAddress: {
              streetname: '',
              ward: '',
              district: '',
              country: '',
              city: ''
          }
      })
  }
  renderErrorMsg () {
      const {errorClass} = this.state

      if (errorClass === 'error')
          return <span>* Street is always required</span>
      else {
          return null
      }
  }
    renderErrorMsgCity () {
        const {errorClassCity} = this.state

        if (errorClassCity === 'error') {
            return <span>* Both district and ward are required</span>
        }
        else {
            return null
        }
    }


  render () {

      return(
          <div>
              <h2>Form</h2>
              <div className="wrapper">
                  <div className="mapWrapper">
                      <MapWithASearchBox autoFillForm={this.autoFillForm}/>
                      <span className="note">* Click marker to auto fill form</span>
                  </div>

                  <form ref="addressForm">
                      <div className="error-msg">
                          {this.renderErrorMsg()}
                          {this.renderErrorMsgCity()}
                      </div>
                      <div className="form-group">
                          <div className="input-group">
                              <input className={this.state.errorClass} onChange={this.handleChangeFor('streetname')} type="text" placeholder="Street name" value={this.state.newAddress.streetname}/>
                          </div>
                          <div className="input-group">
                              <input className={this.state.errorClassCity} onChange={this.handleChangeFor('ward')} type="text" placeholder="Ward"value={this.state.newAddress.ward}/>
                          </div>
                          <div className="input-group">
                              <input className={this.state.errorClassCity} onChange={this.handleChangeFor('district')} type="text" placeholder="District"value={this.state.newAddress.district}/>
                          </div>
                          <div className="input-group">
                              <input onChange={this.handleChangeFor('city')} type="text" placeholder="City"value={this.state.newAddress.city}/>
                          </div>
                          <div className="input-group">
                              <input onChange={this.handleChangeFor('country')} type="text" placeholder="Country"value={this.state.newAddress.country}/>
                          </div>
                          <button onClick={this.validateInput} type="submit" className="btn-general">Add new address</button>

                      </div>
                  </form>
              </div>


          </div>
          )

  }
}

Form.propTypes = {
  route: PropTypes.object,
  params: PropTypes.object,
}
