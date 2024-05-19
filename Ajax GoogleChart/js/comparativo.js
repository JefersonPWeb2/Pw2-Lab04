google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(init);

function init() {
    document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this); 
        const region1 = formData.get('string1'); 
        const region2 = formData.get('string2');

        $.getJSON('../data/data.json', function(data) {
            drawChartData(data, region1, region2);
        }).fail(function() {
            console.error('Error al cargar data.json');
        });
    });
}

function drawChartData(data, region1, region2) {
    const dataRegion1 = data.find(region => region.region === region1);
    const dataRegion2 = data.find(region => region.region === region2);

    if (!dataRegion1 || !dataRegion2) {
        console.error('Datos no encontrados para las regiones especificadas');
        return;
    }

    const chartData = [['Fecha', region1, region2]];

    dataRegion1.confirmed.forEach(entry => {
        const dateParts = entry.date.split('-');
        const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        const value = parseInt(entry.value);
        const row = [date, value, null]; 
        chartData.push(row);
    });

    dataRegion2.confirmed.forEach(entry => {
        const dateParts = entry.date.split('-');
        const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        const value = parseInt(entry.value);
        const row = [date, null, value]; 
        chartData.push(row);
    });

    const dataTable = google.visualization.arrayToDataTable(chartData);

    const options = {
        title: 'Casos Confirmados de: ' + region1 + ' y ' + region2,
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
}


