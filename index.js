//---------------RECUPERATION DES DONNEES DE L'API--------------//
fetch("http://localhost:3000/api/teddies")
  .then(function (response) {
    if (response.ok) {
      console.log("response");
      console.log(response);
      return response.json();
    }
  })
  //-----------CREATION DE 5 CARDS POUR CHAQUE OURSON------------//
  .then(function createCard(Teddy) {
    // Boucle pour itérer les différents produits
    for (i = 0; i < Teddy.length; i++) {
      // Creation de contenu :
      // Cette ligne crée une balise div
      let colCard = document.createElement("div");
      colCard.setAttribute("id", "colCard");
      colCard.classList.add("col-lg-4", "col-md-6", "mb-4");
      //Insertion du nouveau contenu :
      // On sélectionne la section (par exemple)
      let selectcontainerCard = document.querySelector("#containerCard");
      // On insère la balise div après la section
      selectcontainerCard.appendChild(colCard);

      // STRUCTURE HTML DES CARDS
      let Card = document.createElement("div");
      Card.setAttribute("id", "Card");
      Card.classList.add("card", "h-100");
      colCard.appendChild(Card);

      let linkCard = document.createElement("a");
      linkCard.setAttribute("id", "linkCard");
      linkCard.setAttribute("href", "product.html?id=" + Teddy[i]._id);
      Card.appendChild(linkCard);

      let imgCard = document.createElement("img");
      imgCard.classList.add("card-image-top", "w-100");
      linkCard.appendChild(imgCard);
      imgCard.src = Teddy[i].imageUrl;

      let bodyCard = document.createElement("div");
      bodyCard.setAttribute("id", "bodyCard");
      bodyCard.classList.add("card-body");
      Card.appendChild(bodyCard);

      let titleCard = document.createElement("h4");
      titleCard.setAttribute("id", "titleCard");
      titleCard.classList.add("card-title");
      bodyCard.appendChild(titleCard);

      let linktitleCard = document.createElement("a");
      linktitleCard.setAttribute("id", "linktitleCard");
      linktitleCard.setAttribute("href", "product.html?id=" + Teddy[i]._id);
      titleCard.appendChild(linktitleCard);
      linktitleCard.textContent = Teddy[i].name;

      let priceCard = document.createElement("h5");
      bodyCard.appendChild(priceCard);
      priceCard.textContent = Teddy[i].price / 100 + "€";

      let descriptionCard = document.createElement("p");
      descriptionCard.classList.add("card-text");
      bodyCard.appendChild(descriptionCard);
      descriptionCard.textContent = Teddy[i].description;
    }
    console.log("Teddy");
    console.log(Teddy);
  })
  .catch(function (error) {
    // Une erreur est survenue
    console.log("error");
    console.log(error);
  });