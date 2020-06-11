angular.module('controlei')
.config(function($httpProvider, $base64, $provide) {

	$provide.factory('preventTemplateCache', function($injector) {
		return {
		  'request': function(config) {
		    if (config.url.indexOf('views') !== -1) {
		      config.url = config.url + '?t=' + Math.random();
		    }
		    return config;
		  }
		}
	})


	$provide.factory('MyHttpInterceptor', function($q, $location, $localStorage, $injector, ComponentModal) {
	return {
	    request : function(config) {
	        var apiPattern = /\/api\//;

	        config.params = config.params || {};

	        if ($localStorage.token && apiPattern.test(config.url)) {
	            config.params.token = $localStorage.token;
	        }
	        return config || $q.when(config);
	    },

	    response: function(response){
            if(response.data.message=="Token has expired"){
                apresentarErroDeToken($injector, ComponentModal);
            }
	    	return response;
	    },

	    responseError: function (response) {
			if(response.data.search("TokenExpiredException") > 0){
                apresentarErroDeToken($injector, ComponentModal);
            }
	    	return response;
        }

	  };
	});

	$httpProvider.interceptors.push('MyHttpInterceptor');
	$httpProvider.interceptors.push('preventTemplateCache');
})
.run(function($rootScope, $location, $window, $localStorage) {
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		
		var ignorar = false;
		if(!isEmpytNullOrUndefined(next)){
			// console.info("trocando de rota");
			//var ignorar = next.$$route.originalPath == "/painel-de-servicos";
		}else{
			// console.info("trocando de rota - sem next");
		}

		var usuarioLogado = $localStorage.usuarioLogado;
		if (!ignorar && isEmpytNullOrUndefined(usuarioLogado)) { 
			//$location.path("/login");
		}
	});
});

function apresentarErroDeToken($injector, ComponentModal){
    var modal = $injector.get('$uibModal');
    var config = new Object();
    config.title = "Aviso";
    config.data = "Seu tempo de permanência expirou. Entre com seu email e senha para poder navegar novamente";
    config.windowClass = "modal-mensagem";
    config.templateUrl = 'modal-mensagem.html';

    var modalInstance = ComponentModal.getModalWindow(modal, config);
    modalInstance.result.then(
    function (response) {
        window.location = "#";
    }, 
    function (response) {
        window.location = "#";
    });
}
