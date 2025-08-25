const userData = [
    {
    "userid" : 1,
    "userName" : "Ritesh",
    "email" : "ritish@gmail.com",
    "password" : "Ritesh",
    "mobile" : 1234567890,
    }
]

function validForm(){ 
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let v = userData.find(e => (e.email == email && e.password == password))
    if(v){
        alert("Login Successfull")
    }else{
        alert("Login Faild")
    }
}