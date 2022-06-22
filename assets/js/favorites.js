//contains functions to be called by event listeners to store values into localstorage
function favToLocal(category, itemName, source) {
    console.log(itemName);
    console.log(category);
    console.log(source);

    let favObj = {
        title: itemName,
        source 
    }

    let favList = []; //to store a list of favorite items

    //check if local storage contains a list of favorite items
    if (localStorage.getItem("fav" + category)) { 
        //save the list of movies found in local storage
        favList = JSON.parse(localStorage.getItem("fav" + category));
        console.log("Local Storage: ", favList);
    }

    //save movie name to the end of the list
    favList[favList.length] = favObj;

    //save new list into local storage
    localStorage.setItem("fav" + category, JSON.stringify(favList));
}

function retFromLocal (category) {
    console.log(category);

    let favList = []; //to store a list of favorite items

    //retrieve favorite items from local storage
    if (localStorage.getItem("fav" + category)) {
        favList = JSON.parse(localStorage.getItem("fav" + category));
        console.log("From Storage: ", favList);
    }

    return favList;
}

//to clear out a list when new items are added to local storage and list needs to be rerendered
function clearList (listToEmpty) {
    console.log(listToEmpty);

    if (listToEmpty) {
        while (listToEmpty.firstChild) {
            listToEmpty.removeChild(listToEmpty.firstChild);
            console.log("loop");
        }
    }
};

function displayAllFav () {
    let movieList =  document.querySelector(".fav-movie-list");
    let mealList = document.querySelector(".fav-meal-list");
    let drinkList = document.querySelector(".fav-drink-list");

    //display all movies
    let localMovieList = retFromLocal("Movie"); //retrieve favorite movie list from local storage
    console.log(localMovieList);

    let unorderedMovieList = document.createElement("ul");
    unorderedMovieList.classList.add("unordered-movie-list");

    //remove previous list renders
    if (unorderedMovieList.firstChild) {
        console.log("Cleared Movie");
        clearList(unorderedMovieList);
    }

    for (let i = 0; i < localMovieList.length; i++) {
        //create element to be apppended
        let newListing = document.createElement("li");
        newListing.classList.add("movie-title");
        newListing.innerHTML = localMovieList[i].title; 

        unorderedMovieList.appendChild(newListing);
    }
    movieList.appendChild(unorderedMovieList);


    //display all drinks
    let localDrinkList = retFromLocal("Drink"); //retrieve favorite movie list from local storage
    console.log(localDrinkList);

    let unorderedDrinkList = document.createElement("ul");
    unorderedDrinkList.classList.add("unordered-drink-list");

    //remove previous list renders
    if (unorderedMovieList.firstChild) {
        clearList(unorderedMovieList);
    }

    for (let i = 0; i < localDrinkList.length; i++) {
        //create element to be apppended
        let newListing = document.createElement("li");
        newListing.classList.add("drink-title");
        newListing.innerHTML = localDrinkList[i].title; 

        unorderedDrinkList.appendChild(newListing);
    }
    drinkList.appendChild(unorderedDrinkList);

    //display all meals
    let localMealList = retFromLocal("Meal"); //retrieve favorite movie list from local storage
    console.log(localMealList);

    let unorderedMealList = document.createElement("ul");
    unorderedMealList.classList.add("unordered-meal-list");

    //remove previous list renders
    if (unorderedMealList.firstChild) {
        clearList(unorderedMealList);
    }

    for (let i = 0; i < localMealList.length; i++) {
        //create element to be apppended
        let newListing = document.createElement("li");
        newListing.classList.add("meal-title");
        newListing.innerHTML = localMealList[i].title; 

        unorderedMealList.appendChild(newListing);
    }
    mealList.appendChild(unorderedMealList);
}

displayAllFav();