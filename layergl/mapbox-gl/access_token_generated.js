'use strict';

mapboxgl.accessToken = getAccessToken();

function getAccessToken() {
    var accessToken = (
        'pk.eyJ1IjoiamFrZWpvdWUiLCJhIjoiY2tyZnNlM2d1MG5tMDJ1cW5jaXN2MW02NyJ9.H6m2TZiZaAwet6HXv1TMvQ' ||
        getURLParameter('access_token') ||
        localStorage.getItem('accessToken')
    );
    try {
        localStorage.setItem('accessToken', accessToken);
    } catch (_) {}
    return accessToken;
}

function getURLParameter(name) {
    var regexp = new RegExp('[?&]' + name + '=([^&#]*)', 'i');
    var output = regexp.exec(window.location.href);
    return output && output[1];
}
