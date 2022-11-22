var cartIcon = document.getElementById("cart-list-icon")
var Xicon = document.getElementById('x-icon')

var requestID = document.getElementById('id-request')
var removerPedidoBtn = document.getElementById('RemoveButton')

const request_list_space = document.getElementById("request-list")
var request_space = document.getElementById('id-request-space')

let produtos = [
         {
            id: 0,
            name:"Heineken",
            type:"Bebidas",
            price: 3.99,
            numberOfUnits:10,
            img:'img/bebidas heineken.png',
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           },
           {
            id: 1,
            name:"Coruja",
            type:"Bebidas",
            price: 4.50,
            numberOfUnits:10,
            img:'img/SOTARVIL.jpg',
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           },
           {
            id: 2,
            name:"Super Bock",
            type:"Bebidas",
            price: 3.50,
            numberOfUnits:10,
            img:'img/Super-Bock.png',
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           },
           {
            id: 3,
            name:"Monster",
            type:"Bebidas",
            price: 4.50,
            numberOfUnits:10,
            img:'img/Monster.webp',
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           },
           {
            id: 4,
            name:"bolo-chocolate",
            type:"Sobremesas",
            price:10,
            numberOfUnits:10,
            img:"img/bolo-chocolate.jpg",
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           },
           {
            id: 5,
            name:"bolo-morango",
            type:"Sobremesas",
            price:10,
            numberOfUnits:10,
            img:"img/bolo-morango.jpg",
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           },
           {
            id: 6,
            name:"coxinha",
            type:"Salgados",
            price:3,
            numberOfUnits:10,
            img:"img/coxinha.jpg",
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           },
           {
            id: 7,
            name:"pastel",
            type:"Salgados",
            price:2,
            numberOfUnits:10,
            img:"img/pastel.jpg",
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           },
           {
            id: 8,
            name:"salada",
            type:"Refeiçoes",
            price:6,
            numberOfUnits:10,
            img:"img/salada-perfeita-vale-refeicao_0.webp",
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           },
           {
            id: 9,
            name:"File",
            type:"Refeiçoes",
            price:7,
            numberOfUnits:10,
            img:"img/refeiçoes-file.jpg",
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           }

];

const cardapioSpace = document.querySelector('.cardapio-space');

function gerar_Produtos() {
   
   // usa o titulo pra diferenciar qual lista de comida vai pegar
   var typeOfProdChoose = document.getElementById('type-of-food').innerText

   // manda um if type of produc var = salgado var = sobremesa etc...

   console.log(typeOfProdChoose)

   if (typeOfProdChoose == "Refeiçoes") {
      var cardapio = produtos.filter(word => word.type == "Refeiçoes")
   } else if ( typeOfProdChoose == "Bebidas") {
      var cardapio = produtos.filter(word => word.type == "Bebidas")
   } else if ( typeOfProdChoose == "Salgados") {
      var cardapio = produtos.filter(word => word.type == "Salgados")
   } else {
      var cardapio = produtos.filter(word => word.type == "Sobremesas")
   }
   console.log(cardapio)
   console.log(typeOfProdChoose)
      
      cardapio.forEach( (cardapio) => {
         cardapioSpace.innerHTML += `
               <div class="cartao ">
                  <h5 class="card-title m-2">${cardapio.name}</h5>
                  <img src="${cardapio.img}" class="card-img-top" alt="...">
                  </a>
                  <div class="card-body">
                     <p class="card-text mt-3">${cardapio.descriçao}</p>
                  </div>
                  <div class="price-box">
                     <button class="btn btn-dark" value="3,99" onclick="AddPedidos(${cardapio.id})">${cardapio.price}</button>
                  </div>
               </div>
            `
    })
}

gerar_Produtos();

// array dos pedidos

var pedidos =  JSON.parse(localStorage.getItem("listaDePedidos")) || [];
console.log(pedidos)
updateCart()
// adicionar aos pedidos


function AddPedidos(id) {
   console.log(pedidos)

   if(pedidos.some((item) => item.id == id)) {
       
      pedidos = pedidos.map((item) => {
         let oldNumberUnits = item.numberOfUnits
         
         if ( item.id == id) {
            oldNumberUnits++
         }
         return {...item, numberOfUnits:oldNumberUnits};
      })         
               
   } else {
      const item = produtos.find((produto) => produto.id === id);
      
      pedidos.push({
         ...item,
         numberOfUnits: 1,
      })
   
   }

   updateCart(pedidos);
}
 
function removerPedido(id) {
   pedidos = pedidos.filter((item) => item.id !== id);

   updateCart()
}



function gerar_pedidos() {

   //apagar a lista antiga
   request_list_space.innerHTML = ""

   pedidos.forEach((pedidos) => {
      request_list_space.innerHTML += `
      <div class="carta-request"  id="id-request">
         <h5 class="card-title m-2">${pedidos.name}</h5>
         <img src="${pedidos.img}" class="card-img-top" alt="...">
         </a>
         <div class="btn-numberUnits">
            <button class="btnMaisMenos" onclick="mudarUnidades('menos', ${pedidos.id})">-</button>
               <input type="number" id="typeNumber" value="${pedidos.numberOfUnits}" class="form-control" />
            <button class="btnMaisMenos" onclick="mudarUnidades('mais', ${pedidos.id})">+</button>
         </div>
         <div class="price-box">
            <button class="btn btn-dark" id="RemoveButton" onclick="removerPedido(${pedidos.id})">Remover</button>
         </div>
      </div>
      `
   })      
}

function updateCart() {
   if(pedidos.length > 0) {
      request_space.style.display = 'block';
   }

   gerar_pedidos();
    calcular_total()

    localStorage.setItem("listaDePedidos", JSON.stringify(pedidos))
    
}


function calcular_total() {
   var preco_total = document.getElementById('valor_total')
   var preço = 0
 
      if (pedidos.length == 0) {
         preço = 0
         preco_total.innerHTML = `Total: ${preço}`
      }else {
         pedidos.forEach((item) => {
            preço += item.price * item.numberOfUnits
            preco_total.innerHTML = `Total: ${preço.toFixed(2)}`
         })
      } 
}



// button change units

function mudarUnidades(action, id) {

    pedidos = pedidos.map((item) => {
      var oldNumberUnits = item.numberOfUnits

      if( item.id === id) {
         if (action === "menos" && oldNumberUnits > 1) {
            oldNumberUnits--
         }else if(action === "mais") {
            oldNumberUnits++
         }
      }

      return {
         ...item,
         numberOfUnits:oldNumberUnits
      }
   })
   updateCart(pedidos)
   console.log(pedidos)
}


// monstrar e fechar lista de pedidos

var cartIcon = document.getElementById("cart-list-icon")
var request_space = document.getElementById('id-request-space')
var Xicon = document.getElementById('x-icon')

var requestID = document.getElementById('id-request')
var removerPedidoBtn = document.getElementById('RemoveButton')

// abrir
Xicon.addEventListener("click", function() {
   request_space.style.display = 'none'
},)
// fechar
cartIcon.addEventListener('click', function() {
   request_space.style.display = 'block'
})
removerPedidoBtn.addEventListener('click', function() {
   requestID.style.display = "none"
})













