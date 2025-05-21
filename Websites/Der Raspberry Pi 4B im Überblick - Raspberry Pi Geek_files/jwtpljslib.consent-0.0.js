function jwSstCustomConsent(level){}
function jwSstCustomConsentInit(){}
var JwTplJsLibConsent = (function () {
	'use strict';
	return {
		checkConsent: function (level, callback) {
			if (callback) {
				callback();
			}
			return true;
		},
		getConsent: function (level, callback, text) {
			if (callback) {
				callback();
			}
			return true;
		},
		getConsentNoWarning: function (level, callback, text) {
			if (callback) {
				callback();
			}
			return true;
		},
		showConsent: function(){return false;},
		init: function (){return false;},
		printErrorMsg: function (){return false;},
		initConsent: function (){return false;},
		setSstAll: function(){return false;},
		getSstAll: function(){return true;}, 
		resetSstAll: function(){return false;},
		setSstEssential: function(){return false;},
		getSstEssential: function(){return true;},
		resetSstEssential: function(){return false;},
		setSstOptional: function(){return false;},
		getSstOptional: function(){return true;},
		resetSstOptional: function(){return false;},
		setSstExternal: function(){return false;},
		getSstExternal: function(){return true;},
		resetSstExternal: function() {return false;},
		getIFrameMsg: function() {return false;},
		getAppVersion: function() {return false;}
	}
})();