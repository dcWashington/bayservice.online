angular.module('controlei')
.controller('CadastroController', ['$scope', '$compile', '$uibModal', '$log', '$document', '$location', '$window', '$filter', '$localStorage', 'CadastroService','$anchorScroll', '$filter', '$rootScope', 'orderByFilter',
	function ($scope, $compile, $uibModal, $log, $document, $location, $window, $filter, $localStorage, CadastroService, $anchorScroll, $filter, $rootScope, orderByFilter) {

    $scope.$storage = $localStorage;
    $scope.categorias = new Object(); 
    $scope.objeto = new Object();
    $scope.servicos = new Object();
    $scope.flagEditando = false;
    
    $scope.preencher = function(){
        $scope.objeto.nome = "Nayara Martins";
        $scope.objeto.nomeFantasia = "Istore Prime";
        $scope.objeto.categoria = "55";
        $scope.objeto.celular = "11-9-7364-8452";
        $scope.objeto.telefone = "11-4148-8592";
        $scope.objeto.site = "https://www.istoreprime.com.br";
        $scope.objeto.facebook = "https://www.facebook.com/istoreprime";
        $scope.objeto.instagram = "https://www.instagram.com/istoreprime";
    }

    var limpar = function(){
        $scope.objeto = new Object();
    }

    $scope.selecionar = function(selecionado){
        $scope.objeto = selecionado;
        $scope.objeto.categoria = $scope.objeto.categoria_id; 
        $scope.flagEditando = true;
    }

    $scope.voltar = function(){
        $scope.flagEditando = false;
    }

    $scope.novo = function(){
        $scope.flagEditando = true;
        limpar();
    }

    $scope.excluir = function(){
        CadastroService.excluir($scope.objeto.concorrente_id)
        .success(function(response){
            apresentarMensagem("Success. Your service was deleted from the list.");
            $scope.buscarCadastro();
            $scope.flagEditando = false;
        })
        .error(function(response){
            apresentarMensagem("Error. Contact the Admin.");
        });
    }

    $scope.upload = function(){
        var form = $('#fileUploadForm')[0];
        var data = new FormData(form);

        CadastroService.upload(data)
        .done(function(response) {
            console.info( "success" );
            console.info(response);

            if(response.url){
                $scope.objeto.logo = response.url;
                $scope.$apply();
            }else{
                apresentarMensagem('It was not possible to save the image, try it again, or contact the Admin');
            }
            
        })
        .fail(function(response) {
            apresentarMensagem('It was not possible to save the image, try it again, or contact the Admin');
            console.info(response);
        })
    }

    $scope.salvar = function(){
        prepararParaSalvar();

        if($scope.objeto.concorrente_id){
            CadastroService.atualizar($scope.objeto)
            .success(function(response){
                apresentarMensagem("Sucess! Info was updated.");
                $scope.buscarCadastro();
            })
            .error(function(response){
                apresentarMensagem("Error. Contact the Admin.");
            });
        }else{
            CadastroService.inserir($scope.objeto)
            .success(function(response){
                apresentarMensagem("Sucess! Your service was registered.");
                $scope.objeto.concorrente_id = response;
                $scope.buscarCadastro();

                gtag('event', 'cadastro-concorrente', {
                    'event_category' : 'sucesso',
                    'event_label' : $scope.objeto.nomeFantasia
                });
            })
            .error(function(response){
                apresentarMensagem("Error. Contact the Admin.");
                gtag('event', 'cadastro-concorrente', {
                    'event_category' : 'erro',
                    'event_label' : $scope.objeto.nomeFantasia
                });
            });
        }
    }

    $scope.buscarCategorias = function(){
        CadastroService.buscarCategorias()
        .success(function(response){
            $scope.categorias1 = response.categoria;


            $scope.propertyName = 'titulo';
            $scope.reverse = false;
            $scope.categorias = orderByFilter($scope.categorias1, $scope.propertyName, $scope.reverse);

            if( $scope.categorias.length!=0 ){
                $scope.flagSemConteudo = false;
            }else{
                $scope.mensagem = "Não há registros.";
            }
        })
        .error(function(response){
            $scope.mensagem = "Erro ao buscar registros.";
            $scope.flagSemConteudo = true;
        });
    }

    $scope.buscarCadastro = function(){
        CadastroService.buscarCadastro()
        .success(function(response){
            if(response=="erro"){
                console.info("erro");
            }else{
                if(response.concorrente.length>0){
                    $scope.servicos = response.concorrente;
                    $scope.objeto= response.concorrente[0];
                    $scope.objeto.categoria = $scope.objeto.categoria_id; 
                }
            }
        })
        .error(function(response){
            $scope.mensagem = "Erro ao buscar registros.";
            $scope.flagSemConteudo = true;
        });
    }

    var prepararParaSalvar = function(){
        $scope.objeto.categoria_id = $scope.objeto.categoria;
    }

    var atualizarTopico = function(){
    	var objetoGlogal = {
        	"localstorage" : $localStorage,
        	"flagMostrarMenu" : true
        }

        $rootScope.$broadcast('topic', objetoGlogal);
    }

    init = function() {
        $scope.buscarCategorias();
        $scope.buscarCadastro();
        atualizarTopico();
    };
    
	init();
}]);