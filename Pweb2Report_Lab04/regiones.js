google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.getJSON('../data/data.json', function(data) { 
        const regionesFiltradas = data.filter(region => region.region !== 'Lima' && region.region !== 'Callao');
        let fechas = new Set();

        regionesFiltradas.forEach(region => {
            region.confirmed.forEach(entry => fechas.add(entry.date));
        });

        fechas = Array.from(fechas).sort((a, b) => new Date(a) - new Date(b));

        let chartData = [['Fecha', ...regionesFiltradas.map(region => region.region)]];

        fechas.forEach(fecha => {
            let row = [new Date(fecha.split('-')[2], fecha.split('-')[1] - 1, fecha.split('-')[0])];
            regionesFiltradas.forEach(region => {
                let entry = region.confirmed.find(entry => entry.date === fecha);
                row.push(entry ? parseInt(entry.value) : null);
            });
            chartData.push(row);
        });

        const dataTable = google.visualization.arrayToDataTable(chartData);


        const colors = [
            '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', 
            '#33FFA1', '#FFBD33', '#3385FF', '#33FFBD', '#FF5733', '#BD33FF', 
            '#33FF85', '#FF3380','#80FF33', '#5733FF', '#FF8333', '#33FFDD', 
            '#FF33FF', '#33A1FF', '#FF3357', '#85FF33', '#FF5733', '#33FF57', 
        ];

        const options = {
            title: 'Gráfico Comparativo Excluyendo Lima y Callao',
            hAxis: {
                title: 'Fecha',
                format: 'dd/MM/yyyy'
            },
            vAxis: {
                title: 'Casos'
            },
            legend: { position: 'bottom' },
            colors: colors.slice(0, regionesFiltradas.length) 
        };

        const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(dataTable, options);
    }).fail(function() {
        console.error('Error al cargar data.json');
    });
}
