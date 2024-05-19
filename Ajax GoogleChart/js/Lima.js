google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.getJSON('../data/data.json', function(data) { 
        let nombres = [];
        const chartData = [['Fecha', 'Confirmados']];
        data.forEach(regiones => {
            if (regiones.region !== 'Lima' && regiones.region !== 'Callao') { 
                nombres.push(regiones.region);
                regiones.confirmed.forEach(entry => { 
                    const fecha = entry.date.split('-');
                    const date = new Date(fecha[2], fecha[1] - 1, fecha[0]);
                    chartData.push([date, parseInt(entry.value)]);
                });
            }
        });
        
        const dataTable = google.visualization.arrayToDataTable(chartData);

        const options = {
            title: 'Gráfico Comparativo Excluyendo Lima y Callao',
            hAxis: {
                title: 'Fecha',
                format: 'dd/MM/yyyy'
            },
            vAxis: {
                title: 'Casos'
            },
            legend: { position: 'bottom' }
        };

        const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(dataTable, options);
    }).fail(function() {
        console.error('Error al cargar data.json');
    });
}

