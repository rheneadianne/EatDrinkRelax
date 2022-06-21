const foodAPIkey = "&apiKey=84d33c0efd234661bf41e9848364e177" // api-key
// selectors on HTML page
const foodTitle = document.querySelector(".foodTitle")
const foodImg = document.querySelector(".foodImg")
const errorPopUp = document.querySelector(".foodError")

// created object item to filter when fetching api
let spoonParams = {
    recipeType: "main%20course",
    diet: "",
    intolerances: ""
}

let foodAPI = `https://api.spoonacular.com/recipes/random?tags=`

// changes API fetch url depending on selections
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

// function to call API, show more info button and favourite food button
const randomFoodAPI = () => {
    $(".foodError").addClass("is-hidden")
    $(".moreInfobtn").removeClass("is-hidden")
    $(".faveFood").removeClass("is-hidden")
    fetch(foodAPI + foodAPIkey, {
        method: "GET",
        headers: { "Content-type": "application/json" }
    })
        .then(response => response.json())
        .then(data => {
            let currentRandomRecipe = [data]
            console.log(data)
            randomFood(data)
            $(".moreInfobtn").click(function () {
                saveForMoreDetails(currentRandomRecipe)
            })
        })
        .catch(error => errorMessage(error))
}

//calls API when randomize button is cliecked
$(".randomize").click(function () {
    randomFoodAPI()
})

// gets random recipe data
const randomFood = data => {
    foodImg.src = `https://spoonacular.com/recipeImages/${data.recipes[0].id}-556x370.jpg`
    foodTitle.innerHTML = data.recipes[0].title
    $(".faveFoodSingle").click(function () {
        favToLocal("Meal", data.recipes[0].title, data.recipes[0].sourceURL)
    })
}

// saves current recipe to local storage to parse onto seperate HTML page
const saveForMoreDetails = currentRandomRecipe => {
    localStorage.setItem("currentMenu", JSON.stringify(currentRandomRecipe))
}

// gets current menu item from local storage
const currentMenuStored = JSON.parse(localStorage.getItem("currentMenu"))

// displays error message when invalid selections are displayed
const errorMessage = (error) => {
    console.error(error)
    $(".foodError").removeClass("is-hidden")
    errorPopUp.innerHTML = "Invalid selections! Please note that the API has a limited tagging system. Please try a different combo!"
}