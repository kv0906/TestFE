import React from 'react'
import PropTypes from 'prop-types'
import AddressTable from 'AddressTable'
import AddressAdd from 'AddressAdd'

export default class HomePage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.state.products = [
      {
        id: 1,
        streetname: '12 Le Thanh Ton',
        ward: 1,
        country: 12,
        city: 'football',
        district: 1
      },
      {
        id: 2,
        streetname: '12 Le Thanh Ton',
        ward: 1,
        country: 12,
        city: 'football',
        district: 1
      },
      {
        id: 3,
        streetname: '12 Le Thanh Ton',
        ward: 1,
        country: 12,
        city: 'football',
        district: 1
      },
      {
        id: 4,
        streetname: '12 Le Thanh Ton',
        ward: 1,
        country: 12,
        city: 'football',
        district: 1
      },
      {
        id: 5,
        streetname: '12 Le Thanh Ton',
        ward: 1,
        country: 12,
        city: 'football',
        district: 1
      },
      {
        id: 6,
        streetname: '12 Le Thanh Ton',
        ward: 1,
        country: 12,
        city: 'football',
        district: 1
      }
    ]
  }

  handleAddEvent (evt) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
    var product = {
      id: id,
      streetname: '',
      ward: '',
      country: '',
      city: '',
      district: ''
    }
    this.state.products.push(product)
    this.setState(this.state.products)
  }

  render () {
    return (
      <div className="main">
        <div className="heading">
          <h1>Finding Address Application</h1>
        </div>
        <div className="inner-content">

          <AddressAdd/>

          <AddressTable/>

        </div>
      </div>
    )
  }
}

HomePage.propTypes = {
  route: PropTypes.object,
  params: PropTypes.object
}
