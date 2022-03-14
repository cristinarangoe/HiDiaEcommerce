//variable that creates the array of the products that are on the local storage
let productsInCart = JSON.parse(localStorage.getItem('producsInCart'));
//llamamos al id del div donde vamos a meter nuestros productos en el HTML
let productSectionCart = document.getElementById('productSectionCart');
//we call the if of the div where we are going to put the resume of the cart
let resumeSectionCart = document.getElementById('resumen');
//we call the classes that are the button for deleting the product
let deleteButtonItems = document.getElementsByClassName('fa-remove');
let subtotal =0;

//calling the principal function.
showProducts();

//principla function for showing the cart products
function showProducts(){
    // cleanHTML();
    productsInCart = JSON.parse(localStorage.getItem('producsInCart'));
    productSectionCart.innerHTML=` `;
    subtotal = 0;
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
                            <button type="button" class="mr-1 btn btn-light" href="#" onclick=minusProduct(productsInCart[${indice}],${indice}) ><i class="fa fa-minus"></i></button>
                            <input id=prodInput${indice} class="carritoNumero" value="${prod.cantidad}"></input>
                            <button type="button" class="mr-1 btn btn-light" href="#" onclick=plusProduct(productsInCart[${indice}],${indice})><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="col ">
                        <p class="row textoProducto carritoNumero price">$${prod.precio}</p>
                    </div>
                    <div class="col">
                        <button type="button" class="mr-1 btn btn-light" onclick=deleteProduct(productsInCart[${indice}],${indice}); class="">
                        <i id="removeButton" class="fa fa-remove"></i>
                        </button>
                    </div>
                </div>
            </div> `

        //calling the subtotal function to know how much is it
        subtotalMuestreo(prod);
    });
    //now we can call the total function, because we are at the end of the loop
    total();
}

//function to calculate the subtotal
function subtotalMuestreo(prod){
    subtotal += prod.precio * prod.cantidad
    //getting into the local storage the variable for subtotal
    localStorage.setItem('subtotalCost',subtotal);
    console.log("holacristina")
}

//function to display the resume of the cart and calculate de total
function total(){
    console.log("lemght"+productsInCart.length);
    let subtotalFinal = 0;
    let total = 0;
    if(productsInCart.length > 0){
        //getting the subtotal variable from the local storage and turning it into int
        subtotalFinal = parseInt(localStorage.getItem('subtotalCost'));
        //calculating the total that is subtotal + shipping
        total = subtotalFinal + 4000;
    }else{
        subtotalFinal=0;
        total=0;
        localStorage.setItem('subtotalCost',subtotalFinal);
    }
    //setting the local storage value for total
    localStorage.setItem('total',total);
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

//function to delete a product with the x button
function deleteProduct(prod, indice){

    //we call the local storage and get what is on it
    let cartItem = localStorage.getItem('producsInCart');
    //we pass it to object
    cartItem = JSON.parse(cartItem);

    //we filter the array, by getting another array without the product that we are removing
    let result = cartItem.filter(producto => prod.nombre!==producto.nombre);

    //now we pass to the local storage the array so it can be saved
    localStorage.setItem('producsInCart',JSON.stringify(result));

    //we call the id for the div of the element we want to remove
    let removeItem = document.getElementById("prod"+indice);

    //we remove that element from the html
    removeItem.remove();

    Toastify({
        text: prod.nombre + " eliminado con éxito",
        className: "info",
        style: {
            background: "linear-gradient(to right, #C84146, #C84146)",
        }
    }).showToast();

    //calling the subtotal function so it can show the 
    showProducts()
}

function plusProduct(prod, indice){
    prod.cantidad++;

    localStorage.setItem('producsInCart',JSON.stringify(productsInCart));

    document.getElementById("prodInput"+indice).value = prod.cantidad;

    let valor = "plus";
    console.log("idPlus"+indice);
    console.log("cristina5")
    // subtotalCost(prod, valor)
    showProducts();
}

function minusProduct(prod, indice){
    if(prod.cantidad==1){
        deleteProduct(prod, indice);
        console.log("cristina6")
    }else{
        prod.cantidad--;
        localStorage.setItem('producsInCart',JSON.stringify(productsInCart));
        document.getElementById("prodInput"+indice).value = prod.cantidad;
        let valor = "minus";

        //subtotalCost(prod, valor)
        showProducts();
    }
}

function cleanHTML(){
    productsInCart = JSON.parse(localStorage.getItem('producsInCart'));
    productSectionCart.innerHTML=` `;
    let subtotal =0;
}
