const foodAPIkey = "&apiKey=84d33c0efd234661bf41e9848364e177"
const foodTitle = document.querySelector(".foodTitle")
const foodImg = document.querySelector(".foodImg")
const errorPopUp = document.querySelector(".foodError")

let spoonParams = {
    recipeType: "main%20course",
    diet: "",
    intolerances: ""
}

let foodAPI = `https://api.spoonacular.com/recipes/random?tags=`

const changeMealType = recipeType => {
    spoonParams.recipeType = recipeType
    foodAPI = `${foodAPI}${spoonParams.recipeType},${spoonParams.diet},${spoonParams.intolerances}`
}

const changeDiet = diet => {
    spoonParams.diet = diet
    foodAPI = `${foodAPI}${spoonParams.recipeType},${spoonParams.diet},${spoonParams.intolerances}`
}

const changeIntolerance = intolerances => {
    spoonParams.intolerances = intolerances
    foodAPI = `${foodAPI}${spoonParams.recipeType},${spoonParams.diet},${spoonParams.intolerances}`
}

const randomFoodAPI = () => {
    $(".foodError").addClass("is-hidden")
    $(".moreInfobtn").removeClass("is-hidden")
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
        .catch(() => errorMessage())
}

$(".randomize").click(function () {
    randomFoodAPI()
})

const currentMenuStored = JSON.parse(localStorage.getItem("currentMenu"))

const randomFood = data => {
    foodImg.src = `https://spoonacular.com/recipeImages/${data.recipes[0].id}-556x370.jpg`
    foodTitle.innerHTML = data.recipes[0].title
}

const saveForMoreDetails = currentRandomRecipe => {
    localStorage.setItem("currentMenu", JSON.stringify(currentRandomRecipe))
}

const errorMessage = () => {
    $(".foodError").removeClass("is-hidden")
    errorPopUp.innerHTML = "Invalid selections! Please note that the API has a limited tagging system. Please try a different combo!"
}