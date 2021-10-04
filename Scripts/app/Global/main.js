var Main={
Init: function() {
Main.addSw();
},
addSw: function(){
    navigator.serviceWorker.register("/sw.js").then((r)=>{
        console.log("data then =>"+r);
    }).catch((err)=>{
        console.log("data error =>"+err);
    })

}
}
 window.addEventListener("load", function() {
    Main.Init();
})