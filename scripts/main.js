// Hierachical Animations
/**
* Created by Kupletsky Sergey on 16.09.14.
*
* Hierarchical timing
* Add specific delay for CSS3-transition to elements.
*/
function hierarchy(){

  setTimeout(function(){
    var speed = 900;
    var container =  $('#instafeed a');  
    container.each(function() {   
      var elements = $(this).children();
      elements.each(function() {      
        var elementOffset = $(this).offset(); 
        var offset = elementOffset.left*0.8 + elementOffset.top;
        var delay = parseFloat(offset/speed).toFixed(2);
        $(this)
        .css("-webkit-transition-delay", delay+'s')
        .css("-o-transition-delay", delay+'s')
        .css("transition-delay", delay+'s')
        .addClass('image');
      });
    });
  }, 500)
}



var feed = new Instafeed({
  get: 'tagged',
  tagName: 'bullgit',
  clientId: 'cb4424efd8974c4589c449a7d80a20c5',
  resolution: 'low_resolution',
  template: '<a href="{{link}}" class="img"><img src="{{image}}" /></a>'
});
feed.run();


$(document).ready(function(){
  hierarchy()
})