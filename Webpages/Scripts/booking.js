function navigateToPreviousPage(){
    window.history.back();
}

let passengerCost = 100000;
let cabinBagCost = 10000;
let baggageCost = 20000;

function loadData(){
    const params = new URLSearchParams(window.location.search);
    const flight_start_time = params.get("flighttimeFrom");
    const flight_end_time = params.get("flighttimeTo");
    const flight_start_location = params.get("flightlocationFrom");
    const flight_end_location = params.get("flightlocationTo");
    const flight_duration = params.get("duration");   
    const flight_price = params.get("flightprice");    
    
    document.getElementById("flight-title").textContent = `${flight_start_location} \u2192 ${flight_end_location}`;

    document.getElementById("start-time").textContent = flight_start_time;
    document.getElementById("end-time").textContent = flight_end_time;
    document.getElementById("duration").textContent = flight_duration;
    document.getElementById("start-location").textContent = flight_start_location;
    document.getElementById("end-location").textContent = flight_end_location;

    if (flight_price == null){
        passengerCost = 100000;
    }
    else{
        passengerCost = flight_price;
    }
}

function calculateTotalCost(){
    const pCost = Number(document.getElementById("overview-passenger-no-price").textContent.split("LKR")[1].replaceAll(",", ""));
    const cCost = Number(document.getElementById("overview-cabin-bag-price").textContent.split("LKR")[1].replaceAll(",", ""));
    const bCost = Number(document.getElementById("overview-checked-baggage-price").textContent.split("LKR")[1].replaceAll(",", ""));

    document.getElementById("overview-total-cost").textContent = (pCost + cCost + bCost).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
}

function changeBaggageNumber(){
    let totalBaggage = 0;
    const inputs = document.querySelectorAll('input[name="bag-status-number"]');
    inputs.forEach(input => {
        totalBaggage += Number(input.value);
    });

    document.getElementById("overview-checked-baggage-count").textContent = totalBaggage + "x Checked Baggage 20kg";
    document.getElementById("overview-checked-baggage-price").textContent = (totalBaggage * baggageCost).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

    calculateTotalCost();
}

function renumberPassengerHeadings(){
    const passengerForms = document.getElementsByClassName("passenger-details-form");

    let passenger_no = document.getElementsByClassName("passenger-no");
    for (let i = 0; i < passenger_no.length; i++) {
        passenger_no[i].textContent = "Passenger " + (i + 1);
    }

    const currentPassengerCount = passengerForms.length;

    document.getElementById("overview-passenger-no-count").textContent = currentPassengerCount + "x Adult";
    document.getElementById("overview-cabin-bag-count").textContent = currentPassengerCount + "x Cabin Baggage";

    document.getElementById("overview-passenger-no-price").textContent = (currentPassengerCount * passengerCost).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
    document.getElementById("overview-cabin-bag-price").textContent = (currentPassengerCount * cabinBagCost).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

    changeBaggageNumber();
}

let passengerNo = 0;

