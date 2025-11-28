function loadXMLFile() {
    return fetch('Data/testimonials.xml')
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

function addTestimonials() {
    loadXMLFile().then(xmlDoc => {
        if (!xmlDoc) return;

        let reviews = xmlDoc.getElementsByTagName("review");

        let testimonial_grid = document.getElementsByClassName("testimonial-grid-layout")[0];

        for (let i = 0; i < reviews.length; i++){
            let rating = reviews[i].getElementsByTagName("reviewRating")[0]
            let ratingImg = rating.getElementsByTagName("reviewImg")[0].textContent;
            let ratingCount = Number(rating.getElementsByTagName("reviewCount")[0].textContent);
            let description = reviews[i].getElementsByTagName("reviewDescription")[0].textContent;
            let img = reviews[i].getElementsByTagName("reviewerImg")[0].textContent;
            let name = reviews[i].getElementsByTagName("reviewerName")[0].textContent;
            let location = reviews[i].getElementsByTagName("reviewerLocation")[0].textContent;

            let review_container = document.createElement('div');
            review_container.className = "review-container";

            let review_rating = document.createElement("div");
            review_rating.className = "review-rating";
                
            for (let j = 0; j < ratingCount; j++) {
                let review_rating_img = document.createElement("img");
                review_rating_img.src = ratingImg;
                review_rating.append(review_rating_img)
            }
            
            let review_description = document.createElement("p");
            review_description.textContent = description;

            let reviewer_details = document.createElement("div");
            reviewer_details.className = "reviewer-details";

            let reviewer_img = document.createElement("img");
            reviewer_img.src = img;
            reviewer_img.alt = name;

            let reviewer_info = document.createElement("div");
            reviewer_info.className = "reviewer-info";

            let reviewer_name = document.createElement("span");
            reviewer_name.className = "reviewer-name";
            reviewer_name.textContent = name;

            let reviewer_location = document.createElement("span");
            reviewer_location.className = "reviewer-location";
            reviewer_location.textContent = location;

            reviewer_info.append(reviewer_name, reviewer_location);

            reviewer_details.append(reviewer_img, reviewer_info);

            review_container.append(review_rating, review_description, reviewer_details);

            testimonial_grid.append(review_container);
        }

    });
}

window.addEventListener('load', addTestimonials)