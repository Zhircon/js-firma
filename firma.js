const canvas = document.querySelector('canvas');
const form = document.querySelector('.firma-pad-form');
const botonLimpiar = document.querySelector('.boton-limpiar');
const botonImagen = document.querySelector('.boton-imagen');
const botonContrato = document.querySelector('.boton-contrato');

const ctx = canvas.getContext('2d');
let modoEscritura = false;
let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0;
const COLOR = 'blue';
const GROSOR = 2;

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const resultadoContenedor = document.querySelector('.firma-resultado-contenedor');
    const imagenAnterior = document.querySelector('.firma-imagen');
    if(imagenAnterior)
        imagenAnterior.remove();
    
    const imagenURL = canvas.toDataURL();
    const imagen = document.createElement('img');
    imagen.src =  imagenURL;
    imagen.height = canvas.height;
    imagen.width = canvas.width;
    imagen.classList.add('firma-imagen');
    resultadoContenedor.appendChild(imagen);
    limpiarPad();
});
const limpiarPad = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
limpiarPad();

botonLimpiar.addEventListener('click',(e) => {
    e.preventDefault();
    limpiarPad();
});

botonImagen.addEventListener('click',(e)=>{
    e.preventDefault();
    const enlace = document.createElement('a');
    enlace.download = "Firma.png";
    enlace.href = canvas.toDataURL();
    enlace.click();
});
window.obtenerImagen = () => {
    return canvas.toDataURL();
};
botonContrato.addEventListener('click', (e) => {
    e.preventDefault();
    const ventana = window.open('contrato.html');
});
const obtenerPosicionCursor = (e) =>{
    positionX = e.clientX - e.target.getBoundingClientRect().left;
    positionY = e.clientY - e.target.getBoundingClientRect().top;
    return [positionX,positionY];
}
const OnClicOToqueIniciado = (e) => {
    modoEscritura = true;
    [xActual,yActual] = obtenerPosicionCursor(e);
    
    ctx.beginPath();
    ctx.fillStyle = COLOR;
    ctx.fillRect(xActual, yActual, GROSOR, GROSOR);
    ctx.closePath();
    console.log("Ocurre DedoTocado");
}

const OnMouseODedoMovido = (e) => {
    if(!modoEscritura) return;

    let target = e;
    if(e.type.includes("touch"))
    {
        target = e.touches[0];
    }
    xAnterior = xActual;
    yAnterior = yActual;
    [xActual, yActual] = obtenerPosicionCursor(target);
    
    ctx.beginPath();
    ctx.lineWidth = GROSOR;
    ctx.strokeStyle = COLOR;
    ctx.moveTo(xAnterior, yAnterior);
    ctx.lineTo(xActual, yActual);
    ctx.stroke();
    ctx.closePath();    
    console.log("ocurre evento dedo movido");
}
function OnClickODedoLevantado(){
    console.log("ocurre evento dedo levantado");
    modoEscritura = false;
}
['mousedown','touchstart'].forEach(nombreEvento => {
    canvas.addEventListener(nombreEvento,OnClicOToqueIniciado,{passive:true});
});
['mousemove','touchmove'].forEach(nombreEvento => {
    canvas.addEventListener(nombreEvento, OnMouseODedoMovido, {passive:true});
});
['mouseup','touchend'].forEach(nombreEvento => {
    canvas.addEventListener(nombreEvento,OnClickODedoLevantado, {passive:true});
});
















