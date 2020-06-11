function isEmpytNullOrUndefined(valor) {
	if (typeof(valor) === "undefined" || valor === null || valor == '') {
		return true;
	}
	
	return false;
}

function converterValorLiteralEmFloat( num ) {
	var numero = num.toString().replace( /\./g, '');  //remover pontos de milhar
	numero = numero.toString().replace( 'R$', '');    //remover cifrão
	numero = numero.replace(/ /g,'');                 //remover espaço em branco
	numero = numero.replace( /,/g, '.');              //trocar virgulas por ponto
    return parseFloat( numero ); 					  //converter em float
}

// 13/12/2017 -> 2017-12-13
function inverterData(dataBrasil){
	return ""+dataBrasil.substring(6,12)+"-"+dataBrasil.substring(3,5)+"-"+dataBrasil.substring(0,2);
}

//yyyy-mm-dd -> Date()
function criarData(string){
	var parts = string.split("-");
	return new Date(parts[0], parts[1] - 1, parts[2]);
}