
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
    '/Scripts/app/cantante.js',
    '/Content/css/app/style.css'
   
  ];
  let files_inmutables = [
 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
  ];
  const static_cache=caches.open(_staticCache).then(cache => {
    return cache.addAll(files_appshell);
  }).catch(error => {
    console.log(error);
  });
  const static_inmutable=caches.open(_inmutableCahe).then(cache => {
    return cache.addAll(files_inmutables);
  }).catch(error => {
    console.log(error);
  });
eventinstall.waitUntil(
Promise.allSettled([static_cache,static_inmutable])
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

// const res = caches.match(event.request)
// .then((param) => {
//   return param ? param : fetch(event.request).then(fetchResponse=>{
//     caches.open(_dynamicCache).then(cache=>{
//       cache.put(event.request,fetchResponse.clone());
//        return fetchResponse;
//     })
//   });
// })
// .catch((error) => {
//   console.log(error); 
// });
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