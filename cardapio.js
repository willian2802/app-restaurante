var cardapios = document.getElementsByClassName('cardapio')

// isso e uma node liste eu acho tem que fazer aquela coisa


for (var i = 0; i < cardapios.length; i++) {
    cardapios[i].addEventListener('click', mostrarCardapio);
  }

function mostrarCardapio() {
    console.log('Funciona!!!!!!')
    alert('Por que')
}