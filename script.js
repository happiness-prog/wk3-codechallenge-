document.addEventListener('DOMContentLoaded', () => {
   
    const movies = []
      
  
    function renderMovieList() {
      const movieList = document.getElementById('films');
      movieList.innerHTML = '';
      movies.forEach((movie, index) => {
        const movieItem = document.createElement('li');
        movieItem.textContent = movie.title;
        movieItem.classList.add('movie-item');
        movieItem.addEventListener('click', () => displayMovieDetails(index));
        movieList.appendChild(movieItem);
      });
    }
  
    
    function displayMovieDetails(index) {
      const selectedMovie = movies[index];
      document.getElementById('poster').src = selectedMovie.image;
      document.getElementById('title').textContent = selectedMovie.title;
      document.getElementById('runtime').textContent = `Runtime: ${selectedMovie.runtime}`;
      document.getElementById('showtime').textContent = `Showtimes: ${selectedMovie.showtimes.join(', ')}`;
      document.getElementById('description').textContent = selectedMovie.description;
      document.getElementById('available-tickets').textContent = selectedMovie.availableTickets;
  
     
      const buyTicketButton = document.getElementById('buy-ticket');
      buyTicketButton.onclick = () => purchaseTicket(index);
    }
  
    
    function purchaseTicket(index) {
      const selectedMovie = movies[index];
      if (selectedMovie.availableTickets > 0) {
        selectedMovie.availableTickets -= 1;
        document.getElementById('available-tickets').textContent = selectedMovie.availableTickets;
        alert(`Ticket purchased successfully for ${selectedMovie.title}!`);
      } else {
        alert('Sorry, no tickets available for this movie.');
      }
    }
  
   
    renderMovieList();
  });
  