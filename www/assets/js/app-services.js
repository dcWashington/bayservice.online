angular
.module('principal')
.factory('ServicoService', ServicoService);

function ServicoService ($q, $window, $http) {
    return {

        buscarCategorias : function () {
            return $http({
                method : "GET",
                url : "back/public/api/v1/categoria?transform=1"
            })
        },

        buscarConcorrentes : function () {
            return $http({
                method : "GET",
                url : "back/public/api/v1/concorrente?transform=1"
            })
        },
    };
}