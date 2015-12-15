/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

var topCount = 20;

var topSlowModules = JSON.parse(localStorage.getItem('topSlowModules')) || {};

var addItem = function (item) {
  if (typeof topSlowModules[item['Path']] != "object") {
    item.count = 1;
    topSlowModules[item['Path']] = item;
  } else {
    topSlowModules[item['Path']].count++;
    topSlowModules[item['Path']]['Gen. Time'] += item['Gen. Time'];
  }
  // keep top #topCount nbr of item find slowest top 20 value
  var count = 0;
  var tab = [];
  for (var i in topSlowModules) {
    tab.push(topSlowModules[i]['Gen. Time']);
  }
  // top #topCount times
  tab = tab.sort(function(a,b){return b-a;}).slice(0,topCount);
  var threshold = tab.pop() || 0.0;
  var newTopSlowModules = []
  for (var i in topSlowModules) {
    if(topSlowModules[i]['Gen. Time'] >= threshold) {
      newTopSlowModules.push(topSlowModules[i]);
    }
  }
  // store it
  localStorage.setItem('topSlowModules', JSON.stringify(newTopSlowModules));
}

var render = function () {
  // display top 20 slow modules
  displaySlowModules = JSON.parse(localStorage.getItem('topSlowModules'));
  var list = [];
  for(var i in displaySlowModules){
    list.push('<li>'+displaySlowModules[i]['Path']+' --> '+displaySlowModules[i]['Gen. Time']+'</li>');
  }
  var $div = $('<div>').attr('style','position: fixed; bottom: 0px; right: 0px; z-index: 9999; background: rgba(255,255,255,0.7); color: black').attr('id','js-slow-modules-scratchpad');
  $div.html('<ul>           <li><button class="js-slow-modules-button js-slow-modules-button-start-recording">[START RECORDING]</button></li>           <li><button class="js-slow-modules-button js-slow-modules-button-stop-recording">[STOP RECORDING]</button></li>          <li><button class="js-slow-modules-button js-slow-modules-button-reset">[RESET]</button></li>  <li><button class="js-slow-modules-button js-slow-modules-button-run">[RUN]</button></li></ul>          <ul>'+list.join("\n")+'</ul>');

  if( $('#js-slow-modules-scratchpad').length>0 ) {
    $('#js-slow-modules-scratchpad').html($div);
  } else {
    $('body').append($div);
  }
};


var topSlowModulesStatus = 'off';
$('body').on('click',function(e){
  if( $(e.target).hasClass('js-slow-modules-button') ) {
    if ( $(e.target).hasClass('js-slow-modules-button-start-recording') ) {
      localStorage.setItem('topSlowModulesStatus','on');
      topSlowModulesStatus = 'on';
    }
    if ( $(e.target).hasClass('js-slow-modules-button-stop-recording') ) {
      localStorage.setItem('topSlowModulesStatus','off');
      topSlowModulesStatus = 'off';
    }
    if ( $(e.target).hasClass('js-slow-modules-button-reset') ) {
      topSlowModules = {};
      localStorage.setItem('topSlowModules', JSON.stringify(topSlowModules)) ;
    }
    if ( $(e.target).hasClass('js-slow-modules-button-run') ) {
      var count = 0;
      for(var i in slowModules) {
        addItem(slowModules[i]);
        count++;
        if(count >= topCount) break;
      }
      render();
    }
  }
});


render();
