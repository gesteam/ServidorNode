var miAppControllers = angular.module('miAppControllers', []);

//COMPETICION

miAppControllers.controller('ControladorCompeticion', function ($scope, $http) {


  $scope.competicion = competicion;
});

//LIGA

miAppControllers.controller('ControladorLiga', ['$scope', '$routeParams', '$http',
  function ($scope, $routeParams, $http) {



    var liga;
    var grupo;

    $scope.competicion = competicion;

    var id = $routeParams.id;
    $scope.id = id;

    $.each(competicion.competicion, function (i, item) {

      if (item.id == id) {
        liga = item.liga;
        grupo = item.grupo;
      }
    });

    $http.get('http://apiangularua.azurewebsites.net/liga?liga=' + liga + '&grupo=' + grupo).success(function (data) {
      $scope.liga = data;
    }).error(function (data, status, headers, config) {
              //Controlar el error
            });

  }]);


//PLANTILLA

miAppControllers.controller('ControladorLista', ['$scope', '$routeParams', '$http',
  function ($scope, $routeParams, $http) {

    $http.get('http://apiangularua.azurewebsites.net/equipo?id=' + $routeParams.id).success(function (data) {

      $scope.id = $routeParams.id;

      $scope.jugadores = data;

      $scope.twitter = "";
      if (data.team.twitter) {
        $scope.twitter = (data.team.twitter).substring(1);
      }


      var liga = data.team.category.category_id;
      var grupo = data.team.category.group_code;



          //Para saber el id de la liga y poner el enlace de equipo en el menu

          $.each(competicion.competicion, function (i, item) {

           if (item.liga == liga && item.grupo == grupo) {
             $scope.idEquipo = item.id;
           }
         });

        }).error(function (data, status, headers, config) {
          //Controlar el error
        });

      }]);

//DETALLE

miAppControllers.controller('ControladorDetalle', ['$scope', '$routeParams', '$http', '$location', '$anchorScroll',
  function ($scope, $routeParams, $http, $location, $anchorScroll) {


    $http.get('http://apiangularua.azurewebsites.net/jugador?id=' + $routeParams.id).success(function (data) {

      $scope.id = $routeParams.id;

      calculaEstadisticasGlobales(data);

      $scope.jugador = data;

      $scope.twitter = "";
      if (data.twitter) {
        $scope.twitter = (data.twitter).substring(1);
      }


      $scope.goles = GolesTotales;
      $scope.asistencias = AsistenciasTotales;
      $scope.tarjetasamarillas = TarjetasAmarillasTotales;
      $scope.tarjetasrojas = TarjetasRojasTotales;
      $scope.partidosjugados = PartidosJugadosTotales;
      $scope.partidostitular = PartidosTitularTotales;
      $scope.minutosjugados = MinutosTotales;


      $scope.sube = function () {


        $location.hash('contenedor');

        $anchorScroll();
      };

      angular.element(document).ready(function () {
        !function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + "://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "twitter-wjs");
        MostrarEstadisticas();
      });


          //Para sacar el id de la competicion y ponerlo en el menu
          var liga = data.statistics_resume[0].category_id;
          var grupo = data.statistics_resume[0].group_code;



          $.each(competicion.competicion, function (i, item) {

            if (item.liga == liga && item.grupo == grupo) {
              $scope.idEquipo = item.id;
            }
          });


        }).error(function (data, status, headers, config) {
          //Controlar el error
          console.log(data);
        });
      }]);


