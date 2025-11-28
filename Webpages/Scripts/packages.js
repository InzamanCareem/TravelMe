function loadXMLFile() {
    return fetch('Data/packages.xml')
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

function getBooking(img, name, description, flight_time_from, flight_time_to, flightprice){
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

function getPackages(i, packages, package_grid){
    let img = packages[i].getElementsByTagName("packageImg")[0].textContent;
    let name = packages[i].getElementsByTagName("packageName")[0].textContent;
    let rating = packages[i].getElementsByTagName("packageRating")[0]
    let ratingImg = rating.getElementsByTagName("packageRatingImg")[0].textContent;
    let ratingCount = Number(rating.getElementsByTagName("packageRatingCount")[0].textContent);
    let description = packages[i].getElementsByTagName("packageDescription")[0].textContent;
    let includes = packages[i].getElementsByTagName("item");
    let priceFor = packages[i].getElementsByTagName("packageFor")[0].textContent;
    let price = packages[i].getElementsByTagName("packagePrice")[0].textContent;

    let package_container = document.createElement('div');
    package_container.className = "package-container";
    package_container.addEventListener("click", function(){
        let flight_time = includes[includes.length - 1].textContent.split(" ");
        let flightprice = price.replaceAll(",", "")
        getBooking(img, name.split(", ")[1], description, flight_time[2], flight_time[6], flightprice);
    });

    let package_img = document.createElement("img");
    package_img.src = img;
    package_img.alt = name;

    let package_location_card = document.createElement("div");
    package_location_card.className = "location-card";

    let package_location_card_name = document.createElement("div");
    package_location_card_name.className = "location-card-name";

    let package_name = document.createElement("h3");
    package_name.textContent = name;

    let package_rating = document.createElement("div");
        
    for (let j = 0; j < ratingCount; j++) {
        let package_rating_img = document.createElement("img");
        package_rating_img.src = ratingImg;
        package_rating.append(package_rating_img)
    }

    package_location_card_name.append(package_name, package_rating);
    
    let package_description = document.createElement("p");
    package_description.className = "location-card-description";
    package_description.textContent = description;

    let package_include = document.createElement("ul");
    
    for (let k = 0; k < includes.length; k++){
        let package_item = document.createElement("li");
        package_item.textContent = includes[k].textContent;
        package_include.append(package_item);
    }
    
    let package_price_container = document.createElement("div");
    package_price_container.className = "pricing";

    let package_price_for = document.createElement("span");
    package_price_for.textContent = priceFor;

    let package_price = document.createElement("span");
    package_price.textContent = " LKR " + price;

    package_price_container.append(package_price_for, package_price);

    package_location_card.append(package_location_card_name, package_description, package_include, package_price_container);

    package_container.append(package_img, package_location_card);

    package_grid.append(package_container);
}

function addPackages() {
    loadXMLFile().then(xmlDoc => {
        if (!xmlDoc) return;

        let packages = xmlDoc.getElementsByTagName("package");
        let package_grid = document.getElementsByClassName("package-grid-layout")[0];

        for (let i = 0; i < packages.length; i++){
            getPackages(i, packages, package_grid);
        }
    });
}

function filterPackagesByPrice(priceRangeValue){
    const thresholdPrice = Number(priceRangeValue);

    loadXMLFile().then(xmlDoc => {
        if (!xmlDoc) return;

        let package_grid = document.getElementsByClassName("package-grid-layout")[0];
        package_grid.innerHTML = ""; // Clear previous packages

        let packages = xmlDoc.getElementsByTagName("package");

        for (let i = 0; i < packages.length; i++) {
            let price = Number(packages[i].getElementsByTagName("packagePrice")[0].textContent.replaceAll(",", ""));

            if (price <= thresholdPrice) {
                getPackages(i, packages, package_grid);
            }
        }
    });
}

function filterPackagesByBudget(budgetValue){
    let thresholdBudgetLow = 0;
    let thresholdBudgetHigh = 10000000;

    if (budgetValue == "all"){
        thresholdBudgetLow = 0;
        thresholdBudgetHigh = 10000000;
    }
    else if (budgetValue == "low"){
        thresholdBudgetLow = 0;
        thresholdBudgetHigh = 900000;
    }
    else if (budgetValue == "medium"){
        thresholdBudgetLow = 900000;
        thresholdBudgetHigh = 1000000;
    }
    else if (budgetValue == "high"){
        thresholdBudgetLow = 1000000;
        thresholdBudgetHigh = 10000000;
    }
        
    loadXMLFile().then(xmlDoc => {
        if (!xmlDoc) return;

        let package_grid = document.getElementsByClassName("package-grid-layout")[0];
        package_grid.innerHTML = ""; // Clear previous packages

        let packages = xmlDoc.getElementsByTagName("package");

        for (let i = 0; i < packages.length; i++) {
            let price = Number(packages[i].getElementsByTagName("packagePrice")[0].textContent.replaceAll(",", ""));

            if (price >= thresholdBudgetLow && price < thresholdBudgetHigh) {
                getPackages(i, packages, package_grid);
            }
        }
    }); 
}

function filterPackagesByDuration(durationValue){
    let thresholdDurationLow = 0;
    let thresholdDurationHigh = 100;

    if (durationValue == "all"){
        thresholdDurationLow = 0;
        thresholdDurationHigh = 100000;
    }
    else if (durationValue == "low"){
        thresholdDurationLow = 1;
        thresholdDurationHigh = 4;
    }
    else if (durationValue == "medium"){
        thresholdDurationLow = 4;
        thresholdDurationHigh = 7;
    }
    else if (durationValue == "high"){
        thresholdDurationLow = 7;
        thresholdDurationHigh = 100;
    }
        
    loadXMLFile().then(xmlDoc => {
        if (!xmlDoc) return;

        let package_grid = document.getElementsByClassName("package-grid-layout")[0];
        package_grid.innerHTML = ""; // Clear previous packages

        let packages = xmlDoc.getElementsByTagName("package");

        for (let i = 0; i < packages.length; i++) {
            let includes = packages[i].getElementsByTagName("item");
            let durationDays = Number(includes[0].textContent.split(" ")[0]);

            if (durationDays >= thresholdDurationLow && durationDays < thresholdDurationHigh) {
                getPackages(i, packages, package_grid);
            }
        }
    }); 
}

// All this waits until DOM is loaded:
window.addEventListener('DOMContentLoaded', function () {
    addPackages();

    let priceRangeSlider = document.getElementById("price-slider");
    let priceRangeValue = document.getElementById("price-value");

    priceRangeSlider.addEventListener("input", function () {
        filterPackagesByPrice(this.value)
        priceRangeValue.textContent = "LKR " + this.value;
    });

    let budgetDropdown = document.getElementById("budget");

    budgetDropdown.addEventListener("change", function(){
        let budgetValue = budgetDropdown.value;
        filterPackagesByBudget(budgetValue);
    });

    let durationDropdown = document.getElementById("duration");

    durationDropdown.addEventListener("change", function(){
        let durationValue = durationDropdown.value;
        filterPackagesByDuration(durationValue);
    });

});