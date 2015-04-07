var miApp = angular.module('miApp', [
  'ngRoute',
  'miAppControllers'
]);
miApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/', {
             templateUrl: '/Js/Ejercicio/partials/competicion.html',
             controller: 'ControladorCompeticion'
        }).
        when('/liga/:id', {
            templateUrl: '/Js/Ejercicio/partials/liga.html',
            controller: 'ControladorLiga'
                }).
        when('/equipo/:id', {
            templateUrl: '/Js/Ejercicio/partials/listado.html',
            controller: 'ControladorLista'
        }).
        when('/jugador/:id', {
            templateUrl: '/Js/Ejercicio/partials/detalle.html',
            controller: 'ControladorDetalle'
        }).
        otherwise({
            redirectTo: '/'
        });
  }]);