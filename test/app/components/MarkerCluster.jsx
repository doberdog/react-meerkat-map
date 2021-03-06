'use strict';

import React from 'react/addons';
import { assert } from 'chai';

import MarkerCluster from '../../../app/components/MarkerCluster';
import MyMap from '../../../app/components/Map';
// import { Map } from 'react-leaflet';

const TestUtils = React.addons.TestUtils;

describe('MarkerCluster component', function () {
  xit('should add a marker for every property in newMarkerData property', function () {
    const data = [
      {
        id: 0,
        latLng: [0, 0],
      },
      {
        id: 1,
        latLng: [1, 1],
      },
    ];

    const component = React.render(
      <MyMap newMarkerData={data} updateMarkers={() => {}}/>,
      document.body
    );
    const cluster = TestUtils.findRenderedComponentWithType(component, MarkerCluster).leafletElement;

    assert.lengthOf(cluster.getLayers(), Object.keys(data).length);
  });

  /*
  it('should focus on a marker using focusMarker property', function () {
    const data = {
      id: 0,
      latlng: [1, 1]
    };

    const component = React.render(
      <MyMap markerData={[data]} focusMarker={data} />,
      document.body
    );

    const mapLeaflet = TestUtils.findRenderedComponentWithType(component, Map).getLeafletElement();
    console.log(mapLeaflet.getCenter());
  });
  */
});
