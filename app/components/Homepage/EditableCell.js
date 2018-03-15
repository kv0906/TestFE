import React from 'react'
import PropTypes from 'prop-types'
require('./HomePage.scss')
require('./AddressRow.scss')

export default class EditableCell extends React.Component {
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
        console.log("on save clicked !")
    }
    renderCell = () => {
        let { category, data, isEditing} = this.props;

        if (isEditing) {
            return (
                <input onSubmit={this.onSaveClick} type="text" defaultValue={data[category]} ref="editInput" />
            );
        }

        return (
            <span>{data[category]}</span>
        );
    }


    render () {
        return (
            <div>
                {this.renderCell()}
            </div>
        )
    }
}

EditableCell.propTypes = {
    data: PropTypes.object
}
