/*jslint node: true */
// wallpaperify.js
// ===============
// 
// Organize wallpaper transistions of picture in a directory (current if unspecified) and generate an xml transition file for ubuntu wallpaper
// 
// command line
// ------------
// ./wallpaperify.js <dirname> <-r> filename
// parameters
// ----------
// * **dirname**: a folder name, if ommited takes the current directory
// * **--recusrive(-r)**: takes the subfolders (by default work only in the current folder)
// * **filename**: the filename that will be used to store the wallpaper transition xml 
'use strict';

var glob = require("glob");
var fs = require('fs');

// general script options
var options = {
  directory: '.', // by default works in the current directory
  recusrive: false, // by default don't go recursively
  filename: null
};

var xml = {
  head: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE wallpapers SYSTEM \"gnome-wp-list.dtd\">\n<wallpapers>\n",
  body: "",
  options: "<wallpaper><name>{{name}}</name><filename>{{filename}}</filename><options>{{options}}</options><pcolor>{{pcolor}}</pcolor><scolor>{{scolor}}</scolor><shade_type>{{shadetype}}</shade_type></wallpaper>",
  starttime: "<starttime><year>2012</year><month>01</month><day>01</day><hour>00</hour><minute>00</minute><second>00</second></starttime>",
  item: "",
  end: "</wallpapers>"
};



var getopt = require('node-getopt').create(
  [
    ['r', 'recursive', 'search recursively for files'],
    ['h', 'help', 'wallpaperify help']
  ]).bindHelp().parseSystem();

if (getopt.argv.length >= 1) {
  if (getopt.argv.length > 1) {
    options.directory = getopt.argv[0];
    options.filename = getopt.argv[1];
  } else {
    options.filename = getopt.argv[0];
  }
}