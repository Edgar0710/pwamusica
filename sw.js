
const _staticCache='staticCache@v2';//Save local data
const _dynamicCache='dynamicCache@v1.2';//Save files that not contempled for the user
const _inmutableCahe='inmutableCahe@v1';//Save data that  never change
self.addEventListener('install', function (eventinstall) {

  let files_appshell = [
    "/",
    '/index.html',
    '/Content/css/vendors/bootstrap.css',
    '/Content/Images/avatar.jpg',
    '/Content/Images/not-connection.jpg',
    '/Content/Images/not-founf.png',
    '/Content/css/app/style.css'
  ];

  const static_cache=caches.open(_staticCache).then(cache => {
    return cache.addAll(files_appshell);
  }).catch(error => {
    console.log(error);
  });
 
eventinstall.waitUntil(
Promise.allSettled([static_cache])
);
});

if (!(navigator.onLine)) {
  goOnline();
}

self.addEventListener('online', function () {
  goOnline();
});

self.addEventListener('offline', function () {
  goOnline();
});

self.addEventListener('activate', event=>{

  event.waitUntil(
      caches.keys().then(cachesList=>Promise.all(
          cachesList.map(cacheName=>{
              if(_staticCache!=(cacheName)&&cacheName!=_inmutableCahe){
                  return caches.delete(cacheName);
              }
          })
      )).then(()=>{
          console.log('eleminados')
      })
  )
 
})




self.addEventListener('fetch', (event) => {


const res = caches.match(event.request)
 .then((param) => {
   return param ? param : fetch(event.request);
 })
 .catch((error) => {
   console.log(error); 
 });

event.respondWith(res);
});
function goOnline() {
  self.location.reload();
}
function goOffline() {
  document.getElementById("list_song").innerHTML = `   <div class="col text-center" style="padding: 90px 0px;">
  <div style="font-size: 100px;">
     <img src="Content/Images/not-connection.png" class="img-responsive" alt="not-foud">
  </div>
      <div class=""><h4 class="card-title mb-1">Ups... Lo sentimos no tienes conexión a internet.</h4></div>
   </div>`;
}

self.addEventListener('message',object=>{
  switch(object.data.action){
    case 'skipWaiting':
    self.skipWaiting();
    break;
    case '':
      break;
    default:
      console.log("Erro")
      break;
  }
})



function handleError() {
  console.log('error');
}