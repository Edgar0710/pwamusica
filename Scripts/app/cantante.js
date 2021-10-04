var Cantante={
Init:function(){
   console.log(''); 
Cantante.GetCanciones();
},
GetCanciones:function(){
    let container= document.getElementById("list_song");
    container.innerHTML='';
    let songs=``;
    fetch("https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=40286729&locale=en-US", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "shazam.p.rapidapi.com",
            "x-rapidapi-key": "be4160757fmshb0b309d2091a31ap1e4834jsn80e5bd377bb2"
        }
    })
    .then(response => response.json()).then(response => {
        if(response){
          
            
             response.tracks.forEach(track => {
                 songs+=`  <div class="col-12 col-md-6 col-xl-4 mt-2">
                 <div class="card h-100" >
                     <img class="card-img-top " src="${track.images.background}" alt="Porta">
                     <div class="card-body">
                         <h6 class="">${track.title}</h6>
                         <p class="text-bolder">${track.subtitle}</p>
                         <a type="button" class="btn btn-outline-primary btn-block" href="${track.url}">Escuchar Ahora</a>
                      </div>
                   </div>
                 </div>`;
               
                
             })
             container.innerHTML=songs;
        }else{
            container.innerHTML=`   <div class="col text-center" style="padding: 90px 0px;">
            <div style="font-size: 100px;">
               <img src="Content/Images/not-founf.png" class="img-responsive" alt="not-foud">
            </div>
                <div class=""><h4 class="card-title mb-1">Ups... no se encontro ninguna canción.</h4></div>
             </div>`;
          console.log("nno data");
        }
     })
    .catch(err => {
        container.innerHTML=`<div class="col text-center" style="padding: 90px 0px;">
        <div style="font-size: 100px;">
           <img src="Content/Images/not-founf.png" class="img-responsive" alt="not-foud">
        </div>
            <div class=""><h4 class="card-title mb-1">Ups... no se encontro ninguna canción.</h4></div>
         </div>`;
        console.error(err);
    });
}

}

window.addEventListener("load", function() {
Cantante.Init();
})