const productos = [
    {
        id: 1,
        nombre: "Estiramientos dinámicos para atletas.",
        descripcion: "Este libro se centra en los estiramientos dinámicos que son útiles para el rendimiento deportivo.",
        precio: 12000.00,
        imagen: "./assets/foto2.webp"
    },
    {
        id: 2,
        nombre: "Clases de Yoga y Stretching para hacer en sus casas",
        descripcion: "8 videos con clases destinadas para realizar en la comodidad de sus casas y en el tiempo que deseen.",
        precio: 20000.00,
        imagen: "./assets/foto3.webp"
    },
    {
        id: 3,
        nombre: "Suscripción",
        descripcion: "Suscripción mensual a clases en vivo.",
        precio: 18000.00,
        imagen: "./assets/foto4.webp"
    },
]

let carritoProductos = JSON.parse(localStorage.getItem("carritoProductos")) || []

function renderProductos() {
    const productosContainer = document.getElementById("productos-container")
    productos.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `  <article class="col">
                            <div class="card">
                                <img src=${producto.imagen} class="articulo">
                                <div class="card-img-overlay">
                                    <h4 class="card-title">${producto.nombre}</h4>
                                    <p class="card-text">${producto.descripcion}</p>
                                    <h4 class="card-title">$ ${producto.precio}.</h4>
                                    <button class="my-button" id="${producto.id}">Agregar</button>
                                </div>
                            </div>
                        </article>`
        productosContainer.appendChild(card)
    })
    agregarCarritoButton()
}

function renderCarrito() {
    const carritoContainer = document.getElementById("carrito-section")

    carritoContainer.innerHTML = ""
    let totalGeneral = 0

    carritoProductos.forEach(producto => { 
        if (producto.cantidad > 0) {
            const carritoItemDiv = document.createElement("div")
            const subtotal = producto.precio * producto.cantidad
            totalGeneral += subtotal

            carritoItemDiv.innerHTML = `<article class="card w-75 mb-3">
                                    <div class="card-body">
                                        <h4 class="card-header">${producto.nombre}</h4>
                                        <p class="text">Precio: $${producto.precio}</p>
                                        <p class="text">Cantidad: ${producto.cantidad}</p>
                                        <p class="title">Subtotal: $${subtotal.toFixed(2)}</p>
                                        <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>                          
                                    </div>
                                    <hr>
                                </article>` 
            carritoContainer.appendChild(carritoItemDiv)
        }
    })

    const totalDiv = document.createElement("div")
    totalDiv.innerHTML = `<h3 class="text-end">Total de la compra: $${totalGeneral.toFixed(2)}</h3>`
    carritoContainer.appendChild(totalDiv)

    agregarEliminarButton()
}


function agregarCarritoButton () {
    const agregarButtones = document.querySelectorAll(".my-button") 
    agregarButtones.forEach(button => {
        button.onclick = (e) => {
            console.log("Botón agregar clickeado")
            const productoId = parseInt(e.currentTarget.id)
            const seleccionProductos = productos.find(producto => producto.id === productoId)
            const productoExistente = carritoProductos.find(item => item.id === productoId)
            
            if (productoExistente) {
                productoExistente.cantidad++
            } else {
                const nuevoProductoEnCarrito = { ...seleccionProductos, cantidad: 1 }
                carritoProductos.push(nuevoProductoEnCarrito)
            }

            localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos))
            
            actualizarCuentaCarrito()
            renderCarrito()

            // Opcional: Mostrar una notificación (por ejemplo, usando una librería como Toastify, mencionada en otros archivos aunque no de carrito)
            // Toastify({
            //     text: `"${seleccionProductos.nombre}" añadido al carrito`,
            //     duration: 2000,
            //     gravity: "bottom",
            //     position: "right",
            //     style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
            // }).showToast();

            // Si estás en la página del carrito y añades desde ahí (aunque el diseño sugiere que agregas desde index.html), podrías querer refrescar la vista del carrito:

        }
    })
}


function agregarEliminarButton() {
    const carritoContainer = document.getElementById("carrito-section")
    const botonesEliminar = carritoContainer.querySelectorAll(".btn-eliminar")
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const productoIdAEliminar = parseInt(e.currentTarget.dataset.id)
            carritoProductos = carritoProductos.filter(producto => producto.id !== productoIdAEliminar)

            localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos))

            renderCarrito()
            actualizarCuentaCarrito()
        })
    })
}

function vaciarCarrito() {
    carritoProductos = []
    localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos))
    renderCarrito()
    actualizarCuentaCarrito()
}

const vaciarCarritoButton = document.getElementById("btn-vaciar-carrito")
if (vaciarCarritoButton) {
    vaciarCarritoButton.addEventListener("click", vaciarCarrito)
}

if (document.getElementById("productos-container")) {
    renderProductos()
    actualizarCuentaCarrito()
}
if (document.getElementById("carrito-section")) {
    renderCarrito()
    actualizarCuentaCarrito()
}

function actualizarCuentaCarrito() {
    const cuentaCarrito = document.getElementById("cuenta-carrito");
    if (cuentaCarrito) {
        const total = carritoProductos.reduce((sum, item) => sum + item.cantidad, 0)
        cuentaCarrito.textContent = total
    }
}