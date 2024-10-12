// elements
const container = document.querySelector(".container");
const toggleIcon = document.querySelector(".toggle-icon");
const toggleBtn = document.getElementById("toggle-btn");

const movieSearchEl = document.getElementById("movie-search");
const movieSearchBtn = document.getElementById("search-btn");

// toggle button
let isDarkMode = false;

function toggleColors() {
  

  if (isDarkMode) {
    container.style.backgroundColor = "white";
    container.style.color = "black";
    toggleIcon.style.left = "10px";
    toggleIcon.style.backgroundColor = "white";
    toggleBtn.style.backgroundColor = "#444";
  } else {
    container.style.backgroundColor = "black";
    container.style.color = "white";
    toggleIcon.style.left = "calc(100% - 25px)";
    toggleIcon.style.backgroundColor = "black";
    toggleBtn.style.backgroundColor = "#ccc";
  }

  isDarkMode = !isDarkMode;
}

document.getElementById("toggle-btn").addEventListener("click", toggleColors);


// Movie search

movieSearchBtn.addEventListener("click", () => {
    const movieName = movieSearchEl.value.trim();

    if (!movieName) {
        alert("Please enter a movie name.");
        return;
    }

    fetch(`https://www.omdbapi.com/?apikey=70c9435d&s=${movieName}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.Response === "False") {
                alert(data.Error || "No movies found! Please try another name.");
            } else {
                displayMovieList(data.Search);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while fetching the movie data.");
        });
});

function displayMovieList(movies) {
    const movieContent = document.querySelector('.movie-content');
    movieContent.innerHTML = '';

    movies.forEach(movie => {
        fetch(`https://www.omdbapi.com/?apikey=70c9435d&i=${movie.imdbID}`)
            .then((res) => res.json())
            .then((data) => {
                const movieElement = createMovieElement(data);
                movieContent.appendChild(movieElement);
            })
            .catch((error) => {
                console.error("Error fetching movie details:", error);
            });
    });
}

function createMovieElement(data) {
  const movieDiv = document.createElement("div");
  movieDiv.className = "movie-poster";
  movieDiv.innerHTML = `
        <div class="movie-img">
            <img src="${data.Poster}" alt="${data.Title}" />
        </div>
        <div class="movie-info">
            <div class="movie-info-name">
                <h2>${data.Title}</h2>
                <p><i class="fa-solid fa-star"></i>${data.imdbRating}</p>
            </div>
            <div class="movie-info-details">
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <p class="watchlist"><img src="assets/plus.png" alt="plus sign" class="circle-plus">Watchlist</p>
            </div>
            <div class="movie-info-description">
                <p>${data.Plot}</p>
            </div>
        </div>
    `;
  // Add event listener to the "Add to Watchlist" button
  // Add event listener to the "Add to Watchlist" button
  const watchlistButton = movieDiv.querySelector(".watchlist");
  watchlistButton.addEventListener("click", () => addToWatchlist(data));

  return movieDiv;
}





// Save Movie to the local storage
function addToWatchlist(movie) {
  // Get current watchlist from local storage
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  // Check if movie is already in watchlist
  if (!watchlist.some((item) => item.imdbID === movie.imdbID)) {
    // Add movie to watchlist
    watchlist.push({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Runtime: movie.Runtime,
      Genre: movie.Genre,
      Plot: movie.Plot,
      imdbRating: movie.imdbRating,
    });

    // Save updated watchlist to local storage
    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    alert(`"${movie.Title}" has been added to your watchlist!`);
  } else {
    alert(`"${movie.Title}" is already in your watchlist!`);
  }
}







// test
// fetch("http://www.omdbapi.com/?apikey=70c9435d&t=Inception")
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error("Error:", error));



