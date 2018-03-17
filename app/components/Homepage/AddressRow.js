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


   toggleEdit = () =>  {
        this.setState({
            isEditing: true
        })
    }
    onCancelClick = () => {
        this.setState({isEditing: false})
    }
    handleRemoveAddress = (id) => {
        this.props.removeAddress(id)
    }
    onSaveClick = () => {
        const oldAddress = this.props.data
        const newAddress = this.state.newAddress
        this.props.saveAddress(oldAddress , newAddress);
        this.setState({ isEditing: false });
    }
    handleChangeFor = (propertyName) => (event) => {
        const { newAddress } = this.state;
        const newAddressAdding = {
            ...newAddress,
            [propertyName]: event.target.value
        };
        this.setState({ newAddress: newAddressAdding });
    }
    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <td id="btn-group">
                    <button onClick={this.onSaveClick} className="button button-edit">Save</button>
                    <button onClick={this.onCancelClick} className="button button-delete">Cancel</button>
                </td>
            );
        }

        return (
            <td id="btn-group">
                <button onClick={() =>this.toggleEdit()} className="button button-edit"><i className="fa fa-edit"></i></button>
                <button onClick={() => this.handleRemoveAddress(this.id)} className="button button-delete"><i className="fa fa-times"></i>

                </button>
            </td>
        );
    }
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
