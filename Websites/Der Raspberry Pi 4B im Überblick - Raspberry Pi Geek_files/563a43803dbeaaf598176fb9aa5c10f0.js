if (typeof JwTplJsLib === "undefined") {var JwTplJsLib = (function(){ return { ready : function(fn){} }})();}
if (typeof JwTplJsLib_563a43803dbeaaf598176fb9aa5c10f0 === "undefined") {
function JwTplJsLib_563a43803dbeaaf598176fb9aa5c10f0() {
var pageInfoJsonVarName = 'jwTplJsLibPageInfoJson_563a43803dbeaaf598176fb9aa5c10f0';
var myBaseHash = '563a43803dbeaaf598176fb9aa5c10f0';
if (typeof JwTplJsLib == "object") { var _api = JwTplJsLib; _api.initLibs(); } else { var _api = false; }
this._globalJsApi = function() { return _api; }
if (_api.getAppInfo('spuch') === '' && typeof JwTplJsLibPartnerConfig == "object") {
var _cfgPartner = JwTplJsLibPartnerConfig.getCfg();
JwTplJsLibPartnerConfig = false;
} else if (_api.getAppInfo('spuch') !== '' && typeof JwTplJsLibPartnerConfig == "object"){
var _cfgPartner = new Map();
JwTplJsLibPartnerConfig = false;
} else {
var _cfgPartner = new Map();
}
var _cfgGlobal = new Map();
this._globalSetCfg = function(key, value) {
if(_api.isStringRaw(key) === false) {
return false;
}
_cfgGlobal.set('global.' + _api.trim(key.toLowerCase()), value);
return true;
}
var _globalSetCfgIntern = function(key, value) {
if(_api.isStringRaw(key) === false) {
return false;
}
_cfgGlobal.set(key.toLowerCase(), value);
return true;
}
this._globalGetCfg = function(key, defaultValue = -1, forceGlobal = false) {
if(_api.getAppInfo('spuch') !== '') {
_api.printErrorMsg("._globalGetCfg((key, defaultValue = -1, forceGlobal = false) - spuch active fatal error");
return false;
}
if(_cfgPartner.has(key) && forceGlobal === false) {
return _cfgPartner.get(key);
} else if(_cfgGlobal.has(key) === true) {
return _cfgGlobal.get(key);
} else {
return defaultValue !== -1 ? defaultValue : false;
}
}
isFirefox = typeof InstallTrigger !== 'undefined';
isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
isAndroid = navigator.userAgent.match(/Android/i) != null;
var isDevelop = document.location.search.match(/js_develop/);
ajaxLoader = 'api/img/ajax-loader.gif';
urlString = '';
var dntServerStatus = false;
var dntServerStatusCacheStatus = '_false';
var dntServerStatusIsSet = false;
var dntCookieStatusIsSet = false;
var dntCookieName = '';
var dntCookieValue = '';
var dntCookieValueMode = '';
var dntCookieValueAcceptCookieDisclaimer = '';
var dntCookieCacheModified = '_false';
var isCachedContent = '_false';
var jsonConfigAsString = '';
var jsonConfig = '';
jsonModArray = [];
var ajaxPathJoma = 'ajax/0d99df6523d9940528a486c895254ef3/get';
var device = '';
var browser = '';
var deviceArray = [ 'android', 'blackberry', 'iphone', 'ipad', 'ipod', 'opera mini', 'iemobile', 'windowsphone', 'windows', 'chromebook', 'mac', 'ubuntu', 'linux' ];
userAgentDeviceArray = [ 'Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'IEMobile', 'Windows', 'X11', 'Macintosh', 'Ubuntu', 'Linux' ];
var ams = false;
var configStorage = {"global":{}, "app":{}, "mod": {}};
var placeholderMobile = true;
var liquidAdStorageName = 'liquidAd';
var dsImLock = false;
var dsUrl = '#';
var imUrl = '#';
var appGuiTagAk = '';
this._globalGetPath = function() {
return urlString;
}
this._globalWhatAppAmI = function() {
if (typeof _globalInitAppJm === "function" && typeof _globalInitAppTs !== "function") {
return 'jobmarket';
} else if(typeof _globalInitAppTs === "function" && typeof _globalInitAppJm !== "function"){
return 'teaser';
} else {
return '';
}
}
this._globalJsPfa = function() {
}
this._globalAms = function() {
ams = true;
}
var _globalGetAms = function() {
return ams;
}
this._globalSetDsIm = function(ds, im){
if (dsImLock === false) {
if ((typeof ds === 'string') && (ds != '')) {
dsUrl = ds;
}
if ((typeof im === 'string') && (im != '')) {
imUrl = im;
}
dsImLock = true;
}
}
this._globalGetDntStatus = function() {
if (dntServerStatusCacheStatus === isCachedContent) {
return (_globalGetClientDntStatus() || _globalGetServerDntStatus());
} else {
return _globalGetClientDntStatus();
}
}
this._globalCheckCookieConsent = function(){
var consent = _api.getCookie("jwconsent");
var frame = document.querySelector('.jwdrf-frame-inner');
if (frame === null) {
_api.printErrorMsg(" Message -> _globalCookieConsent deactivated");
return true;
}
if (consent === "") {
return false;
}
return true;
}
var _globalGetClientDntStatus = function() {
var dnt = (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack);
if ((dnt === '1') || (dnt === 'yes')) {
return true;
}
if(_globalGetDntCookieStatus() === true){
return true;
}
return false;
}
var _globalGetDntCookieStatus = function() {
if ((dntCookieName != '') && (dntCookieValue === '')) {
if (_globalIsCookie(dntCookieName) === true) {
return true;
}
} else if ((dntCookieName != '') && (dntCookieValue != '')) {
var value = _globalGetCookie2(dntCookieName);
if (value != '') {
if (dntCookieValueMode == 'equal') {
if (value == dntCookieValue) {
return true;
}
} else if (dntCookieValueMode == 'instr') {
if (value.indexOf(dntCookieValue) != -1) {
return true;
}
}
}
}
return false;
}
var _globalGetDntCookieDisclaimerAcceptStatus = function() {
if ((dntCookieName != '') && (dntCookieValueAcceptCookieDisclaimer === '')) {
return true;
} else if ((dntCookieName != '') && (dntCookieValueAcceptCookieDisclaimer != '')) {
var value = _globalGetCookie2(dntCookieName);
if (value == dntCookieValueAcceptCookieDisclaimer) {
return true;
}
}
return false;
}
var _globalSetDntCookie = function() {
if (dntCookieName != '') {
var date = new Date();
date.setTime(date.getTime() + (30*24*60*60*1000));
document.cookie = dntCookieName + '=' + (dntCookieValue != '' ? encodeURIComponent(dntCookieValue) : '') + '; expires=' + date.toUTCString();
}
}
var _globalSetDntCookieAcceptCookieDisclaimer = function() {
if ((dntCookieName != '') && (dntCookieValueAcceptCookieDisclaimer != '')) {
var date = new Date();
date.setTime(date.getTime() + (30*24*60*60*1000));
document.cookie = dntCookieName + '=' + encodeURIComponent(dntCookieValueAcceptCookieDisclaimer) + '; expires=' + date.toUTCString();
}
}
var _globalGetServerDntStatus = function() {
return dntServerStatus;
}
this._global52e7f70f8809431c39b35a29a01a68aa = function (cookieName, cookieValue, cookieValueMode, cookieValueAcceptCookieDisclaimer) {
if (dntCookieStatusIsSet === false) {
if ((typeof cookieName === 'string') && (cookieName != '')) {
dntCookieName = cookieName;
if (((typeof cookieValue === 'string') && (cookieValue != '')) || (typeof cookieValue === 'number')) {
dntCookieValue = cookieValue;
if ((typeof cookieValueMode === 'string') && ((cookieValueMode == 'equal') || (cookieValueMode == 'instr'))) {
dntCookieValueMode = cookieValueMode;
}
}
if (((typeof cookieValueAcceptCookieDisclaimer === 'string') && (cookieValueAcceptCookieDisclaimer != '')) || (typeof cookieValueAcceptCookieDisclaimer === 'number')) {
dntCookieValueAcceptCookieDisclaimer = cookieValueAcceptCookieDisclaimer;
}
}
dntCookieStatusIsSet = true;
}
}
this._global8f195da3094ba233e975ee1e3733db2b = function(status, cacheStatus) {
if (dntServerStatusIsSet === false) {
if ((typeof status === 'string') && ((status === '_false') || (status === '_true'))) {
if (status === '_true') {
dntServerStatus = true;
} else if (status === '_false') {
dntServerStatus = false;
}
if ((typeof cacheStatus === 'string') && ((cacheStatus === '_false') || (cacheStatus === '_true'))) {
dntServerStatusCacheStatus = cacheStatus;
}
}
dntServerStatusIsSet = true;
}
}
this._global8c238ba3be266daa6105c2e432332799 = function(status) {
if ((typeof jsonConfig === 'string') && ((jsonConfig === '_false') || (jsonConfig === '_true'))) {
isCachecContent = status;
}
}
var _globalGetIsCachedContent = function() {
return isCachecContent;
}
this._globalGetJwTplJsLib = function() {
return _api;
}
this._globalAddJsonConfig = function(json) {
if ((typeof jsonConfig === 'string') && (jsonConfig === '')) {
if ((typeof json === 'string') && (json.substr(0, 1) === '{') && (json.substr(-1, 1) === '}')) {
if ((typeof jsonConfigAsString === 'string') && (jsonConfigAsString === '')) {
jsonConfigAsString = '{' + '\n';
} else {
jsonConfigAsString = jsonConfigAsString + ',' + '\n';
}
var modTags = json.match(/{"([0-9])+":.*"api":[ ]?"([a-z-]*)\|([0-9]+)\|([jwtpl-sys-]?[a-z0-9]*)"/);
if (modTags != null) {
if (typeof (jsonModArray[modTags[2]]) == 'undefined') {
jsonModArray[modTags[2]] = modTags[1];
} else {
jsonModArray[modTags[2]] = jsonModArray[modTags[2]] + ',' + modTags[1];
}
}
jsonConfigAsString = jsonConfigAsString + json.substr(1, (json.length - 2));
}
}
}
var _globalGetJsonConfig = function() {
if ((typeof jsonConfig === 'string') && (jsonConfig === '')) {
try {
jsonConfig = JSON.parse(_globalGetJsonConfigString());
} catch (e) {
jsonConfig = JSON.parse('{}');
}
}
return jsonConfig;
}
var _globalGetJsonConfigString = function() {
var matchingList = '';
for ( var i in jsonModArray) {
matchingList += '"' + i + '": "' + jsonModArray[i] + '",';
}
return '{' + matchingList + jsonConfigAsString.substr(1) + '\n}';
}
this._globalGetJsonConfigStringPublic = function() {
return _globalGetJsonConfigString();
}
var _globalGetJsonText = function(modKey, content, jsonVar) {
if(content == undefined) {
content = '';
}
var jsonComplete = _globalGetJsonConfig();
var jsonKeyText = content;
var jsonKey = '';
if ((typeof jsonComplete[modKey] != 'undefined') && (jsonComplete[modKey] != '')) {
jsonKey = jsonComplete[modKey];
if ((typeof jsonComplete[jsonKey] != 'undefined') && (jsonComplete[jsonKey] != '')) {
if ((typeof jsonComplete[jsonKey][jsonVar] != 'undefined') && (jsonComplete[jsonKey][jsonVar] != '')) {
jsonKeyText = jsonComplete[jsonKey][jsonVar];
}
}
}
return jsonKeyText;
}
var _globalIsBrowserIeOrEdge = function() {
var isIE = /* @cc_on!@ */false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
if((isIE === true )|| (isEdge === true)){
return true;
}
return false;
}
var _globalGetBaseHrefUrl = function() {
var baseHref = '';
var baseTag = document.querySelectorAll('base');
if(baseTag.length > 0){
if(typeof baseTag[0] !== 'undefined' && baseTag[0].hasAttribute('href') === true && baseTag[0].getAttribute('href').length > 0){
baseHref = baseTag[0].getAttribute('href');
}
}
return baseHref;
}
var _globalSetBaseHrefUrl = function(baseurl) {
var hasChanged = false;
if(typeof baseurl === 'string' && baseurl.length > 10){
if(baseurl.indexOf('http://') == 0 || baseurl.indexOf('https://') == 0 || baseurl.indexOf('//') == 0){
var baseTag = document.querySelectorAll('base');
if(baseTag.length > 0 && typeof baseTag[0] !== 'undefined'){
baseTag[0].setAttribute('href', baseurl);
hasChanged = true;
}
}
}
return hasChanged;
}
var _globalStartUpActivity = function() {
}
var _globalGetUrlParameter = function getUrlParameter(sParam) {
var sPageURL = decodeURIComponent(window.location.search.substring(1)), sURLVariables = sPageURL.split('&'), sParameterName, i;
for (i = 0; i < sURLVariables.length; i++) {
sParameterName = sURLVariables[i].split('=');
if (sParameterName[0] === sParam) {
return sParameterName[1] === undefined ? true : sParameterName[1];
}
}
};
var _globalGetHost = function() {
var hostname = document.location.hostname;
var localORLiveTest = 'live';
if (hostname == '127.0.0.1' || hostname == 'localhost') {
localORLiveTest = 'local';
}
if (hostname.match(/jw[-]{0,1}[^.]*\.hockenheim\.jw\.dir/) || hostname == 'jobware-local') {
localORLiveTest = 'local';
}
if (hostname.match(/\.a[dpti]\.sites\.jobware\.net/)) {
localORLiveTest = 'local';
}
return localORLiveTest;
}
var _globalIsMobile = function() {
if (isDevelop == true) {
var android = navigator.userAgent.match(/Android/i);
var blackBerry = navigator.userAgent.match(/BlackBerry/i);
var iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
var opera = navigator.userAgent.match(/Opera Mini/i);
var windowsPhone = navigator.userAgent.match(/IEMobile/i);
if (android != null || blackBerry != null || iOS != null || opera != null || windowsPhone != null) {
return true;
}
return false;
}
}
var _globalCheckUserAgent = function() {
if (isDevelop == true) {
var browserArray = [ 'opera', 'firefox', 'safari', 'ie', 'internetexplorer', 'edge', 'chrome' ];
var isDevice = false;
var isBrowser = false;
var testDevice = false;
var testBrowser = false;
for ( var arg = 0; arg < arguments.length; arg++) {
if (deviceArray.includes(arguments[arg].toLowerCase()) == true) {
testDevice = true;
_globalSetDevice(_globalDetectDevice(arguments[arg].toLowerCase()));
if (_globalGetDevice() == arguments[arg].toLowerCase()) {
isDevice = true;
}
}
if (browserArray.includes(arguments[arg].toLowerCase()) == true) {
testBrowser = true;
_globalSetBrowser(_globalDetectBrowser(arguments[arg].toLowerCase()));
if (_globalGetBrowser() == arguments[arg].toLowerCase()) {
isBrowser = true;
}
}
}
if (arguments.length == 2) {
if (isDevice && isBrowser) {
return true;
} else {
return false;
}
} else if (arguments.length == 1) {
if (testDevice = true) {
return isDevice;
} else if (testBrowser = true) {
return isBrowser;
} else {
return false;
}
} else if (arguments.length == 0) {
return false;
}
}
}
var _globalSetDevice = function(setDevice) {
if (isDevelop == true) {
if (setDevice.trim() != '') {
device = setDevice;
} else {
console.log('Wrong Device. Device detection.');
device = _globalDetectDevice('');
}
}
}
var _globalGetDevice = function() {
if (isDevelop == true) {
if (device.trim() == '') {
_globalSetDevice('');
}
return device;
}
}
var _globalSetBrowser = function(setBrowser) {
if (isDevelop == true) {
if (setBrowser.trim() != '') {
browser = setBrowser;
} else {
console.log('Wrong Browser. Browser detection.');
browser = _globalDetectBrowser('');
}
}
}
var _globalGetBrowser = function() {
if (isDevelop == true) {
return browser;
}
}
var _globalDetectDevice = function(detectDevice) {
if (isDevelop == true) {
if (detectDevice != '') {
var pos = deviceArray.indexOf(detectDevice.toLowerCase());
userAgentDeviceArray = [ userAgentDeviceArray[pos] ];
}
for ( var arrCount = 0; arrCount < userAgentDeviceArray.length; arrCount++) {
isDevice = '';
if (navigator.userAgent.match(userAgentDeviceArray[arrCount]) != null) {
_globalSetDevice(userAgentDeviceArray[arrCount]);
isDevice = true;
}
if (isDevice == true) {
return userAgentDeviceArray[arrCount];
}
}
return '';
}
}
var _globalDetectBrowser = function(detectBrowser) {
if (isDevelop == true) {
if (detectBrowser.trim() == '') {
var browserArray = [ 'opera', 'firefox', 'safari', 'internetexplorer', 'edge', 'chrome' ];
} else {
var browserArray = [ detectBrowser ];
}
for ( var arrCount = 0; arrCount < browserArray.length; arrCount++) {
isBrowser = '';
switch (browserArray[arrCount]) {
case 'opera':
isBrowser = (!!window.opr && !!opr.addons) || (!!window.opera) || (navigator.userAgent.indexOf(' OPR/')) || (navigator.userAgent.indexOf("Opera") != -1) >= 0;
break;
case 'firefox':
isBrowser = (typeof InstallTrigger !== 'undefined') || (navigator.userAgent.indexOf("Firefox") != -1);
break;
case 'safari':
isBrowser = (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) || (navigator.userAgent.indexOf("Safari") != -1);
break;
case 'internetExplorer':
isBrowser = (/* @cc_on!@ */false) || (!!document.documentMode) || (navigator.userAgent.indexOf("MSIE") != -1);
break;
case 'edge':
isBrowser = !((/* @cc_on!@ */false) || (!!document.documentMode)) && (!!window.StyleMedia) || (navigator.userAgent.indexOf("Edge") != -1);
break;
case 'chrome':
isBrowser = (!!window.chrome && !!window.chrome.webstore) || (navigator.userAgent.indexOf("Chrome") != -1);
break;
default:
isBrowser = false;
break;
}
if (isBrowser == true) {
return browserArray[arrCount];
}
}
return '';
}
}
var _globalSetUmlaut = function(isUmlaut, string) {
found = '';
if (string != '' && string != null) {
if (isUmlaut) {
found = string;
found = found.replace(/Ä/g, '&Auml;');
found = found.replace(/ä/g, '&auml;');
found = found.replace(/Ö/g, '&Ouml;');
found = found.replace(/ö/g, '&ouml;');
found = found.replace(/Ü/g, '&Uuml;');
found = found.replace(/ü/g, '&uuml;');
} else {
found = string;
found = found.replace(/&Auml;/g, 'Ä');
found = found.replace(/&auml;/g, 'ä');
found = found.replace(/&Ouml;/g, 'Ö');
found = found.replace(/&ouml;/g, 'ö');
found = found.replace(/&Uuml;/g, 'Ü');
found = found.replace(/&uuml;/g, 'ü');
}
}
return found;
}
var _globalFillPlaceholderInForm = function(objectForm) {
objectForm.each(function() {
var currentForm = jQuery(this);
var modName = "";
if (typeof objectForm[0] != 'undefined') {
modName = "-" + objectForm[0].className.split("-")[1];
}
if(placeholderMobile === true) {
var innerHeight = window.innerHeight;
var innerWidth = window.innerWidth;
var mobileSizeIndex;
if(innerHeight > innerWidth) {
mobileSizeIndex = innerWidth;
} else if(innerWidth > innerHeight) {
mobileSizeIndex = innerHeight;
}
}
var formInputs = jQuery("input[data-jwtpl" + modName + "-placeholder]", currentForm);
formInputs.each(function() {
var currentInput = jQuery(this);
var initValue = currentInput.attr("data-jwtpl" + modName + "-placeholder");
if(placeholderMobile === true) {
if((mobileSizeIndex < 481)) {
mobileInitValue = currentInput.attr("data-jwtpl" + modName + "-placeholdermobil");
if(mobileInitValue !== undefined) {
initValue = mobileInitValue;
}
}
}
var initValue2 = currentInput.attr("value");
currentInput.attr({
"placeholder" : currentInput.attr("")
});
if(placeholderMobile === true) {
if (initValue2 == "") {
currentInput.attr({
"value" : initValue
});
}
} else {
if (initValue2 == "") {
currentInput.attr({
"value" : currentInput.attr("data-jwtpl" + modName + "-placeholder")// initValue
});
}
}
var focusColor = objectForm.css('color');
var blurColor = currentInput.css('color');
var bgInputColor = currentInput.css('background-color');
var matchBgColor = bgInputColor.match(/rgb[a]?\(255,[ ]?255,[ ]?255[,0-9. ]*\)|#fff|white|initial/);
currentInput.bind("focus", function() {
activeEmailField = jQuery(this);
activeSearchField = jQuery(this);
if (objectForm[0].className.split("-")[1] == "sebo") {
seboFocus(initValue);
}
var _this = jQuery(this);
if (_this.val() == initValue) {
_this.val("");
_this.attr("placeholder", "");
}
if(matchBgColor == null || (matchBgColor !== null && matchBgColor.length == 0)) {
_this.css("color", focusColor);
}
});
currentInput.bind("blur", function() {
activeSearchField = jQuery(this);
var _this = jQuery(this);
if (_this.val() == "") {
_this.val(initValue);
_this.attr("placeholder", "");
_this.css("color", blurColor);
}
if (objectForm[0].className.split("-")[1] == "sebo") {
seboBlur(initValue);
}
});
});
currentForm.bind("submit", function(e) {
var _this = jQuery(this);
var inputs = jQuery("input[data-jwtpl" + modName + "-placeholder]", _this);
inputs.each(function() {
var _this = jQuery(this);
if((placeholderMobile === true) && (mobileSizeIndex < 481)) {
if (_this.val() == _this.attr("data-jwtpl" + modName + "-placeholdermobil"))
_this.val("");
} else {
if (_this.val() == _this.attr("data-jwtpl" + modName + "-placeholder"))
_this.val("");
}
});
});
});
}
var _globalFillInPlaceholderV2 = function(objectForm){
objectForm.forEach(function(elem) {
var currentForm = elem;
var modName = "";
if (elem.classList.length > 0 && elem.classList[0].split('-').length > 1) {
modName = "-" + objectForm[0].className.split("-")[1];
}
});
}
var _globalStringReplaceAt = function(string, index, char) {
return string.substr(0, index) + char + string.substr(index + 1);
}
var _globalIsCookieEnabled = function() {
return navigator.cookieEnabled;
}
var _globalIsCookieFull = function() {
if (document.cookie.length > 3780) {
return true
} else {
return false;
}
}
var _globalSetCookie = function(name, wert, expires, path) {
var arg_wert = _globalSetCookie.arguments;
var arg_laenge = _globalSetCookie.arguments.length;
wert = encodeURI(wert);
if (expires != null) {
wert += "; expires=" + expires.toGMTString()
}
if (path != "") {
wert += "; path=" + path;
}
if (_globalIsCookieFull() == false || (wert.length < document.cookie.length)) {
document.cookie = name + "=" + wert;
}
}
var _globalIsCookie = function(name) {
var gibZurueck;
var regex = new RegExp(name + "[^;]*");
if (document.cookie.match(regex)) {
gibZurueck = true;
} else {
gibZurueck = false;
}
return gibZurueck;
}
var _globalGetCookie = function(name) {
name += "=";
var laenge = name.length;
var indexCookieBegin = document.cookie.indexOf(name);
var indexCookieEnd = document.cookie.indexOf(';', indexCookieBegin);
if (indexCookieEnd == -1) {
indexCookieEnd = document.cookie.length;
}
var cookieValue = decodeURI(document.cookie.substring(indexCookieBegin + laenge, indexCookieEnd));
if (cookieValue.match(/\|\|/g)) {
cookieValue = cookieValue.replace('||', '|');
}
return cookieValue;
}
var _globalGetCookie2 = function(cookieKey){
if(typeof cookieKey !== 'undefined' && typeof cookieKey === 'string' && cookieKey.length > 0){
var cookies = document.cookie;
if(typeof cookies !== 'undefined' && typeof cookies === 'string' && cookies.length > 0){
var cookieArray = cookies.split(';')
for(i = 0; i < cookieArray.length;i++){
var cookieData = cookieArray[i].split('=');
if(cookieData[0].trim() === cookieKey.trim()){
if(typeof cookieData[1] !== 'undefined' && typeof cookieData[1] === 'string' && cookieData[1].length > 0){
return decodeURIComponent(cookieData[1]);
}
}
}
}
}
return '';
}
var _globalDeleteValueFromCookie = function(name, removeValue, time) {
if(typeof(time) === 'undefined') {
time = null;
}
var wert = _globalGetCookie(name);
wert = wert.replace(removeValue, '');
if (wert[0] == "|") {
wert = wert.replace("|", "");
}
_globalSetCookie(name, wert, time, '/');
}
var _globalCheckIfValueExistInCookie = function(name, value, indexOfUnique) {
var isChecked = false;
if (_globalIsCookie(name)) {
var cookieAllAds = _globalGetCookie(name).split('|');
for (i = 0; i < cookieAllAds.length; i++) {
var cookieOneAd = cookieAllAds[i].split(",");
if (cookieOneAd[indexOfUnique] == value) {
isChecked = true;
}
}
}
return isChecked;
}
var _globalJumpToAnchor = function(originElement, targetElement) {
if((typeof document.getElementsByTagName('base')[0] != 'undefined') && (document.getElementsByTagName('base')[0].href != '')) {
originElement.addEventListener('click', function(e) {
e.preventDefault();
var origin = originElement;
var anchor = targetElement;
if(typeof anchor != 'undefined') {
var i = origin.offsetTop;
var int = setInterval(function() {
window.scrollTo(0, i);
i += 10;
if (i >= anchor.offsetTop) clearInterval(int);
}, 10);
}
});
}
}
var _globalSetWindowName = function() {
var element = document.querySelectorAll('[data-jwtpl-myWindow]');
if (element.length == 1) {
element = element[0];
if (element.hasAttribute('data-jwtpl-myWindow') == true) {
window.name = element.getAttribute('data-jwtpl-myWindow').split("|")[0];
}
}
}
this.getPageInfoJson = function() {
if (typeof window[pageInfoJsonVarName] !== 'undefined') {
return window[pageInfoJsonVarName];
} else {
return false;
}
}
this.getPageInfoJsonProperty = function(property) {
if (typeof property === 'undefined' || typeof property !== 'string' || property.length < 1) {
return false;
}
var prop = '', json = this.getPageInfoJson();
if (json === false) {
return false;
} else {
prop = property.trim().toLowerCase();
if ([ "id", "keyword", "location", "filtered", "pagenumber", "pagesize" ].indexOf(prop) != -1) {
if (typeof json['detaildata']['search'][prop] !== 'undefined' && json['detaildata']['search'][prop].length > 0) {
return json['detaildata']['search'][prop];
} else {
return false;
}
} else {
if (typeof json[prop] !== 'undefined' && json[prop].length > 0) {
return json[prop];
} else {
return false;
}
}
}
}
var _globalPageTypeFinder = function() {
var body = document.querySelectorAll('body');
if (body.length > 0 && body[0].hasAttribute('data-jwtpl-fingerprint') === true && body[0].getAttribute('data-jwtpl-fingerprint') != '' && arguments.length > 0 && typeof arguments[0] === 'string') {
var stamp = body[0].getAttribute('data-jwtpl-fingerprint'), isConfig = arguments, count = arguments.length, controlString = '';
for ( var i = 0; i < count; i++) {
if (isConfig[i] === 'checkIfCountBiggerZero') {
if (stamp[0] == 'X') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
if (isConfig[i] === 'checkIfCountZero') {
if (stamp[0] == '0') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
if (isConfig[i] === 'checkIfStartpage') {
if (stamp[1] + stamp[2] == '11') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
if (isConfig[i] === 'checkIfRegularSearch') {
if (stamp[3] + stamp[4] == '12') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
if (isConfig[i] === 'checkIfCompanyWithProfil') {
if (stamp[5] + stamp[6] == '13') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
if (isConfig[i] === 'checkIfSeoPage') {
if (stamp[7] + stamp[8] == '14') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
if (isConfig[i] === 'checkIfRegularSearchFiltered') {
if (stamp[9] + stamp[10] == '15') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
if (isConfig[i] === 'checkIfRegularSearchPaged') {
if (stamp[11] + stamp[12] == '16') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
if (isConfig[i] === 'checkIfRegularSearchSorted') {
if (stamp[13] + stamp[14] == '17') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
if (isConfig[i] === 'checkIfSeoPageWithContent') {
if (stamp[15] + stamp[16] == '18') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
if (isConfig[i] === 'checkIfCompanyPage') {
if (stamp[17] + stamp[18] == '19') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
if (isConfig[i] === 'checkIfSeoPageCrossPreparedSearch') {
if (stamp[19] + stamp[20] == '21') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
if (isConfig[i] === 'checkIfSeoPageCrossPreparedSearchWithContent') {
if (stamp[21] + stamp[22] == '23') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
if (isConfig[i] === 'checkIfJobMailListResultPage') {
if (stamp[21] + stamp[22] == '22') {
controlString += 'T';
} else {
controlString += 'F';
}
continue;
}
}
if (controlString.indexOf('F') != -1 || controlString === '') {
return false;
} else {
return true;
}
}
return false;
}
var _globalCreateAjaxLoaderGif = function(elem){
if(urlString != '' && typeof elem != 'undefined' && elem != null){
var para = document.createElement("img");
para.classList.add('jwtpl-global-ajaxloader');
para.setAttribute('src', urlString + ajaxLoader);
para.setAttribute('style','position: fixed;top: 20%;left: 40%;background-color: #fff;padding: 20px;z-index: 9999;border-radius: 10px;box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1);');
elem.appendChild(para);
}
}
var _globalCreateArrowsForSwipeMobile = function(elem){
if(typeof elem != 'undefined' && elem != null){
var left = document.createElement("div");
left.classList.add('jwtpl-global-arrowLeft');
var left2 = document.createElement('div');
left2.classList.add('jwtpl-global-pageNumberBack');
left.appendChild(left2);
var right = document.createElement("div");
right.classList.add('jwtpl-global-arrowRight');
var right2 = document.createElement('div');
right2.classList.add('jwtpl-global-pageNumberNext');
right.appendChild(right2);
elem.appendChild(left);
elem.appendChild(right);
}
}
var _globalCreateCrossForSwipeMobile = function(elem){
if(typeof elem != 'undefined' && elem != null){
var left = document.createElement("div");
left.classList.add('jwtpl-global-crossLeft');
var right = document.createElement("div");
right.classList.add('jwtpl-global-crossRight');
elem.appendChild(left);
elem.appendChild(right);
}
}
var _globalSwipeMobile = function(elem, pageBack, pageNext, showLoaderAndArrows, pagerActive1Link, elemToAppendArrow){
if((typeof elemToAppendArrow !== 'undefined') && (elemToAppendArrow !== null)) {
_globalCreateArrowsForSwipeMobile(elemToAppendArrow);
_globalCreateCrossForSwipeMobile(elemToAppendArrow);
} else {
_globalCreateArrowsForSwipeMobile(elem);
_globalCreateCrossForSwipeMobile(elem);
elemToAppendArrow = elem;
}
if(typeof pagerActive1Link == 'undefined'){
pagerActive1Link = null;
}
if(typeof showLoaderAndArrows == 'undefined'){
showLoaderAndArrows = null;
}
var btnNext = elemToAppendArrow.querySelector('.jwtpl-global-arrowRight');
var btnBack = elemToAppendArrow.querySelector('.jwtpl-global-arrowLeft');
var pageNumberBack = elemToAppendArrow.querySelector('.jwtpl-global-pageNumberBack');
var pageNumberNext = elemToAppendArrow.querySelector('.jwtpl-global-pageNumberNext');
var crsLeft = elemToAppendArrow.querySelector('.jwtpl-global-crossLeft');
var crsRight = elemToAppendArrow.querySelector('.jwtpl-global-crossRight');
var width = elemToAppendArrow.offsetWidth;
var widthEdgeLeft = (width /100) * 25;
var widthEdgeRight = width - widthEdgeLeft;
var heightEdge = screen.height / 10;
if(("ontouchstart" in document.documentElement) && (typeof elem != 'undefined') && (elem != null) && (btnNext != null) && (btnBack != null)){
elem.addEventListener('touchstart', function(event) {
var startTouch = 0;
var endTouch = 0;
var startHoehe = 0;
var endHoehe = 0;
var check = true;
event.currentTarget.addEventListener('touchmove', function(ev) {
if(startTouch == 0){
startTouch = ev.touches[0].clientX;
}
endTouch = ev.touches[0].clientX;
if(startHoehe == 0){
startHoehe = ev.touches[0].clientY;
}
endHoehe = ev.touches[0].clientY;
if((startHoehe - endHoehe) > heightEdge || (endHoehe - startHoehe) > heightEdge){
check = false;
}
if(check == true && elemToAppendArrow !== null) {
if(startTouch > endTouch) {
var swipeDistance = startTouch - endTouch;
var smoothPull = Math.floor(swipeDistance*0.7);
var iframeElem = window.document.querySelectorAll('.jwtpl-jobad-adIframe');
elemToAppendArrow.classList.add('swipeNext')
if((swipeDistance > 10) && (smoothPull < 71)) {
elemToAppendArrow.setAttribute("style", "transform:translateX("+smoothPull+"px); -webkit-transform:translateX("+(-smoothPull)+"px)");
if(iframeElem !== undefined && iframeElem.length > 0) {
iframeElem[0].setAttribute('style', 'box-shadow: ' + swipeDistance + 'px 0px 5px -5px rgba(0,0,0,0.25);');
}
}
} else if(startTouch < endTouch) {
var swipeDistance = endTouch - startTouch;
var smoothPull = Math.floor(swipeDistance*0.7);
var iframeElem = window.document.querySelectorAll('.jwtpl-jobad-adIframe');
elemToAppendArrow.classList.add('swipeBack');
if((swipeDistance > 10) && (smoothPull < 71)) {
elemToAppendArrow.setAttribute("style", "transform:translateX("+smoothPull+"px); -webkit-transform:translateX("+smoothPull+"px)");
if(iframeElem !== undefined && iframeElem.length > 0) {
iframeElem[0].setAttribute('style', 'box-shadow: -' + swipeDistance + 'px 0px 5px -5px rgba(0,0,0,0.25);');
}
}
}
}
if(((startTouch + width / 4 ) < endTouch) && (startTouch < widthEdgeLeft)){
if((pageNext != null) && (pageBack == null)){
if(crsLeft != null){
crsLeft.style.display = 'block';
}
}else{
if(showLoaderAndArrows == true){
btnBack.style.display = 'block';
}
if((pagerActive1Link != null) && (pageNumberBack != null) ){
pageNumberBack.innerText = parseInt(pagerActive1Link.innerText) - 1;
}
}
}else{
startTouch, endHoehe = null;
crsLeft.style.display = 'none';
btnBack.style.display = 'none';
}
if((startTouch > (width / 4 + endTouch)) && (startTouch > widthEdgeRight)){
if((pageNext == null) && (pageBack != null)){
if(crsRight != null){
crsRight.style.display = 'block';
}
}else{
if(showLoaderAndArrows == true){
btnNext.style.display = 'block';
}
if((pagerActive1Link != null) && (pageNumberNext != null)){
pageNumberNext.innerText = parseInt(pagerActive1Link.innerText) + 1;
}
}
}else{
startTouch,endHoehe = null;
crsRight.style.display = 'none';
btnNext.style.display = 'none';
}
},false);
event.currentTarget.addEventListener('touchend', function(eve) {
if(((startTouch + (width / 4)) < endTouch) && (pageBack != null) && (startTouch < widthEdgeLeft) && check){
pageBack.click();
if(showLoaderAndArrows == true){
btnBack.style.display = 'block';
_globalCreateAjaxLoaderGif(elem);
}
}else if((startTouch > ((width / 4) + endTouch)) && (pageNext != null) && (startTouch > widthEdgeRight) && check){
pageNext.click();
if(showLoaderAndArrows == true){
btnNext.style.display = 'block';
_globalCreateAjaxLoaderGif(elem);
}
}
startTouch, endHoehe = null;
crsRight.style.display = 'none';
crsLeft.style.display = 'none';
// for animation
if(elemToAppendArrow !== null) {
if (elemToAppendArrow.style != null) {
elemToAppendArrow.removeAttribute('style');
}
if (elemToAppendArrow.classList.contains('swipeNext') == true) {
elemToAppendArrow.classList.remove('swipeNext');
}
if (elemToAppendArrow.classList.contains('swipeBack') == true) {
elemToAppendArrow.classList.remove('swipeBack');
}
}
},false);
});
}
}
var _globalGetStorageItem = function(itemPath) {
if(_api.isString(itemPath) === false) {
_api.printErrorMsg("._globalGetStorageItem(itemPath) - itemPath must be not empty string");
return false;
}
var
split = itemPath.split('.'),
len = split.length;
if(len === 1){
if(_api.type(sessionStorage.getItem(split[0])) !== undefined){
var storedItem = sessionStorage.getItem(split[0]);
try {
storedItem = JSON.parse(storedItem);
return storedItem;
} catch(e){
return storedItem;
}
} else {
return '';
}
} else if(len > 1) {
var storedItem = sessionStorage.getItem(split[0]);
if(_api.type(storedItem) === undefined){
return '';
}
try {
storedItem = JSON.parse(storedItem);
if(len == 2 && _api.type(storedItem[split[1]]) !== undefined){
return storedItem[split[1]];
} else if(len == 3 && _api.type(storedItem[split[1]][split[2]]) !== undefined) {
return storedItem[split[1]][split[2]];
} else if(len == 4 && _api.type(storedItem[split[1]][split[2]][split[3]]) !== undefined) {
return storedItem[split[1]][split[2]][split[3]];
} else if(len == 5 && _api.type(storedItem[split[1]][split[2]][split[3]][split[4]]) !== undefined) {
return storedItem[split[1]][split[2]][split[3]][split[4]];
} else if(len == 6 && _api.type(storedItem[split[1]][split[2]][split[3]][split[4]][split[5]]) !== undefined) {
return storedItem[split[1]][split[2]][split[3]][split[4]][split[5]];
} else if(len == 7 && _api.type(storedItem[split[1]][split[2]][split[3]][split[4]][split[5]][split[6]]) !== undefined) {
return storedItem[split[1]][split[2]][split[3]][split[4]][split[5]][split[6]];
}
return '';
} catch(e){
return storedItem;
}
}
return '';
}
this.getConfig = function(){
return jsonConfig;
}
this._globalSetConfig = function(key, value, type, modName){
if(_api.type(configStorage['global']) === undefined) {
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - there is no global part of configStorage. fatal error");
return false;
}
if(_api.type(configStorage['app']) === undefined) {
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - there is no app part of configStorage. fatal error");
return false;
}
if(_api.type(configStorage['mod']) === undefined) {
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - there is no mod part of configStorage. fatal error");
return false;
}
if(_api.type(type) === undefined && _api.type(configStorage['global'][key]) !== undefined){
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - configStorage[global][" + key + "] is already exists and cannot be overriden");
return false;
}
if(type === 'app' && _api.type(configStorage['app'][key]) !== undefined){
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - configStorage[app][" + key + "] is already exists and cannot be overriden");
return false;
}
if(_api.type(configStorage['mod'][key]) !== undefined){
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - configStorage[mod][" + key + "] is already exists and cannot be overriden");
return false;
}
if(_api.isNull(key) === true){
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - key is undefined");
return false;
}
if(_api.isString(key) === false){
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - key must be not empty string");
return false;
}
if(_api.isNull(value) === true){
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - value is undefined");
return false;
} else if(typeof value === 'object' || typeof value === 'boolean' || typeof value === 'function' || typeof value === 'date' || _api.isJson(value) === true){
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - value must be integer or string");
return false;
} else {
if(_api.type(value) === 'String' && value.length == 0){
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - value must be not empty string");
return false;
}
}
if( _api.type(type) !== undefined && type == 'mod' && _api.type(modName) === undefined){
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - modName must be defined when you set [type=mod] part");
return false;
} else if( _api.type(type) !== undefined && type == 'mod' && _api.isString(modName) === false) {
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - modName must must be not empty string");
return false;
}
if(_api.type(type) === undefined){
configStorage['global'][key] = value;
} else if(type === 'app') {
configStorage['app'][key] = value;
} else if (type === 'mod') {
var modObj = new Object();
try {
Object.defineProperty(modObj, key, { value : value });
Object.defineProperty(configStorage['mod'], modName, { value: modObj });
} catch(e){
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - there is no type = configStorage[" + modName + "][" + key + "]. app, mod allowed");
return false;
}
} else {
_api.printErrorMsg("JwTplJsLib._globalSetConfig(key, value, type, modName) - there is no type = [" + type + "]. app, mod allowed");
return false;
}
return true;
}
this._globalGetConfig = function (){
return configStorage;
}
var _globalBindActionListener = function(ctx){
var markers;
if(_api.type(ctx) === undefined){
if(_api.width() > 600){
markers = _api.get('.jwtpl-gc-ettoggle, .jwtpl-gc-etclose, .jwtpl-gc-etaccord, .jwtpl-gc-imgzoom, .jwtpl-gc-tablist, .jwtpl-gc-ethref, .jwtpl-gc-etexpand');
} else {
markers = _api.get('.jwtpl-gc-ettoggle, .jwtpl-gc-etclose, .jwtpl-gc-etaccord, .jwtpl-gc-tablist, .jwtpl-gc-ethref, .jwtpl-gc-etexpand');
}
} else {
if(_api.width() > 600){
markers = ctx.querySelectorAll('.jwtpl-gc-ettoggle, .jwtpl-gc-etclose, .jwtpl-gc-etaccord, .jwtpl-gc-imgzoom, .jwtpl-gc-tablist, .jwtpl-gc-ethref, .jwtpl-gc-etexpand');
} else {
markers = ctx.querySelectorAll('.jwtpl-gc-ettoggle, .jwtpl-gc-etclose, .jwtpl-gc-etaccord, .jwtpl-gc-tablist, .jwtpl-gc-ethref, .jwtpl-gc-etexpand');
}
}
if(markers.length > 0){
_api.each(markers, function(item, index){
if(_api.hasClass(item, 'jwtpl-gc-ettoggle') === true){
var toggleElement = item.nextElementSibling;
if(_api.type(toggleElement) === undefined){
_api.printErrorMsg(".bindActionListener() - toggleElement is undefined. must be a next sibling immediate after the toggle action trigger");
_api.printElement(toggleElement);
return false;
} else if(_api.hasClass(toggleElement, 'jwtpl-gc-box') === false){
_api.printErrorMsg("_globalBindActionListener - toggleElement must have css class - jwtpl-gc-box:");
_api.printElement(toggleElement);
return false;
}
_api.event(item, 'click', function(e){
var group = toggleElement.classList;
for(var i=0; i<group.length; i++){
if(group[i].indexOf('jwtpl-gc-etgroup') !== -1){
group = group[i];
break;
}
}
if(_api.isString(group) === false) {
_api.printErrorMsg("_globalBindActionListener - toggleElement must have event group - e.g. jwtpl-gc-etgroupnav:");
_api.printElement(toggleElement);
return false;
}
var eventGroup = _api.get('.' + group + '.fadeIn', true);
_api.each(eventGroup, function(item, index){
if(item !== toggleElement){
_api.removeClass(item, 'fadeIn');
_api.hide(item);
}
});
if(_api.hasClass(item, 'jwtpl-gc-ettoggletop') === true){
setTimeout(function(){
toggleElement.style.top = "-" + (toggleElement.scrollHeight + 10) + "px";
},100);
}
if(_api.hasClass(toggleElement, 'fadeIn') === true) {
_api.removeClass(toggleElement, 'fadeIn');
_api.hide(toggleElement);
} else {
_api.addClass(toggleElement, 'fadeIn');
_api.show(toggleElement);
}
});
}
if(_api.hasClass(item, 'jwtpl-gc-ethref') === true){
var
dataHref,
dataTarget;
for(var i=0; i<item.attributes.length; i++){
var attr = item.attributes[i].name;
if(attr.substring(attr.length - 7, attr.length) === '-ethref'){
if(item.hasAttribute(item.attributes[i].name) === true){
dataHref = item.getAttribute(item.attributes[i].name);
}
}
if(attr.substring(attr.length - 13, attr.length) === '-ethreftarget'){
if(item.hasAttribute(item.attributes[i].name) === true){
dataTarget = item.getAttribute(item.attributes[i].name);
}
}
}
if(_api.type(dataHref) === "String" && (dataHref.substring(0, 7) === 'http://' || dataHref.substring(0, 8) === 'https://')){
_api.event(item, 'click', function(e){
if(_api.type(dataTarget) === undefined){
window.open(dataHref, "_self");
} else {
window.open(dataHref, dataTarget);
}
});
}
}
if(_api.hasClass(item, 'jwtpl-gc-etclose') === true){
var parentWindow = item.parentElement;
if(_api.type(parentWindow) === undefined){
_api.printErrorMsg("_globalBindActionListener() - parent window is undefined. must be a parent element of closing action trigger:");
_api.printElement(parentWindow);
return false;
}
_api.event(item, 'click', function(e){
_api.hide(parentWindow);
return false;
});
}
if(_api.hasClass(item, 'jwtpl-gc-etexpand') === true){
var
specialBehavior = false;
parent = item.parentElement,
toggleElement = item.nextElementSibling,
liquidStates = _api.getLcItem(liquidAdStorageName);
if(_api.type(parent) === undefined){
_api.printErrorMsg("_globalBindActionListener - parentElement is undefined. must be immediate parent of action trigger");
_api.printElement(toggleElement);
return false;
} else if(_api.type(toggleElement) === undefined){
_api.printErrorMsg("_globalBindActionListener - toggleElement is undefined. must be a next sibling immediate after the toggle action trigger");
_api.printElement(toggleElement);
return false;
} else if(_api.hasClass(toggleElement, 'jwtpl-gc-box') === false){
_api.printErrorMsg("_globalBindActionListener - toggleElement must have css class - jwtpl-gc-box:");
_api.printElement(toggleElement);
return false;
}
if(liquidStates !== false){
var cssClassList = parent.classList;
for(var i=0; i<cssClassList.length; i++){
if(liquidStates.indexOf(cssClassList[i]) !== -1){
specialBehavior = true;
}
}
}
if(specialBehavior === false){
if(toggleElement.children < 1){
_api.printErrorMsg("_globalBindActionListener - toggleElement must have at least one childNode to be expand:");
_api.printElement(toggleElement);
return false;
}
if(toggleElement.children.length > 0){
_api.each(toggleElement.children, function(child,index){
if(index === 0){
_api.addClass(child, 'jwtpl-gc-halfopen');
// var bottomoverlay =
// document.createElement('div');
// bottomoverlay.setAttribute('class',
// 'jwtpl-gc-bottomoverlay');
// child.appendChild(bottomoverlay);
} else {
_api.hide(child);
}
});
}
_api.event(item, 'click', function(e){
if(_api.hasClass(item, 'jwtpl-gc-expanded') === true){
_api.removeClass(item, 'jwtpl-gc-expanded');
_api.removeClass(toggleElement, 'jwtpl-gc-expanded');
_api.each(toggleElement.children, function(child,index){
if(index === 0){
_api.addClass(child, 'jwtpl-gc-halfopen');
_api.removeClass(child, 'fadeIn');
} else {
_api.removeClass(child, 'fadeIn');
_api.hide(child);
}
});
} else {
_api.addClass(item, 'jwtpl-gc-expanded');
_api.addClass(toggleElement, 'jwtpl-gc-expanded');
_api.each(toggleElement.children, function(child,index){
if(index === 0){
_api.removeClass(child, 'jwtpl-gc-halfopen');
_api.addClass(child, 'fadeIn');
} else {
_api.addClass(child, 'fadeIn');
_api.show(child);
}
});
}
});
} else {
_api.addClass(item, 'jwtpl-gc-specialbehavior');
_api.style(parent, 'pointer-events', 'none');
}
}
if(_api.hasClass(item, 'jwtpl-gc-etaccord') === true){
var toggleElement = item.nextElementSibling;
if(_api.type(toggleElement) === undefined){
_api.printErrorMsg("_globalBindActionListener - toggleElement is undefined. must be a next sibling immediate after the toggle action trigger");
_api.printElement(toggleElement);
return false;
} else if(_api.hasClass(toggleElement, 'jwtpl-gc-box') === false){
_api.printErrorMsg("_globalBindActionListener - toggleElement must have css class - jwtpl-gc-box:");
_api.printElement(toggleElement);
return false;
}
_api.event(item, 'click', function(e){
if(_api.hasClass(item, 'jwtpl-gc-expanded') === true){
_api.hide(toggleElement);
_api.removeClass(item, 'jwtpl-gc-expanded');
} else {
_api.addClass(toggleElement, 'fadeIn');
_api.show(toggleElement);
_api.addClass(item, 'jwtpl-gc-expanded');
}
});
}
if(_api.hasClass(item, 'jwtpl-gc-imgzoom') === true){
_api.event(item, 'click', function(e){
if(_api.hasClass(item, 'scale') === true){
_api.removeClass(item, 'scale');
} else {
_api.addClass(item, 'scale');
}
});
}
if(_api.hasClass(item, 'jwtpl-gc-tablist') === true){
var tabs = item.getElementsByClassName('jwtpl-gc-tab');
if(tabs.length < 2){
_api.printErrorMsg("_globalBindActionListener- tab system must have at least 2 tabs");
_api.printElement(item);
return false;
}
_api.each(tabs, function(tab, index){
var
classMatch = null,
dataTarget;
for(var i=0; i<tab.attributes.length; i++){
classMatch = /data-jwtpl-(.*?)-ettabsrc/.exec(tab.attributes[i].name);
if(classMatch != null && classMatch.length > 1){
dataTarget = tab.attributes[i].value;
}
}
if(classMatch == null){
_api.printErrorMsg("_globalBindActionListener - tab element has no data-jwtpl-*-ettabsrc attribute:");
_api.printElement(tab);
return false;
} else {
if(_api.type(dataTarget) !== undefined){
var tabWindow = _api.get('.' + dataTarget);
if(tabWindow.length > 0){
_api.event(tab, 'click', function(e){
if(_api.hasClass(tab, 'jwtpl-gc-active0') === true){
_api.each(tabs, function(tab, index){
var
targetMatch = null,
targetData;
for(var i=0; i<tab.attributes.length; i++){
targetMatch = /data-jwtpl-(.*?)-ettabsrc/.exec(tab.attributes[i].name);
if(targetMatch != null && targetMatch.length > 1){
targetData = tab.attributes[i].value;
}
}
if(targetMatch == null){
_api.printErrorMsg("_globalBindActionListener - tab element has no data-jwtpl-*-ettabsrc attribute:");
_api.printElement(tab);
return false;
} else {
var closeTab = _api.get('.' + targetData);
if(closeTab.length > 0){
_api.hide(closeTab[0]);
_api.removeClass(tab, 'jwtpl-gc-active1');
_api.addClass(tab, 'jwtpl-gc-active0');
}
}
});
var
actionMatch = null,
actionTargetData;
for(var i=0; i<tab.attributes.length; i++){
actionMatch = /data-jwtpl-(.*?)-ettab(show|hide)/.exec(tab.attributes[i].name);
if(actionMatch != null && actionMatch.length > 1){
actionTargetData = actionMatch;
actionTargetData.push(tab.attributes[i].value);
}
}
if(_api.type(actionTargetData) !== undefined && actionTargetData.length == 4 && _api.isString(actionTargetData[3]) !== false){
var
selector = '',
action = actionTargetData[2],
actionData = actionTargetData[3];
actionData = actionData.split(',');
_api.each(actionData, function(item, index){
selector += '.' + _api.trim(item);
if(index < (actionData.length - 1)) {
selector += ',';
}
});
if(_api.isString(selector) !== false){
actionData = _api.get(selector);
if(actionData.length > 0){
_api.each(actionData, function(item){
if(action === 'hide'){
_api.hide(item);
} else if(action === 'show') {
_api.show(item);
} else {}
});
}
}
}
_api.removeClass(tab, 'jwtpl-gc-active0');
_api.addClass(tab, 'jwtpl-gc-active1');
_api.addClass(tabWindow[0], 'fadeIn');
_api.show(tabWindow[0]);
}
});
} else {
_globalActivateMod(tab, dataTarget);
}
}
}
});
}
});
}
return true;
}
var _globalInvokeModInit = function(modName){
if(_api.isString(modName) === true){
switch(modName){
case 'hiliadpr': hiliadprInit();
}
} else {
_api.printErrorMsg("._globalInvokeModInit() - modName must be an nor empty string");
return false;
}
}
var _globalActivateMod = function(trigger, modName) {
if(_api.isNull(trigger) === true){
_api.printErrorMsg("._globalActivateMod(trigger, modName) - trigger must be defined");
return false;
}
if(_api.isString(modName) === false){
_api.printErrorMsg("._globalActivateMod(trigger, modName) - modName must be an nor empty string");
return false;
}
var
loadContent = false,
modNameClass = modName,
modName = modName.split('-');
if(modName.length > 1){
modName = modName[1];
_api.event(trigger, 'mousedown', function(e){
if(loadContent === false){
if(_api.type(configStorage['mod'][modName]) !== undefined && _api.isString(configStorage['mod'][modName]['html']) > 0){
var
regexResult,
regexStr = 'data-jwtpl-' + modName + '-jsEmbedTarget="(.*?)"',
regex = new RegExp(regexStr),
modData = configStorage['mod'][modName]['html'];
regexResult = regex.exec(modData);
if(_api.type(regexResult) !== undefined && regexResult.length > 1){
regexResult = regexResult[1];
var domRef = _api.get('.' + regexResult);
if(domRef.length == 0){
_api.printErrorMsg("._globalActivateMod(trigger, modName) - target reference for content injection undefined");
return false;
}
loadContent = true;
domRef[0].insertAdjacentHTML('beforeend', modData);
var injectedDoc = document.querySelector('.' + modNameClass);
_globalBindActionListener(injectedDoc);
_globalInvokeModInit(modName);
if(_api.type(trigger.parentElement) !== undefined && _api.type(trigger.parentElement.parentElement) !== undefined){
_globalBindActionListener(trigger.parentElement.parentElement);
}
} else {
_api.printErrorMsg("._globalActivateMod(trigger, modName) - mod=[" + modName + "] dont contain attribute 'data-jwtpl-[" + modName + "]-jsEmbedTarget");
return false;
}
} else {
_api.printErrorMsg("._globalActivateMod(trigger, modName) - no mod data found or empty in js config");
return false;
}
}
});
} else {
_api.printErrorMsg("._globalActivateMod(trigger, modName) - modName do not match to pattern jwtpl-[modName]-* ");
return false;
}
return true;
}
var _globalLoadPartnerTracking = function(){
var scripts = document.querySelectorAll('.jwtpl-jmpt-partnerTracking');
for(var i = 0; i < scripts.length; i++){
scripts[i].insertAdjacentHTML('afterend', scripts[i].text);
scripts[i].parentElement.removeChild(scripts[i])
}
}
var _globalInitJobDataDescrExpander = function() {
let trigger = _api.get('.jwtpl-gc-viewData');
if(trigger.length > 0) {
_api.each(trigger, function(it){
let
itemDescr = it.querySelectorAll('.jwtpl-sysHili-itemDescr'),
quickView = it.querySelectorAll('.jwtpl-gc-viewDataInner');
if(itemDescr.length > 0){
_api.event(it, 'click', function(e){
if(_api.hasClass(itemDescr[0], 'jwtpl-gc-hidden1') === true) {
_api.removeClass(itemDescr[0], 'jwtpl-gc-hidden1');
_api.addClass(itemDescr[0], 'fadeIn');
_api.addClass(it, 'jwtpl-gc-expanded');
} else {
_api.addClass(itemDescr[0], 'jwtpl-gc-hidden1');
_api.removeClass(itemDescr[0], 'fadeIn');
_api.removeClass(it, 'jwtpl-gc-expanded');
}
});
}
});
}
}
var _globalInitOrientationClass = function() {
let body = _api.get('body');
if(body.length > 0) {
if(_api.isMobile() === true) {
_api.addClass(body[0], 'jwtpl-sys-bodyAppDvM1');
} else {
_api.addClass(body[0], 'jwtpl-sys-bodyAppDvM0');
}
if(window.orientation === 0 || window.orientation === 180) {
_api.addClass(body[0], 'jwtpl-sys-bodyAppDvOP');
}
if(window.orientation === 90 || window.orientation === -90) {
_api.addClass(body[0], 'jwtpl-sys-bodyAppDvOL');
}
window.addEventListener("orientationchange", function(event) {
if(event.target.screen.orientation.type === 'landscape-primary') {
_api.addClass(body[0], 'jwtpl-sys-bodyAppDvOL');
_api.removeClass(body[0], 'jwtpl-sys-bodyAppDvOP');
}
if(event.target.screen.orientation.type === 'portrait-primary') {
_api.addClass(body[0], 'jwtpl-sys-bodyAppDvOP');
_api.removeClass(body[0], 'jwtpl-sys-bodyAppDvOL');
}
});
}
}
this._globalCheckIe = function() {
if(window.navigator.userAgent.indexOf("Trident") > 0 || window.navigator.userAgent.indexOf("MSIE") === true){
if(_api !== false) {
let
body = _api.get('body'),
message = 'Microsoft hat die Weiterentwicklung des von Ihnen verwendeten <strong>Internet Explorers</strong> eingestellt. In unserem auf Sicherheit und Schnelligkeit optimierten Stellenmarkt können wir diesen Browser daher leider nicht mehr unterstützen. Wir empfehlen Ihnen dringend einen aktuellen sicheren Browser zu nutzen.';
if(body.length > 0 && _api.hasClass(body[0], 'jwtpl-sys-bodyAppMmNg') === true) {
body[0].insertAdjacentHTML('afterbegin',
'<div style="position: fixed; background-color: #444; background-color: rgba(0,0,0,.7); color: #fff; width: 100%; height: 2000px; height: 100vw; z-index: 999999;">' +
'<p style="width: 60%; background-color: #fff; color: #444; margin: 200px auto; padding: 30px; text-align: center; font-size: 22px;">' +
'<i style="display: block; font-size: 60px; margin-bottom: 20px; color: #dc3545;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>' + message +'</p></div>');
}
}
}
}
this._globalSetAppGuiTagAk = function(ak) {
if(typeof ak === 'string'){
appGuiTagAk = ak.trim().toLowerCase();
}
}
var _globalGetAppGuiTagAk = function(){
return appGuiTagAk;
}
var _globalInit = function(url, baseName, additional = '') {
if ((typeof url === 'string') && (urlString == '') && (url != '')) {
urlString = url;
}
if(_api !== false){
let hasInitRun = _api.init(baseName, url);
if(_api.getAppInfo('version') === 'v9'){
let bn = baseName.split('_');
if(bn.length == 2){
_api.runMatchedFuncs('jwTplJsLibObjectCallMe_' + bn[1] + '_');
}
}
if(_api.isStringRaw(additional) === true) {
additional = additional.toLowerCase();
additional = _api.trim(additional);
additional = additional + ',';
} else {
additional = ',';
}
if(hasInitRun === true) {
}
if(_api._consent() !== false){
if (_api._consent().getAppVersion() >= 3) {
if(additional.indexOf('cs=noinit,') === -1) {
_api._consent().init();
}
} else {
if(additional.indexOf('cs=noinit,') === -1) {
_api._consent().init();
}
}
if(additional.indexOf('cs=clear,') !== -1) {
if(_api.isStringNotEmpty(_api._consent().getConsentCookieName()) === true){
_api.deleteCookie(_api._consent().getConsentCookieName());
}
}
}
if(_api._noli() !== false && _api.isString(url) !== false){
if(_api._consent().checkConsent(2) === false){
var stars = document.querySelectorAll("[class*='jwtpl-gc-noliitem']");
for(var i = 0; i < stars.length; i++){
stars[i].addEventListener('click', cookieEvent);
}
function cookieEvent(ev){
ev.preventDefault();
ev.stopPropagation();
_api._consent().getConsent(2);
}
}
_api._consent().getConsent(2, function(){
_api._noli().initNoli();
_api._noli().refreshNoli();
var stars = document.querySelectorAll("[class*='jwtpl-gc-noliitem']")
for(var i = 0; i < stars.length; i++){
stars[i].removeEventListener('click', cookieEvent);
}
}, '')
}
if(_api._trid() !== false){
_api._consent().getConsent(1, _api._trid().initTrid);
}
_api._consent().getConsent(1, _globalLoadPartnerTracking);
_globalInitOrientationClass();
}
_globalSetWindowName();
_globalBindActionListener();
_globalInitJobDataDescrExpander();
// window.jwconsent = _globalCookieConsent();
}
var _globalInitAppTs = function() {
}
var hili_cModifyJoburls = function(object){
var itemPara = '';
var itemParaSeperation = '';
var foundParent = false;
var testObject = object;
var body = document.getElementsByTagName('body')[0];
while(testObject != body && foundParent == false)
{
testObject = testObject.parentElement;
if(testObject.getAttribute("data-jwtpl-trackingseperationkey") != '' && testObject.getAttribute("data-jwtpl-trackingseperationkey") != null)
{
foundParent = true;
}
}
if(foundParent == true)
{
itemParaSeperation = testObject.getAttribute("data-jwtpl-trackingseperationkey");
}else{
// if(jQuery(object).is('body'))
// {
// console.log("##125: Kein Tag gefunden##");
// }
}
if(document.getElementsByClassName('jwtpl-hilic-block')[0].hasChildNodes(object) && (document.getElementsByClassName('jwtpl-hilic-block')[0].getAttribute("data-jwtpl-hilic-viewerparams") == 'true'))
{
// itemPara = jQuery(object).attr("data-jwtpl-urlinfos");
itemPara = object.getAttribute("data-jwtpl-hilic-urlinfos");
}
// var itemUrl = jQuery(object).attr("href");
var itemUrl = object.href;
if(itemParaSeperation != '' || itemPara != '')
{
if(itemParaSeperation != '' && itemPara != '')
{
itemUrl = itemUrl + "?" + itemPara + "&jw_chl_seg=" + itemParaSeperation;
}else if(itemParaSeperation != '')
{
itemUrl = itemUrl + "?jw_chl_seg=" + itemParaSeperation;
}else if(itemPara != '')
{
itemUrl = itemUrl + "?" + itemPara;
}
}
return itemUrl;
}
var hili_cClickLinkVw = function(){
var arrLinks = document.getElementsByClassName('jwtpl-hilic-itemLink');
for(var i=0; i<arrLinks.length; i++)
{
arrLinks[i].addEventListener("click", function(event){
var url = this.href;
url = hili_cModifyJoburls(this);
if(('ontouchstart' in window == false || window.self !== window.top) || isFirefox)
{
if(window.innerWidth > 482)
{
event.preventDefault();
}
// if((typeof(vwJob) !== 'undefined') && (isFirefox || isSafari))
// {
// vwJob.close();
// }
// var target = jQuery(jQuery('[data-jwtpl-myWindow]')[0]).attr('data-jwtpl-myWindow').split("|")[1];
//
// vwJob=window.open(url, target);
vwJob = window.open(url, 'jobVw');
vwJob.focus();
return false;
}else{
this.setAttribute('href', url);
this.setAttribute('target', '_self');
return true;
}
});
}
}
var hili_cClickLinkVwFancy = function(){
jQuery('.jwtpl-hilic-itemLink').each(function(){
var _this = $(this);
console.log($(this));
_this.click(function(e){
var
_this = $(this),
iFrame =$('<iframe class="fb-iframe" name="fb-iframe" width="100%" frameBorder="0" scrolling="no"></iframe>')
fancy = $('<div class="fancy-container"><span class="closeIcon">X</span></div>'),
body = $('body'),
windowHeight = $(window).height();
e.preventDefault();
iFrame.height(windowHeight);
body.css('overflow', 'hidden');
iFrame.attr('src', _this.attr('href'));
fancy.append(iFrame);
body.append(fancy);
fancy.show();
$('.closeIcon').click(function(){
fancy.remove();
body.css('overflow', 'auto');
});
$(document).keydown(function(e) {
if (e.keyCode == 27) {
body.css('overflow', 'auto');
fancy.remove();
}
});
setTimeout(function(){
var loadedFrame = document.querySelector('.fb-iframe');
if(typeof loadedFrame.contentDocument.body !== 'undefined'){
var advertisement = loadedFrame.contentDocument.body.getElementsByClassName('jwtpl-vwfb-iframe');
if(advertisement.length > 0){
advertisement[0].height = ($(window).height() - 100);
} else {
setTimeout(function(){
var loadedFrame = document.querySelector('.fb-iframe');
if(typeof loadedFrame.contentDocument.body !== 'undefined'){
var advertisement = loadedFrame.contentDocument.body.getElementsByClassName('jwtpl-vwfb-iframe');
if(advertisement.length > 0){
advertisement[0].height = ($(window).height() - 100);
}
}
}, 750);
}
} else {
setTimeout(function(){
var loadedFrame = document.querySelector('.fb-iframe');
if(typeof loadedFrame.contentDocument.body !== 'undefined'){
var advertisement = loadedFrame.contentDocument.body.getElementsByClassName('jwtpl-vwfb-iframe');
if(advertisement.length > 0){
advertisement[0].height = ($(window).height() - 100);
}
}
}, 750);
}
}, 750);
});
});
}
var hili_cInit = function() {
isFirefox = typeof InstallTrigger !== 'undefined';
isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var
viewerMode = '',
curHili = document.querySelector('.jwtpl-hilic-block');
if(curHili !== null){
if(curHili.hasAttribute('data-jwtpl-hilic-viewertarget') === true){
viewerMode = curHili.getAttribute('data-jwtpl-hilic-viewertarget');
}
}
if(viewerMode === '' || viewerMode == '_blank'){
hili_cClickLinkVw();
} else if(viewerMode === 'fancy'){
hili_cClickLinkVwFancy();
}
};
var logMe = function (descr, mod = '') {
if (_api !== false) {
_api.log(descr, mod);
}
}
var hasInitRun = false;
this.init = function(url, baseName, additional = '') {
if (hasInitRun === false) {
hasInitRun = true;
_globalInit(url, baseName, additional);
_globalInitAppTs();
if (document.getElementsByClassName('jwtpl-hilic-block').length >= 1) { hili_cInit(); }
}
}
}
}