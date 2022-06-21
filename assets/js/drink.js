const button = document.querySelector("#button")
$("#button").click(function(){
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    displayCocktail(data)
  })
  .catch((error) => console.error("FETCH ERROR:", error));
})

//function to display random coctail
  function displayCocktail(data) {
      const cocktail = data.drinks[0];
      const cocktailDiv = document.getElementById('cocktail');
      const cocktailName = cocktail.strDrink;
      const heading = document.createElement('h1');
      heading.innerHTML = cocktailName;
      cocktailDiv.appendChild(heading);
//pulls up image of the random cocktail
      const cocktailImg = document.createElement("img");
      cocktailImg.src = cocktail.strDrinkThumb;
      cocktailDiv.appendChild(cocktailImg);
      // document.body.style.backgroundImage = "url('" + cocktail.strDrinkThumb + "')";
      const cocktailIngredients = document.createElement('ul');
      cocktailDiv.appendChild(cocktailIngredients);
      
//pulls up the random ingridients needed to make the Random Cocktail
      const getIngredients = Object.keys(cocktail)
        .filter(function (ingredient) {
            return ingredient.indexOf("strIngredient") == 0;
        })
        .reduce(function (ingredients, ingredient) {
            if (cocktail[ingredient] != null) {
                ingredients[ingredient] = cocktail[ingredient];
            }
            return ingredients;
        }, {});

        for (let key in getIngredients) {
            let value = getIngredients[key];
            listItem = document.createElement("li");
            listItem.innerHTML = value;
            cocktailIngredients.appendChild(listItem);
        }

  }


