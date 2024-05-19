$(document).ready(function() {
    $.getJSON('../data/data.json', function(data) { 
        const sortedRegions = data.sort((a, b) => {
            const sumA = a.confirmed.reduce((total, entry) => total + parseInt(entry.value), 0);
            const sumB = b.confirmed.reduce((total, entry) => total + parseInt(entry.value), 0);
            return sumB - sumA; 
        });

        const top10Regions = sortedRegions.slice(0, 10); 
        const topRegionsList = $('#topRegionsList');
        top10Regions.forEach((region, index) => {
            const sum = region.confirmed.reduce((total, entry) => total + parseInt(entry.value), 0);
            const position = index + 1;
            const li = $('<li>').text(`Top ${position}: ${region.region} - ${sum}`);
            topRegionsList.append(li);
        });
    }).fail(function() {
        console.error('Error al cargar data.json');
    });
});

