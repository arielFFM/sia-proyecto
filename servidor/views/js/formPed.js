var btnIns=document.getElementById('btn-ped');
var caja=document.getElementById('agregaProd');
var pedSelect=document.getElementById('producto');

var agregarEt=function(){
    var selProd=document.createElement('select');
    for(i=0;i<pedSelect.length;i++){
        var opt=document.createElement('option');
        var nodo=document.createTextNode(pedSelect.options[i].value);
        opt.setAttribute('value',pedSelect.options[i].value);
        opt.appendChild(nodo);
        selProd.appendChild(opt);
    }
    var nptCantidad=document.createElement('input');
    var etiqueta1=document.createElement('label');
    var etiqueta2=document.createElement('label');
    var cajClas1=document.createElement('div');
    var cajClas2=document.createElement('div');
    var salto=document.createElement('br');

    selProd.setAttribute('id','producto');
    selProd.setAttribute('name','producto');
    selProd.setAttribute('class','form-control w-50');

    nptCantidad.setAttribute('id','cantidad');
    nptCantidad.setAttribute('name','cantidad');
    nptCantidad.setAttribute('type','number');
    nptCantidad.setAttribute('placeholder','cantidad');
    nptCantidad.setAttribute('class','form-control w-50')

    etiqueta1.setAttribute('for','producto');
    etiqueta2.setAttribute('for','cantidad');
    etiqueta1.innerHTML='Producto';
    etiqueta2.innerHTML='Cantidad';
    cajClas1.setAttribute('class',"form-group ml-2");
    cajClas2.setAttribute('class',"form-group ml-2");

    cajClas1.appendChild(etiqueta1);
    cajClas1.appendChild(selProd);
    cajClas2.appendChild(etiqueta2);
    cajClas2.appendChild(nptCantidad);
    caja.appendChild(salto);
    caja.appendChild(cajClas1);
    caja.appendChild(cajClas2);
}
btnIns.addEventListener('click',agregarEt);