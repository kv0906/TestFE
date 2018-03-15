import React from 'react'
import PropTypes from 'prop-types'
import EditableCell from './EditableCell'
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
    handleChangeFor = (propertyName) => (event) => {
        const { newAddress } = this.state;
        const newAddressAdding = {
            ...newAddress,
            [propertyName]: event.target.value
        };
        this.setState({ newAddress: newAddressAdding });
    }

    onSaveClick = () => {
        // this.props.updateExistingAddress(id , this.state.newAddress)
        //    Reset state
        // this.setState({
        //     disabled: 'disabled',
        //     newAddress: {
        //         streetname: '',
        //         ward: '',
        //         district: '',
        //         country: '',
        //         city: ''
        //     }
        // })
        console.log("Save !")
    }
    toggleEdit =  () =>  {
        this.setState({
            isEditing: true
        })
    }
    onCancelClick = () => {
        this.setState({
            isEditing: false
        })
    }
    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <td>
                    <button onClick={this.onSaveClick.bind(this)} className="button button-edit">Save</button>
                    <button onClick={this.onCancelClick.bind(this)} className="button button-delete">Cancel</button>
                </td>
            );
        }

        return (
            <td>
                <button onClick={() =>this.toggleEdit()} className="button button-edit">Edit</button>
                <button onClick={() => this.handleRemoveAddress(this.id)} className="button button-delete">&times;</button>
            </td>
        );
    }

  render () {
    return (
      <tr>
        <td className="cell"><EditableCell isEditing={this.state.isEditing} data = {this.data} category='streetname'/></td>
        <td className="cell"><EditableCell isEditing={this.state.isEditing} data = {this.data} category='ward'/></td>
        <td className="cell"><EditableCell isEditing={this.state.isEditing} data = {this.data} category='district'/></td>
        <td className="cell"><EditableCell isEditing={this.state.isEditing} data = {this.data} category='city'/></td>
        <td className="cell"><EditableCell isEditing={this.state.isEditing} data = {this.data} category='country'/></td>
          {this.renderActionsSection()}
      </tr>
    )
  }
}

AddressRow.propTypes = {
  data: PropTypes.object
}
