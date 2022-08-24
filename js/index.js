const productos = []
let carrito = []

class Productos {
    constructor (nombre, valor, stock, id, img){
        this.nombre=nombre
        this.valor=valor
        this.stock=stock
        this.id=id
        this.img=img
    }
}

productos.push(new Productos("Placa de video Geforce 3050 Palit", 70000, 50, 1432, "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/GV-N3050EAGLE-OC-8GD_800.jpg"))
productos.push(new Productos("Placa de video Geforce 3050 Asus", 75000, 50, 1430, "https://www.tradeinn.com/f/13890/138901635/asus-tarjeta-grafica-nvidia-rtx3050-dual-oc-8gb-gddr6.jpg"))
productos.push(new Productos("Placa de video Geforce 3060 Palit", 90000, 50, 1433, "https://http2.mlstatic.com/D_NQ_NP_971229-MLA45140204265_032021-O.webp"))
productos.push(new Productos("Placa de video Geforce 3070ti GigaByte", 150000, 50, 1600, "https://www.venex.com.ar/products_images/1642701809_1.png"))
productos.push(new Productos("Placa de Video Asrock AMD Radeon RX 6400", 42000, 50, 1603, "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90-GA3CZZ-00UANH_800.jpg"))
productos.push(new Productos("Placa de Video Asrock AMD Radeon RX 6500 XT", 50000, 50, 1606, "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90-GA3DZZ-00UANH_800.jpg"))
productos.push(new Productos("Placa de Video AMD Radeon PowerColor Rx 6600", 77000, 50, 1607, "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/AXRX-6600-8GBD6-3DH_800.jpg"))
productos.push(new Productos("Placa de Video AMD Radeon Rx 6650 XT", 95000, 50, 1608, "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/GV-R665XTGAMING-OC-8GD_800.jpg"))

function agregarProductosAlDom() {
    let container = document.querySelector(".container");
    productos.forEach( el => {
        let div = document.createElement("div");
        div.className= "card"
        div.innerHTML = `
        <img src=${el.img} id="productoImg" />
        <p class="productoTitulo">${el.nombre}</p>
        <p class="productoPrecio negrita">${el.valor}</p>
        <button id="${el.id}" class="botonComprar">Comprar</button>
        `
    container.append(div)
    })
}

agregarProductosAlDom()

const agregarProductoBoton = document.querySelectorAll(".card")

agregarProductoBoton.forEach(botonAgregarAlCarrito => {
    botonAgregarAlCarrito.addEventListener("click", botonAgregarClickeado)
})

function botonAgregarClickeado(ev) {
    const boton = ev.target
    const producto = boton.closest(".card")
    const productoNombre = producto.querySelector(".productoTitulo").textContent;
    const productoPrecio = producto.querySelector(".productoPrecio").textContent;
    const productoImg = producto.querySelector("#productoImg").src;

    carrito.push(productoPrecio)

    agregarProductoAlCarrito(productoNombre , productoPrecio, productoImg)
}

function agregarProductoAlCarrito(productoNombre , productoPrecio, productoImg){
    const productoEnCarrito = document.querySelector(".carrito")
    const filaCarrito = document.createElement("tr")
    filaCarrito.className = "productoFilaCarrito"
    const contenidoFilaCarrito = `
    <td class="marginTop">${productoNombre}</td> 
    <td class="marginTop precioProductoCarrito">$${productoPrecio}</td>
    <td> <img src="${productoImg}"/> </td>
    <button class="botonCarrito" type="button">X</button>
    `
    filaCarrito.innerHTML = contenidoFilaCarrito
    productoEnCarrito.append(filaCarrito)
    
    productoEnCarrito.querySelector(".botonCarrito").addEventListener("click", borrarProductoCarrito)

    calcularTotal()
}

function calcularTotal(){
    let total = 0
    const precioCarrito = document.querySelector(".total")

    const carritoProducto = document. querySelectorAll(".productoFilaCarrito")

    carritoProducto.forEach((productoFilaCarrito) => {
        const carritoProducto = productoFilaCarrito.querySelector(".precioProductoCarrito")
        const carritoProductoPrecio = Number(carritoProducto.textContent.replace("$", " ")
    )

    total = total + carritoProductoPrecio
    })
    precioCarrito.innerHTML = `Total: $${total}`
} 


function borrarProductoCarrito(event) {
    const botonClickeado = event.target
    botonClickeado.closest("tr").remove()
    calcularTotal()
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))    
}

function recuperoCarrito() {
    if (localStorage.carrito) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
    }
}