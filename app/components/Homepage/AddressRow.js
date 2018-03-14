import React from 'react'
import PropTypes from 'prop-types'
require('./HomePage.scss')
require('./AddressRow.scss')

export default class AddressRow extends React.Component {
  constructor (props) {
    super(props)
      this.state = {
        isEditing: false,
          disabled: 'disabled',
          newAddress: {
              streetname: '',
              ward: '',
              district: '',
              country: '',
              city: ''
          }
      }
    this.data = props.data
    this.id = props.id
    this.key = props.key
  }
  handleRemoveAddress = (id) => {
    this.props.removeAddress(id)
  }
  handleEdit = (id) => {
      this.props.editAddress(id)
  }
    handleChangeFor = (propertyName) => (event) => {
        const { newAddress } = this.state;
        const newAddressAdding = {
            ...newAddress,
            [propertyName]: event.target.value
        };
        this.setState({ newAddress: newAddressAdding });
    }
    toggleEdit =  () =>  {
        this.setState({
                disabled: ''
            })
    }
    save = (id) => {
        this.props.updateExistingAddress(id , this.state.newAddress)
        //    Reset state
        this.setState({
            disabled: 'disabled',
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
      <tr>
        <td className="cell"><input onChange={this.handleChangeFor('streetname')} disabled={this.state.disabled} type="text" value={this.data.streetname}/></td>
        <td className="cell"><input onChange={this.handleChangeFor('ward')} disabled={this.state.disabled} type="text" value={this.data.ward}/></td>
        <td className="cell"><input onChange={this.handleChangeFor('district')} disabled={this.state.disabled} type="text" value={this.data.district}/></td>
        <td className="cell"><input onChange={this.handleChangeFor('city')} disabled={this.state.disabled} type="text" value={this.data.city}/></td>
        <td className="cell"><input onChange={this.handleChangeFor('country')} disabled={this.state.disabled} type="text" value={this.data.country}/></td>

        <button onClick={() =>this.toggleEdit()} className="button button-edit">Edit</button>
          <button onClick={() =>this.save(this.id)} className="button button-save">Save</button>
        <button onClick={() => this.handleRemoveAddress(this.id)} className="button button-delete">&times;</button>
      </tr>
    )
  }
}

AddressRow.propTypes = {
  data: PropTypes.object
}
