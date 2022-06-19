const currentMenuStored = JSON.parse(localStorage.getItem("currentMenu"))
const getLabelAPI = "?apiKey=84d33c0efd234661bf41e9848364e177"
console.log(currentMenuStored)

const singlePageTitle = document.querySelector(".singlePageTitle")

const foodDesc = document.querySelector(".foodDesc")
const foodSteps = document.querySelector(".foodSteps ")
const foodNutrition = document.querySelector(".foodNutrition")

singlePageTitle.innerHTML = currentMenuStored[0].recipes[0].title
foodDesc.innerHTML = currentMenuStored[0].recipes[0].summary
foodSteps.innerHTML = currentMenuStored[0].recipes[0].instructions

fetch(`https://api.spoonacular.com/recipes/${currentMenuStored[0].recipes[0].id}/nutritionLabel.png`, {
    method: "GET",
    headers: { "Content-type": "image/png" }
})
    .then((response) => response)
    .then((data) => {
        console.log(data)
        foodNutrition.src = data.url
});

$(".close").click(function(){
    window.close()
})