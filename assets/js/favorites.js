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
            newListing.classList.add("is-three-quarters");
            newListing.classList.add("mb-2");
            newListing.href = localMovieList[movieIndex].source;
            newListing.target = "_blank";
            newListing.innerHTML = localMovieList[movieIndex].title;

            //formating for delete button
            let delListing = document.createElement("a");
            delListing.classList.add("delete");
            delListing.classList.add("is-large");
            delListing.classList.add("has-text-primary");
            delListing.classList.add("has-background-info");
            delListing.classList.add("ml-1");
            delListing.classList.add("mt-1");
            delListing.setAttribute('onclick', "deleteItem('Movie', '" + newListing.innerHTML + "')");

            // create list element
            let newListItem = document.createElement("div");
            newListItem.classList.add("list-item");
            newListItem.classList.add("columns");
            
            newListItem.appendChild(newListing)
            newListItem.appendChild(delListing)

            movieList.appendChild(newListItem);
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
            newListing.classList.add("is-three-quarters");
            newListing.classList.add("mb-2");
            newListing.target = "_blank";
            newListing.href = localDrinkList[drinkIndex].source;
            newListing.innerHTML = localDrinkList[drinkIndex].title;

            //formating for delete button
            let delListing = document.createElement("a");
            delListing.classList.add("delete");
            delListing.classList.add("is-large");
            delListing.classList.add("has-text-primary");
            delListing.classList.add("has-background-info");
            delListing.classList.add("ml-1");
            delListing.classList.add("mt-1");
            delListing.setAttribute('onclick', "deleteItem('Drink', '" + newListing.innerHTML + "')");

            let newListItem = document.createElement("div");
            newListItem.classList.add("list-item");
            newListItem.classList.add("columns");
            newListItem.appendChild(newListing)
            newListItem.appendChild(delListing)

            drinkList.appendChild(newListItem);
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
            newListing.classList.add("is-three-quarters");
            newListing.classList.add("mb-2");
            newListing.target = "_blank";
            newListing.href = localMealList[mealIndex].source;
            newListing.innerHTML = localMealList[mealIndex].title;


            //formating for delete button
            let delListing = document.createElement("a");
            delListing.classList.add("delete");
            delListing.classList.add("is-large");
            delListing.classList.add("has-text-primary");
            delListing.classList.add("has-background-info");
            delListing.classList.add("ml-1");
            delListing.classList.add("mt-1");
            delListing.setAttribute('onclick', "deleteItem('Meal', '" + newListing.innerHTML + "')");


            let newListItem = document.createElement("div");
            newListItem.classList.add("list-item");
            newListItem.classList.add("columns");
            newListItem.appendChild(newListing)
            newListItem.appendChild(delListing)
;
            mealList.appendChild(newListItem);

            mealIndex++;
        } while (mealIndex < localMealList.length);
        mealIndex = 0;
    }
}

function deleteItem(category, item) {
    let localList = JSON.parse(localStorage.getItem("fav" + category));
    console.log(localList);
    console.log("To Del: " + item);

    //find index of item
    let index = 0;
    for (let i = 0; i < localList.length; i++) {
        if (localList[i].title.includes(item)) {
            index = i;
            break;
        }
    }


    if (index == 0) {
        localList.splice(index, 1);
    } else {
        localList.splice(index, index);
    }
    let newLocal = localList;

    //clear old local host
    localStorage.removeItem("fav" + category);
    localStorage.setItem("fav" + category, JSON.stringify(newLocal));
    window.location.reload();
}

function clearLocalStorage() {
    localStorage.clear();
    window.location.reload();
}

//don't run unless you are on the favorites page i.e. if the url contains index.html
if (!window.location.href.includes("index.html")) {
    displayAllFav();
}