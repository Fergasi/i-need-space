// variables
let apiKey = document.querySelector("#api-key");
let addressInput = document.querySelector("#address");
let satelliteInput = document.querySelector("#norad");
let search = document.querySelector("#search");
let output = document.querySelector("#result");
let lat = 0;
let long = 0;

// output variables
let rise = document.querySelector("#rise");
let culminate = document.querySelector("#culminate");
let set = document.querySelector("#set");

// event listener for search button and then Mapbox api fetch based on address input
search.addEventListener("click", function () {

    fetch(encodeURI(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address.value}.json?access_token=${apiKey.value}`))
    .then(function (httpResponse) {
        return httpResponse.json();
    })
    .then(function (data) {

        lat = data.features[0].center[1];
        long = data.features[0].center[0];

        // fetch second api with latitude, longitude, and satellite id
        fetch(`https://satellites.fly.dev/passes/${satelliteInput.value}?lat=${lat}&lon=${long}&limit=1`)
        .then(function (httpResponse) {
            return httpResponse.json();
        })
        .then(function (data) {
            
            let riseUTC = new Date(data[0].rise.utc_datetime);
            let culminateUTC = new Date(data[0].culmination.utc_datetime);
            let setUTC = new Date(data[0].set.utc_datetime);

            rise.innerText = `Rise Time: ${riseUTC}`;
            culminate.innerText = `Culmination Time: ${culminateUTC}`;
            set.innerText = `Set Time: ${setUTC}`;

        })

    })


}
)