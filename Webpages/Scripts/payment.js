function navigateToPreviousPage(){
    window.history.back();
}

function loadData(){
    const params = new URLSearchParams(window.location.search);
    const passengerCount = params.get("passengerCount");
    const passengerPrice = params.get("passengerPrice");
    const cabinBagCount = params.get("cabinBagCount");
    const cabinBagPrice = params.get("cabinBagPrice");
    const baggageCount = params.get("baggageCount");
    const baggagePrice = params.get("baggagePrice");
    const totalCost = params.get("totalCost");

    document.getElementById("overview-passenger-no-count").textContent = passengerCount;
    document.getElementById("overview-passenger-no-price").textContent = passengerPrice;
    document.getElementById("overview-cabin-bag-count").textContent = cabinBagCount;
    document.getElementById("overview-cabin-bag-price").textContent = cabinBagPrice;
    document.getElementById("overview-checked-baggage-count").textContent = baggageCount;
    document.getElementById("overview-checked-baggage-price").textContent = baggagePrice;
    document.getElementById("overview-total-cost").textContent = totalCost;
}

function calculateTotalCost(){
    let passengerPrice = Number(document.getElementById("overview-passenger-no-price").textContent.split("LKR")[1].replaceAll(",", ""));
    let cabinBagPrice = Number(document.getElementById("overview-cabin-bag-price").textContent.split("LKR")[1].replaceAll(",", ""));
    let baggagePrice = Number(document.getElementById("overview-checked-baggage-price").textContent.split("LKR")[1].replaceAll(",", ""));

    let packagePrice = document.getElementById("overview-package-price").textContent;

    if (packagePrice == ""){
        document.getElementById("overview-total-cost").textContent = (passengerPrice + cabinBagPrice + baggagePrice).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
    }
    else{
        packagePrice = Number(document.getElementById("overview-package-price").textContent.split("LKR")[1].replaceAll(",", ""));
        document.getElementById("overview-passenger-no-price").textContent = "LKR 0.00";
        document.getElementById("overview-total-cost").textContent = (cabinBagPrice + baggagePrice + packagePrice).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
    }
}

function addItinerary(){
    let packageData = JSON.parse(localStorage.getItem('packageData'));

    if (!packageData || !packageData.PackageImage) {
        return;
    }

    let packages = document.getElementById("packages");

    document.getElementById("overview-package-count").textContent = packageData["PackagePrice"].length + "x Packages";

    let totalprice = 0;
    let package_price = document.getElementById("overview-package-price");

    for (let i = 0; i < packageData["PackageImage"].length; i++){
        let package = document.createElement("div");
        package.className = "package";
        
        let package_image = document.createElement("img");
        package_image.src = packageData["PackageImage"][i];

        let package_info = document.createElement("div");
        package_info.className = "package-info";

        let package_heading = document.createElement("h4");
        package_heading.textContent = packageData["PackageName"][i];

        let package_description = document.createElement("p");
        package_description.textContent = packageData["PackageDescription"][i];

        package_info.append(package_heading, package_description);

        package.append(package_image, package_info);

        packages.append(package);

        totalprice += Number(packageData["PackagePrice"][i]);
    }

    package_price.textContent = totalprice.toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
}

function addPackages(){
    localStorage.setItem("editable", false);
    window.location.href = `packages.html`;
}

