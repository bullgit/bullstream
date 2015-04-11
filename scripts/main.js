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
  get: 'tagged',
  tagName: 'bullgit',
  clientId: 'cb4424efd8974c4589c449a7d80a20c5',
  resolution: 'low_resolution',
  template: '<a href="{{link}}" class="img"><img src="{{image}}" class="image tada" /></a>'
});

$(window).load(function() {
  feed.run();
  removeModal();
});
