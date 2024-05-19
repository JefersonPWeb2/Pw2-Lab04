$(document).ready(function() {
    $('#btnMostrarTotales').click(function() {
        $.getJSON('../data/data.json', function(data) { 
            const totalList = $('#totalList');
            totalList.empty();

            data.forEach(regionData => {
                const totalConfirmed = regionData.confirmed.reduce((sum, entry) => sum + parseInt(entry.value), 0);
                const li = $('<li>').text(`${regionData.region}: ${totalConfirmed}`);
                totalList.append(li);
            });
        }).fail(function() {
            console.error('Error al cargar data.json');
        });
    });
});

