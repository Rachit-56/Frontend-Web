document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("city-input");
    const btn = document.getElementById("btn");
    const icon = document.querySelector(".icon");
    const weather = document.querySelector(".weather");
    const temperature = document.querySelector(".temperature");
    const description = document.querySelector(".description");

    btn.addEventListener("click", () => {
        let city = input.value;
        if (city) {
            getWeather(city);
        } else {
            alert("Please enter a city name.");
        }
    });

    function getWeather(city) {
        const apiKey = '2c54b909b98ca33fd324218f92ed9074';  // Replace with your new API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`City not found or API key is invalid: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                const iconCode = data.weather[0].icon;
                icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon"/>`;

                const weatherCity = data.name;
                const weatherCountry = data.sys.country;
                weather.innerHTML = `${ weatherCity },${ weatherCountry }    `;

                let weatherTemp = data.main.temp - 273.15;
                const temp = weatherTemp.toFixed(2);
                temperature.innerHTML =  `\t ${ temp } °C `;

                const weatherDesc = data.weather[0].description;
                description.innerHTML = weatherDesc;
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    }
});
