google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.getJSON('../data/data.json', function(data) {
        const arequipaData = data.find(region => region.region === 'Arequipa');
        if (!arequipaData) {
            console.error('No se encontró la región Arequipa en data.json');
            return;
        }

        const chartData = [['Fecha', 'Confirmados']];
        arequipaData.confirmed.forEach(entry => {
            const dateParts = entry.date.split('-');
            const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
            chartData.push([date, parseInt(entry.value)]);
        });

        const dataTable = google.visualization.arrayToDataTable(chartData);

        const options = {
            title: 'Casos Confirmados en Arequipa a lo largo del tiempo',
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


