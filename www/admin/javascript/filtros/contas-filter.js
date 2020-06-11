angular.module('controlei')
.filter('date2', function myDateFormat($filter){
  return function(text){
    if(text != undefined){
        var tempdate = new Date(text.replace(/-/g,"/")); 
        if(tempdate!="Invalid Date"){
            return $filter('date')(tempdate, "dd/MM/yyyy");
        }else{
            return "";
        }
    }
    
  }
})
.filter('xxx', function() {
    return function(value, key, yyy) {
        var sum = 0;
        for (var i = value.length - 1; i >= 0; i--) {
        	if(value.valor > 0){
            	sum += parseFloat(value.valor);
        	}
        }

        return sum;
    };
});