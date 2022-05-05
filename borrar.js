document.querySelector("#signup").addEventListener("click", ()=>{
    let newUser = {
        name: document.querySelector("#RegName").value,
        mail: document.querySelector("#RegEmail").value,
        password: document.querySelector("#RegPass1").value
    }
})

document.querySelector("#RegPass1, #RegPass2").addEventListener("change", ()=>{
    alert(1)
})




//FUNCIÓN DE REGISTRO DE USUARIOS
async function CatchSubmit(event){
    event.preventDefault();
    let usr_nombre = document.querySelector("#RegName").value;
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