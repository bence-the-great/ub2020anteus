import React, {useState} from 'react';
import {Map, Polyline, TileLayer, Marker, Popup, Tooltip} from "react-leaflet";
import route from "../data/Route";
import checkpoints from "../data/Checkpoints";
import segments from "../data/Segments";
import athletes from "../data/Athletes";


const balaton = {
  latitude: 46.880000,
  longitude: 17.690000,
  zoom: 11
};

const colors = {
  idle: '#cc4331',
  active: 'blue'
};

const Balaton = () => {
  const renderMarkers = () => {
    return checkpoints.map(checkpoint => {
      return (
        <Marker
          key={checkpoint.id}
          position={[checkpoint.latitude, checkpoint.longitude]}
          title={checkpoint.name}
          opacity={0.6}
        >
          <Tooltip>
            {checkpoint.name}
          </Tooltip>
          <Popup>
            <strong>{checkpoint.name}</strong>
            <p>Waze: </p>
          </Popup>
        </Marker>
      );
    });
  };

  const distance = (a, b) => {
    return Math.sqrt((b.latitude - a.latitude) ** 2 + (b.longitude - a.longitude) ** 2);
  };

  const closest = (checkpoint) => {
    return route.reduce((closest = null, pathPoint) => {
      if (closest === null) {
        return pathPoint;
      } else if (distance(checkpoint, {
        latitude: pathPoint[0],
        longitude: pathPoint[1]
      }) < distance(checkpoint, {latitude: closest[0], longitude: closest[1]})) {
        return pathPoint;
      } else {
        return closest;
      }
    });
  };

  const selectSegment = (from, to) => {
    const closestToFrom = closest(from);
    const closestToTo = closest(to);

    if (from.id === 0){
      return route.slice(
        0,
        route.findIndex(pathPoint => pathPoint === closestToTo) + 1
      );
    } else {
      return route.slice(
        route.findIndex(pathPoint => pathPoint === closestToFrom),
        route.findIndex(pathPoint => pathPoint === closestToTo) + 1
      );
    }
  };

  const renderSegments = () => {
    return segments.map(segment => {
      const fromCheckpoint = checkpoints.find((checkpoint) => checkpoint.id === segment.from);
      const toCheckpoint = checkpoints.find((checkpoint) => checkpoint.id === segment.to);
      const athlete = athletes.find(athlete => athlete.id === segment.athlete);

      return (
        <Polyline
          key={`${segment.id}`}
          positions={selectSegment(fromCheckpoint, toCheckpoint)}
          color={athlete.color}
          weight={6}
        >
          <Tooltip>
            <div>
              {`${segment.id}. szakasz ·`}
              <strong>{`${fromCheckpoint.name} -> ${toCheckpoint.name}`}</strong>
            </div>
            <div>{`${athlete.name}`}</div>
          </Tooltip>
        </Polyline>
      );
    });
  };

  return (
    <Map center={[balaton.latitude, balaton.longitude]} zoom={balaton.zoom} style={{height: '100vh'}}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {renderSegments()}
      {renderMarkers()}
    </Map>
  );
};

export default Balaton;
