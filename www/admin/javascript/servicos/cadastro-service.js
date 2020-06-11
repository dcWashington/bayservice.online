angular
.module('controlei')
.factory('CadastroService', CadastroService);

function CadastroService ($q, $window, $http) {
    return {

        buscarCategorias : function () {
            return $http({
                method : "GET",
                url : barramento + "/api/v1/categoria?transform=1"
            })
        },

        buscarCadastro : function () {
            return $http({
                method : "GET",
                url : barramento + "/api/v1/generic/concorrente/get/mine"
            })
        },

        inserir : function (objeto) {
            return $http({
                method : "POST",
                url : barramento + "/api/v1/generic/concorrente",
                data: objeto
            })
        },

        atualizar : function (objeto) {
            return $http({
                method : "PUT",
                url : barramento + "/api/v1/generic/concorrente/" + objeto.concorrente_id,
                data: objeto
            })
        },

        excluir : function (id) {
            return $http({
                method : "DELETE",
                url : barramento + "/api/v1/generic/concorrente/" + id
            })
        },

        upload : function(data) {
            return $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: barramento + "/api/v1/upload",
                data: data,
                processData: false, // impedir que o jQuery tranforma a "data" em querystring
                contentType: false, // desabilitar o cabecalho "Content-Type"
                cache: false, // desabilitar o "cache"
                timeout: 600000, // definir um tempo limite (opcional)
                // manipular o sucesso da requisicao
                success: function (data) {
                    //console.log(data);
                    // reativar o botAo de "submit"
                },
                // manipular erros da requisicao
                error: function (e) {
                    console.log(e);
                    // reativar o botao de "submit"
                }
            });
        }

    };
}