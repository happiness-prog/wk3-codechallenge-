document.addEventListener('DOMContentLoaded', () => {
  fetchFirstMovie();
  fetchAllMovies();
});

  
  

  function fetchFirstMovie() {
    fetch('http://localhost:3000/films/1')
        .then(response => response.json())
        .then(movie => displayMovieDetails(movie));
}

function displayMovieDetails(movie) {
    document.getElementById('movie-poster').src = movie.poster;
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-description').textContent = movie.description;
    document.getElementById('movie-runtime').textContent = movie.runtime;
    document.getElementById('movie-showtime').textContent = movie.showtime;
    document.getElementById('movie-tickets').textContent =
        movie.capacity - movie.tickets_sold;
    document.getElementById('buy-ticket').dataset.id = movie.id;
    document.getElementById('buy-ticket').disabled =
        movie.capacity - movie.tickets_sold === 0;
}


function fetchAllMovies() {
  fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(movies => {
          const filmsList = document.getElementById('films');
          filmsList.innerHTML = ''; // Clear any existing list items
          movies.forEach(movie => {
              const li = document.createElement('li');
              li.textContent = movie.title;
              li.className = 'film item';
              li.dataset.id = movie.id;
              li.addEventListener('click', () => fetchMovieDetails(movie.id));
              filmsList.appendChild(li);
          });
      });
}

function fetchMovieDetails(movieId) {
  fetch(`http://localhost:3000/films/${movieId}`)
      .then(response => response.json())
      .then(movie => displayMovieDetails(movie));
}

document.getElementById('buy-ticket').addEventListener('click', () => {
  const movieId = document.getElementById('buy-ticket').dataset.id;

  fetch(`http://localhost:3000/films/${movieId}`)
      .then(response => response.json())
      .then(movie => {
          const availableTickets = movie.capacity - movie.tickets_sold;
          if (availableTickets > 0) {
              const updatedTicketsSold = movie.tickets_sold + 1;

              // Update server
              fetch(`http://localhost:3000/films/${movieId}`, {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ tickets_sold: updatedTicketsSold })
              })
              .then(() => {
                  // Update frontend
                  document.getElementById('movie-tickets').textContent =
                      availableTickets - 1;
                  if (availableTickets - 1 === 0) {
                      document.getElementById('buy-ticket').disabled = true;
                      document.getElementById('buy-ticket').textContent = 'Sold Out';
                  }
              });
          }
      });
});

