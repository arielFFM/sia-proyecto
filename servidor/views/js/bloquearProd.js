var prodEvent=document.getElementById('tipo');
prodEvent.addEventListener('change', function(){
    if(prodEvent.value=="true"){
        document.getElementById("nombreIns").disabled=false;
        document.getElementById("cantidadIns").disabled=false;
        document.getElementById("btn-ins").disabled=false;
    }else{
        document.getElementById("nombreIns").disabled=true;
        document.getElementById("cantidadIns").disabled=true;
        document.getElementById("btn-ins").disabled=true;
    }
});
var retornEvent=document.getElementById('retornable');
retornEvent.addEventListener('change',function(){
    if(retornEvent.value=="true"){
        document.getElementById("nombreRetorn").disabled=false;
        document.getElementById("cantRetorn").disabled=false;
        document.getElementById("btn-retorn").disabled=false;
    }else{
        document.getElementById("nombreRetorn").disabled=true;
        document.getElementById("cantRetorn").disabled=true;
        document.getElementById("btn-retorn").disabled=true;
    }
});