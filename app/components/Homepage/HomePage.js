import React from 'react'
import PropTypes from 'prop-types'
import AddressAdd from 'AddressAdd'
import _ from 'lodash'
import AddressRow from 'AddressRow'
import firebase from 'firebase'
import {CSVLink, CSVDownload} from 'react-csv';
import { Marker } from 'react-google-maps'

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
      // this.database.on('child_changed', snap => {
      //     for(var i=0; i < previousAddress.length; i++){
      //         previousAddress[i].id = snap.key
      //         previousAddress[i].streetname = snap.val().streetname
      //         previousAddress[i].ward = snap.val().ward
      //         previousAddress[i].country = snap.val().country
      //         previousAddress[i].city = snap.val().city
      //         previousAddress[i].district = snap.val().district
      //     }
      //     this.setState({
      //         addresses: previousAddress
      //     })
      // })
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
    saveAddress = (oldAddress , newAddress) => {
        const foundAddress = _.find(this.state.addresses, address => address.key === oldAddress.key);
        foundAddress.streetname = newAddress.streetname
        foundAddress.ward = newAddress.ward
        foundAddress.district = newAddress.district
        foundAddress.city = newAddress.city
        foundAddress.country = newAddress.country
        this.setState({ addresses: this.state.addresses });
        console.log(newAddress)
        // console.log(id)
        // this.database.child(id).update({
        //     streetname: newAddess.streetname,
        //     ward: newAddess.ward,
        //     district: newAddess.district,
        //     city: newAddess.city,
        //     country: newAddess.country,
        // })
    }
    removeAddress = (addressID) => {
        console.log("from the parent: " + addressID);
        this.database.child(addressID).remove();
    }
  render () {
    return (
      <div className="container">
        <div className="heading">
          <h1>Saving Address Application</h1>
        </div>
        <div className="inner-content">
          <AddressAdd addNewAddress={this.addNewAddress}/>
          <div className="address-table">
            <h2>Result</h2>
            <div className="inner-content">
              <table id="addresses">
                  <tbody>
                  <tr className="category">
                      <th>Streetname</th>
                      <th>Ward</th>
                      <th>District</th>
                      <th>City</th>
                      <th>Country</th>
                  </tr>
                  {this.state.addresses.map((add) => {
                      return (<AddressRow saveAddress={this.saveAddress} removeAddress ={this.removeAddress} data={add} key={add.id} id={add.id}/>)
                  })
                  }
                  </tbody>
              </table>
                <div className="btn-general">
                    <CSVLink data={this.state.addresses}>Download CSV</CSVLink>
                </div>
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
