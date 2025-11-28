function openDestinationsPage(){
    window.location.href = `destinations.html`;
}

function openPackagesPage(){
    window.location.href = `packages.html`
}

function openTestimonialsPage(){
    window.location.href = `testimonials.html`;
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

function packageClick(img, name, description, flight_time_from, flight_time_to, flightprice){
    let duration = calculateDuration(flight_time_to, flight_time_from);

    let packageData = JSON.parse(localStorage.getItem('packageData')) || {
        PackageImage: [],
        PackageName: [],
        PackageDescription: [],
        PackagePrice: []
    };
    
    packageData["PackageImage"].push(img);
    packageData["PackageName"].push(name);
    packageData["PackageDescription"].push(description);
    packageData["PackagePrice"].push(flightprice);

    localStorage.setItem('packageData', JSON.stringify(packageData));

    window.location.href = `booking.html?flighttimeFrom=${encodeURIComponent(flight_time_from)}&flighttimeTo=${encodeURIComponent(flight_time_to)}&flightlocationFrom=${encodeURIComponent("Colombo")}&flightlocationTo=${encodeURIComponent(name)}&duration=${encodeURIComponent(duration)}&flightprice=${encodeURIComponent(flightprice)}`;
}

window.addEventListener("DOMContentLoaded", function(){
    this.localStorage.clear();

    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleSidebar");
    const closeBtn = document.getElementById("closeSidebar");

    let overlay = document.createElement("div");
    overlay.classList.add("sidebar-overlay");
    document.body.append(overlay);

    toggleBtn.addEventListener("click", () => {
        sidebar.style.width = "250px";
        overlay.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
        sidebar.style.width = "0";
        overlay.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
        sidebar.style.width = "0";
        overlay.classList.remove("active");
    });

    document.getElementById('search-flights-form').addEventListener('submit', function(event) {
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value.trim();
        const date = document.getElementById('date').value;

        event.preventDefault();

        if (!to) {
            alert('Please enter a destination.');
            event.preventDefault();
            return;
        }
        if (!date) {
            alert('Please select a date.');
            event.preventDefault();
            return;
        }

        if (from.toLowerCase() === to.toLowerCase()) {
            alert('Departure and destination cannot be the same.');
            event.preventDefault();
            return;
        }

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0,0,0,0);

        if (selectedDate < today) {
            alert('Please select a valid date (not in the past).');
            event.preventDefault();
            return;
        }

        window.location.href = `flights.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`;
    });
});
