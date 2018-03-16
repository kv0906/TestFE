import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps'
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox'
import {compose, withProps, lifecycle} from 'recompose'


// Assets
require('./AddressAdd.scss')


const MapWithASearchBox = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    lifecycle({
        componentWillMount () {
            const refs = {}

            this.setState({
                bounds: null,
                places: [],
                center: {
                    lat: 41.9, lng: -87.624
                },
                markers: [],
                onMapMounted: ref => {
                    refs.map = ref
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter()
                    })
                },
                getData: () => {
                 //    this.props.autoFillForm(
                 //        this.state.places[0]['address_components'][0]['long_name'],
                 //        this.state.places[0]['address_components'][1]['long_name'],
                 //        this.state.places[0]['address_components'][2]['long_name']
                 // )
                        console.log(this.state.places[0])

                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces()

                    const bounds = new google.maps.LatLngBounds()

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    })
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location
                    }))
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center)


                    this.setState({
                        places,
                        center: nextCenter,
                        markers: nextMarkers
                    })
                    // refs.map.fitBounds(bounds);
                }
            })
        }
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
    >
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Search for your places"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    marginTop: `27px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`
                }}
            />
        </SearchBox>
        <span onClick={props.getData}>Auto fill form</span>
        <div>
            {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
                    <span key={place_id}>
          {formatted_address}
                        {' at '}
                        ({location.lat()}, {location.lng()})
        </span>
            )}
        </div>
        {props.markers.map((marker, index) =>
            <Marker key={index} position={marker.position} />
        )}
    </GoogleMap>
)
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

  autoFillForm = (streetname, city, country) => {
      this.setState({
          newAddress: {
              streetname: streetname,
              ward: '',
              district: '',
              city: city,
              country: country,
          }
      })
  }

  render () {
      return (
      <div>
        <h2>Form</h2>
          <div className="mapWrapper">
              <MapWithASearchBox autoFillForm={this.autoFillForm}/>
          </div>
        <form ref="addressForm">
          <div className="form-group">
            <input id="street_number" onChange={this.handleChangeFor('streetname')} type="text" placeholder="Street name" value={this.state.newAddress.streetname}/>
            <input id="ward" onChange={this.handleChangeFor('ward')} type="text" placeholder="Ward"value={this.state.newAddress.ward}/>
            <input id="district"  onChange={this.handleChangeFor('district')} type="text" placeholder="District"value={this.state.newAddress.district}/>
            <input id="locality" onChange={this.handleChangeFor('city')} type="text" placeholder="City"value={this.state.newAddress.city}/>
            <input id="country"  onChange={this.handleChangeFor('country')} type="text" placeholder="Country"value={this.state.newAddress.country}/>
          </div>
          <button onClick={this.updateAddress} type="submit" className="btn-general">Add new address</button>
        </form>
      </div>

    )
  }
}

AddressAdd.propTypes = {
  route: PropTypes.object,
  params: PropTypes.object,
}