function addPassengers(){
    let form = document.getElementById("passenger-fillout-forms");

    let div_form = document.createElement("div");
    div_form.className = "passenger-details-form";
    div_form.id = "passenger-details-form-" + ++passengerNo;

    let passenger_heading = document.createElement("div");
    passenger_heading.className = "passenger-heading"

    let passenger_no = document.createElement("h3");
    passenger_no.className = "passenger-no";
    passenger_no.textContent = "Passenger " + passengerNo;

    passenger_heading.append(passenger_no);

    if (passengerNo > 1){
        let remove_passenger = document.createElement("button");
        remove_passenger.id = "remove-passenger-" + passengerNo;
        remove_passenger.textContent = "Remove Passenger";
        remove_passenger.type = "button";
        remove_passenger.addEventListener("click", function(){
            div_form.remove();
            renumberPassengerHeadings();
        });
        passenger_heading.append(remove_passenger);
    }

    let text_field1 = document.createElement("div");
    text_field1.className = "text-field";

    let first_name_label = document.createElement("label");
    first_name_label.htmlFor = "first-name-" + passengerNo;
    first_name_label.textContent = "First Name";

    let first_name_input = document.createElement("input");
    first_name_input.type = "text";
    first_name_input.id = "first-name-" + passengerNo;
    first_name_input.name = "first-name";

    text_field1.append(first_name_label, first_name_input);

    let text_field2 = document.createElement("div");
    text_field2.className = "text-field";

    let surname_name_label = document.createElement("label");
    surname_name_label.htmlFor = "surname-" + passengerNo;
    surname_name_label.textContent = "Surname";

    let surname_name_input = document.createElement("input");
    surname_name_input.type = "text";
    surname_name_input.id = "surname-" + passengerNo;
    surname_name_input.name = "surname";

    text_field2.append(surname_name_label, surname_name_input);

    let dropdownFieldList = document.createElement("div");
    dropdownFieldList.className = "dropdown-field-list";

    let nationalityField = document.createElement("div");
    nationalityField.className = "dropdown-field";

    let nationalityLabel = document.createElement("label");
    nationalityLabel.htmlFor = "nationality-" + passengerNo;
    nationalityLabel.textContent = "Nationality";

    let nationalitySelect = document.createElement("select");
    nationalitySelect.name = "nationality";
    nationalitySelect.id = "nationality-" + passengerNo;

    let nationalityOptions = ["", "Sri Lankan", "Indian", "American", "Canadian"];
    nationalityOptions.forEach(optionText => {
        let option = document.createElement("option");
        option.textContent = optionText;
        nationalitySelect.append(option);
    });

    nationalityField.append(nationalityLabel);
    nationalityField.append(nationalitySelect);

    let genderField = document.createElement("div");
    genderField.className = "dropdown-field";

    let genderLabel = document.createElement("label");
    genderLabel.htmlFor = "gender-" + passengerNo;
    genderLabel.textContent = "Gender";

    let genderSelect = document.createElement("select");
    genderSelect.name = "gender";
    genderSelect.id = "gender-" + passengerNo;

    let genderOptions = ["", "Male", "Female"];
    genderOptions.forEach(optionText => {
        let option = document.createElement("option");
        option.textContent = optionText;
        genderSelect.append(option);
    });

    genderField.append(genderLabel);
    genderField.append(genderSelect);

    dropdownFieldList.append(nationalityField, genderField);

    let date_selection_field = document.createElement("div");
    date_selection_field.className = "selection-field";

    let date_label = document.createElement("label");
    date_label.htmlFor = "date-" + passengerNo;
    date_label.textContent = "Date of birth";

    let date_input = document.createElement("input");
    date_input.type = "date";
    date_input.name = "date";
    date_input.id = "date-" + passengerNo;

    date_selection_field.append(date_label, date_input);

    let text_field3 = document.createElement("div");
    text_field3.className = "text-field";

    let id_number_label = document.createElement("label");
    id_number_label.htmlFor = "id-number-" + passengerNo;
    id_number_label.textContent = "ID Number";

    let id_number_input = document.createElement("input");
    id_number_input.type = "text";
    id_number_input.id = "id-number-" + passengerNo;
    id_number_input.name = "id-number";

    text_field3.append(id_number_label, id_number_input);

    let id_date_expiration_field = document.createElement("div");
    id_date_expiration_field.className = "selection-field";

    let id_date_expiration_label = document.createElement("label");
    id_date_expiration_label.htmlFor = "id-exp-" + passengerNo;
    id_date_expiration_label.textContent = "ID expiration date";

    let id_date_expiration_input = document.createElement("input");
    id_date_expiration_input.type = "date";
    id_date_expiration_input.name = "id-exp";
    id_date_expiration_input.id = "id-exp-" + passengerNo;

    id_date_expiration_field.append(id_date_expiration_label, id_date_expiration_input);

    let bag_container_1 = document.createElement("div");
    bag_container_1.className = "bag-container";

    let bag_container_1_image = document.createElement("img");
    bag_container_1_image.src = "/Images/cabinbag.png";
    bag_container_1_image.alt = "cabinbag";    

    let bag_container_1_info = document.createElement("span");
    bag_container_1_info.className = "bag-info";
    bag_container_1_info.textContent = "1x cabin bag";

    let bag_container_1_status = document.createElement("span");
    bag_container_1_status.className = "bag-status";
    bag_container_1_status.textContent = "Included";

    bag_container_1.append(bag_container_1_image, bag_container_1_info, bag_container_1_status)

    let bag_container_2 = document.createElement("div");
    bag_container_2.className = "bag-container";

    let bag_container_2_image = document.createElement("img");
    bag_container_2_image.src = "/Images/baggage.png";
    bag_container_2_image.alt = "baggage";    

    let bag_container_2_info = document.createElement("label");
    bag_container_2_info.className = "bag-info";
    bag_container_2_info.htmlFor = "bag-status-number-" + passengerNo;
    bag_container_2_info.textContent = "20kg baggage";

    let bag_container_2_status = document.createElement("input"); 
    bag_container_2_status.type = "number";
    bag_container_2_status.id = "bag-status-number-" + passengerNo;
    bag_container_2_status.min = "0";
    bag_container_2_status.max = "2";
    bag_container_2_status.value = "0";
    bag_container_2_status.name = "bag-status-number";
    bag_container_2_status.addEventListener("change", function(){
        changeBaggageNumber();
    });

    bag_container_2.append(bag_container_2_image, bag_container_2_info, bag_container_2_status);

    div_form.append(passenger_heading, text_field1, text_field2, 
        dropdownFieldList, date_selection_field, text_field3, 
        id_date_expiration_field, bag_container_1, bag_container_2);

    form.append(div_form);

    renumberPassengerHeadings();
}

