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

function retFromLocal(category) {
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
function clearList(listToEmpty) {
    console.log(listToEmpty);

    if (listToEmpty) {
        while (listToEmpty.firstChild) {
            listToEmpty.removeChild(listToEmpty.firstChild);
            console.log("loop");
        }
    }
};

function displayAllFav() {
    let movieList = document.querySelector(".fav-movie-list");
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
        clearList(movieList);
    }
    let movieIndex = 0;
    if (localMovieList[movieIndex]) {
        do {
            //create element to be apppended
            console.log("Movie Loop Initiated");
            let newListing = document.createElement("a");
            newListing.classList.add("button");
            newListing.classList.add("is-info");
            newListing.classList.add("is-fullwidth");
            newListing.classList.add("mb-2");
            newListing.href = localMovieList[movieIndex].source;
            newListing.innerHTML = localMovieList[movieIndex].title;
            movieList.appendChild(newListing);
            movieIndex++;
        } while (movieIndex < localMovieList.length);
        movieIndex = 0;
    }

    //display all drinks
    let localDrinkList = retFromLocal("Drink"); //retrieve favorite movie list from local storage
    console.log(localDrinkList);

    let unorderedDrinkList = document.createElement("ul");
    unorderedDrinkList.classList.add("unordered-drink-list");

    if (unorderedMovieList.firstChild) {
        console.log("Cleared Movie");
        clearList(mealList);
    }
    let drinkIndex = 0;
    if (localDrinkList[drinkIndex]) {
        do {
            //create element to be apppended
            console.log("Drink Loop Initiated");
            let newListing = document.createElement("a");
            newListing.classList.add("button");
            newListing.classList.add("is-info");
            newListing.classList.add("is-fullwidth");
            newListing.classList.add("mb-2");
            newListing.href = localDrinkList[drinkIndex].source;
            newListing.innerHTML = localDrinkList[drinkIndex].title;
            drinkList.appendChild(newListing);
            drinkIndex++;
        } while (drinkIndex < localDrinkList.length);
        drinkIndex = 0;
    }

    //display all meals
    let localMealList = retFromLocal("Meal"); //retrieve favorite movie list from local storage
    console.log(localMealList);

    let unorderedMealList = document.createElement("ul");
    unorderedMealList.classList.add("unordered-meal-list");

    if (unorderedMovieList.firstChild) {
        console.log("Cleared Movie");
        clearList(mealList);
    }
    let mealIndex = 0;
    if (localMealList[mealIndex]) {
        do {
            //create element to be apppended
            console.log("Meal Loop Initiated");
            let newListing = document.createElement("a");
            newListing.classList.add("button");
            newListing.classList.add("is-info");
            newListing.classList.add("is-fullwidth");
            newListing.classList.add("mb-2");
            newListing.href = localMealList[mealIndex].source;
            newListing.innerHTML = localMealList[mealIndex].title;
            mealList.appendChild(newListing);
            mealIndex++;
        } while (mealIndex < localMealList.length);
        mealIndex = 0;
    }
}

//don't run unless you are on the favorites page i.e. if the url contains index.html
if (!window.location.href.includes("index.html")) {
    displayAllFav();
}