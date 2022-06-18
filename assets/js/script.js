const foodAPIkey = "&apiKey=84d33c0efd234661bf41e9848364e177"
const foodTitle = document.querySelector(".foodTitle")
const foodImg = document.querySelector(".foodImg")
let foodAPI = "https://api.spoonacular.com/recipes/random?tags=" 

$(".killme").click(function() {
    fetch(foodAPI + foodAPIkey, {
        method: "GET",
        headers: { "Content-type": "application/json" }
    })
        .then((response) => response.json())
        .then((data) => {
        let currentRandomRecipe = [data]
        randomFood(data)
        $(".foodTitle").click(function(){
            saveForMoreDetails(currentRandomRecipe)
        })
    });
})

const currentMenuStored = JSON.parse(localStorage.getItem("currentMenu"))

const randomFood = data => {
    foodImg.src = data.recipes[0].image
    foodTitle.innerHTML = data.recipes[0].title
    console.log(data)
}

const saveForMoreDetails = currentRandomRecipe => {
    localStorage.setItem("currentMenu", JSON.stringify(currentRandomRecipe))
}