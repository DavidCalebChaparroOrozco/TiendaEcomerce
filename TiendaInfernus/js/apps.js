document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

const fetchData = async() => {
    try {
        const res = await fetch('productos.json');
        const data = await res.json();
        // console.log(data);
        pintarProductos(data);
        detectarBotones(data);
    } catch (error) {
        // console.log(error);
    }
}

const contenedorProductos = document.querySelector('#contenedor-productos');
const pintarProductos = (data) =>{
    const template = document.querySelector('#template-producto').content;
    const fragment = document.createDocumentFragment();
    console.log(template);
    data.forEach(producto =>{
        // console.log(producto);
        template.querySelector('img').setAttribute('src', producto.imagen);
        template.querySelector('h4').textContent = producto.titulo;
        template.querySelector('p span').textContent = producto.precio;
        template.querySelector('button').dataset.id = producto.id;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    })
    contenedorProductos.appendChild(fragment);
}


let carro = [];

const detectarBotones = (data) => {
    const botones = document.querySelectorAll('.card button');

    botones.forEach(btn => {
        btn.addEventListener('click', () =>{
            console.log(btn.dataset.id);
            const producto = data.find(item => item.id === parseInt(btn.dataset.id));
            // console.log(producto)
            producto.cantidad = 1;
            if(carro.hasOwnProperty(producto.id)){
                producto.cantidad = carro[producto.id].cantidad + 1;
            }
            carro[producto.id] = {...producto};
            console.log(carro);
            productosCarro();
        })
    })
}

const items = document.querySelector('#items');

const productosCarro = () => {

    items.innerHTML = ''
    // console.log(Object.values(carro));

    const template = document.querySelector('#template-carro').content;
    const fragment = document.createDocumentFragment();
    
    Object.values(carro).forEach(producto => {
        console.log(producto);
        template.querySelector('th').textContent = producto.id;
        template.querySelectorAll('td')[0].textContent = producto.titulo;
        template.querySelectorAll('td')[1].textContent = producto.cantidad;
        template.querySelector('span').textContent = producto.precio * producto.cantidad;

        // Botones
        template.querySelector('.btn-info').dataset.id = producto.id;
        template.querySelector('.btn-danger').dataset.id = producto.id;

        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    })

    items.appendChild(fragment);

    pintarFooter();
    accionBotones();
}

const footer = document.querySelector('#footer-carro');
const pintarFooter = () => {

    footer.innerHTML = '';

    if(Object.keys(carro).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5" class="mayusculas">Carro vacio - ¡por favor seleccione un album que
        quiera comprar!</th>
        `;
        return
    }

    const template = document.querySelector('#template-footer').content;
    const fragment = document.createDocumentFragment();

    const nCantidad = Object.values(carro).reduce((acc, {cantidad}) => acc + cantidad, 0);
    const nPrecio = Object.values(carro).reduce((acc,{cantidad, precio}) => acc + cantidad * precio, 0)

    // console.log(nCantidad);
    // console.log(nPrecio);

    template.querySelectorAll('td')[0].textContent = nCantidad;
    template.querySelector('span').textContent = nPrecio;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);

    footer.appendChild(fragment);

    const botonVaciar = document.querySelector('#vaciar-carro');
    botonVaciar.addEventListener('click', () =>{
        carro = {}
        productosCarro();
    })

    const botonconfirmar = document.querySelector('#confirmar-carro');
    botonconfirmar.addEventListener('click', () =>{
        alert('Desea confirmar la compra');
        carro = {}
        productosCarro();
    })
}

const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#items .btn-info')
    const botonesEliminar = document.querySelectorAll('#items .btn-danger')

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click',()=>{
            // console.log('agregar');
            console.log(btn.dataset.id);
            const producto = carro[btn.dataset.id];
            producto.cantidad ++;
            carro[btn.dataset.id] = {...producto}
            productosCarro();
        })
    })

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click',()=>{
            // console.log('borrar')
            const producto = carro[btn.dataset.id];
            producto.cantidad --;
            if(producto.cantidad === 0){
                delete carro[btn.dataset.id];
            } else{
                carro[btn.dataset.id] = {...producto}
            }
            productosCarro();
        })
    })
}