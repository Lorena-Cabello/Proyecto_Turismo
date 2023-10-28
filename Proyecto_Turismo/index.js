document.addEventListener("DOMContentLoaded", function () {
    var ciudades_list = [];

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ws.smn.gob.ar/map_items/weather", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            ciudades_list = data;

            var ciudadesSelect = document.getElementById('ciudades');
            data.forEach(function (element) {
                var option = document.createElement('option');
                option.text = element.name;
                option.value = element.name;
                ciudadesSelect.appendChild(option);
                if (option.value == 'Ushuaia') {
                    option.selected = true;
                }
            });
            ciudades_list.forEach(function (ciudad) {
                if (ciudad.name === 'Ushuaia') {
                    var localidad = document.getElementById('localidad');
                    localidad.textContent = ciudad.name;
                    var img = document.getElementById('img');
                    img.src = 'imagenes/clima/' + ciudad.weather.id + '.png';
                    var temp = document.getElementById('temp');
                    temp.textContent = ciudad.weather.temp + ' ºC';
                    var description_temp = document.getElementById('description-temp');
                    description_temp.textContent = ciudad.weather.description;
                }
            });
        }

    };
    xhr.send();
    document.getElementById('ciudades').addEventListener('change', function (e) {
        e.preventDefault();
        var selectedCiudad = this.options[this.selectedIndex].value;
        ciudades_list.forEach(function (ciudad) {
            if (ciudad.name === selectedCiudad) {
                var localidad = document.getElementById('localidad');
                localidad.textContent = ciudad.name;
                var img = document.getElementById('img');
                img.src = './imagenes/clima/' + ciudad.weather.id + '.png';
                var temp = document.getElementById('temp');
                temp.textContent = ciudad.weather.temp + ' ºC';
                var description_temp = document.getElementById('description-temp');
                description_temp.textContent = ciudad.weather.description;
                console.log(ciudad.province);
                console.log(ciudad.name);
                console.log(ciudad.weather.id);
                console.log(ciudad.weather.temp);
                console.log(ciudad.weather.description);
            }
        });
    });
});