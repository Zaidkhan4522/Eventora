// -------------------------------
// WeddingWire Search System
// -------------------------------

// Mock venue database
const venueDatabase = [
    { name: "The Royal Ballroom", type: "Ballroom", city: "New York", zip: "10001", country: "USA", map: "https://maps.google.com/?q=The+Royal+Ballroom+New+York" },
    { name: "Sunset Garden", type: "Garden", city: "Los Angeles", zip: "90001", country: "USA", map: "https://maps.google.com/?q=Sunset+Garden+Los+Angeles" },
    { name: "Azure Beach Resort", type: "Beach", city: "Miami", zip: "33101", country: "USA", map: "https://maps.google.com/?q=Azure+Beach+Resort+Miami" },
    { name: "Golden Vineyard Estate", type: "Vineyard", city: "Napa Valley", zip: "94558", country: "USA", map: "https://maps.google.com/?q=Golden+Vineyard+Estate+Napa+Valley" },
    { name: "Lotus Garden Palace", type: "Garden", city: "Delhi", zip: "110001", country: "India", map: "https://maps.google.com/?q=Lotus+Garden+Palace+Delhi" },
    { name: "Marina Beach Hall", type: "Beach", city: "Chennai", zip: "600001", country: "India", map: "https://maps.google.com/?q=Marina+Beach+Hall+Chennai" },
    { name: "Emerald Ballroom", type: "Ballroom", city: "London", zip: "EC1A", country: "UK", map: "https://maps.google.com/?q=Emerald+Ballroom+London" },
    { name: "Oak Vineyard", type: "Vineyard", city: "Paris", zip: "75001", country: "France", map: "https://maps.google.com/?q=Oak+Vineyard+Paris" },
];

// Simple ZIP-to-city dictionary (extendable)
const zipLookup = {
    "10001": "New York, USA",
    "90001": "Los Angeles, USA",
    "33101": "Miami, USA",
    "94558": "Napa Valley, USA",
    "110001": "Delhi, India",
    "600001": "Chennai, India",
    "EC1A": "London, UK",
    "75001": "Paris, France"
};

// Handle search button
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".search-button");
    const venueSelect = document.querySelector(".search-option select");
    const locationInput = document.querySelector(".search-option input");

    searchButton.addEventListener("click", (e) => {
        e.preventDefault();

        const selectedType = venueSelect.value.trim();
        const enteredLocation = locationInput.value.trim();

        if (selectedType === "Select venue type" && !enteredLocation) {
            alert("Please select a venue type or enter a location.");
            return;
        }

        // 1️⃣ Detect ZIP Code
        if (zipLookup[enteredLocation]) {
            const city = zipLookup[enteredLocation];
            const venues = filterVenues(selectedType, city);
            showResults(venues, city);
            return;
        }

        // 2️⃣ Detect City or Country text
        const venues = filterVenues(selectedType, enteredLocation);
        if (venues.length > 0) {
            showResults(venues, enteredLocation);
        } else {
            alert("No venues found for your selection.");
        }
    });
});

// Filter venue database
function filterVenues(type, location) {
    const searchTerm = location.toLowerCase();
    return venueDatabase.filter(v =>
        (type === "Select venue type" || v.type.toLowerCase() === type.toLowerCase()) &&
        (v.city.toLowerCase().includes(searchTerm) ||
            v.country.toLowerCase().includes(searchTerm) ||
            v.zip.toLowerCase().includes(searchTerm))
    );
}

// Display search results in modal-style overlay
function showResults(venues, location) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.8)";
    overlay.style.zIndex = 9999;
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";

    // Create modal box
    const modal = document.createElement("div");
    modal.style.background = "white";
    modal.style.borderRadius = "10px";
    modal.style.padding = "30px";
    modal.style.maxWidth = "700px";
    modal.style.width = "90%";
    modal.style.maxHeight = "80vh";
    modal.style.overflowY = "auto";
    modal.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
    modal.style.animation = "fadeIn 0.4s ease-in-out";

    const title = document.createElement("h2");
    title.textContent = `Venues found near: ${location}`;
    title.style.fontFamily = "'Playfair Display', serif";
    title.style.marginBottom = "20px";
    title.style.textAlign = "center";
    title.style.color = "#333";

    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.position = "absolute";
    closeBtn.style.right = "20px";
    closeBtn.style.top = "15px";
    closeBtn.style.fontSize = "30px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.color = "#999";
    closeBtn.addEventListener("click", () => overlay.remove());

    const list = document.createElement("div");

    venues.forEach(v => {
        const card = document.createElement("div");
        card.style.padding = "15px";
        card.style.border = "1px solid #eee";
        card.style.borderRadius = "8px";
        card.style.marginBottom = "15px";
        card.style.transition = "0.3s";
        card.style.cursor = "pointer";

        card.addEventListener("mouseenter", () => {
            card.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
            card.style.transform = "translateY(-3px)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "none";
            card.style.transform = "none";
        });

        card.innerHTML = `
      <h3 style="color:#d4af37; font-family:'Playfair Display', serif;">${v.name}</h3>
      <p><strong>Type:</strong> ${v.type}</p>
      <p><strong>Location:</strong> ${v.city}, ${v.country} (${v.zip})</p>
      <a href="${v.map}" target="_blank" style="color:#c19b30; text-decoration:none; font-weight:600;">
        View on Google Maps <i class="fas fa-map-marker-alt"></i>
      </a>
    `;

        list.appendChild(card);
    });

    modal.appendChild(closeBtn);
    modal.appendChild(title);
    modal.appendChild(list);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}