function addData(passengerData){

    const passengerCount = passengerData["first-name"].length;

    let personal_details_container = document.getElementById("personal-details-container");
    let baggage_details_container = document.getElementById("baggage-details-container");

    for (let i = 0; i < passengerCount; i++){
        let detail_info = document.createElement("div");
        detail_info.className = "details-info";

        let name_date_info = document.createElement("div");
        name_date_info.className = "name-date-info";

        let icon_container1 = document.createElement("div");
        icon_container1.className = "icon-container";

        let icon_passenger = document.createElement("img");
        icon_passenger.src = "/Icons/person.svg";
        icon_passenger.alt = "person";

        let passenger_name = document.createElement("span");
        passenger_name.textContent = passengerData["first-name"][i] + " " + passengerData["surname"][i] + " · " + passengerData["gender"][i];
        
        icon_container1.append(icon_passenger, passenger_name);

        let icon_container2 = document.createElement("div");
        icon_container2.className = "icon-container";

        let icon_cake = document.createElement("img");
        icon_cake.src = "/Icons/cake.svg";
        icon_cake.alt = "cake";

        let passenger_dob = document.createElement("span");
        passenger_dob.textContent = passengerData["date"][i];
        
        icon_container2.append(icon_cake, passenger_dob);

        name_date_info.append(icon_container1, icon_container2);

        let id_info = document.createElement("div");
        id_info.className = "id-info";

        let icon_container3 = document.createElement("div");
        icon_container3.className = "icon-container";

        let icon_id = document.createElement("img");
        icon_id.src = "/Icons/id.svg";
        icon_id.alt = "id";

        let passenger_id = document.createElement("span");
        passenger_id.textContent = passengerData["id-number"][i] + " · exp. " + passengerData["id-exp"][i];
        
        icon_container3.append(icon_id, passenger_id);

        id_info.append(icon_container3);

        detail_info.append(name_date_info, id_info);

        personal_details_container.append(detail_info);

        let bag_details = document.createElement("div");
        bag_details.className = "bag-details";
        
        let bag_what = document.createElement("div");
        bag_what.className = "bag-what";
        
        let icon_container4 = document.createElement("div");
        icon_container4.className = "icon-container";
        
        let icon_cabinbag = document.createElement("img");
        icon_cabinbag.src = "/Icons/checked_bag.svg";
        icon_cabinbag.alt = "checked_bag";
        
        let cabinbag_count = document.createElement("span");
        cabinbag_count.textContent = "1x Cabin bag";

        icon_container4.append(icon_cabinbag, cabinbag_count);

        let icon_container5 = document.createElement("div");
        icon_container5.className = "icon-container";
        
        let icon_baggage = document.createElement("img");
        icon_baggage.src = "/Icons/travel_luggage_and_bags.svg";
        icon_baggage.alt = "travel_luggage_and_bags";
        
        let baggage_count = document.createElement("span");
        baggage_count.textContent = passengerData["bag-status-number"][i] + "x Checked bag 20kg";

        icon_container5.append(icon_baggage, baggage_count);

        bag_what.append(icon_container4, icon_container5);

        let bag_belong = document.createElement("div");
        bag_belong.className = "bag-belong";

        let icon_container6 = document.createElement("div");
        icon_container6.className = "icon-container";
        
        let cabinbag_belong_name = document.createElement("span");
        cabinbag_belong_name.textContent = passengerData["first-name"][i] + " " + passengerData["surname"][i];
        
        icon_container6.append(cabinbag_belong_name);

        let icon_container7 = document.createElement("div");
        icon_container7.className = "icon-container";
        
        let baggage_belong_name = document.createElement("span");
        baggage_belong_name.textContent = passengerData["first-name"][i] + " " + passengerData["surname"][i];
        
        icon_container7.append(baggage_belong_name);

        bag_belong.append(icon_container6, icon_container7);

        bag_details.append(bag_what, bag_belong);

        baggage_details_container.append(bag_details);
    }
}

// All this waits until DOM is loaded:
window.addEventListener('DOMContentLoaded', function () {
    loadData();

    const data = JSON.parse(localStorage.getItem("passengerFormData"));
    addData(data);

    addItinerary();

    calculateTotalCost();

    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const payOptions = document.querySelectorAll('input[name="pay-option"]');
        
        let selected = false;
        for (const option of payOptions) {
            if (option.checked) {
                selected = true;
                break;
            }
        }

        if (!selected) {
            alert('Please select a payment option.');
            event.preventDefault();
            return;
        }
        
        let popup = document.createElement("div");
        popup.id = "popup";
        
        let popup_content = document.createElement("p");
        popup_content.className = "popup-content"
        popup_content.textContent = "Payment Successful!";
        
        let popup_button = document.createElement("button");
        popup_button.className = "popup-button"
        popup_button.textContent = "Go back to home page!";
        popup_button.addEventListener("click", function(){
            window.location.href = `home.html`;
        })
        
        popup.append(popup_content, popup_button);

        popup.style.display = "block";

        document.body.append(popup);

        document.querySelector("main").style.filter = "blur(5px)";

        document.querySelector("body").style.overflow = 'hidden';
    });
});