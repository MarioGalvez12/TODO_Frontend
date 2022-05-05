let FormReg = document.querySelector("#ModReg");
let registro = document.querySelector("#btnRegistro");
let login = document.querySelector("#btnLogin")


FormReg.addEventListener("change",()=>{
    let inputForma = document.querySelectorAll(":invalid");
    if(inputForma.length==0){
        if(document.querySelector("#RegPass1").value == document.querySelector("#RegPass2").value){
            document.querySelector("#btnRegistro").removeAttribute("disabled");
        }else{
            document.querySelector("#btnRegistro").setAttribute("disabled","");
        }
    }
});


//REGISTRO DE USUARIOS
registro.addEventListener("click", CatchSubmit);

//FUNCIÓN DE REGISTRO DE USUARIOS
async function CatchSubmit(event){
    event.preventDefault();
    let usr_nombre = document.querySelector("#RegNombre").value;
    let usr_apellido = document.querySelector("#RegApellidos").value;
    let usr_email = document.querySelector("#RegEmail").value;
    let usr_password = document.querySelector("#RegPass1").value;
    let usr_registro = {
                            "nombre":usr_nombre,
                            "apellido":usr_apellido,
                            "correo":usr_email,
                            "password":usr_password
    }
    let usr_JSON = JSON.stringify(usr_registro);
    let exitoso = await fetch("/api/users",{
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: usr_JSON,
    })
    console.log(usr_JSON);
    if (exitoso.status == 201){
        alert("Usuario Registrado Exitosamente")
        location.reload();
    }else{
        alert("ERROR")
    }
}

//LOGIN
login.addEventListener("click", ValidUser)

//FUNCIÓN DE LOGIN
async function ValidUser(event){
    event.preventDefault();
    let login_correo = document.querySelector("#login_correo").value
    let login_password = document.querySelector("#login_password").value
    let login = {
        "correo":login_correo,
         "password":login_password
    }
    let login_JSON = JSON.stringify(login);
    let exitoso = await fetch("/api/login",{
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: login_JSON
    })
    console.log(exitoso);
    let tkn = await exitoso.json()
    console.log(tkn);
    //TOKEN DE USUARIO
    localStorage.token_usr = tkn.token;
    if (exitoso.status == 200){
        window.location.href = "./principal.html"
    }else{
        alert("Error: Usuario y contraseña incorrectos")
    }
    }
   