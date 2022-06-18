//contains functions to be called by event listeners to store values into localstorage
export function favToLocal(itemName, category) {
    console.log(itemName);
    console.log(category);

    let favList = []; //to store a list of favorite items

    //check if local storage contains a list of favorite items
    if (localStorage.getItem("fav" + category)) { 
        //save the list of movies found in local storage
        favList = JSON.parse(localStorage.getItem("fav" + category));
        console.log("Local Storage: ", favList);
    }

    //save movie name to the end of the list
    favList[favList.length] = movieName;

    //save new list into local storage
    localStorage.setItem("fav" + category, JSON.stringify(favList));
}

export function retFromLocal (category) {
    console.log(category);

    let favList = []; //to store a list of favorite items

    //retrieve favorite items from local storage
    if (localStorage.getItem("fav" + category)) {
        favList = JSON.parse(localStorage.getItem("fav" + category));
        console.log("From Storage: ", favList);
    }

    return favList;
}
