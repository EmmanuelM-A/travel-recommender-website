async function fetchRecommendations() {
const response = await fetch('travel-recommendation-api.json');
const data = await response.json();
return data.places;
}

function normalizeKeyword(keyword) {
return keyword.trim().toLowerCase();
}

async function searchPlaces() {
const keyword = normalizeKeyword(document.getElementById('searchInput').value);
const places = await fetchRecommendations();
const resultContainer = document.getElementById('recommendationResults');
resultContainer.innerHTML = '';

const matches = places.filter(place => {
    const tags = place.tags.map(tag => tag.toLowerCase());
    return tags.some(tag => tag.includes(keyword));
});

if (matches.length === 0) {
    resultContainer.innerHTML = '<p>No results found.</p>';
    return;
}

matches.forEach(place => {
    const div = document.createElement('div');
    div.innerHTML = `
    <h3>${place.name}</h3>
    <img src="${place.imageUrl}" alt="${place.name}">
    <p>${place.description}</p>
    `;
    resultContainer.appendChild(div);
});
}

function clearResults() {
document.getElementById('searchInput').value = '';
document.getElementById('recommendationResults').innerHTML = '';
}
  