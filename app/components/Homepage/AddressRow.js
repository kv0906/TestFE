import React from 'react'
import PropTypes from 'prop-types'
require('./HomePage.scss')


export default class AddressRow extends React.Component {
  constructor (props) {
    super(props)
      this.state = {
        isEditing: false,
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
  }

    //Toggle edit input
   toggleEdit = () =>  {
        this.setState({
            isEditing: true
        })
    }

    //Handle event clicking on cancel button
    onCancelClick = () => {
        this.setState({isEditing: false})
    }

    //Handle remove address row
    handleRemoveAddress = (id) => {
        this.props.removeAddress(id)
    }

    //Handle save address
    onSaveClick = () => {
        const oldAddress = this.props.data
        const newAddress = this.state.newAddress
        this.props.saveAddress(oldAddress , newAddress);
        this.setState({ isEditing: false });
    }
    //Handle input change value
    handleChangeFor = (propertyName) => (event) => {
        const { newAddress } = this.state;
        const newAddressAdding = {
            ...newAddress,
            [propertyName]: event.target.value
        };
        this.setState({ newAddress: newAddressAdding });
    }
    //Render different actions based on state
    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <td id="btn-group">
                    <button onClick={this.onSaveClick} className="button button-save t">Save</button>
                    <button onClick={this.onCancelClick} className="button button-cancel">Cancel</button>
                </td>
            );
        }

        return (
            <td id="btn-group">
                <button onClick={() =>this.toggleEdit()} className="button-circle button-circle-edit"><i className="fa fa-edit"></i></button>
                <button onClick={() => this.handleRemoveAddress(this.id)} className="button-circle button-circle-delete"><i className="fa fa-times"></i>
                </button>
            </td>
        );
    }

    //Render different cell type based on state
    renderCell = (cat) => {
        let {isEditing} = this.state;

        if (isEditing) {
            return (
                <td className="cell"><input onChange={this.handleChangeFor(cat)} type="text" defaultValue={this.data[cat]} ref="editInput" />
                </td>
            );
        }

        return (
            <td className="cell">{this.data[cat]}</td>

        );
    }

  render () {
    return (
      <tr>
          {this.renderCell('streetname')}
          {this.renderCell('ward')}
          {this.renderCell('district')}
          {this.renderCell('city')}
          {this.renderCell('country')}
          {this.renderActionsSection()}
      </tr>
    )
  }
}

AddressRow.propTypes = {
  data: PropTypes.object
}
