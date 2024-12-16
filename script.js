document.addEventListener('DOMContentLoaded', () => {
  const movieList = document.getElementById('films');
  const posterImg = document.getElementById('poster');
  const titleElement = document.getElementById('title');
  const runtimeElement = document.getElementById('runtime');
  const showtimeElement = document.getElementById('showtime');
  const descriptionElement = document.getElementById('description');
  const availableTicketsElement = document.getElementById('available-tickets');
  const buyTicketButton = document.getElementById('buy-ticket');

  
  

  function fetchMovies() {
    fetch('http://localhost:3001/movies')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(movies => {
        
        movieList.innerHTML = '';

      
        movies.forEach((movie, index) => {
          const movieItem = document.createElement('li');
          movieItem.textContent = movie.title;
          movieItem.classList.add('movie-item');
          movieItem.addEventListener('click', () => displayMovieDetails(movie));
          movieList.appendChild(movieItem);
        });

        
        if (movies.length > 0) {
          displayMovieDetails(movies[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        movieList.innerHTML = `<li>Error loading movies: ${error.message}</li>`;
        alert('Unable to load movies. Please check your local development setup.');
      });
  }

  function displayMovieDetails(movie) {
    posterImg.src = movie.image || 'default-poster.jpg';
    titleElement.textContent = movie.title;
    runtimeElement.textContent = `Runtime: ${movie.runtime}`;
    showtimeElement.textContent = `Showtimes: ${movie.showtimes.join(', ')}`;
    descriptionElement.textContent = movie.description;
    availableTicketsElement.textContent = movie.availableTickets;

    buyTicketButton.onclick = () => purchaseTicket(movie);
  }

  function purchaseTicket(movie) {
    if (movie.availableTickets > 0) {
      movie.availableTickets -= 1;
      availableTicketsElement.textContent = movie.availableTickets;

      
      fetch(`http://localhost:3001/movies/${movie.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ availableTickets: movie.availableTickets })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update ticket count');
        }
        alert(`Ticket purchased successfully for ${movie.title}!`);
      })
      .catch(error => {
        console.error('Error updating ticket:', error);
        alert('Failed to purchase ticket. Please try again.');
      });
    } else {
      alert('Sorry, no tickets available for this movie.');
    }
  }

  
  fetchMovies();
});