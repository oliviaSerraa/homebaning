let idLoggeado = -1;

// 6)
function checkLogged(email, password) {

    for (let i = 0; i < users.length; i++) {
        if ((users[i].email == email) && (users[i].password == password)) {
            return users[i].id;
        } else if ((users[i].email == email) && (users[i].password != password)) {
            return 0;
        }
    }

    return -1;

}

//7)
function ingresar() {

    idLoggeado = checkLogged(ui.getEmail(), ui.getPassword());
    if (idLoggeado >= 1) {
        ui.showModal("Éxito", "Has ingresado correctamente");
        ui.changeScreen()
        mostrar(idLoggeado)
    }
    else {
        ui.showModal("usuario y/o contraseña incorrecta. Tambien puede ser que la cuenta no exista, en ese caso, registrate")
    }

}

//8)
function registrar(usuario, email, contraseña) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            return -1;
        }
    }

    users.push(new User(usuario, email, contraseña))
    return users.length

}

//9)
function registrarse() {
    if (registrar(ui.getUser(), ui.getEmail(), ui.getPassword()) > 0) {
        ingresar();
    } else {
        ui.showModal("ha ocurrido un error :< ;<")
    }
}

// 10)
function mostrar(id) {
    ui.clearSelect();
    for (let i = 0; i < notes.length; i++) {
        for (let j = 0; j < notes[i].usuarios_ver_editar.length; j++) {
            if (notes[i].usuarios_ver_editar[j] == id) {
                ui.createNote(notes[i].id, notes[i].titulo, notes[i].contenido, notes[i].categoria);
                ui.addNoteToSelect(notes[i].id, notes[i].titulo);
            }
        }
    }
}


// 12)
function cerrarSesion() {
    const confirmacion = confirm("¿Realmente deseas cerrar sesión?");

    if (confirmacion) {
        console.log("Cerrando sesión...");
        idLoggeado = 0;
        ui.clearLoginInputs();
        ui.changeScreen();

    } else {
        console.log("Cancelado por el usuario.");
    }
}

// 13)

function crearNota(titulo, contenido, categoria, id) {
    if (titulo != "" && contenido != "" && categoria != "") {
        notes.push(new Note(titulo, contenido, categoria, id));
        return notes.length
    } else {
        return -1
    }
}

// 14)
function agregarNota() {

    const titulo = ui.getNoteTitle();
    const contenido = ui.getNoteContent();
    const categoria = ui.getNoteCategory();
    const notaId = crearNota(titulo, contenido, categoria, idLoggeado);

    if (notaId == -1) {
        ui.showModal("Por favor completa todos los campos.");
        return -1;
    } else {
        ui.createNote(notaId, titulo, contenido, categoria)
        ui.addNoteToSelect(notaId, titulo);
        ui.showModal("nota creada");
    }

    ui.clearNoteInputs();

}

// 15
function ver_nota() {
    nota = ui.getSelectedNote();
    console.log(nota);
}


function editNote(idNote) {
    const confirmacion = confirm("¿Quieres editar esta nota?");

    if (confirmacion) {

        const nuevoTitulo = ui.getNoteTitle();
        const nuevoContenido = ui.getNoteContent();
        const nuevaCategoria = ui.getNoteCategory();

        if (nuevoTitulo === "" || nuevoContenido === "" || nuevaCategoria === "") {
            ui.showModal("Error", "Por favor, completá todos los campos para editar la nota.");
            return;
        }

        let notaEncontrada = null;
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === idNote) {
                notaEncontrada = notes[i];
                break;
            }
        }

        if (!notaEncontrada) {
            ui.showModal("Error", "No se encontró la nota a modificar.");
            return;
        }

        const resultado = notaEncontrada.modificarNota(idLoggeado, nuevoTitulo, nuevoContenido, nuevaCategoria);

        if (resultado !== -1) {
            ui.editNote(idNote, nuevoTitulo, nuevoContenido, nuevaCategoria);
            ui.clearNoteInputs();
            ui.showModal("Éxito", "La nota fue modificada correctamente.");
        } else {
            ui.showModal("Error", "No tenés permisos para editar esta nota.");
        }

    } else {
        console.log("Edición cancelada por el usuario.");
    }
}

function eliminarNota(id) {
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
            notes.splice(i, 1);
            return true;
        }
    }
    return false;
}

function eraseNote(id) {
    const confirmacion = confirm("¿Estás seguro de que querés eliminar esta nota?");

    if (confirmacion) {
        const eliminado = eliminarNota(id);
        if (eliminado) {
            ui.removeNote(id);
            ui.showModal("Nota eliminada", "La nota fue eliminada correctamente.");
        } else {
            ui.showModal("Error", "No se encontró la nota a eliminar.");
        }
    } else {
        console.log("Eliminación cancelada por el usuario.");
    }
}

function buscarPorContenido() {
    const texto = ui.getSearchContent().toLowerCase();

    if (texto.length < 4) {
        console.log("Ingresá al menos 4 caracteres para buscar.");
        return;
    }

    for (let i = 0; i < notes.length; i++) {
        const titulo = notes[i].titulo.toLowerCase();
        const contenido = notes[i].contenido.toLowerCase();

        if (titulo.includes(texto) || contenido.includes(texto)) {
            console.log("Resultado encontrado:");
            console.log(notes[i]);
            return;
        }
    }

    console.log("No hay coincidencias.");
}

function verHistorialNota() {
    const idNota = ui.getSelectedNote();
    const nota = notes.find(n => n.id === idNota);

    if (!nota) {
        ui.showModal("Error", "No se encontró la nota seleccionada.");
        return;
    }

    document.getElementById("title").value = nota.titulo;
    document.getElementById("content").value = nota.contenido;
    document.getElementById("category").value = nota.categoria;

    if (nota.modificaciones.length === 0) {
        ui.showModal("Historial vacío", "Esta nota no tiene modificaciones.");
        return;
    }
    
    let textoHistorial = "";
    

    for (let i = 1; i < nota.modificaciones.length; i++) {
        const mod = nota.modificaciones[i];
        const fecha = new Date(mod.date);

        textoHistorial += `🕒 ${fecha.toLocaleString()} — por Usuario ID ${mod.idUsuario}\n`;
        textoHistorial += `• Título: ${mod.titulo}\n`;
        textoHistorial += `• Contenido: ${mod.contenido}\n`;
        textoHistorial += `• Categoría: ${mod.categoria}\n\n`;
    }

    let fecha2 = new Date;

    textoHistorial += `🕒 ${fecha2.toLocaleString()} — por Usuario ID ${nota.userId}\n`;
    textoHistorial += `• Título: ${nota.titulo}\n`;
    textoHistorial += `• Contenido: ${nota.contenido}\n`;
    textoHistorial += `• Categoría: ${nota.categoria}\n\n`;

    ui.showModal("Historial de la nota", textoHistorial);
}
