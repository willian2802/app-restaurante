

let bebidas = [
         {
            id: 0,
            name:"Heineken",
            price: 3.99,
            img:'/img/bebidas heineken.png',
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           },
           {
            id: 1,
            name:"Coruja",
            price: 4.50,
            img:'/img/SOTARVIL.jpg',
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           },
           {
            id: 2,
            name:"Super Bock",
            price: 3.50,
            img:'/img/Super-Bock.png',
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           },
           {
            id: 3,
            name:"Monster",
            price: 4.50,
            img:'/img/Monster.webp',
            descriçao:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
           },

];


const cardapioSpace = document.querySelector('.cardapio-space');

function gerar_Produtos() {
   bebidas.forEach( (bebidas) => {
      cardapioSpace.innerHTML += `
         <div class="cartao ">
            <h5 class="card-title m-2">${bebidas.name}</h5>
            <a href="/cardapios/cardapio-bebidas.html" target="_blank" rel="noopener noreferrer">
            <img src="${bebidas.img}" class="card-img-top" alt="...">
            </a>
            <div class="card-body">
               <p class="card-text mt-3">${bebidas.descriçao}</p>
            </div>
            <div class="price-box">
               <button class="btn btn-dark" value="3,99" onclick="">${bebidas.price}</button>
            </div>
         </div>
      `;
   })
}

gerar_Produtos();