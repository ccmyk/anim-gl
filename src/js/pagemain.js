import { create, createComps, cleanP, cleanWysi } from './create.js';
import { startComps, stopComps } from './comps.js';
import { onResize, resizeLimit, onScroll, onTouchDown, onTouchMove, onTouchUp, onWheel } from './events.js';
import { buildThresholdList, checkIo, callIos, createIos, newIos, iOpage, iO, inViewAddClass, showIos } from './ios.js';
import {
  timeout,
  loadAppData,
  loadImage,
  loadImages,
  newImages,
  loadVideos,
  newVideos,
  loadVideo,
  scaleLoads,
} from './loads.js';
import { stopScroll, startScroll, animIosScroll } from './scroll.js';
import { getReady, show, animIntro, animOut, start, hide } from './showhide.js';

class Page {
  constructor(main) {
    this.content = document.querySelector('#content');
    this.main = main;
    this.speed = 0;
    this.isVisible = 0;
    this.isScrollable = 1;
    this.firstload = 1;

    this.font = parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  update(speed, posy) {
    if (this.isVisible == 0) {
      return false;
    }

    this.speed = speed;

    for (let c of this.updaters) {
      this.ios[c].class.update(this.speed, posy);
    }
  }
}

Page.prototype.create = create;
Page.prototype.createComps = createComps;
Page.prototype.cleanP = cleanP;
Page.prototype.cleanWysi = cleanWysi;
Page.prototype.startComps = startComps;
Page.prototype.stopComps = stopComps;
Page.prototype.onResize = onResize;
Page.prototype.resizeLimit = resizeLimit;
Page.prototype.onScroll = onScroll;
Page.prototype.onTouchDown = onTouchDown;
Page.prototype.onTouchMove = onTouchMove;
Page.prototype.onTouchUp = onTouchUp;
Page.prototype.onWheel = onWheel;
Page.prototype.buildThresholdList = buildThresholdList;
Page.prototype.checkIo = checkIo;
Page.prototype.callIos = callIos;
Page.prototype.createIos = createIos;
Page.prototype.newIos = newIos;
Page.prototype.iOpage = iOpage;
Page.prototype.iO = iO;
Page.prototype.inViewAddClass = inViewAddClass;
Page.prototype.showIos = showIos;
Page.prototype.timeout = timeout;
Page.prototype.loadAppData = loadAppData;
Page.prototype.loadImage = loadImage;
Page.prototype.loadImages = loadImages;
Page.prototype.newImages = newImages;
Page.prototype.loadVideos = loadVideos;
Page.prototype.newVideos = newVideos;
Page.prototype.loadVideo = loadVideo;
Page.prototype.scaleLoads = scaleLoads;

Page.prototype.stopScroll = stopScroll;
Page.prototype.startScroll = startScroll;
Page.prototype.animIosScroll = animIosScroll;
Page.prototype.getReady = getReady;
Page.prototype.show = show;
Page.prototype.animIntro = animIntro;
Page.prototype.animOut = animOut;
Page.prototype.start = start;
Page.prototype.hide = hide;

export default Page;
