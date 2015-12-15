/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

var media = $('.www-media').find('iframe').attr('src');
debugData = [];
debugData.push(media);
var analytics = ga.getAll()[0].b.data.values;
debugData.push(analytics[':trackingId']);
debugData.push(pp_gemius_identifier);
debugData.push(pp_gemius_extraparameters);
if (typeof gemiusMetaData == 'object') {
  for(key in gemiusMetaData) {
   debugData.push("GemiusMetaData: "+key+": "+gemiusMetaData[key]);    
  }
}
if (statChannel) { debugData.push("statChannel: "+statChannel); }
if (statCategoryFullKey) { debugData.push("statCategoryFullKey: "+statCategoryFullKey); }
if (statProgramFullKey) { debugData.push("statProgramFullKey: "+statProgramFullKey); }
if (statRequestedModule) { debugData.push("statRequestedModule: "+statRequestedModule); }

if( $('#debugConsoleDiv').length <= 0 ) {
  $div = $('<div>').attr('style','font-size: large; position: fixed; bottom: 0px; left: 0px; min-height: 50px; min-width: 50px; color: black; border: 1px dashed black; background: red none repeat scroll 0% 0%; z-index: 10000; padding: 5px').attr('id','debugConsoleDiv');
} else {
  $div = $('#debugConsoleDiv');
}

$div.html('<ul><li>'+debugData.join('</li><li>')+'</li></ul>');
$('body').append($div);