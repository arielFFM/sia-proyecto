var ftabla=function(col){
    if(col==0){
        var caja=document.getElementById('tablacon'),
        tabla=document.createElement('table'),
        cTabla=document.createElement('theader'),
        fil=document.createElement('tr'),
        col1=document.createElement('td'),
        col2=document.createElement('td'),
        col3=document.createElement('td'),
        col4=document.createElement('td'),
        col5=document.createElement('td'),
        col6=document.createElement('td'),
        col7=document.createElement('td'),
        col8=document.createElement('td');
    var contCol1=document.createTextNode("nombre"),
        contCol2=document.createTextNode("direccion"),
        contCol3=document.createTextNode("fecha nac"),
        contCol4=document.createTextNode("telefono"),
        contCol5=document.createTextNode("rut"),
        contCol6=document.createTextNode("bidones"),
        contCol7=document.createTextNode("correo"),
        contCol8=document.createTextNode("tipo");
    col1.appendChild(contCol1);
    col2.appendChild(contCol2);
    col3.appendChild(contCol3);
    col4.appendChild(contCol4);
    col5.appendChild(contCol5);
    col6.appendChild(contCol6);
    col7.appendChild(contCol7);
    col8.appendChild(contCol8);
    fil.appendChild(col1);
    fil.appendChild(col2);
    fil.appendChild(col3);
    fil.appendChild(col4);
    fil.appendChild(col5);
    fil.appendChild(col6);
    fil.appendChild(col7);
    fil.appendChild(col8);
    cTabla.appendChild(fil);
    tabla.appendChild(cTabla);
    caja.appendChild(tabla);
    return [caja,tabla];
}

}

