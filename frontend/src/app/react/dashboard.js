function addproduct(){
    let pnm = document.querySelector('#pnm').value;
    let pbrand = document.querySelector('#pbrand').value;
    let pprice= document.querySelector('#pprice').value;
    let pimage = document.querySelector('#pimage').value;
    let pcolor = document.querySelector('#pcolor').value;
    let pdescription = document.querySelector('#pdescription').value;
    let psize = document.querySelector('#psize').value;
    let pcategory = document.querySelector('#pcategory').value;

    let productinfo = {
        "pnm" : pnm,
        "pbrand" : pbrand,
        "pprice" : pprice,
        "pimage" : pimage,
        "pcolor" : pcolor,
        "pdescription" : pdescription,
        "psize" : psize,
        "pcategory" : pcategory
    }
    fetch("http://localhost:4000/product",{
        method:"POST",headers:{
            "content-type" : "application/json"
        },
        body:JSON.stringify(productinfo)
    }).then(()=>window.alert("card added"))
}
function del(id){
    fetch(`http://localhost:4000/product/${id}`,{
        method:"DELETE"
    })
}
async function show(){
    let d = await fetch("http://localhost:4000/product")
    let res = await d.json()
    let st = document.querySelector("#output")
    st.innerHTML = res.map((items)=>`
    <div key="${items.id}">
    <div> ${items.pbrand}</div>
    <button onclick="del('${items.id}')">delete</button>
    </div>`).join("")
    // res.map((items) => `
    // <tr key=${e.id}>
    //         <td>${e.id}</td>
    //         <td>${e.pnm}</td>
    //         <td>${e.pbrand}</td>
    //         <td>${e.pprice}</td>
    //         <td>${e.pimage}</td>
    //         <td>${e.pcolor}</td>
    //         <td>${e.pdescription}</td>
    //         <td>${e.psize}</td>
    //         <td>${e.pcategory}</td>
    // `)
}