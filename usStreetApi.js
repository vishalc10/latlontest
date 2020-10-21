import { callGeocoder } from './geocoder'
const callUSStreetApi = (fullAddress) => {
    /* Initialize the SDK. */
    const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
    const SmartyStreetsCore = SmartyStreetsSDK.core;
    const Lookup = SmartyStreetsSDK.usStreet.Lookup;

    //Client side key
    const websiteKey = "8945708976961762"; // Update this with your website key.
    const credentials = new SmartyStreetsCore.SharedCredentials(websiteKey);

    //build new client
    const clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials);
    const client = clientBuilder.buildUsStreetApiClient();

    // Create a new lookup with the input value.
    const lookup = new Lookup(fullAddress);
    lookup.maxCandidates = 1;
    lookup.match = "strict";

    // Send the lookup with the SDK. The SDK returns a promise.
    return client.send(lookup).then((res) => {
        return handleResponse(res)
    }).catch((res) => {
        return callGeocoder(fullAddress);
    });
};

const handleResponse = (res) => {
    console.log('In Street Handle response');
    let lat = res.lookups[0].result[0].metadata.latitude;
    let lng = res.lookups[0].result[0].metadata.longitude;

    let result = {
        lat: lat,
        lng: lng
    }

    //return lat lng object
    return { result };
};
  
const handleError = (res) => {
//return error msg
console.log('In Error');
return res;
};
  
module.exports.callUSStreetApi = callUSStreetApi;
  