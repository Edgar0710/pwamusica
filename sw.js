self.addEventListener('install', function(event) {
  let nameCache = "appCache";
let files=[
'/index.html',
'/Content/css/vendors/bootstrap.css',
'/Content/Images/avatar.jpg',
'/Content/Images/not-connection.jpg'
];
caches.open(nameCache).then(cache =>{
return cache.addAll(files);
}).catch(error =>{
    console.log(error);
})

});

if(!(navigator.onLine)) {
  goOnline();
  }

self.addEventListener('online', function(){
  goOnline();
  });
  
  self.addEventListener('offline',function(){
  goOnline();
  });
  

  



self.addEventListener('fetch', function(event) {
event.respondWith(caches.match(event.request).then((param)=> {
if(param)return param;
return fetch(event.request);
}));
});



function goOnline() {
  self.location.reload();
}
function goOffline() {
  document.getElementById("list_song").innerHTML=`   <div class="col text-center" style="padding: 90px 0px;">
  <div style="font-size: 100px;">
     <img src="Content/Images/not-connection.png" class="img-responsive" alt="not-foud">
  </div>
      <div class=""><h4 class="card-title mb-1">Ups... Lo sentimos no tienes conexión a internet.</h4></div>
   </div>`;
}