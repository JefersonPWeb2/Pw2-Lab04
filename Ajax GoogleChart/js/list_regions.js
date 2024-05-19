$(document).ready(function() {
    $('#btnMostrarRegiones').click(function() {
        $.getJSON('../data/data.json', function(data) {
            const regionList = $('#regionList');
            regionList.empty();

            data.forEach(regionData => {
                const li = $('<li>').text(regionData.region);
                regionList.append(li);
            });
        }).fail(function() {
            console.error('Error al cargar data.json');
        });
    });
});



