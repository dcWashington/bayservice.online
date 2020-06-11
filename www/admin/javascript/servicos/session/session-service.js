angular.module('controlei')
.factory('SessionService', [ '$window', '$location',
    function SessionService($window, $location) {

        SessionService.setData = function(key, value) {
        	$window.sessionStorage.setItem(key,value);
        };

        SessionService.fetchData = function(key) {
        	return $window.sessionStorage.getItem(key);
        };

        SessionService.clearSession = function() {
            $window.sessionStorage.clear();
        };

        SessionService.validarSessao = function() {
            if(isEmpytNullOrUndefined(SessionService.fetchData("token"))){
                return false;
            }

            return true;
        };

        SessionService.initSessionVars = function() {
            SessionService.setData("cpf", '');
            SessionService.setData("nomeCompleto", '');
            SessionService.setData("token", '');
            SessionService.setData("usuarioLogado", false);
        }

        return SessionService;
    }
]);