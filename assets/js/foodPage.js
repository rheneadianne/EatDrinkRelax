// selectors on HTML page
const currentMenuStored = JSON.parse(localStorage.getItem("currentMenu"))
const getLabelAPI = "?apiKey=84d33c0efd234661bf41e9848364e177"
const singlePageTitle = document.querySelector(".singlePageTitle")
const recipeSource = document.querySelector(".recipeSource")
const foodSteps = document.querySelector(".foodSteps")
const ingredients = document.querySelector(".ingredients")
const foodNutrition = document.querySelector(".foodNutrition")
const currentFoodImg = document.querySelector(".currentFoodImg")

// changes title to current food item
singlePageTitle.innerHTML = currentMenuStored[0].recipes[0].title

// closes page
$(".close").click(function(){
    window.close()
})

// adds button for recipe source
recipeSource.href = currentMenuStored[0].recipes[0].sourceUrl
recipeSource.textContent =`Source: ${currentMenuStored[0].recipes[0].sourceName}`

let ingredientsShorter = currentMenuStored[0].recipes[0].extendedIngredients

$(".faveFoodSingle").click(function () {
    favToLocal("Meal", singlePageTitle.innerHTML, recipeSource.href)
})

// lists all ingredients and measurements
for (i = 0; i < ingredientsShorter.length; i++) {
    ingredients.innerHTML += `<li>${ingredientsShorter[i].measures.us.amount} ${ingredientsShorter[i].measures.us.unitShort} ${ingredientsShorter[i].originalName}</li>`
}

// lists all steps
let stepsShorter = currentMenuStored[0].recipes[0].analyzedInstructions
for (i = 0; i < stepsShorter.length ; i++) {
    for (a=0; a < stepsShorter[i].steps.length; a++) {
        a !== 0 || stepsShorter[i].name !== ""?
            foodSteps.innerHTML += `<li>${stepsShorter[i].steps[a].step}</li>`:
                foodSteps.innerHTML += `<b><h3 class = "title is-5 py-1">${stepsShorter[i].name}</h3></b><li>${stepsShorter[i].steps[a].step}</li>`
    }
}

// API call to get nutritional data
fetch(`https://api.spoonacular.com/recipes/${currentMenuStored[0].recipes[0].id}/nutritionLabel.png${getLabelAPI}`, {
    method: "GET",
    headers: { "Content-type": "image/png" }
})
    .then((response) => response)
    .then((data) => {
        foodNutrition.src = data.url
});

// add recipe image
currentFoodImg.src = `https://spoonacular.com/recipeImages/${currentMenuStored[0].recipes[0].id}-556x370.jpg`