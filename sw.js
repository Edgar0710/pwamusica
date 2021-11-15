
const _staticCache='staticCache@v2';//Save local data
const _dynamicCache='dynamicCache@v1.2';//Save files that not contempled for the user
const _inmutableCahe='inmutableCahe@v1';//Save data that  never change
self.addEventListener('install', function (eventinstall) {

  let files_appshell = [
    "/",
    '/index.html',
    '/Content/css/app/style.css',
    '/Content/css/vendors/bootstrap.css',
    '/Content/Images/avatar.jpg',
    '/Content/Images/not-connection.jpg',
    '/Content/Images/not-founf.png'
  
  ];

  const static_cache=caches.open(_staticCache).then(cache => {
    return cache.addAll(files_appshell);
  }).catch(error => {
    console.log(error);
  });
 
eventinstall.waitUntil(
Promise.all([static_cache])
);
});



self.addEventListener('activate', event=>{

  event.waitUntil(
      caches.keys().then(cachesList=>Promise.all(
          cachesList.map(cacheName=>{
              if(_staticCache!=(cacheName)){
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


