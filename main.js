let APIKEY = "dec1430dea397117976757d045cef9ef";
let baseURL = "https://api.themoviedb.org/3/search/movie?api_key=";
let imageURL = "https://image.tmdb.org/t/p/w500/";
let favoriteURL = "https://api.themoviedb.org/3/movie/popular?api_key=dec1430dea397117976757d045cef9ef&language=en-US&page=1"
let topRate = "https://api.themoviedb.org/3/movie/top_rated?api_key=dec1430dea397117976757d045cef9ef&language=en-US&page=1"


//create all eventsListner;
function listener(elementeId, inpuTYpe, callBack){
    document.getElementById(elementeId).addEventListener(inpuTYpe, callBack)
}

// function use when press the button favs;
function buttonFav(){
    listener('pop', 'click', eventL(favoriteURL));
    document.getElementById("pop").style.visibility = "hidden";
    document.getElementById("search").style.visibility = "hidden";
    document.getElementById("rate").style.visibility = "hidden";
}

function buttonTop(){
    listener('pop', 'click', eventL(topRate));
    document.getElementById("rate").style.visibility = "hidden";
    document.getElementById("pop").style.visibility = "hidden";
    document.getElementById("search").style.visibility = "hidden";
}

// function to search movie;
function searchKeyword(){
    
    listener('search', 'keyup', function(e){
        var keyword = document.getElementById('search');
        let uls = "".concat(baseURL,APIKEY,'&language=en-US&query=',keyword.value,'&page=1&include_adult=false');
        if (e.keyCode === 13) {
        eventL(uls);
      }  
    })
}

//functin to get the json movies;
function eventL(urls){
    fetch(urls)
    .then((res) => res.json())
    .then((data) => {
        let objects = data.results;
        get_Movie(objects);
    })
    .catch((err) => console.log(err))
}



// create all
function get_Movie(objects){
    var elements_div = document.getElementById('output_movies');
    var id_movie;
    for(i in objects){

        //div main
        var moviesRow = document.createElement("div");
        moviesRow.className = "row";

        //div for image
        var divImage = document.createElement("div");
        divImage.className = "div_imgs";
        moviesRow.appendChild(divImage);

        //link to page
        var a = document.createElement("a");
        //a.setAttribute("href", "movie.html");
        a.className = "a_img_movie";
        a.addEventListener("click", function(){
            newPage(objects[i].id);
        });

        //a.setAttribute("onclick", "newPage('objects[i].id')"); //dont work because a variable will be a string;
        divImage.appendChild(a);


        var moviesImage = document.createElement("img");
        moviesImage.src = ''.concat(imageURL,objects[i].poster_path)
        moviesImage.className = "moviesImage";
        a.appendChild(moviesImage);


        var divMovie = document.createElement("div");
        divMovie.className = "movie_div";
        moviesRow.appendChild(divMovie);

        var movieTitle = document.createElement("h2");
        movieTitle.className = "movie_title"
        var title = document.createTextNode(objects[i].original_title);
        movieTitle.appendChild(title);
        divMovie.appendChild(movieTitle);

        var like = document.createElement("img");
        like.className = "like_vote";
        like.setAttribute("src", "img/like.png");
        divMovie.appendChild(like);

        var movieInfo = document.createElement("p");
        movieInfo.className = "vote_average";
        var vote = document.createTextNode(objects[i].vote_average);
        movieInfo.appendChild(vote);
    
        divMovie.appendChild(movieInfo);

        
        elements_div.appendChild(moviesRow);

    }
}

function newPage(id){

    window.open("movie.html","_self");

    console.log(id);
    
}


searchKeyword();



















