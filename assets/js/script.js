// Variables needed

const movieGenre = document.querySelector(".genreOption");
const movieYear = document.querySelector(".yearOption");
const movieSorting = document.querySelector(".sortOption");
const movieApiKey = "2e23590ce3564e605ddd23163743fd00";

// Call to add the year and genre to the options for user select
yearsToUserSelect();
genreToUserSelect();

//Event listener for the generate random movie button

document
  .querySelector(".generateMovie")
  .addEventListener("click", generateRandomMovie);

//Adding the years and genre from the api to the select options for user to choose from
function yearsToUserSelect() {
  let startYear = new Date().getFullYear();
  for (let index = startYear; index >= startYear - 50; index--) {
    let option = document.createElement("option");
    option.value = index + "&";
    option.textContent = index;
    document.querySelector(".yearOption").appendChild(option);
  }
}

function genreToUserSelect() {
  genreListApi().then((genres) => {
    genres.genres.forEach((genre) => {
      let option = document.createElement("option");
      option.value = `${genre.id}&`;
      option.textContent = genre.name;
      document.querySelector(".genreOption").appendChild(option);
    });
  });
}

// Find genre name and ID from the api
async function genreListApi() {
  let genres = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      movieApiKey +
      "&language=en-US"
  );
  genres = await genres.json();
  return genres;
}

// Function for getting the movies

async function getMoviesList(movieGenre, movieYear, movieSort, moviePage = 1) {
  //disable the button
  document.querySelector(".generate").disabled = true;
  //add the chosen options into the api
  let response = `https://api.themoviedb.org/3/discover/movie?movieSort_by=${movieSort}${
    movieYear != "All" ? "&primary_release_movieYear=" + movieYear : ""
  }${
    movieGenre != "All" ? "with_movieGenres=" + movieGenre : ""
  }api_key="+ movieApiKey +"&page=${moviePage}`;
  let foundMovies = await fetch(response);
  foundMovies = await foundMovies.json();
  //return the button to on so that the user can generate another movie
  document.querySelector(".generate").disabled = false;
  return foundMovies;
}

//Function for generating the random movie

function generateRandomMovie() {
  let randomMovieIndex;
  // First request to figure out how many options per page
  getMoviesList(movieGenre.value, movieYear.value, movieSorting.value).then(
    (value) => {
      if (value.moviePage == 1) {
        //Now we randomize it
        getMoviesList(
          movieGenre.value,
          movieYear.value,
          movieSorting.value,
          Math.floor(
            Math.random() *
              (value.totalFoundPages > 500 ? 500 : value.totalFoundPages)
          ) + 1
        )
          .then((value) => {
            //Choose a random movie in the array
            randomMovieIndex =
              Math.floor(Math.random() * value.results.length - 1) + 1;
            //send all the information to another function that will then display the information
            displayMovieInformation(
              value.results[randomMovieIndex].poster_path,
              value.results[randomMovieIndex].title,
              value.results[randomMovieIndex].overview,
              value.results[randomMovieIndex].release_date,
              value.results[randomMovieIndex].original_language,
              value.results[randomMovieIndex].vote_average,
              value.results[randomMovieIndex].popularity,
              value.results[randomMovieIndex].genre_ids
            );
          })
          .catch((reason) => {
            console.log("error: " + reason);
            document.querySelector(".generate").disabled = false;
          });
      }
    }
  );
}

function displayMovieInformation(
  poster_link,
  title,
  overview,
  release_date,
  language,
  vote,
  popularity,
  genres = []
) {
  genreListApi().then((userGenre) => {
    userGenre = userGenre.genres;
    let chosenGenreName = "";
    //to check the genres name with genre id
    genres.forEach((element) => {
      genresForCheck.forEach((genreID) => {
        if (element == genreID.id) chosenGenreName += `${genreID.name},  `;
      });
    });
    console.log (chosenGenreName, title, release_date, language, vote, popularity, overview);
    //add information like movie name, photo, overview and etc
    document.querySelector(".movieInformation").innerHTML = `        
        //   what in the hecky do we put here //
      `;
  });
}


