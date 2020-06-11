angular.module('controlei') 
.config(function($routeProvider) {
	
	$routeProvider.when('/', {
		templateUrl : "views/login.html",
		controller: 'LoginController'
	})
	.when('/home', {
		templateUrl : "views/cadastro.html",
		controller: 'CadastroController'
	})
	.when('/login', {
		templateUrl : "views/cadastro.html",
		controller: 'CadastroController'
	})
	.when('/grafico', {
		templateUrl : "views/grafico.html",
		controller: 'GraficoController'
	})
	.when('/404', {
		templateUrl : "views/404.html",
		controller: 'GraficoController'
	})
	.otherwise( {
		redirectTo: 'views/404.html'
	});

});