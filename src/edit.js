
console.log("i am frm edit");


// var measurement  = fetch('data.json');
// console.log(measurement);
// let item = JSON.parse(measurement);

// if(item.city!=null)
// document.getElementById("output").innerHTML = "The temperature at "+item.city+" is : "+item.value ;

let url = 'http://localhost:9000/data';


var s;

function load(){
    fetch(url)
    .then(res => res.json())
    .then((out) => {
    console.log( out);
    document.getElementById("output").innerHTML = "The temperature at "+out.city+" is : "+(out.value)+" celsius" ;
    })
    .catch(err => { throw err });
}

// document.getElementById("check").addEventListener("click" , ()=> {


    
// })

load();