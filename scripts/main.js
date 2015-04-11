// Hierachical Animations
/**
* Created by Kupletsky Sergey on 16.09.14.
*
* Hierarchical timing
* Add specific delay for CSS3-transition to elements.
*/

function removeModal(){
  $('#toggleModale').on('click', function(e){
    e.preventDefault()
    $('.container').addClass('step-2');
    $('.container__content').addClass('remove')
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
});
