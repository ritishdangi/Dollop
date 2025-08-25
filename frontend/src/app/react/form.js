const d = ()=>{
    let nm = document.querySelector('#nm').value
    let em = document.querySelector('#em').value
    let obj = {
        'name' : nm,
        'email' : em
    }
    console.log(obj)
    return false
}

let arr = [1,2,3,4,5,6,7]
console.log(arr[0])
for(let i of arr){
    console.log(arr[i])
}
for(let i in arr){
    console.log(i)
}