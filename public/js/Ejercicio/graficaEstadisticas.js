
var competiciones = [];
var dataGoles = [];
var dataAsistencias = [];
var dataTarjetasAmarillas = [];
var dataTarjetasRojas = [];

var PartidosJugadosTotales = 0;
var PartidosTitularTotales = 0;
var MinutosTotales = 0;
var GolesTotales = 0;
var AsistenciasTotales = 0;
var TarjetasAmarillasTotales = 0;
var TarjetasRojasTotales = 0;

var calculaEstadisticasGlobales = function (jugadorAPI) {

    competiciones = [];
    dataGoles = [];
    dataAsistencias = [];
    dataTarjetasAmarillas = [];
    dataTarjetasRojas = [];
    dataPartidosJugados = [];
    dataPartidosTitular = [];


    PartidosJugadosTotales = 0;
    PartidosTitularTotales = 0;
    MinutosTotales = 0;
    GolesTotales = 0;
    AsistenciasTotales = 0;
    TarjetasAmarillasTotales = 0;
    TarjetasRojasTotales = 0;

    $.each(jugadorAPI.statistics_resume, function (i, item) {
        //if (!(jugadorAPI.statistics_resume[i].goals == 0 && jugadorAPI.statistics_resume[i].assists == 0 && jugadorAPI.statistics_resume[i].yellow_cards == 0 && jugadorAPI.statistics_resume[i].red_cards == 0 && parseInt(jugadorAPI.statistics_resume[i].lineups) == 0 && jugadorAPI.statistics_resume[i].games_played == 0)) {
            competiciones.push(jugadorAPI.statistics_resume[i].category_name);

            dataGoles.push(jugadorAPI.statistics_resume[i].goals);
            GolesTotales += jugadorAPI.statistics_resume[i].goals;

            dataAsistencias.push(jugadorAPI.statistics_resume[i].assists);
            AsistenciasTotales += jugadorAPI.statistics_resume[i].assists;

            dataTarjetasAmarillas.push(jugadorAPI.statistics_resume[i].yellow_cards);
            TarjetasAmarillasTotales += jugadorAPI.statistics_resume[i].yellow_cards;

            dataTarjetasRojas.push(jugadorAPI.statistics_resume[i].red_cards);
            TarjetasRojasTotales += jugadorAPI.statistics_resume[i].red_cards;

            PartidosJugadosTotales += jugadorAPI.statistics_resume[i].games_played;
            dataPartidosJugados.push(jugadorAPI.statistics_resume[i].games_played);

            PartidosTitularTotales += parseInt(jugadorAPI.statistics_resume[i].lineups);
            dataPartidosTitular.push(parseInt(jugadorAPI.statistics_resume[i].lineups));

            MinutosTotales += jugadorAPI.statistics_resume[i].minutes_played;
       // };
    });
}




function MostrarEstadisticas() {

    $('#container').highcharts({

        chart: {
            type: 'bar'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: competiciones,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cantidad',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: { "color": "#3c763d" },
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#dff0d8'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Tarjetas Rojas',
            data: dataTarjetasRojas
        }, {
            name: 'Tarjetas Amarillas',
            data: dataTarjetasAmarillas
        }, {
            name: 'Asistencias',
            data: dataAsistencias
        }, {
            name: 'Goles',
            data: dataGoles
        }, {
            name: 'Partidos Titular',
            data: dataPartidosTitular
        }, {
            name: 'Partidos Jugados',
            data: dataPartidosJugados
        }]
    });

}