function getPayment(){
    let urlPassengerCount = document.getElementById("overview-passenger-no-count").textContent;
    let urlPassengerPrice = document.getElementById("overview-passenger-no-price").textContent;
    let urlCabinBagCount = document.getElementById("overview-cabin-bag-count").textContent;
    let urlCabinBagPrice = document.getElementById("overview-cabin-bag-price").textContent;
    let urlBaggageCount = document.getElementById("overview-checked-baggage-count").textContent;
    let urlBaggagePrice = document.getElementById("overview-checked-baggage-price").textContent;
    let urlTotalCost = document.getElementById("overview-total-cost").textContent;

    localStorage.setItem("editable", false);

    window.location.href = `payment.html?passengerCount=${encodeURIComponent(urlPassengerCount)}&passengerPrice=${encodeURIComponent(urlPassengerPrice)}&cabinBagCount=${encodeURIComponent(urlCabinBagCount)}&cabinBagPrice=${encodeURIComponent(urlCabinBagPrice)}&baggageCount=${encodeURIComponent(urlBaggageCount)}&baggagePrice=${encodeURIComponent(urlBaggagePrice)}&totalCost=${encodeURIComponent(urlTotalCost)}`;
}

// All this waits until DOM is loaded:
window.addEventListener('DOMContentLoaded', function () {
    loadData();

    let editable = localStorage.getItem("editable");

    let passengerData  = JSON.parse(localStorage.getItem("passengerFormData"));

    let packageData = JSON.parse(localStorage.getItem('packageData'));

    if (passengerData !== null){
        passengerNo = 0;
        for(let i = 0; i < passengerData["first-name"].length; i++){
            addPassengers();
            let currentPassengerNo = passengerNo;
            document.getElementById("first-name-" + currentPassengerNo).value = passengerData["first-name"][i];
            document.getElementById("surname-" + currentPassengerNo).value = passengerData["surname"][i];
            document.getElementById("nationality-" + currentPassengerNo).value = passengerData["nationality"][i];
            document.getElementById("gender-" + currentPassengerNo).value = passengerData["gender"][i];
            document.getElementById("date-" + currentPassengerNo).value = passengerData["date"][i];
            document.getElementById("id-number-" + currentPassengerNo).value = passengerData["id-number"][i];
            document.getElementById("id-exp-" + currentPassengerNo).value = passengerData["id-exp"][i];
            document.getElementById("bag-status-number-" + currentPassengerNo).value = passengerData["bag-status-number"][i];

            if (packageData["PackageImage"].length > 1 || editable == false){
                document.getElementById("first-name-" + currentPassengerNo).readOnly = true;
                document.getElementById("surname-" + currentPassengerNo).readOnly = true;

                const nationalitySelect = document.getElementById("nationality-" + currentPassengerNo);
                nationalitySelect.classList.add("select-readonly");

                const genderSelect = document.getElementById("gender-" + currentPassengerNo);
                genderSelect.classList.add("select-readonly");

                document.getElementById("date-" + currentPassengerNo).readOnly = true;
                document.getElementById("id-number-" + currentPassengerNo).readOnly = true;
                document.getElementById("id-exp-" + currentPassengerNo).readOnly = true;
                document.getElementById("bag-status-number-" + currentPassengerNo).readOnly = true;
                document.getElementById("add-passenger").disabled = true;
                if (currentPassengerNo > 1){
                    document.getElementById("remove-passenger-" + currentPassengerNo).disabled = true;
                }
            }
        }
    }
    else{
        addPassengers();
    }

    // Defer the renumbering and baggage update slightly to ensure DOM updates.
    setTimeout(() => {
        renumberPassengerHeadings();
        changeBaggageNumber();
    }, 0);

    this.document.getElementById("passenger-fillout-forms").addEventListener("submit", function(event){
        event.preventDefault();

        const passengerForms = document.getElementsByClassName("passenger-details-form");

        for(let i = 0; i < passengerForms.length; i++){
            const form = passengerForms[i];
            const passengerIndex = i + 1;

            const firstName = document.getElementById("first-name-" + passengerIndex).value.trim();
            const surname = document.getElementById("surname-" + passengerIndex).value.trim();
            const nationality = document.getElementById("nationality-" + passengerIndex).value;
            const gender = document.getElementById("gender-" + passengerIndex).value;
            const dob = document.getElementById("date-" + passengerIndex).value;
            const idNumber = document.getElementById("id-number-" + passengerIndex).value.trim();
            const idExp = document.getElementById("id-exp-" + passengerIndex).value;

            if (!firstName) {
                alert(`Passenger ${passengerIndex}: First name is required.`);
                event.preventDefault();
                return;
            }
            if (!surname) {
                alert(`Passenger ${passengerIndex}: Surname is required.`);
                event.preventDefault();

                return;
            }
            if (!nationality) {
                alert(`Passenger ${passengerIndex}: Nationality is required.`);
                event.preventDefault();

                return;
            }
            if (!gender) {
                alert(`Passenger ${passengerIndex}: Gender is required.`);
                event.preventDefault();

                return;
            }
            if (!dob) {
                alert(`Passenger ${passengerIndex}: Date of birth is required.`);
                event.preventDefault();

                return;
            } else {
                const dobDate = new Date(dob);
                const today = new Date();

                if (dobDate > today) {
                    alert(`Passenger ${passengerIndex}: Date of birth must be in the past.`);
                    event.preventDefault();
                    return;
                } else {
                    let age = today.getFullYear() - dobDate.getFullYear();

                    if (age < 18) {
                        alert(`Passenger ${passengerIndex}: Must be at least 18 years old.`);
                        event.preventDefault();
                        return;
                    }
                }
            }
            if (!idNumber) {
                alert(`Passenger ${passengerIndex}: ID Number is required.`);
                event.preventDefault();
                return;
            }
            if (!idExp) {
                alert(`Passenger ${passengerIndex}: ID expiration date is required.`);
                event.preventDefault();

                return;
            } else {
                const idExpDate = new Date(idExp);
                const today = new Date();
                if (idExpDate <= today) {
                    alert(`Passenger ${passengerIndex}: ID expiration date must be in the future.`);
                    event.preventDefault();
                    return;
                }
            }
        }

        const formData = new FormData(this);
        const data = {};

        for (let [key, value] of formData.entries()){
            if (data[key] !== undefined){
                data[key].push(value.trim());
            }
            else{
                data[key] = [value.trim()];
            }
        }

        localStorage.setItem("passengerFormData", JSON.stringify(data));

        getPayment();
    })
});