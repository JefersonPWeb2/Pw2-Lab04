$(document).ready(function() {
    $('#btnMostrarRegiones').click(function() {
        $.getJSON('data.json', function(data) {
            const regionList = $('#regionList');
            regionList.empty(); // Limpiar la lista antes de agregar nuevas regiones

            // Iterar sobre los datos y agregar cada región a la lista
            data.forEach(regionData => {
                const li = $('<li>').text(regionData.region);
                regionList.append(li);
            });
        }).fail(function() {
            console.error('Error al cargar data.json');
        });
    });
});

