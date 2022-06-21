// Variables needed
const movieGenre = document.querySelector(".genreOption");
const movieYear = document.querySelector(".yearOption");
const movieSorting = document.querySelector(".sortOption");
const movieApiKey = "2e23590ce3564e605ddd23163743fd00";

var imdbID = "";

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

// Function for getting the movies

async function getMoviesList(movieGenre, movieYear, movieSort, page = 1) {
    //disable the button
    document.querySelector(".generateMovie").disabled = true;
    //add the chosen options into the api
    let response = `https://api.themoviedb.org/3/discover/movie?sort_by=${movieSort}${movieYear != "All" ? "&primary_release_year=" + movieYear : ""
        }${movieGenre != "All" ? "with_genres=" + movieGenre : ""
        }api_key=2e23590ce3564e605ddd23163743fd00&page=${page}`;
    let foundMovies = await fetch(response);
    foundMovies = await foundMovies.json();
    //return the button to on so that the user can generate another movie
    document.querySelector(".generateMovie").disabled = false;
    console.log("Checking found movies", foundMovies);
    return foundMovies;
}

//Function for generating the random movie
function generateRandomMovie() {
    let randomMovieIndex;
    // First request to figure out how many options per page
    getMoviesList(movieGenre.value, movieYear.value, movieSorting.value).then(
        (value) => {
            console.log("Checking value", value);
            if (value.page == 1) {
                //Now we randomize it
                getMoviesList(
                    movieGenre.value,
                    movieYear.value,
                    movieSorting.value,
                    Math.floor(
                        Math.random() * (value.total_pages > 500 ? 500 : value.total_pages)
                    ) + 1
                )
                    .then((value) => {
                        //Choose a random movie in the array
                        randomMovieIndex =
                            Math.floor(Math.random() * value.results.length - 1) + 1;

                        // Get the IMDB id of the chosen movie so that we can link to it.
                        movieId = value.results[randomMovieIndex].id;
                        fetch(
                            "https://api.themoviedb.org/3/movie/" +
                            movieId +
                            "/external_ids?api_key=" +
                            movieApiKey +
                            ""
                        )
                            .then((response) => {
                                if (response.ok) {
                                    return response.json();
                                } else {
                                    throw new Error("Network Error");
                                }
                            })
                            .then((data) => {
                                imdbID = data.imdb_id;
                                //send all the information to another function that will then display the information
                                displayMovieInformation(
                                    value.results[randomMovieIndex].poster_path,
                                    value.results[randomMovieIndex].title,
                                    // value.results[randomMovieIndex].overview,
                                    value.results[randomMovieIndex].release_date,
                                    // value.results[randomMovieIndex].original_language,
                                    // value.results[randomMovieIndex].vote_average,
                                    value.results[randomMovieIndex].popularity,
                                    value.results[randomMovieIndex].genre_ids
                                );
                            });
                    })
                    .catch((reason) => {
                        console.log("error: " + reason);
                        document.querySelector(".generateMovie").disabled = false;
                    });
            }
        }
    );
}

// Find genre name and ID from the api
async function genreListApi() {
    let genres = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        movieApiKey +
        "&language=en-US"
    );
    genres = await genres.json();
    console.log("Check Genres", genres);
    return genres;
}

function displayMovieInformation(
    poster_link,
    title,
    // overview,
    release_date,
    // language,
    // vote,
    popularity,
    genres = []
) {
    console.log("Check Genres", genres);
    genreListApi().then((userGenre) => {
        userGenre = userGenre.genres;
        let chosenGenreName = "";
        //to check the genres name with genre id
        genres.forEach((element) => {
            userGenre.forEach((genreID) => {
                if (element == genreID.id) chosenGenreName += `${genreID.name},  `;
            });
        });
        //add information like movie name, photo, overview and etc
        console.log(JSON.stringify(localStorage.getItem("imdb_id")));
        document.querySelector(".movieTitle").innerHTML= `<a href="https://www.imdb.com/title/${imdbID}" target=_blank class="text has-text-warning-light">
        ${title}
      </a>`
        document.querySelector(".movieInformation").innerHTML = `
        <button onclick= "favToLocal('Movie', '${title}', 'https://www.imdb.com/title/${imdbID}')" class="button is-fullwidth has-background-warning mb-2"> I'm your favorite! </button>        
    <div class="chosenMovieInformation columns is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-space-evenly">
    <div class="movieImageContainer column is-6">
    <img
      src="${poster_link ? "https://image.tmdb.org/t/p/original" + poster_link : ""
            }"
      class="movieImage"
      alt="This is a poster of the currently chosen movie."
    />
  </div>
  <div class="chosenMovieMoreDetails is-6 panel is-info has-background-light column mt-3">
  <p class="panel-heading">Movie Info</p>
    <p class="text panel-block">
    <span class="mr-1">Movie Genre: </span
    >${chosenGenreName}
  </p>
    <p class="text panel-block">
    <span class="mr-1">Movie Popularity: </span
    >${popularity}
  </p>
  <p class="text panel-block">
    <span class="mr-1">Release Date: </span
    >${release_date}
  </p>
  </div>
  </div>
`;
    });
}

