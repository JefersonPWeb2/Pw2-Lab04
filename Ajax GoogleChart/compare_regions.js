google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.getJSON('data.json', function(data) {
        const regionsToCompare = ['Amazonas', 'Lima', 'Arequipa', 'Cusco', 'Piura'];
        const chartData = [['Fecha', ...regionsToCompare]];

        const dates = new Set();
        data.forEach(region => {
            if (regionsToCompare.includes(region.region)) {
                region.confirmed.forEach(entry => dates.add(entry.date));
            }
        });

        const sortedDates = Array.from(dates).sort((a, b) => {
            const dateA = new Date(a.split('-').reverse().join('-'));
            const dateB = new Date(b.split('-').reverse().join('-'));
            return dateA - dateB;
        });

        sortedDates.forEach(date => {
            const row = [new Date(date.split('-').reverse().join('-'))];
            regionsToCompare.forEach(regionName => {
                const region = data.find(r => r.region === regionName);
                const entry = region.confirmed.find(e => e.date === date);
                row.push(entry ? parseInt(entry.value) : 0);
            });
            chartData.push(row);
        });

        const dataTable = google.visualization.arrayToDataTable(chartData);

        const options = {
            title: 'Comparación de Confirmados entre Regiones',
            hAxis: {
                title: 'Fecha',
                format: 'dd/MM/yyyy'
            },
            vAxis: {
                title: 'Confirmados'
            },
            legend: { position: 'bottom' }
        };

        const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(dataTable, options);
    }).fail(function() {
        console.error('Error al cargar data.json');
    });
}

