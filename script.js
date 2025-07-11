const apiKey = "cd47a859eea74758b1684113251107";

document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const city = document.getElementById("city").value.trim();
  const weatherDiv = document.getElementById("info");

  if (!city) {
    weatherDiv.innerHTML = "Please enter a city name.";
    weatherDiv.style.display = "block";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    weatherDiv.innerHTML = "Loading...";
    weatherDiv.style.display = "block";

    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    const { name, country } = data.location;
    const { temp_c, condition, last_updated } = data.current;

    weatherDiv.innerHTML = `
      <h2>${name}, ${country}</h2>
      <p><strong>${temp_c}°C</strong></p>
      <p>${condition.text}</p>
      <img src="https:${condition.icon}" alt="${condition.text}" />
      <p>Last updated: ${last_updated}</p>
    `;
  } catch (error) {
    weatherDiv.innerHTML = "Error fetching weather data.";
    console.error(error);
  }
});
