import {compose, lifecycle, withProps, withStateHandlers} from 'recompose'
import React from 'react'
import _ from 'lodash'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox'
const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox')

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAWvDeudJ4Rb6GIKNgY1raEH4beiT1WJaA&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(() => ({
    isOpen: false
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen
    })
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
          this.props.autoFillForm(
            this.state.places[0]['address_components'][0]['long_name'],
            this.state.places[0]['address_components'][1]['long_name'],
            this.state.places[0]['address_components'][2]['long_name']
          )
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
      <Marker key={index} position={marker.position} onMouseOver={props.onToggleOpen} onClick={props.getData}
      > {props.isOpen && <InfoBox
          onMouseOut={props.onToggleOpen}
          options={{ closeBoxURL: ``, enableEventPropagation: true }}
        >
          <div style={{ width: '100px', height: '30px', backgroundColor: `white`, padding: `12px`, textAlign: 'center' }}>
            <div style={{ fontSize: `14px`, fontColor: `#000`, fontWeight: 'bold' }}>
                Click to autofill form
            </div>
          </div>
        </InfoBox>}

      </Marker>
    )}
  </GoogleMap>
)

export default MapWithASearchBox
