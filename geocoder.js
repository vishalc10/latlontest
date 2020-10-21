const callGeocoder = (fullAddress) => {
    console.log('In Geocoder')
    var geocoder = new google.maps.Geocoder();
    console.log(555, geocoder);

    geocoder.geocode({
        'address': fullAddress
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var lat = results[0].geometry.location.lat();
          var lng = results[0].geometry.location.lng();
          
          let result = {
              lat: lat,
              lng: lng
          }
          return {result};
        }
      })
}

export {callGeocoder}