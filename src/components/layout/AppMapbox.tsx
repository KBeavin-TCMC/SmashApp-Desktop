import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  Popup,
  NavigationControl,
} from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { FaMapMarkerAlt } from "react-icons/fa";
import AppButton from "./AppButton";
import { MdClose } from "react-icons/md";

interface Point {
  _id: string;
  longitude: number;
  latitude: number;
}

interface Props {
  points?: any;
}

const AppMapbox: React.FC<Props> = ({ points }) => {
  const [selectedLocation, setSelectedLocation] =
    useState<{ coordinates: number[]; _id: string }>();
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 39.7684,
    longitude: -86.1581,
    zoom: 9,
  });
//   const [mapStyle, setMapStyle] = useState(
//     "mapbox://styles/mapbox/streets-v11"
//   );

  const handlePopup = (e: any, data: any) => {
    e.preventDefault();
    setSelectedLocation(data);
  };

  return (
    <div className="app-map-container">
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        {...viewport}
        // mapStyle={mapStyle}
        className="app-map"
        onViewportChange={(viewport: any) => setViewport(viewport)}
      >
        <div style={{ marginTop: 10, marginLeft: 10 }}>
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            style={{
              backgroundColor: "transparent",
              borderWidth: 0,
              borderColor: "transparent",
              borderStyle: "none",
              boxShadow: "none",
            }}
          />
        </div>
        <div
          style={{
            width: 30,
            height: 50,
            textAlign: "center",
            marginTop: 50,
            marginLeft: 10,
          }}
        >
          <NavigationControl />
        </div>
        {!points
          ? null
          : points.map((u: Point) => {
              return (
                <Marker
                  key={u._id}
                  longitude={u.longitude}
                  latitude={u.latitude}
                >
                  <div
                    id={u._id}
                    onClick={(e) =>
                      handlePopup(e, {
                        coordinates: [u.longitude, u.latitude],
                        _id: u._id,
                      })
                    }
                  >
                    <FaMapMarkerAlt className="map-marker" />
                  </div>
                </Marker>
              );
            })}
        {selectedLocation ? (
          <Popup
            longitude={selectedLocation.coordinates[0]}
            latitude={selectedLocation.coordinates[1]}
            closeButton={false}
          >
            <div className="app-map-popup">
              <div className="popup-image">
                  <MdClose
                    className="popup-close"
                    size={24}
                    onClick={() => console.log("close")}
                  />
              </div>

              <div className="popup-body">
                <div className="popup-col-1">
                  <span>{selectedLocation._id}</span>
                  <h6>123 street rd.</h6>
                  <h6>city, ST 46236</h6>
                </div>
                <div className="popup-col-2">
                  <p style={{ margin: 0 }}>00 Mi.</p>
                  <div className="popup-btn">
                    <AppButton
                      label="Details"
                      onClick={() => console.log("hi")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>

    </div>
  );
};

export default AppMapbox;
