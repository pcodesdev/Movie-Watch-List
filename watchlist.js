function displayWatchlist() {
  // Get the watchlist from local storage
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  console.log(watchlist);

  // Get the container where we'll display the watchlist
  const watchlistContainer = document.querySelector(".movie-content-watchlist");

  // Clear any existing content
  watchlistContainer.innerHTML = "";

  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
    return;
  }

  // Reverse the watchlist array to display the latest added movie first
  const reversedWatchlist = [...watchlist].reverse();

  // Loop through each movie in the reversed watchlist and create its HTML
  reversedWatchlist.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.className = "movie-poster";
    movieElement.innerHTML = `
            <div class="movie-img">
                <img src="${movie.Poster}" alt="${movie.Title}" />
            </div>
            <div class="movie-info">
                <div class="movie-info-name">
                    <h2>${movie.Title}</h2>
                    <p><i class="fa-solid fa-star"></i>${movie.imdbRating}</p>
                </div>
                <div class="movie-info-details">
                    <p>${movie.Runtime}</p>
                    <p>${movie.Genre}</p>
                    <p class="remove-from-watchlist"><img src="assets/remove.png" alt="remove sign" class="circle-remove">Remove</p>
                </div>
                <div class="movie-info-description">
                    <p>${movie.Plot}</p>
                </div>
            </div>
        `;

    //Add event listener to remove movie from watchlist
    const removeButton = movieElement.querySelector(".remove-from-watchlist");
    removeButton.addEventListener("click", () =>
      removeFromWatchlist(movie.imdbID)
    );

    // Add the movie element to the watchlist container
    watchlistContainer.appendChild(movieElement);
  });
}

function removeFromWatchlist(imdbID) {
  // Show a confirmation alert before removing the movie
  const confirmRemoval = confirm(
    "Are you sure you want to remove this movie from your watchlist?"
  );

  if (confirmRemoval) {
    // Get current watchlist from local storage
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    // Remove the movie with the matching imdbID
    watchlist = watchlist.filter((movie) => movie.imdbID !== imdbID);

    // Save updated watchlist to local storage
    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    // Show an alert message after the movie has been removed
    alert("Movie removed from watchlist!");

    // Refresh the page to reflect changes
    location.reload();
  }
}

//display the watchlist
displayWatchlist();
