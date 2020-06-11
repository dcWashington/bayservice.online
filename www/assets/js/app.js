angular.module('principal', [])
  .controller('Controller', function($http, ServicoService, $scope, orderByFilter) {

    var servicos = this;
    servicos.busca = "";
      
    servicos.flagCategorias = true;
    servicos.categoriaEscolhida = "nenhuma";

    var toType = function(obj) {
      return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }

    $scope.buscarCategorias = function(){
      ServicoService.buscarCategorias()
      .then(function successCallback(response) {
        servicos.categorias = response.data.categoria;
        $scope.buscarConcorrentes();
 
     }, function errorCallback(response) {
 
      });
    }

    $scope.buscarConcorrentes = function(){
      ServicoService.buscarConcorrentes()
      .then(function successCallback(response) {
        servicos.concorrentes = response.data.concorrente;
        montarView(servicos.concorrentes);
        scroolTop();
     }, function errorCallback(response) {
        apresentarMensagem("Erro ao buscar dados.");
      });
    }

    var montarView = function(concorrentes){
      servicos.categorias.forEach(categoria => {
        categoria.concorrentes = new Array();
        
        concorrentes.forEach(concorrente => {
          if(concorrente.categoria_id == categoria.id){
            categoria.concorrentes.push(concorrente);
          }
        });
      });
      
      
      $scope.propertyName = 'titulo';
      $scope.reverse = false;
      servicos.categorias = orderByFilter(servicos.categorias, $scope.propertyName, $scope.reverse);
    }

    var scroolTop = function(){
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    $scope.escolherCategoria = function(categoria, area){
      servicos.flagCategorias=false; 
      servicos.categoriaEscolhida=categoria;

      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      gtag('event', 'escolher-categoria', {
        'event_category' : categoria.humanizada,
        'event_label' : area
      });
    }
    
    $scope.cadastrar = function(origem){
      gtag('event', 'cadastrar', {
        'event_category' : 'cadastro',
        'event_label' : origem
      });

      window.location.href = "admin/";
    }

    $scope.meuFiltro = function (item) { 
      var busca = servicos.busca.toLowerCase();
      busca = convert_accented_characters(busca);

      var categoria_titulo = item.titulo.toLowerCase();
      categoria_titulo = convert_accented_characters(categoria_titulo);

      if(""==busca){
        return true;
      }
      
      if(categoria_titulo.indexOf(busca) !== -1){
        return true;
      }

      for(i=0; i<item.concorrentes.length; i++){
        var concorrente = item.concorrentes[i];
        if(concorrente.nomeFantasia){
          var concorrente_nomeFantasia = concorrente.nomeFantasia.toLowerCase();
          concorrente_nomeFantasia = convert_accented_characters(concorrente_nomeFantasia);
          if(concorrente_nomeFantasia.indexOf(busca) !== -1){
            return true;
          }
        }

        if(concorrente.descricao){
          var concorrente_descricao = concorrente.descricao.toLowerCase();
          concorrente_descricao = convert_accented_characters(concorrente_descricao);
          if(concorrente_descricao.indexOf(busca) !== -1){
            return true;
          }
        }
      }

      servicos.semResultado = true;
      return false;
    };

    $scope.meuFiltroConcorrente = function (item) { 
      var busca = servicos.busca.toLowerCase();
      busca = convert_accented_characters(busca);

      if(""==busca){
        return true;
      }
      
      if(item.nomeFantasia){
        var concorrente_nomeFantasia = item.nomeFantasia.toLowerCase();
        concorrente_nomeFantasia = convert_accented_characters(concorrente_nomeFantasia);
        if(concorrente_nomeFantasia.indexOf(busca) !== -1){
          return true;
        }
      }
      
      if(item.descricao){
        var concorrente_descricao = item.descricao.toLowerCase();
        concorrente_descricao = convert_accented_characters(concorrente_descricao);
        if(concorrente_descricao.indexOf(busca) !== -1){
          return true;
        }
      }

      return false;
    };
    

    $scope.buscarCategorias();
    
    

  });

  function convert_accented_characters(str){
    var conversions = new Object();
    conversions['ae'] = 'ä|æ|ǽ';
    conversions['oe'] = 'ö|œ';
    conversions['ue'] = 'ü';
    conversions['Ae'] = 'Ä';
    conversions['Ue'] = 'Ü';
    conversions['Oe'] = 'Ö';
    conversions['A'] = 'À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ';
    conversions['a'] = 'à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª';
    conversions['C'] = 'Ç|Ć|Ĉ|Ċ|Č';
    conversions['c'] = 'ç|ć|ĉ|ċ|č';
    conversions['D'] = 'Ð|Ď|Đ';
    conversions['d'] = 'ð|ď|đ';
    conversions['E'] = 'È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě';
    conversions['e'] = 'è|é|ê|ë|ē|ĕ|ė|ę|ě';
    conversions['G'] = 'Ĝ|Ğ|Ġ|Ģ';
    conversions['g'] = 'ĝ|ğ|ġ|ģ';
    conversions['H'] = 'Ĥ|Ħ';
    conversions['h'] = 'ĥ|ħ';
    conversions['I'] = 'Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ';
    conversions['i'] = 'ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı';
    conversions['J'] = 'Ĵ';
    conversions['j'] = 'ĵ';
    conversions['K'] = 'Ķ';
    conversions['k'] = 'ķ';
    conversions['L'] = 'Ĺ|Ļ|Ľ|Ŀ|Ł';
    conversions['l'] = 'ĺ|ļ|ľ|ŀ|ł';
    conversions['N'] = 'Ñ|Ń|Ņ|Ň';
    conversions['n'] = 'ñ|ń|ņ|ň|ŉ';
    conversions['O'] = 'Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ';
    conversions['o'] = 'ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º';
    conversions['R'] = 'Ŕ|Ŗ|Ř';
    conversions['r'] = 'ŕ|ŗ|ř';
    conversions['S'] = 'Ś|Ŝ|Ş|Š';
    conversions['s'] = 'ś|ŝ|ş|š|ſ';
    conversions['T'] = 'Ţ|Ť|Ŧ';
    conversions['t'] = 'ţ|ť|ŧ';
    conversions['U'] = 'Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ';
    conversions['u'] = 'ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ';
    conversions['Y'] = 'Ý|Ÿ|Ŷ';
    conversions['y'] = 'ý|ÿ|ŷ';
    conversions['W'] = 'Ŵ';
    conversions['w'] = 'ŵ';
    conversions['Z'] = 'Ź|Ż|Ž';
    conversions['z'] = 'ź|ż|ž';
    conversions['AE'] = 'Æ|Ǽ';
    conversions['ss'] = 'ß';
    conversions['IJ'] = 'Ĳ';
    conversions['ij'] = 'ĳ';
    conversions['OE'] = 'Œ';
    conversions['f'] = 'ƒ';

    for(var i in conversions){
        var re = new RegExp(conversions[i],"g");
        str = str.replace(re,i);
    }

    return str;
}