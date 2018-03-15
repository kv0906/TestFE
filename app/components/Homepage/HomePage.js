import React from 'react'
import PropTypes from 'prop-types'
import AddressAdd from 'AddressAdd'
import AddressRow from 'AddressRow'
import firebase from 'firebase'
import {CSVLink, CSVDownload} from 'react-csv';
import { Marker } from 'react-google-maps'

import {DB_CONFIG} from '../Config/config'
import addresses from "../../redux/reducer/addresses";
import MapContainer from './MapContainer'

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
      this.database.on('child_removed', snap => {
          for(var i=0; i < previousAddress.length; i++){
              if(previousAddress[i].id === snap.key){
                  previousAddress.splice(i, 1);
              }
          }

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
  updateExistingAddress = (id, data) => {
      this.database.child(id).update(data);
    }
    removeAddress = (addressID) => {
        console.log("from the parent: " + addressID);
        this.database.child(addressID).remove();
    }
  render () {
    return (
      <div className="main">
        <div className="heading">
          <h1>Saving Address Application</h1>
        </div>
        <div className="inner-content">
            <MapContainer/>
          <AddressAdd addNewAddress={this.addNewAddress}/>
          <div className="address-table">
            <h2>Result</h2>
              <div className="download-csv">
                  <CSVLink data={this.state.addresses}>Download CSV</CSVLink>
              </div>
            <div className="inner-content">
              <table id="addresses">
                <tr className="category">
                  <th>Streetname</th>
                  <th>Ward</th>
                  <th>District</th>
                  <th>City</th>
                  <th>Country</th>
                </tr>
                {this.state.addresses.map((add) => {
                  return (<AddressRow updateExistingAddress={this.updateExistingAddress} removeAddress ={this.removeAddress} data={add} key={add.id} id={add.id}/>)
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
