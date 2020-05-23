let search = document.querySelector("#search");

search.addEventListener('keyup',(e)=>
{
  //  console.log(e.target.value);
    let searchText = e.target.value;
    SearchMovie(searchText);
    //when key press hide from form text and H1
    let formText = document.getElementById("divBlock");
    formText.style.display = "none";
    search.classList.add("afterkeyPress");
    document.querySelector("#formBlock").classList.add("afterkey-formBlock"); 
});

//speech Recognition api
let speechSearch = document.getElementById("speechIcon");
speechSearch.addEventListener("click",()=>{
    let formText = document.getElementById("divBlock");
    formText.style.display = "none";
    search.classList.add("afterkeyPress");
    document.querySelector("#formBlock").classList.add("afterkey-formBlock"); 
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    let p = document.createElement("p");
    recognition.interimResults = true;

recognition.addEventListener("result", (e)=>{
    let transcript = [e.results]
    .map((result)=> result[0])
    .map((result) => result.transcript)
    .join("");
    search.value = transcript;
    if(e.results[0].isFinal)
    {
        p = document.createElement('p');
        p.innerHTML = transcript;
        let searchText = transcript;
        SearchMovie(searchText);
    }
    
});
    recognition.start(); 
});

function SearchMovie(searchText)
{
    const imdbApi =`http://www.omdbapi.com/?s=${searchText}&apikey=4ef19dab`;
    window
    .fetch(imdbApi)
    .then((data) => {
        data
        .json()
        .then((movieData) => {
            let movies = movieData.Search;
            let output = [];
            for(let movie of movies)
            {
                let defaultTag = 
                movie.Poster === "N/A"?"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTWAFqXrJQ-ZGNDEA0AVJXXF2p55MWpuHRujST0xH9qFjiFNpln&usqp=CAU":movie.Poster;

                output += `<div>
                <img src="${defaultTag}" />
                <h1>${movie.Title}</h1>
                <p>${movie.Year}</p>
                <a href="http://www.omdbapi.com/?i=${movie.imdbID}&apikey=4ef19dab" target="_blank" >Movie Details</a>
                </div>
                `;
            }
           
            document.getElementById("template").innerHTML = output;
        }).catch((err)=> console.log(err));
    }).catch((err)=>console.log(err));
}