let newServiceWorker;
var Main={
Init: function() {
Main.addSw();
Main.addEvents();
},
addEvents:function(){

document.getElementById('btn-update').addEventListener('click',()=>{
newServiceWorker.postMessage({action:'skipWaiting'});
window.location.reload();
});

},
addSw: function(){
    navigator.serviceWorker.register("/sw.js").then((registration)=>{
        registration.addEventListener('updatefound',()=>{
            newServiceWorker=registration.installing;
            newServiceWorker.addEventListener('statechange', ()=>{
                //if , switch
                switch(newServiceWorker.state){
                    case 'installed':
                        //lanzar snackbar
                        Main.ShowSanckBar();
                        break;
                        default:
                            console.log('Unknown');
                        break;
                }
            })
    })
}).catch((err)=>{
        console.log("data error =>"+err);
    })

},
ShowSanckBar: function(){
    var  x= document.getElementById('snackbar');
    x.className='show';
},
HideSanckBar: function(){
    var  x= document.getElementById('snackbar');
    x.className = x.className.replace("show", "");
}
}
 window.addEventListener("load", function() {
    Main.Init();
})