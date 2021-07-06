import React, { Dispatch, SetStateAction, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  Popup,
  NavigationControl,
} from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Point } from "../../types";

interface Props {
  points?: any;
  popup?: any[];
  selectedLocation: Point | null;
  setSelectedLocation: Dispatch<SetStateAction<Point| null>>;
}

const AppMapbox: React.FC<Props> = ({
  points,
  popup,
  selectedLocation,
  setSelectedLocation,
}) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 39.7684,
    longitude: -86.1581,
    zoom: 9,
  });
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v11"
  );

  const handlePopupOnClick = (e: any, data: Point) => {
    e.stopPropagation();
    setSelectedLocation(data);
  }; 

  return (
    <div className="app-map-container"
      onClick={() => setSelectedLocation(null)}
    >
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        {...viewport}
        mapStyle={mapStyle}
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
          : points.map((u: any) => {
              return (
                <Marker
                  key={u._id}
                  longitude={parseFloat(u.longitude)}
                  latitude={parseFloat(u.latitude)}
                >
                  <div
                    id={u._id}
                    onClick={(e) => {
                      handlePopupOnClick(e, {
                        _id: u._id,
                        longitude: parseFloat(u.longitude),
                        latitude: parseFloat(u.latitude),
                      })
                    }}
                  >
                    <FaMapMarkerAlt className="map-marker" />
                  </div>
                </Marker>
              );
            })}
        {selectedLocation ? (
          <Popup
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            closeButton={false}
          >
            {popup!.find((u: any) => {
              return u.props.data._id === selectedLocation._id
              })}
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default AppMapbox;
