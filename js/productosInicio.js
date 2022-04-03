//fetch
async function obtenerProductos() {
    const response = await fetch('../json/products.json');
    return await response.json();
}

//inicializamos el array vacio para asi poder meter los productos 
let arrayCart = [];

//llamamos al id del div donde vamos a meter nuestros productos en el HTML
let favoriteProducts = document.getElementById('favoriteProducts');

obtenerProductos().then(productos => {
        //foreach for every of the product, so it can appear in the html
        productos.forEach((prod) => {
            if(prod.favorito===true){
                favoriteProducts.innerHTML +=
                `<div id="prod${prod.indice}" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="card text-black">
                        <img id="img${prod.indice}" class="card-img-top" src="../img/${prod.imagen}" />
                        <div class="card-body">
                            <div class="">
                                <h4 id="title${prod.indice}" class="card-title">${prod.nombre}</h4>
                            </div>
                            <div class="d-flex justify-content-between">
                                <h5 id="price${prod.indice}">$${prod.precio}</h5>
                                <button type="button" class="btn btn-azul addToCart" id="botonProdInicio${prod.indice}" >
                                    <i class="fa fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`
            }
        });

    //foreach for the buttons on every product - adding to cart
    productos.forEach((producto, indice) => {
        if(producto.favorito===true){
            document.getElementById(`botonProdInicio${indice}`).addEventListener('click', () => {
                console.log("hola")
                console.log("hola");
                //we call the local storage to know if it is empty or not
                //if its empty, or null, we initilize
                //the local storage with the array cart
                if (!localStorage.getItem('producsInCart')) {
                    localStorage.setItem('producsInCart', JSON.stringify(arrayCart));
                }
    
                //we call the local storage and get what is on it
                let cartItem = localStorage.getItem('producsInCart');
                //we pass it to object
                cartItem = JSON.parse(cartItem);
    
                //we create filtro to know if that especific product is on the local localStorage
                let filtro = cartItem.find(prod => prod.nombre == producto.nombre);
    
                //if filtro is null, we push the object to the array
                //if filtro is not null, we +1
                filtro ? (filtro.cantidad += 1) : cartItem.push(producto);
    
                Toastify({
                    text: producto.nombre + " agregado con éxito",
                    className: "info",
                    position: "left",
                    gravity: "bottom",
                    style: {
                        background: "linear-gradient(to right, #475DA7, #5383ba)",
                    }
                }).showToast();
    
                //now we pass to the local storage the array so it can be saved
                localStorage.setItem('producsInCart', JSON.stringify(cartItem));
        
            })
        }
    })

    
})
