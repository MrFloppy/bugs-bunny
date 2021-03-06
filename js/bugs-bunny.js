/**
 * Author: MaximilianSohrt
 * Date: 23.04.13
 * Time: 14:08
 */

//Create a new attribute for the navigator object
navigator.sayswho= (function(){
  var N= navigator.appName, ua= navigator.userAgent, tem;
  var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
  M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
  return M;
})();

var bugsBunny  = (function(){

  var
    container,
    viewportHeight,
    viewportWidth,
    viewportHeight = $(window).height(),
    viewportWidth = $(window).width(),
    offsetVertical = 350,
    offsetHorizontal = 350,
    browser,
    time,
    browserOS,
    clientIP
    ;

  /**
   * Defines inital position of window
   * @param $elem The element to be positioned
   */
  function placeWindow($elem) {
    $elem.css("top", viewportHeight - offsetVertical);
    $elem.css("left", viewportWidth  - offsetHorizontal);
  };

  /**
   * Get the browser info from the new attribute
   */
  function getBrowser() {
    browser = navigator.sayswho || "undefined";
  };

  /**
   * Get the current time (in german format atm)
   */
  function getCurrentTime() {
    var currentTimestamp = new Date();
    time =
      currentTimestamp.getDate() + "."
      + (currentTimestamp.getMonth()+1) + "."
      + currentTimestamp.getFullYear() + "-"
      + currentTimestamp.getHours() + ":"
      + currentTimestamp.getMinutes();
  }

  /**
   * Get the client IP through a remote website
   * The client IP is written into the container here
   * to wait the request to finish
   */
  function getClientIP() {
    $.getJSON('http://api.hostip.info/get_json.php', null,
      function(data){
        clientIP = data.ip || "undefined";
        $("#handle").after("<b>Client IP: </b>" + clientIP + "<br>");
      });
  };

  /**
   * Get the operating system of the client
   */
  function getClientOS() {
    browserOS = navigator.platform || "undefined";
  };

  /**
   * Write all the information to the container
   */
  function writeInfo() {
    container.append("<b>Browser: </b>" + browser + "<br>");
    container.append("<b>OS: </b>" + browserOS + "<br>");
    container.append("<b>Date: </b>" + time + "<br>");
  };

  /**
   * A classical init function
   */
  function init() {
    //Define the target container here
    container = $("#bugsBunny");

    placeWindow(container);
    getBrowser();
    getClientIP();
    getClientOS();
    getCurrentTime();
    writeInfo();

    //Make the container draggable
    container.draggable({
      handle: "p"
    });

    //And make it resizable
    container.resizable({
      minHeight: 50,
      minWidth: 50
    });
  };

  return {
    init:init
  }

})();

$(window).load(function(){
  bugsBunny.init();
});