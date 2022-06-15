// Variables needed

const movieGenre = document.querySelector('.genreOption');
const movieYear = document.querySelector('.yearOption');
const movieSorting = document.querySelector('.sortOption');

//Event listener for the generate random movie button

document.querySelector(".generateMovie").addEventListener("click",);

// Function for getting the movies

async function getMoviesList(movieGenre, movieYear, movieSort, page = 1) {
    //disable the button
    document.querySelector(".generate").disabled = true;
    //add the chosen options into the api
    let response = `https://api.themoviedb.org/3/discover/movie?movieSort_by=${movieSort}${
      movieYear != "All" ? "&primary_release_movieYear=" + movieYear : ""
    }${movieGenre != "All" ? "with_movieGenres=" + movieGenre : ""}api_key=****&page=${page}`;
    let foundMovies = await fetch(response);
    foundMovies = await foundMovies.json();
    //return the button to on so that the user can generate another movie
    document.querySelector(".generate").disabled = false;
    return foundMovies;
  }

//Function for generating the random movie