  // document.body.style.backgroundImage = "url('" + cocktail.strDrinkThumb + "')";
  const cocktailIngredients = document.querySelector(".cocktailIngredients")

$("#drinkButton").click(function () {
  var element = document.getElementById("favDrinkButton");
  element.classList.remove("is-hidden");
  cocktailIngredients.innerHTML = ""
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
  const cocktailName = cocktail.strDrink;
  const heading = document.querySelector(".cocktailTitle");
  heading.innerHTML = cocktailName;
  //pulls up image of the random cocktail
  const cocktailImg = document.querySelector(".cocktailImg")
  cocktailImg.src = cocktail.strDrinkThumb;

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
    cocktailIngredients.innerHTML += `<li>${value}</li>`
  }
}

