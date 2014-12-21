'use strict'

import {Application} from './js/app';

myApp = new Application();
myApp.test();
myApp.setCanvas(document.querySelector('.main-display'));
myApp.webGLStart();