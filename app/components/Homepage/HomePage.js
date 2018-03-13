import React from 'react'
import PropTypes from 'prop-types'
import AddressAdd from 'AddressAdd'
import AddressRow from 'AddressRow'
import firebase from 'firebase'
import {DB_CONFIG} from '../Config/config'
import addresses from "../../redux/reducer/addresses";

export default class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.app = firebase.initializeApp(DB_CONFIG)
    this.database = this.app.database().ref().child('addresses')

    this.state = {
      addresses: []
    }
  }
  componentDidMount() {

  }
  componentWillMount () {
    const previousAddress = this.state.addresses
    this.database.on('child_added', snap => {
      previousAddress.push({
          id: snap.key,
          streetname: snap.val().streetname,
          ward: snap.val().ward,
          district: snap.val().district,
          city: snap.val().city,
          country: snap.val().country
      })

        this.setState({
            addresses: previousAddress
        })
    })
  }
  //Adding new address to database
  addNewAddress = (newAddess) => {
      this.database.push().set({
          streetname: newAddess.streetname,
          ward: newAddess.ward,
          district: newAddess.district,
          city: newAddess.city,
          country: newAddess.country,
      });
  }

  render () {
    return (
      <div className="main">
        <div className="heading">
          <h1>Finding Address Application</h1>
        </div>
        <div className="inner-content">
          <AddressAdd addNewAddress={this.addNewAddress}/>
          <div className="address-table">
            <h2>Result</h2>
            <div className="inner-content">
              <table id="addresses">
                <tr className="category">
                  <th>Streetname</th>
                  <th>Ward</th>
                  <th>District</th>
                  <th>City</th>
                  <th>Country</th>
                </tr>
                {this.state.addresses.map((note) => {
                  return (<AddressRow data={note} key={note.id} id={note.id}/>)
                })
                }
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HomePage.propTypes = {
  route: PropTypes.object,
  params: PropTypes.object
}
