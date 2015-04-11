/*------------------------
*
* the Storedatas function accepts
* two functions : $key & $value
*
* to determine if the user already visited the page
* we'll use the `wasHere` key with a boolean value 
* 
------------------------*/
function storeDatas($key, $value){
  localStorage.setItem($key, $value);  
}

function alreadyVisited(){
  if (localStorage.wasHere === "true" && localStorage.modalGone === "true") {
   $('.container').addClass('step-2');
   $('.container__content').addClass('remove');
 }
 else{

 }
}

function removeModal(){
  $('#toggleModale').on('click', function(e){
    e.preventDefault()
    $('.container').addClass('step-2');
    $('.container__content').addClass('remove');
    storeDatas('modalGone', true)
  })
}


var feed = new Instafeed({
  get: 'user',
  userId: 1267128720,
  accessToken: '1267128720.467ede5.3b71227b5f3b4986b1682c8b1d2b40de',
  resolution: 'low_resolution',
  template: '<a href="{{link}}" class="img tada" target="_blank"><img src="{{image}}" class="image tada" /></a>'
});

$(window).load(function() {
  feed.run();
  removeModal();
  storeDatas('wasHere', true);
  alreadyVisited();
});
