/**
 * Created with JetBrains PhpStorm.
 * User: MaximilianSohrt
 * Date: 23.04.13
 * Time: 14:08
 * To change this template use File | Settings | File Templates.
 *
 * http://help.dottoro.com/ljwupxoh.php
 */
var bugsBunny  = (function(){

  var
    container,
    browserVersion
    ;

  function getBrowserInfo() {
    browserVersion = navigator.userAgent;
  };

  function writeInfo() {
    console.log(browserVersion);
    container.append(browserVersion);
  };

  function init() {
    container = $("#bugsBunny");
    getBrowserInfo();
    writeInfo();
    console.log(container);
    container.draggable({handle: "p" });
    container.resizable({});
  };

  return {
    init:init
  }

})();

$(document).ready(function(){
  bugsBunny.init();
});