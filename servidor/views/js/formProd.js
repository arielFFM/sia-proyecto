var btnIns=document.getElementById('btn-ins');
var inSelect=document.getElementById('nombreIns');

var caja=document.getElementById('agregInsumos');
var cajaPadre=caja.parentNode;
var refer=document.getElementById('agregRetorn')

var agregarEt=function(){
    var selNombre=document.createElement('select');
    for(i=0;i<inSelect.length;i++){
        var opt=document.createElement('option');
        var nodo=document.createTextNode(inSelect.options[i].value);
        opt.setAttribute('value',inSelect.options[i].value);
        opt.appendChild(nodo);
        selNombre.appendChild(opt);
    }
    var nptCantidad=document.createElement('input');
    var etiqueta1=document.createElement('label'); //este no se va
    var etiqueta2=document.createElement('label');
    var cajProd1=document.createElement('div');
    var cajProd2=document.createElement('div');
    var salto=document.createElement('br');

    selNombre.setAttribute('id','nombreIns');    
    selNombre.setAttribute('name','nombreIns');
    selNombre.setAttribute('class','form-control w-50');

    nptCantidad.setAttribute('id','cantidadIns');
    nptCantidad.setAttribute('name','cantidadIns');
    nptCantidad.setAttribute('type','number');
    nptCantidad.setAttribute('placeholder','cantidad insumo');
    nptCantidad.setAttribute('class','form-control w-50');

    etiqueta1.setAttribute('for','producto');
    etiqueta2.setAttribute('for','cantidad');
    etiqueta1.innerHTML='Producto';
    etiqueta2.innerHTML='Cantidad';
    cajProd1.setAttribute('class',"form-group ml-2");
    cajProd2.setAttribute('class',"form-group ml-2");
    
    cajProd1.querySelector(etiqueta1);
    cajProd1.appendChild(selNombre);
    cajProd2.appendChild(etiqueta2);
    cajProd2.appendChild(nptCantidad);
    caja.appendChild(salto);
    caja.appendChild(cajProd1);
    caja.appendChild(cajProd2);
    cajaPadre.insertBefore(caja,refer)  
}
btnIns.addEventListener('click',agregarEt);