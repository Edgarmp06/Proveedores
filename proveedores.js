function incrementar(nombre) {
    const lis = document.querySelectorAll('#lista-productos li');
    let targetLi = null;
    for (let li of lis) {
        if (li.textContent.includes(nombre)) {
            targetLi = li;
            break;
        }
    }
    if (targetLi) {
        const span = targetLi.querySelector('.contador span');
        let cantidad = parseInt(span.textContent);
        span.textContent = cantidad + 1;
        actualizarCesta(nombre, cantidad + 1);
    }
}

function decrementar(nombre) {
    const lis = document.querySelectorAll('#lista-productos li');
    let targetLi = null;
    for (let li of lis) {
        if (li.textContent.includes(nombre)) {
            targetLi = li;
            break;
        }
    }
    if (targetLi) {
        const span = targetLi.querySelector('.contador span');
        let cantidad = parseInt(span.textContent);
        if (cantidad > 0) {
            span.textContent = cantidad - 1;
            actualizarCesta(nombre, cantidad - 1);
        }
    }
}

function actualizarCesta(nombre, cantidad) {
    const cesta = document.getElementById('cesta');
    let productoEnCesta = null;

    cesta.querySelectorAll('li').forEach(item => {
        if (item.getAttribute('data-nombre') === nombre) {
            productoEnCesta = item;
        }
    });

    if (cantidad === 0) {
        if (productoEnCesta) {
            productoEnCesta.remove();
        }
        return;
    }

    if (productoEnCesta) {
        productoEnCesta.textContent = `${nombre} x${cantidad}`;
    } else {
        const item = document.createElement('li');
        item.setAttribute('data-nombre', nombre);
        item.textContent = `${nombre} x${cantidad}`;
        cesta.appendChild(item);
    }
}

function enviarCesta() {
    const items = document.querySelectorAll('#cesta li');
    let mensaje = 'Productos en la cesta:\n';
    items.forEach(item => {
        mensaje += '- ' + item.textContent + '\n';
    });
    const url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(mensaje);
    window.open(url, '_blank');
}