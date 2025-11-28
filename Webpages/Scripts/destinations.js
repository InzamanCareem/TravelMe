function loadXMLFile() {
    return fetch('Data/destinations.xml')
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

function getDestination(to) {
    let from = "Sri Lanka";
    let date = "2025-08-04";
    window.location.href = `flights.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`;
}

function addDestinations() {
    loadXMLFile().then(xmlDoc => {
        if (!xmlDoc) return;

        let destinations = xmlDoc.getElementsByTagName("destination");

        let destination_grid = document.getElementsByClassName("destination-grid-layout")[0];

        for (let i = 0; i < destinations.length; i++){

            let img = destinations[i].getElementsByTagName("destinationImg")[0].textContent;
            let name = destinations[i].getElementsByTagName("destinationName")[0].textContent;
            let description = destinations[i].getElementsByTagName("destinationDescription")[0].textContent;
            
            let destination_container = document.createElement('div');
            destination_container.className = "destination-container";
            destination_container.addEventListener("click", () => {
                getDestination(name);
            });

            let destination_img = document.createElement("img");
            destination_img.src = img;
            destination_img.alt = name;

            let destination_name = document.createElement("h3");
            destination_name.textContent = name;
            
            let destination_description = document.createElement("p");
            destination_description.textContent = description;

            destination_container.append(destination_img, destination_name, destination_description);

            destination_grid.append(destination_container);        
        }
    });
}

window.addEventListener('load', addDestinations)