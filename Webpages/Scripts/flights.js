function loadData(){
    const params = new URLSearchParams(window.location.search);
    const flight_from = params.get("from");
    const flight_to = params.get("to");
    const flight_date = params.get("date");

    document.getElementById("from-heading").textContent = flight_from;
    document.getElementById("to-heading").textContent = flight_to;
    document.getElementById("date-heading").textContent = flight_date;

    return [flight_from, flight_to];
}

function calculateDuration(time1, time2){
    const [h1, m1] = time1.split(":").map(Number);
    const [h2, m2] = time2.split(":").map(Number);

    const minutes1 = h1 * 60 + m1;
    const minutes2 = h2 * 60 + m2;

    let diffMinutes = minutes1 - minutes2;

    if (diffMinutes < 0) {
        diffMinutes += 24 * 60;
    }

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return hours + "h " + minutes + "min";
}

function getBooking(flighttimeFrom, flighttimeTo, flightlocationFrom, flightlocationTo, duration, flightprice){
    window.location.href = `booking.html?flighttimeFrom=${encodeURIComponent(flighttimeFrom)}&flighttimeTo=${encodeURIComponent(flighttimeTo)}&flightlocationFrom=${encodeURIComponent(flightlocationFrom)}&flightlocationTo=${encodeURIComponent(flightlocationTo)}&duration=${encodeURIComponent(duration)}&flightprice=${encodeURIComponent(flightprice)}`;
}


function loadXMLFile() {
    return fetch('Data/flights.xml')
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");
            return xmlDoc;
        })
        .catch(error => {
            alert("Error loading XML: " + error);
        });
}

function addFlights(flight_from_to) {
    loadXMLFile().then(xmlDoc => {
        if (!xmlDoc) return;

        let flights = xmlDoc.getElementsByTagName("flight");

        let flights_container = document.getElementsByClassName("flights-container")[0];

        for (let i = 0; i < flights.length; i++){

            let flighttime = flights[i].getElementsByTagName("flighttime")[0];
            let flighttimeFrom = flighttime.getElementsByTagName("from")[0].textContent;
            let flighttimeTo = flighttime.getElementsByTagName("to")[0].textContent;

            let flightlocation = flights[i].getElementsByTagName("flightlocation")[0];
            let flightlocationFrom = flightlocation.getElementsByTagName("from")[0].textContent;
            let flightlocationTo = flightlocation.getElementsByTagName("to")[0].textContent;

            let flightpriceDetails = flights[i].getElementsByTagName("flightprice")[0].textContent;

            if (flight_from_to[0] == flightlocationFrom && flight_from_to[1] == flightlocationTo){
                let flight_card = document.createElement('div');
                flight_card.className = "flight-card";

                let flight_details = document.createElement('div');
                flight_details.className = "flight-details";

                let hline = document.createElement("hr");

                flight_details.append(hline);

                let flight_info = document.createElement('div');
                flight_info.className = "flight-info";

                let flight_time_start = document.createElement('div');
                flight_time_start.className = "time";

                let flight_time_from = document.createElement('strong');
                flight_time_from.textContent = flighttimeFrom;
                let flight_time_from_location = document.createElement('span');
                flight_time_from_location.textContent = flightlocationFrom;

                flight_time_start.append(flight_time_from, flight_time_from_location);

                let duration = document.createElement('div');
                duration.className = "duration";

                let total_time = document.createElement('span');
                total_time.className = "total-time";

                let calculatedDuration = calculateDuration(flighttimeTo, flighttimeFrom);

                total_time.textContent = calculatedDuration;

                duration.append(total_time);

                let flight_time_end = document.createElement('div');
                flight_time_end.className = "time";

                let flight_time_to = document.createElement('strong');
                flight_time_to.textContent = flighttimeTo;
                let flight_time_to_location = document.createElement('span');
                flight_time_to_location.textContent = flightlocationTo;

                flight_time_end.append(flight_time_to, flight_time_to_location);

                flight_info.append(flight_time_start, duration, flight_time_end);

                flight_details.append(flight_info, hline);

                let flight_price_container = document.createElement("div");
                flight_price_container.className = "flight-price";

                let flight_gurantee = document.createElement("div");
                flight_gurantee.className = "guarantee";
                flight_gurantee.textContent = "Available";

                let flight_price = document.createElement("div");
                flight_price.className = "price";
                flight_price.textContent = Number(flightpriceDetails).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

                let flight_select_button = document.createElement("button");
                flight_select_button.textContent = "Select";
                flight_select_button.addEventListener("click", function(){
                    getBooking(flighttimeFrom, flighttimeTo, flightlocationFrom, flightlocationTo, calculatedDuration, flightpriceDetails);
                });

                flight_price_container.append(flight_gurantee, flight_price, flight_select_button);

                flight_card.append(flight_details, flight_price_container);

                flights_container.append(flight_card);
            }
        }
    });
}


// All this waits until DOM is loaded:
window.addEventListener('DOMContentLoaded', function () {
    let flight_from_to = loadData();

    addFlights(flight_from_to);
});