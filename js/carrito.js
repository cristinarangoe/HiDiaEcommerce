//variable that creates the array of the products that are on the local storage
let productsInCart = JSON.parse(localStorage.getItem('producsInCart'));
//llamamos al id del div donde vamos a meter nuestros productos en el HTML
let productSectionCart = document.getElementById('productSectionCart');
//we call the if of the div where we are going to put the resume of the cart
let resumeSectionCart = document.getElementById('resumen');
//we call the classes that are the button for deleting the product
let deleteButtonItems = document.getElementsByClassName('fa-remove');
//variable for the subtotal of the cost
let subtotal = 0;

//calling the principal function.
showProducts();

//principla function for showing the cart products
function showProducts() {
    //creating the array of the products in the local storage
    productsInCart = JSON.parse(localStorage.getItem('producsInCart'));
    //setting the html without anything
    productSectionCart.innerHTML = ` `;
    //looping over the products in cart that are in the local storage rigth now
    productsInCart.forEach((prod, indice) => {
        //calling the html part for every product
        productSectionCart.innerHTML +=
            `<div iD="prod${indice}" class="row border-top border-bottom">
                <div class="row main align-items-center ">
                    <div class="col">
                        <img class="img-fluid" src="${prod.imagen}" />
                    </div>
                    <div class="col">
                        <p class="row textoProducto">${prod.nombre}</p>
                    </div>
                    <div class="col m-auto">
                        <div class="row align-items-center">
                            <button id="botonRestarProd${indice}" type="button" class="mr-1 btn btn-light"><i class="fa fa-minus"></i></button>
                            <input id=prodInput${indice} class="carritoNumero" value="${prod.cantidad}"></input>
                            <button id="botonSumarProd${indice}" type="button" class="mr-1 btn btn-light"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="col ">
                        <p class="row textoProducto carritoNumero price">$${prod.precio}</p>
                    </div>
                    <div class="col">
                        <button id="botonEliminarProd${indice}" type="button" class="mr-1 btn btn-light" class="">
                        <i id="removeButton" class="fa fa-remove"></i>
                        </button>
                    </div>
                </div>
            </div> `
        //calculating the subtotal cost of the products
        subtotal += prod.precio * prod.cantidad
        //setting the subtotal to the localstorage variable
        localStorage.setItem('subtotalCost', subtotal);
    });
    //calling the total function to calculate the total cost
    total();
}

//function to display the resume of the cart and calculate de total
function total() {
    let subtotalFinal = 0;
    let total = 0;
        //getting the subtotal variable from the local storage and turning it into int
        subtotalFinal = parseInt(localStorage.getItem('subtotalCost'));
        //calculating the total that is subtotal + shipping
        total = subtotalFinal + 4000;
    //setting the local storage value for total
    localStorage.setItem('total', total);
    //taking the html part of resume
    resumeSectionCart.innerHTML =
        `<div>
                <h4>Resumen</h4>
            </div>
            <hr />
            <div class="row">
                <div class="col colIzq">
                    <p class="textoResumen">Subtotal</p>
                </div>
                <div class="col text-right carritoNumero">
                    <p class="textoResumen">$${subtotalFinal}</p>
                </div>
            </div>
            <div class="row">
                <div class="col colIzq">
                    <p class="textoResumen">Envío</p>
                </div>
                <div class="col text-right carritoNumero">
                    <p class="textoResumen">$4000</p>
                </div>
            </div>
            <div class="row totalResumen">
                <div class="col colIzq">
                    <p class="textoResumen">Total</p>
                </div>
                <div class="col text-right carritoNumero">
                    <p class="textoResumen">$${subtotalFinal+4000}</p>
                </div>
            </div>
        <button class="btn">Continuar con el pago</button>`
}

//function that deletes an specific product from the localstorage and html
function eliminarProd(prod,indice){
            //we call the local storage and get what is on it
            let cartItem = localStorage.getItem('producsInCart');
            //we pass it to object
            cartItem = JSON.parse(cartItem);
    
            //we filter the array, by getting another array without the product that we are removing
            let result = cartItem.filter(producto => prod.nombre !== producto.nombre);
    
            //now we pass to the local storage the array so it can be saved
            localStorage.setItem('producsInCart', JSON.stringify(result));
    
            //we call the id for the div of the element we want to remove
            let removeItem = document.getElementById("prod" + indice);
    
            //we remove that element from the html
            removeItem.remove();
    
            Toastify({
                text: prod.nombre + " eliminado con éxito",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #C84146, #C84146)",
                }
            }).showToast();
            //calculating the subtotal
            subtotal -= prod.precio * prod.cantidad
            //setting the subtotal on the local storage
            localStorage.setItem('subtotalCost', subtotal);
            //calling the total function 
            total();
}

productsInCart.forEach((prod, indice) => {
    //event for the buttons of deleting products
    document.getElementById(`botonEliminarProd${indice}`).addEventListener('click', () => {
        eliminarProd(prod,indice);
    });
    //event for the buttons of decrementing products quantity
    document.getElementById(`botonRestarProd${indice}`).addEventListener('click', () => {
        if (prod.cantidad == 1) {
            eliminarProd(prod,indice);
        } else {
            prod.cantidad--;
            localStorage.setItem('producsInCart', JSON.stringify(productsInCart));
            document.getElementById("prodInput" + indice).value = prod.cantidad;
            subtotal -= prod.precio;
            localStorage.setItem('subtotalCost', subtotal);
            total();
        }
    });
    //event for the buttons of incrementing products quantity
    document.getElementById(`botonSumarProd${indice}`).addEventListener('click', () => {
        prod.cantidad++;
        localStorage.setItem('producsInCart', JSON.stringify(productsInCart));
        document.getElementById("prodInput" + indice).value = prod.cantidad;
        subtotal += prod.precio;
        localStorage.setItem('subtotalCost', subtotal);
        total();
    });
});
