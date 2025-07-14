async function fetchData() {
  const response = await fetch('travel-recommendation-api.json');
  return await response.json();
}

function normalize(input) {
  return input.trim().toLowerCase();
}

async function searchPlaces() {
  const input = normalize(document.getElementById('searchInput').value);
  const resultsDiv = document.getElementById('recommendationResults');
  resultsDiv.innerHTML = '';

  if (!input) {
    resultsDiv.innerHTML = "<p>Please enter a keyword like 'beach', 'temple', or a country name.</p>";
    return;
  }

  const data = await fetchData();
  const matches = [];

  if (input.includes("beach")) {
    matches.push(...data.beaches);
  } else if (input.includes("temple")) {
    matches.push(...data.temples);
  } else {
    // Check countries
    const country = data.countries.find(c => normalize(c.name).includes(input));
    if (country) {
      matches.push(...country.cities);
      showLocalTime(country.name); // Optional Task 10
    }
  }

  if (matches.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  for (const place of matches) {
    const block = document.createElement('div');
    block.className = "result-block";
    block.innerHTML = `
      <h3>${place.name}</h3>
      <img src="${place.imageUrl}" alt="${place.name}">
      <p>${place.description}</p>
    `;
    resultsDiv.appendChild(block);
  }
}

function clearResults() {
  document.getElementById('searchInput').value = '';
  document.getElementById('recommendationResults').innerHTML = '';
}

// Optional Task 10: Show Local Time
function showLocalTime(country) {
  const timeZones = {
    "Australia": "Australia/Sydney",
    "Japan": "Asia/Tokyo",
    "Brazil": "America/Sao_Paulo"
  };

  const zone = timeZones[country];
  if (!zone) return;

  const options = {
    timeZone: zone,
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const localTime = new Date().toLocaleTimeString('en-US', options);
  const timeMsg = document.createElement('p');
  timeMsg.innerText = `Current time in ${country}: ${localTime}`;
  document.getElementById('recommendationResults').prepend(timeMsg);
}
