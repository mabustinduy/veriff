document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.mocki.io/v2/edswcsf3/solutions')
        .then(res => res.json())
        .then(data => createOptions(data.services))
        .catch(error => console.error('There was a problem with the fetch operation:', error));

    function createOptions(services) {
        const selectElement = document.getElementById('service');
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = service;
            selectElement.appendChild(option);
        });

        selectElement.addEventListener('change', function () {
            selectElement.style.color = '#11615c';
        });
    }

    fetch('https://api.mocki.io/v2/edswcsf3/countries')
        .then(res => res.json())
        .then(data => {
            createOption(data.countries);
            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(data => {
                    const selectElementCountry = document.getElementById('country');
                    const userCountryCode = data.country;
                    selectElementCountry.value = userCountryCode;
                    selectElementCountry.style.color = '#11615c';
                    initializeTelInput(userCountryCode);
                })
                .catch(error => console.error('There was a problem fetching user country:', error));
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));

    function createOption(countries) {
        const selectElementCountry = document.getElementById('country');
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name;
            selectElementCountry.appendChild(option);
        });

        selectElementCountry.addEventListener('change', function () {
            const selectedCountryCode = selectElementCountry.value;
            initializeTelInput(selectedCountryCode);

            const userCountryCode = data.country;
            if (selectedCountryCode !== userCountryCode) {
                selectElementCountry.value = "";
            }
        });
    }

    function initializeTelInput(countryCode) {
        const input = document.querySelector("#phone");
        window.intlTelInput(input, {
            initialCountry: countryCode,
            separateDialCode: true
        });
    }

    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });

        fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject),
            cache: 'no-cache'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Form submitted successfully');
                } else {
                    console.error('Form submission failed:', response.statusText);
                }
            })
            .catch(error => {
                console.error('There was a problem with the form submission:', error);
            });
    });
});
