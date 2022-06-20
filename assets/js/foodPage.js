const currentMenuStored = JSON.parse(localStorage.getItem("currentMenu"))
const getLabelAPI = "?apiKey=84d33c0efd234661bf41e9848364e177"
const singlePageTitle = document.querySelector(".singlePageTitle")
const foodSteps = document.querySelector(".foodSteps ")
const foodNutrition = document.querySelector(".foodNutrition")
const currentFoodImg = document.querySelector(".currentFoodImg")

singlePageTitle.innerHTML = currentMenuStored[0].recipes[0].title
let stepsShorter = currentMenuStored[0].recipes[0].analyzedInstructions

for (i = 0; i < stepsShorter.length ; i++) {
    for (a=0; a < stepsShorter[i].steps.length; a++) {
        a !== 0 || stepsShorter[i].name !== ""?
            foodSteps.innerHTML += `<li>${stepsShorter[i].steps[a].step}</li>`:
                foodSteps.innerHTML += `<b><h2 class = "title is-5 py-1">${stepsShorter[i].name}</h2></b><li>${stepsShorter[i].steps[a].step}</li>`
    }
}

fetch(`https://api.spoonacular.com/recipes/${currentMenuStored[0].recipes[0].id}/nutritionLabel.png${getLabelAPI}`, {
    method: "GET",
    headers: { "Content-type": "image/png" }
})
    .then((response) => response)
    .then((data) => {
        foodNutrition.src = data.url
});

$(".close").click(function(){
    window.close()
})

currentFoodImg.src = `https://spoonacular.com/recipeImages/${currentMenuStored[0].recipes[0].id}-556x370.jpg`