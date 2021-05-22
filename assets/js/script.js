const renderMovies = movies => {
    document.querySelector('main.movies').innerHTML='';
    for (const movie of movies){
        document.querySelector('main.movies').innerHTML+=showMovies(movie);
    }
}

const getPopular = () =>{
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=134e6cd7b221d1c5f32b7f926a23331a&language=en-US&page=1&region=ES')
    .then(res=>res.json())
    .then(res=>{
        const movies = res.results;
        renderMovies(movies)
    })
    .catch(error=>console.error(error))
}


const getLatest = async () =>{

   try{
        const res = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=134e6cd7b221d1c5f32b7f926a23331a&language=en-US&page=1&region=ES');
        const movies = res.data.results;
        renderMovies(movies);
   }catch(error){
        console.error(error);
   }
  
}

const showMovieDetails = movie => {
    return `
        <div class="movie">
            <h3>${movie.title}</h3>
            <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="${movie.title}"> <br>
            <span> Popularity: ${movie.popularity} </span>
            <p> ${movie.overview}</p>
        </div>
    `
}

const showMovies = movie => {
    return ` 
        <div onclick="getDetails(${movie.id})" class="movie">
            <h3>${movie.title}</h3>
            <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="${movie.title}">
        </div>
    `
}

const getDetails = movie_id =>{
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=134e6cd7b221d1c5f32b7f926a23331a&language=en-US&page=1&region=ES`)
    .then(res=>{
        const movie = res.data;
        document.querySelector('main.movies').innerHTML = showMovieDetails(movie);
    })
    .catch(console.error)
 }