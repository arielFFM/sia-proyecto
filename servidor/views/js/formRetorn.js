var btnInsRet=document.getElementById('btn-retorn');
var caja2=document.getElementById('agregRetorn');
var reSelect=document.getElementById('nombreRetorn')

var agregarEti=function(){
    var selRetor=document.createElement('select');
    for(i=0;i<reSelect.length;i++){
        var opt=document.createElement('option');
        var nodo=document.createTextNode(reSelect.options[i].value);
        opt.setAttribute('value',reSelect.options[i].value);
        opt.appendChild(nodo);
        selRetor.appendChild(opt);
    }
    var nptCantidad=document.createElement('input');
    var etiqueta1=document.createElement('label');
    var etiqueta2=document.createElement('label');
    var cajRetorn1=document.createElement('div');
    var cajRetorn2=document.createElement('div');
    var salto=document.createElement('br');

    selRetor.setAttribute('id','insRetorn');
    selRetor.setAttribute('name','insRetorn');
    selRetor.setAttribute('class','form-control w-50');

    nptCantidad.setAttribute('id','cantRetorn');
    nptCantidad.setAttribute('name','cantRetorn');
    nptCantidad.setAttribute('type','number');
    nptCantidad.setAttribute('placeholder','cantidad');
    nptCantidad.setAttribute('class','form-control w-50');

    etiqueta1.setAttribute('for','producto');
    etiqueta2.setAttribute('for','cantidad');
    etiqueta1.innerHTML='Producto';
    etiqueta2.innerHTML='Cantidad';
    cajRetorn1.setAttribute('class',"form-group ml-2");
    cajRetorn2.setAttribute('class',"form-group ml-2");

    cajRetorn1.appendChild(etiqueta1);
    cajRetorn1.appendChild(selRetor);
    cajRetorn2.appendChild(etiqueta1);
    cajRetorn2.appendChild(nptCantidad);
    caja2.appendChild(salto);
    caja2.appendChild(cajRetorn1);
    caja2.appendChild(cajRetorn2);
}
btnInsRet.addEventListener('click',agregarEti);