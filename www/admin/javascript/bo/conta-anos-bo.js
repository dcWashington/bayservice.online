angular.module('controlei')
.factory('ContaAnosBO', ['ContaAnosService', '$window',
    function ContaAnosBO(ContaAnosService, $window) {

        ContaAnosBO.validarCliente = function(usuario) {
            ContaAnosService.validarCliente(usuario)
            .success(function (response, status, headers, config) {
                if (status == "200") {
                    console.log(response);
                    checkUser = true;
                    //$window.location.href = '#cartoes';
                } else {
                    console.log(response);
                }
            })
            .error(function(response, status, headers, config) {
                console.log(response);
            });

            return true;
        }

        ContaAnosBO.consultarCliente = function(scope) {
            ContaAnosService.consultarCliente(scope.cpf)
            .success(function (response,status,headers,config) {
                console.log(response);
            })
            .error(function (response, status, headers, config) {
                console.log("erro");
                console.log(response);
            });
        }

        ContaAnosBO.consultarSaldo = function(scope) {
            ContaAnosService.consultarSaldo(scope.cpf)
            .success(function (response,status,headers,config) {
                console.log(response);
            })
            .error(function (response, status, headers, config) {
                console.log("erro");
                console.log(response);
            });
        }

        ContaAnosBO.login = function(scope) {
            ContaAnosService.validarSenha(scope.usuario)
            .success(function (response, status, headers, config) {
                $window.sessionStorage.setItem("token", response.token);
                $window.sessionStorage.setItem("cpf", scope.usuario.cpf);
                $window.location.href = '#/cartoes';
                return true;
            })
            .error(function(response, status, headers, config) {
               scope.message = getResponseMessage(status, response);
               scope.showMessage = true;
               return false;
            });

            $window.location.href = '#/cartoes';
            return true;
        }
        
        ContaAnosBO.alterarSenha = function(scope) {
            ContaAnosService.alterarSenha(scope.usuario)
            .success(function (response, status, headers, config) {
                //TODO: alteração de senha
                return true;
            })
            .error(function(response,status,headers,config) {
                scope.message = getResponseMessage(status, response);
                return false;
            });
        }



        return ContaAnosBO;
    }
]);
