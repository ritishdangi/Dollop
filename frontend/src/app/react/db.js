function adddata(){
    let nm = document.querySelector('.nm').value;
    let em = document.querySelector('.em').value;

    let obj = {
        "name":nm,
        "email":em
    }
    fetch('http://localhost:4000/abc',{
        method:"POST",headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(obj)
    })
}

async function show(){
    let data = await fetch('http://localhost:4000/abc')
    let output = await data.json()

    let out = document.querySelector('.output');
    out.innerHTML = output.map((e)=> `
    <tr key=${e.id}>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.email}</td>
            <td onclick="del('${e.id}')">Delete</td>
        </tr>`).join(" ")
}
function del(arg){
    let id = arg
    fetch(`http://localhost:4000/abc/${id}`,{method:"DELETE"

    })
    alert("Deleted")
}