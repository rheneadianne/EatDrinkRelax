const foodAPIkey = "&apiKey=84d33c0efd234661bf41e9848364e177"
const foodTitle = document.querySelector(".foodTitle")
const foodImg = document.querySelector(".foodImg")
let spoonParams = {
    recipeType: "main%20course",
    diet: "",
    intolerances: ""
}

let foodAPI = `https://api.spoonacular.com/recipes/random?tags=`

const changeMealType = recipeType => {
    spoonParams.recipeType = recipeType
    foodAPI = `https://api.spoonacular.com/recipes/random?tags=${spoonParams.recipeType},${spoonParams.diet},${spoonParams.intolerances}`
}

const changeDiet = diet => {
    spoonParams.diet = diet
    foodAPI = `https://api.spoonacular.com/recipes/random?tags=${spoonParams.recipeType},${spoonParams.diet},${spoonParams.intolerances}`
}

const changeIntolerance = intolerances => {
    spoonParams.intolerances = intolerances
    foodAPI = `https://api.spoonacular.com/recipes/random?tags=${spoonParams.recipeType},${spoonParams.diet},${spoonParams.intolerances}`
}

$(".killme").click(function () {
    fetch(foodAPI + foodAPIkey, {
        method: "GET",
        headers: { "Content-type": "application/json" }
    })
        .then((response) => response.json())
        .then((data) => {
            let currentRandomRecipe = [data]
            randomFood(data)
            $(".moreInfobtn").click(function () {
                saveForMoreDetails(currentRandomRecipe)
            })
        })
        .catch(() => document.getElementById("demo").innerHTML = "Invalid Combo! Please try again")
})

const currentMenuStored = JSON.parse(localStorage.getItem("currentMenu"))

const randomFood = data => {
    foodImg.src = data.recipes[0].image
    foodTitle.innerHTML = data.recipes[0].title

}

const saveForMoreDetails = currentRandomRecipe => {
    localStorage.setItem("currentMenu", JSON.stringify(currentRandomRecipe))
}