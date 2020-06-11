angular.module('controlei')
.controller('LoginController', ['$scope', '$uibModal', '$log', '$document', '$location', '$window', '$filter', 'LoginService', '$rootScope', '$localStorage','$rootScope', 
	function ($scope, $uibModal, $log, $document, $location, $window, $filter, LoginService, $rootScope, $localStorage, $rootScope) {

    $scope.temErro = false;
    $scope.mensagem = "";
    $scope.form = {
    	"name": "",
    	"email": "",
    	"password": ""
    };
    $scope.$storage = $localStorage;
    $scope.flagMostrarLogin = true;

    $scope.solicitar = function(){
    	console.info("solicitando para:");
    	console.info($scope.form);

    	LoginService.validarDisponibilidade($scope.form)
        .success(function(response, status){
            if(status == 406){
                apresentarMensagem("User not available");
                
                gtag('event', 'login', {
                    'event_category' : 'cadastro-indisponivel',
                    'event_label' : $scope.form.name
                });
        	}else if(status ==200){
        		cadastrar();
        	}else{
                apresentarMensagem("Something wrong happened. Contact admin");    
            }
        })
        .error(function(response){
        	
        	console.info(response);
            apresentarMensagem("User not available");
        });
    }

    var cadastrar = function(){

    	//validar email

    	//validar usuario
    	LoginService.signup($scope.form)
        .success(function(response, status){
    		//apresentarMensagem("Cadastro efetuado com sucesso, a partir de agora você pode entrar com seu email e senha.");
            $scope.flagMostrarLogin = true;
            $scope.login();
            
            gtag('event', 'login', {
                'event_category' : 'cadastro',
                'event_label' : $scope.form.name
            });
        })
        .error(function(response){
            apresentarMensagem("Something wrong happened");

            gtag('event', 'login', {
                'event_category' : 'cadastro-erro',
                'event_label' : $scope.form.name
            });
        });
    }

    $scope.login = function(){
        LoginService.login($scope.form)
        .success(function(response){

            //TODO: nao era pra ser assim, erro de login tinha que cair em error...
            if(response.status=="error"){
                apresentarMensagem("Something wrong happened");
            }else{
                $scope.nome = response.user.name;
                $scope.tipo = response.user.tipo;
                $localStorage.nome = response.user.name;
                $localStorage.token = response.token;
                $localStorage.tipo = response.user.tipo;
                $localStorage.user_id = response.user.id;
                $scope.temErro = false;
                $scope.$storage.usuarioLogado = true;
                
                var objetoGlogal = {
                	"localstorage" : $localStorage,
                	"flagMostrarMenu" : true
                }

                $rootScope.$broadcast('topic', objetoGlogal);

                $location.path("/home");
            }

        })
        .error(function(response){
            $scope.$storage.usuarioLogado = false;
            $scope.temErro = true;
            apresentarMensagem("Something wrong happened");
        });
    }

    var limparDadosDeLogin = function(){

     	var objetoGlogal = {
        	"localstorage" : null,
        	"flagMostrarMenu" : null
        }

        $rootScope.$broadcast('topic', objetoGlogal);
    }

    init = function() {
        limparDadosDeLogin();
    };

	init();
}]);