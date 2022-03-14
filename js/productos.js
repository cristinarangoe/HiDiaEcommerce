
//INICIO MOSTRAR PRODUCTOS EN PAGINA DE PRODUCTOS

//Creacion de la clase producto con su constructor.
class Producto {
    constructor(nombre, descripcion, precio, cantidad, imagen) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
        this.imagen = imagen;
    }
}

//creacion de los objetos, se van a crear 5 objetos.
const producto1 = new Producto("Plato Mexicano", "Este es un bowl mexicano que tiene ingredientes ricos y naturales", "15000",1, "../img/platoMexicano.png");
const producto2 = new Producto("Nachos", "Nachos hechos con maíz amarillo, 100% natural", "10000",1, "../img/nachos.jpg");
const producto3 = new Producto("Salsa de pimentón", "Carne hecha con ingredientes de la mejor calidad", "18000",1, "../img/salsaPimenton.jpg");
const producto4 = new Producto("Arepas de queso", "Arepas rellenas de queso mozzarella de la mejor calidad", "8000",1, "../img/arepaQueso.jpg");
const producto5 = new Producto("Arepas blanca", "Arepas hechas con maiz blanco, naturales y sin conservantes", "5000",1, "../img/arepaGrande.jpg");

//creacion del array con cada uno de los PRODUCTOS, objetos
const arrayProductos = [producto1, producto2, producto3, producto4, producto5];

//llamamos al id del div donde vamos a meter nuestros productos en el HTML
let productsSection = document.getElementById('productsSection');

//for para ir insertando en el html cada uno de los productos, objetos creados
arrayProductos.forEach((prod, indice) => {
    productsSection.innerHTML +=
        `<div id="prod${indice}" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card text-black">
                <img id="img${indice}" class="card-img-top" src=${prod.imagen} />
                <div class="card-body">
                    <div class="">
                        <h4 id="title${indice}" class="card-title">${prod.nombre}</h4>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h5 id="price${indice}">$${prod.precio}</h5>
                        <button type="button" class="btn btn-azul addToCart" onClick=setItem(arrayProductos[${indice}]);>
                            <i class="fa fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>`
});


//FIN MOSTRAR PRODUCTOS EN PAGINA DE PRODUCTOS

//INICIO CARRITO, PARA INGRESAR AL CARRITO

//inicializamos el array vacio para asi poder meter los productos 
let arrayCart = [];

function setItem(product){
    //we call the local storage to know if it is empty or not
    //if its empty, or null, we initilize
    //the local storage with the array cart
    if(!localStorage.getItem('producsInCart')){
        localStorage.setItem('producsInCart',JSON.stringify(arrayCart));
    }

    //we call the local storage and get what is on it
    let cartItem = localStorage.getItem('producsInCart');
    //we pass it to object
    cartItem = JSON.parse(cartItem);

    //we create filtro to know if that especific product is on the local localStorage
    let filtro = cartItem.find(producto => producto.nombre == product.nombre);

    //if filtro is null, we push the object to the array
    //if filtro is not null, we +1
    filtro ? (filtro.cantidad += 1) : cartItem.push(product);

    Toastify({
        text: product.nombre + " agregado con éxito",
        className: "info",
        position: "left",
        gravity: "bottom",
        style: {
            background: "linear-gradient(to right, #475DA7, #5383ba)",
        }
    }).showToast();

    //now we pass to the local storage the array so it can be saved
    localStorage.setItem('producsInCart',JSON.stringify(cartItem));
}

//FIN DE METER COSAS AL CARRITO

