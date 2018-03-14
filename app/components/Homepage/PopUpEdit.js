import React from 'react'
import PropTypes from 'prop-types'
// Assets
import googleMapIcon from '../../vendor/images/google-map.png'
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
    render () {
        return (
            <div>
                <h2>Form</h2>
                <form ref="addressForm">
                    <div className="form-group">
                        <input onChange={this.handleChangeFor('streetname')} type="text" placeholder="Street name" value={this.state.newAddress.streetname}/>
                        <input onChange={this.handleChangeFor('ward')} type="text" placeholder="Ward"value={this.state.newAddress.ward}/>
                        <input onChange={this.handleChangeFor('district')} type="text" placeholder="District"value={this.state.newAddress.district}/>
                        <input onChange={this.handleChangeFor('city')} type="text" placeholder="City"value={this.state.newAddress.city}/>
                        <input onChange={this.handleChangeFor('country')} type="text" placeholder="Country"value={this.state.newAddress.country}/>
                    </div>
                    <button onClick={this.updateAddress} type="submit" className="submit-btn">Add new address</button>
                    {/*<div className="chooseFromMap">*/}
                    {/*</div>*/}
                </form>
            </div>

        )
    }
}

AddressAdd.propTypes = {
    route: PropTypes.object,
    params: PropTypes.object,
}
