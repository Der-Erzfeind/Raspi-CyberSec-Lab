'use strict';
if(typeof JwTplJsLib !== 'object') {
	var JwTplJsLib = (function(){
		const 
			op = 'jwtpl-sys-bodyAppDvOP',
			ol = 'jwtpl-sys-bodyAppDvOL',
			localHosts = ['localhost', '127.0.0.1', 'ad.sites.jobware.net', 'ai.sites.jobware.net', 'at.sites.jobware.net', 'am.sites.jobware.net'],
			allowedRequestMethod = ['get', 'post', 'put', 'delete', 'patch', 'head', 'connect', 'options', 'trace'],
			infoColor = '#007bff',
			errorColor = '#ce0000';
	
		let
			appName = "JwTplJsLib",
			tplPrototype = '<#{tag}#{attr}>#{data}</#{tag}>',
			guiTagPattern = '[data-jwtpl-sys-gui^="#{pattern}"]',
			getByGuiTagPattern = '[data-jwtpl-sys-gui*="mn:${mod}"][data-jwtpl-sys-gui*="si:${skin}"][data-jwtpl-sys-gui*="tv:${version}"]',
			dataStorage = [],
			propStorage = [],
			myLibsInit = false,
			myLibs = {},
			path = '',
			baseName = '',
			logStorage = new Map(),
			guiTagStorage = new Map(),
			hasInitRun = false,
			easyTooltipYOffset = 30;
	
		function setBaseName (name) {
			if(JwTplJsLib.isStringNotEmpty(name) !== false){
				baseName = name;
				return true;
			} else {
	    		JwTplJsLib.printErrorMsg(".setBaseName(name) - baseName must be a not emtpy string, [" + this.type(name) + "] given instead");
	    		return false;
			}
		}
	
		function setProjectPath(url){
			if(JwTplJsLib.isStringNotEmpty(url) !== false){
				path = url;
				return true;
			} else {
	    		JwTplJsLib.printErrorMsg(".setProjectPath(url) - url must be a not emtpy string, [" + this.type(url) + "] given instead");
	    		return false;
			}
		}
	
		function setStorageItem(id,item){
			if(typeof dataStorage[id] === 'undefined'){
				dataStorage[id] = item;
			}
		}
	
		function getStorageItem(id){
			return dataStorage[id];
		}
	
		function setPropStorageItem(id,item){
			if(typeof propStorage[id] === 'undefined'){
				propStorage[id] = item;
			}
		}
	
		function getPropStorageItem(id){
			return propStorage[id];
		}
		
		function getAppGui() {
			if(guiTagStorage.size > 0){return guiTagStorage;}
			let appGui = JwTplJsLib.get('[data-jwtpl-sys-appgui]');
			if(appGui.length !== 1){return false;}
			appGui = appGui[0].getAttribute('data-jwtpl-sys-appgui');
			appGui = appGui.split('|');
			JwTplJsLib.each(appGui, (it) => {
				it = it.split('.');
				if(it.length === 3){
					guiTagStorage.set(it[0], it.slice(1));
				}
			});
			return guiTagStorage;
		}
	
		return {
			init: function(baseName, projectPath) {
				if(hasInitRun === false){
					if(setBaseName(baseName) === true && setProjectPath(projectPath) === true){
						this._gui().init();
						this._cc().init();
						this._tpl().init();
			
						if(this._ptc() !== false ){
							this._ptc().initPtc();	
						}
						
						//:ToDo consent init
						//:ToDo trid init
						//:ToDo noli init
						
						hasInitRun = true;	
					}
				}
				
				return hasInitRun;		
			},
			
			getHasInitRun: function (){
				return hasInitRun;
			},
			
			//@deprecated
			ready : function(fn){
		        if (document.readyState !== 'loading') {
		            fn();
		        } else if (document.addEventListener) {
		            document.addEventListener('DOMContentLoaded', fn);
		        } else {
		            document.attachEvent('onreadystatechange', function () {
		                if (document.readyState !== 'loading'){
		                	fn();
		                }
		            });
		        }
			},
			
			domOnload : function(fn) {
				document.addEventListener('DOMContentLoaded', fn);	
			},
			
			isReady: function() {
				return document.ready !== 'loading';
			},
			
			runIsReady: function(fn) {
				if(this.isReady() === true){
					fn();
					return true;	
				}
				return false;
			},
	
			initLibs : function (){
				if (myLibsInit === false) {
					if (typeof JwTplJsLibNoli == "object") {
						myLibs['noli'] = JwTplJsLibNoli;
					} else {
						myLibs['noli'] = false;
					}
					if (typeof JwTplJsLibJoma == "object") {
						myLibs['joma'] = JwTplJsLibJoma;
					} else {
						myLibs['joma'] = false;
					}
					if (typeof JwTplJsLibTrid == "object") {
						myLibs['trid'] = JwTplJsLibTrid;
					} else {
						myLibs['trid'] = false;
					}
					if (typeof JwTplJsLibSaseli == "object") {
						myLibs['saseli'] = JwTplJsLibSaseli;
					} else {
						myLibs['saseli'] = false;
					}
					if (typeof JwTplJsLibConsent == "object") {
						myLibs['consent'] = JwTplJsLibConsent;
					} else {
						myLibs['consent'] = false;
					}
					
					if (typeof JwTplJsLibPtc == "object") {
						myLibs['ptc'] = JwTplJsLibPtc;
					} else {
						myLibs['ptc'] = false;
					}
	
					myLibsInit = true;
				}
			},
	
			_noli:function ()	{ if (myLibsInit === true) { return myLibs['noli']; } 	else { return false; }},
			_joma:function ()	{ if (myLibsInit === true) { return myLibs['joma']; } 	else { return false; }},
			_trid:function ()	{ if (myLibsInit === true) { return myLibs['trid']; } 	else { return false; }},
			_saseli:function () { if (myLibsInit === true) { return myLibs['saseli'];}  else { return false; }},
			_consent:function() { if (myLibsInit === true) { return myLibs['consent'];} else { return false; }},
			_ptc:function() { if (myLibsInit === true) { return myLibs['ptc'];} else { return false; }},
	
			getBaseName: function() {
				return baseName;
			},
			
			getBaseObject: function() {
				return this.type(window[this.getBaseName()])!== undefined ? window[this.getBaseName()] : false;
			},
			
			getBaseCfg: function(key, defaultText = '') {
				return this.getBaseObject()._globalGetCfg(key, defaultText);
			},
	
			getProjectPath: function(){
				return path;
			},
			
			getCurrentUrl: function() {
				return window.location.href;
			}, 		
	 	
			get : function(selector, noCache = false){
		    	if(this.type(selector) === undefined){
		    		this.printErrorMsg(".get(selector, noCache) - selector param is undefined");
		    		return false;
		    	}
	
		    	if(this.type(selector) !== 'String'){
		    		this.printErrorMsg(".get(selector, noCache) - selector param must be a string, [" + this.type(selector) + "] given instead");
		    		return false;
		    	}
	
		    	if(this.type(selector) === 'String' && selector.length < 1){
		    		this.printErrorMsg(".get(selector, noCache) - element param must be a not empty string");
		    		return false;
		    	}
	
		    	if(this.type(noCache) !== undefined && this.type(noCache) !== 'Boolean'){
		    		this.printErrorMsg(".get(selector, noCache) - noCache must be a boolean");
		    		return false;
		    	}
	
		    	if(noCache === true){
		    		return document.querySelectorAll(selector);
		    	}
	
				let
					itemHash = this.md5(selector),
					storageItem = getStorageItem(itemHash);
	
				if(this.type(storageItem) === undefined){
					let domElement = document.querySelectorAll(selector);
					if(domElement.length > 0){
						setStorageItem(itemHash, domElement);
						return getStorageItem(itemHash);
					}
					return domElement;
	
				} else {
					return storageItem;
				}
			},
			
			getByGuiTag: function(mod, skin, version = 'df') {
				if(this.isStringRaw(mod) === true){
					mod = this.trim(mod); 
					mod = mod.toLowerCase();
				} else {
					this.printErrorMsg(".getByGuiTag(mod, skin, version) - mod as string required");
		    		return false;				
				}
				if(this.isInt(skin) === false || (this.isInt(skin) === true && skin < 1)){
					this.printErrorMsg(".getByGuiTag(mod, skin, version) - skin as int > 0 required");
		    		return false;
				}
				if(this.isStringRaw(version) === true){
					version = this.trim(version); 
					version = version.toLowerCase();
					if(['ov', 'df', 'rv'].includes(version) === false){
						this.printErrorMsg(".getByGuiTag(mod, skin, version) - version as 'ov', 'df' or 'rv' allowed");
			    		return false;
					} 
				} else {
					this.printErrorMsg(".getByGuiTag(mod, skin, version) - version as string required");
		    		return false;				
				}
				
				let pattern = getByGuiTagPattern.replace('${mod}', mod).replace('${skin}', skin).replace('${version}', version);
				return this.get(pattern, true);
			},
	
			type : function (data, prototype) {
		        if (typeof (data) === 'undefined') {
		            return undefined;
		        } else if (data === null) {
		            return undefined;
		        } else {
		            let 
		            	context = data.constructor.toString().trim();
		            
		            if(context.indexOf('function') !== -1) {
		            	context = context.substring(8, context.indexOf('(')).trim();
		            } else if (context.indexOf('class') !== -1) {
		            	context = context.substring(6, context.indexOf('{')).trim();
		            }
		            
		            return context;
		        }
		    },
	
		    event : function (domElement, eventType, callback) {
		    	if(this.type(domElement) === undefined){
		    		this.printErrorMsg(".event(domElement, eventType, callback) - domElement is undefined");
		    		return false;
		    	}
	
		    	if(this.type(eventType) !== 'String'){
		    		this.printErrorMsg(".event(domElement, eventType, callback) - eventType must be a string, [" + this.type(eventType) + "] given instead");
		    		return false;
		    	}
	
		    	if(this.type(eventType) === 'String' && eventType.length < 1){
		    		this.printErrorMsg(".event(domElement, eventType, callback) - eventType must be a not emtpy string");
		    		return false;
		    	}
	
		    	if(this.type(callback) === undefined){
		    		this.printErrorMsg(".event(domElement, eventType, callback) - you need to specify callback function");
		    		return false;
		    	}
	
				if(this.type(callback) !== 'Function'){
					this.printErrorMsg(".event(domElement, eventType, callback) - callback must be a function, [" + this.type(callback) + "] given instead");
					return false;
				}
	
		        if (this.type(domElement.addEventListener) !== undefined){
		            domElement.addEventListener(eventType, callback);
		        } else if (this.type(domElement.attachEvent) !== undefined){
		        	domElement.attachEvent("on" + eventType, callback);
		        }
	
		        return true;
		    },
	
		    each : function (object, callback) {
		    	if(this.type(object) === undefined){
		    		this.printErrorMsg(".each(object, callback) - element is undefined");
		    		return false;
		    	}
	
				if(this.type(callback) !== 'Function'){
					this.printErrorMsg(".each(object, callback) - callback must be a function, [" + this.type(callback) + "] given instead");
					return false;
				}
	
		        let
		            type = this.type(object),
		            len = object.length;
	
		        if(type === 'String' || type === 'Array' || type === 'DOMTokenList'){
		            for (let i = 0; i < len; i++) {
		            	callback(object[i], i, this);
		            }
		        }
	
		        if (type === 'NodeList' || type === 'HTMLCollection') {
		            for (let i = 0; i < len; i++) {
		                callback(object.item(i), i, this);
		            }
		        }
	
		        if (type === 'Object') {
		        	for (let i in object) {
		                callback(object[i], i, this);
		            }
		        }
		    },
	
		    ajax: function (options) {
	            if (this.type(options) !== 'Object') {
	                this.printErrorMsg(".ajax() - function parameter must be object like {url:'hostName', method: 'post',  callback : function(){}}");
	                return false;
	            }
	
	            if (options.hasOwnProperty('url') === false) {
	                this.printErrorMsg(".ajax() - options parameter must contain url like {url:'hostName', method: 'post',  callback : function(){}}");
	                return false;
	            } else {
	                if (this.type(options.url) !== 'String') {
	                    this.printErrorMsg(".ajax() - options parameter url must be a string");
	                    return false;
	                }
	
	                if (this.type(options.url) === 'String' && options.url.length < 1) {
	                    this.printErrorMsg(".ajax() - options parameter url must be a not empty string");
	                    return false;
	                }
	            }
	
	            if (options.hasOwnProperty('method') === false) {
	                this.printErrorMsg(".ajax() - options parameter must contain method like {url:'hostName', method: 'post',  callback : function(){}}");
	                return false;
	            } else {
	                if (this.type(options.method) !== 'String') {
	                    this.printErrorMsg(".ajax() - options parameter method must be a string");
	                    return false;
	                }
	
	                if (this.type(options.method) === 'String' && options.method.length < 1) {
	                    this.printErrorMsg(".ajax() - options parameter method must be a not empty string");
	                    return false;
	                }
	
	                let methodAllowed = false;
	
	                for (let i = 0; i < allowedRequestMethod.length; i++) {
	                    if (options.method.toLowerCase() === allowedRequestMethod[i]) {
	                        methodAllowed = true;
	                        break;
	                    }
	                }
	
	                if (methodAllowed === false) {
	                    this.printErrorMsg(".ajax() - unknown request method [" + options.method + "]. allowed request methods are: " + allowedRequestMethod.join());
	                    return false;
	                }
	            }
	
	            if (options.hasOwnProperty('callback') === false) {
	                this.printErrorMsg(".ajax() - options parameter must contain callback function like {url:'hostName', method: 'post',  callback : function(){}}");
	                return false;
	            } else {
	                if (this.type(options.callback) !== 'Function') {
	                    this.printErrorMsg(".ajax() - options parameter callback must be a valid function");
	                    return false;
	                }
	            }
	
	            if(options.hasOwnProperty('data') === true && this.type(options.data) !== 'String'){
	                this.printErrorMsg(".ajax() - data parameter must be string, no matter xml or json");
	                return false;
	            }
	
	            let
	                url = options.url,
	                method = options.method,
	                callback = options.callback,
	                data = options.data,
	                headers = options.headers,
	                xhr;
	
	            if (window.XMLHttpRequest) {
	                xhr = new XMLHttpRequest();
	            } else if (window.ActiveXObject) {
	                xhr = new ActiveXObject("Microsoft.XMLHTTP");
	            }
	
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState === 4 && xhr.status === 200) {
	                    callback(xhr.responseText);
	                }
	            }
	
	            try {
	                xhr.open(method, url, true);
	            } catch (DOMException) {
	                this.printErrorMsg(".ajax() - " + DOMException);
	                return false;
	            }
	
	            if(this.type(headers) !== undefined && this.type(headers) === 'Object'){
	                this.each(headers, function(headerValue, headerKey){
	                    xhr.setRequestHeader(headerKey,headerValue);
	                });
	            }
	
	            try {
	                if (this.type(data) !== undefined) {
	                    xhr.send(data);
	                } else {
	                    xhr.send();
	                }
	            } catch (DOMException) {
	                this.printErrorMsg(".ajax() - " + DOMException);
	                return false;
	            }
	
	            return true;
	        },
	
	        setLcItem: function(key, value, asSession = false) {
	        	if(this.type(localStorage) !== undefined && this.type(sessionStorage) !== undefined){
					if(this.type(key) === undefined){
						this.printErrorMsg(".setLcItem(key, value) - key must be defined");
						return false;
					} else if(this.type(key) !== 'String'){
						this.printErrorMsg(".setLcItem(key, value) - key must be string, [" + this.type(key) + "] given instead");
						return false;
					} else if(this.type(key) === 'String' && this.trim(key) === ''){
						this.printErrorMsg(".setLcItem(key, value) - key must be not empty string");
						return false;
					}
	
					if(this.type(value) === undefined){
						this.printErrorMsg(".setLcItem(key, value) - value must be defined");
						return false;
					} else if(this.type(value) !== 'String'){
						this.printErrorMsg(".setLcItem(key, value) - value must be string, [" + this.type(value) + "] given instead");
						return false;
					}
	
					if(this.isString(this.getProjectPath()) === false){
						this.printErrorMsg(".setLcItem(key) - domain string is empty or not defined");
						return false;
					}
	
					key = this.md5(this.getProjectPath() + key);
	
					if(asSession === true){
						sessionStorage.setItem(key, value);
					} else {
						localStorage.setItem(key, value);
					}
					
					return true;
	
	        	} else {
	        		this.printErrorMsg(".setLcItem(key, value) - no support for localStorage/sessionStorage object");
	        		return false;
	        	}
	        },
	
	        getLcItem: function(key, asSession = false) {
	        	if(this.type(localStorage) !== undefined && this.type(sessionStorage) !== undefined){
					if(this.type(key) === undefined){
						return localStorage;
					} else if(this.type(key) !== 'String'){
						this.printErrorMsg(".getLcItem(key) - key must be string, [" + this.type(key) + "] given instead");
						return false;
					} else if(this.type(key) === 'String' && this.trim(key) === ''){
						this.printErrorMsg(".getLcItem(key) - key must be not empty string");
						return false;
					}
	
					if(this.isString(this.getProjectPath()) === false){
						this.printErrorMsg(".getLcItem(key) - domain string is empty or not defined");
						return false;
					}
	
					key = this.md5(this.getProjectPath() + key);
	
					if(this.type(localStorage.getItem(key)) === undefined) {
						this.printInfoMsg(".getLcItem(key) - the key [" + key + '] doesnt exists');
						return false;
					} else {
						if(asSession === true){
							return sessionStorage.getItem(key);
						} else {
							return localStorage.getItem(key);
						}
					}
	
	        	} else {
	        		this.printErrorMsg(".getLcItem(key) - no support for localStorage/sessionStorage object");
	        		return false;
	        	}
	        },
	
	        removeLcItem: function(key, asSession = false) {
	        	if(this.type(localStorage) !== undefined && this.type(sessionStorage) !== undefined){
					if(this.type(key) === undefined){
						this.printErrorMsg(".removeLcItem(key) - key must be defined");
						return false;
					} else if(this.type(key) !== 'String'){
						this.printErrorMsg(".removeLcItem(key) - key must be string, [" + this.type(key) + "] given instead");
						return false;
					} else if(this.type(key) === 'String' && this.trim(key) === ''){
						this.printErrorMsg(".removeLcItem(key) - key must be not empty string");
						return false;
					}
	
					if(this.isString(this.getProjectPath()) === false){
						this.printErrorMsg(".removeLcItem(key) - domain string is empty or not defined");
						return false;
					}
	
					key = this.md5(this.getProjectPath() + key);
					
					if(asSession === true) {
						sessionStorage.removeItem(key);
						return true;
					} else {
						localStorage.removeItem(key);
						return true;
					}	
	        	} else {
	        		this.printErrorMsg(".removeLcItem(key) - no support for localStorages/sessionStorage object");
	        		return false;
	        	}
	        },
	
	        getLcLength: function() {
	        	if(this.type(localStorage) !== undefined){
	        		return localStorage.length;
	        	} else {
	        		this.printErrorMsg(".getLcLength() - no support for localStorage object");
	        		return false;
	        	}
	        },
	
	        clearLc: function() {
	        	if(this.type(localStorage) !== undefined){
					localStorage.clear();
					return true;
	        	} else {
	        		this.printErrorMsg(".getLcItem(key) - no support for localStorage object");
	        		return false;
	        	}
	        },
	
		    jsonParse: function(str) {
		    	if(this.isString(str) === false){
		    		this.printErrorMsg(".parseJson(str) - function parameter must be a string");
		    		return false;
		    	}
	
		    	try{
			    	var json = JSON.parse(str);
			    	return json;
		    	} catch(e) {
		    		return false;
		    	}
		    },
	
		    jsonStringify: function(json){
		    	if(this.type(json) !== 'Object'){
		    		this.printErrorMsg(".jsonStringify(json) - function parameter must be a JSON");
		    		return false;
		    	}
	
		    	try{
			    	var str = JSON.stringify(json);
			    	return str;
		    	} catch(e) {
		    		return false;
		    	}
		    },
	
		    isJson: function(str){
		    	try{
			    	var json = JSON.parse(str);
			    	return (typeof json === 'object');
		    	} catch(e) {
		    		return false;
		    	}
		    },
	
	        assignTpl: function(data){
	        	if(this.type(data) !== 'Object'){
					this.printErrorMsg('.assignTpl(data) data must be an object or json like: {"tag": "div","tagData": "div content","tagAttr": {"id" : "jwtpl-dataLink"}}');
					return false;
	        	}
	
	        	if(data.hasOwnProperty('tag') === false){
					this.printErrorMsg('.assignTpl(data) data must have at least tag property like: {"tag": "div","tagData": "div content","tagAttr": {"id" : "jwtpl-dataLink"}}');
					return false;
	        	}
	
	        	var tpl = tplPrototype;
	
	        	this.each(data, function(data, key, _this){
	        		if(key === 'tag') {
	        			tpl = tpl.replace(/#{tag}/g, data);
	        		}
	
	        		if(key === 'tagData'){
	        			tpl = tpl.replace("#{data}", data);
	    			}
	
	    			if(key === 'tagAttr'){
	    				var attr = '';
	    				_this.each(data, function(d, n){
	    					attr += " " + n + '="' + d +'"';
	    				});
	    				tpl = tpl.replace("#{attr}", attr);
	    			}
	        	});
	
	        	tpl = tpl.replace("#{attr}", '');
	        	return tpl;
	        },
	
	        getModal: function(text, title) {
	        	if(this.isString(text) === false){
					this.printErrorMsg('.getModal(text, title) - text parameter must be a not empty string');
					return false;
	        	}
	
	        	if(this.type(title) !== undefined && this.isString(title) === false){
					this.printErrorMsg('.getModal(text, title) - text parameter must be a not empty string');
					return false;
	        	}
	
	        	var
	        		body,
					modal,
					titleBlock,
					textBlock,
					closeIcon;
	
	        	if(this.type(title) !== undefined){
	            	titleBlock = this.assignTpl({
	    				'tag': 'h3',
	    				'tagData': title,
	    				'tagAttr': {
	    					'class': 'jwtpl-sysModal-title'
	    				}
	    			});
	        	}
	
	        	closeIcon = this.assignTpl({
					'tag': 'span',
					'tagData': '',
					'tagAttr': {
						'class': 'jwtpl-gc-etclose jwtpl-sysModal-closeIcon'
					}
				});
	
	        	textBlock = this.assignTpl({
					'tag': 'div',
					'tagData': text,
					'tagAttr': {
						'class': 'jwtpl-sysModal-text'
					}
				});
	
	        	if(this.type(titleBlock) !== undefined) {
	    			modal = this.assignTpl({
	    				'tag': 'div',
	    				'tagData': closeIcon + titleBlock + textBlock,
	    				'tagAttr': {
	    					'class': 'jwtpl-sysModal-inner fadeIn'
	    				}
	    			});
	        	} else {
	    			modal = this.assignTpl({
	    				'tag': 'div',
	    				'tagData': closeIcon + textBlock,
	    				'tagAttr': {
	    					'class': 'jwtpl-sysModal-inner fadeIn'
	    				}
	    			});
	        	}
	
				modal = this.parseHTML(modal);
				if(this.type(modal) !== 'HTMLCollection') {
					this.printErrorMsg('.getModal(text, title) - cannot parse given html. error');
					return false;
				}
	
				body = this.get('body');
				if(body.length > 0){
					this.event(body[0], 'click', function(e){
						if(JwTplJsLib.hasClass(e.target, 'jwtpl-gc-etclose') === true){
							var modal = e.target.parentElement;
							if(JwTplJsLib.type(modal) !== undefined){
								try {
									body[0].removeChild(modal);
									return true;
								} catch(ex){
									JwTplJsLib.printErrorMsg('.getModal(text, title) - ' + ex);
									return false;
								}
	
							} else {
								this.printErrorMsg('.getModal(text, title) - no close trigger tag found. error');
								return false;
							}
						}
					});
				} else {
					this.printErrorMsg('.getModal(text, title) - no body tag found. error');
					return false;
				}
	
				$('body').prepend(modal);
	        },
	
			isTooltipOpen: function() {
				return this.get('.jwtpl-sysTooltip-inner', true).length > 0;
			},
	
			tooltip: function(options) {
				if(this.isString(options) === false && this.isObject(options) === false){
		    		this.printErrorMsg(".tooltip(options) - options must either string or object");
		    		return false;
		    	}
	
				if(this.isObject(options) === true && options.hasOwnProperty('text') === false){
		    		this.printErrorMsg(".tooltip(options) - options must have at least text property");
		    		return false;
		    	}
	
				if(options.hasOwnProperty('text') === true && this.isString(options.text) === false){
					this.printErrorMsg(".tooltip(options) - text property must be string");
		    		return false;
				}
				
				let body = this.get('body');
				
				if(options.hasOwnProperty('noKill') === true && this.isBool(options.noKill) === true && options.noKill === true) {
						
				} else {
					let existingTooltips = this.get('.jwtpl-sysTooltip-inner', true);
					
					if (existingTooltips.length > 0) {
						this.each(existingTooltips, (it) => {
							it.remove();
						});
					}
				}
							
				if(body.length > 0) {
					let
						tooltip = document.createElement('div'),
						closeIcon = document.createElement('div'),
						text = document.createElement('span'),
						type = '';
					
					this.style(body[0], 'position', 'relative');
					this.addClass(tooltip, 'jwtpl-gc-hidden1 jwtpl-sysTooltip-inner');
					this.addClass(closeIcon, 'jwtpl-gc-etclose jwtpl-sysTooltip-close');
					this.addClass(text, 'jwtpl-sysTooltip-text');
	
					if(this.isString(options) === true){
						text.innerText = options;
						tooltip.appendChild(text);
					} 
					
	
					if(this.isObject(options) === true) {
						if(options.hasOwnProperty('title') && this.type(options.title) === 'String'){
							let msgTitle = document.createElement('span');
							this.addClass(msgTitle, 'jwtpl-sysTooltip-title');
							if(this.isString(options.title) !== false){
								msgTitle.innerText = options.title
							} else {
								msgTitle.innerText = 'Information';	
							}
							tooltip.appendChild(msgTitle);
						}
						
						if(options.hasOwnProperty('xPos') && this.isInt(options.xPos) === true){
							if(options.hasOwnProperty('clickMode') && options.clickMode === true){
								tooltip.style.left = (options.xPos + 10) + 'px';
							} else {
								tooltip.style.left = options.xPos + 'px';	
							}	
						} else {
							tooltip.style.left = '50%';		
							this.style(tooltip, 'transform', 'translateX(-50%)');
						}
						
						if(options.hasOwnProperty('yPos') && this.isInt(options.yPos) === true) {
							if(options.hasOwnProperty('clickMode') && options.clickMode === true){
								tooltip.style.top = (options.yPos + 10) + 'px';
							} else {
								tooltip.style.top = options.yPos + 'px';	
							}
						} else {
							tooltip.style.top = 20 + 'px';
						}
						
						if(options.hasOwnProperty('type') && this.isString(options.type) === true) {
							type = options.type;
							type = this.trim(type);
							type = type.toLowerCase();
							type = this.ucFirst(type);
						} else {
							type = 'Unknown';
						}
						
						if(options.hasOwnProperty('link') === true){
							let link = document.createElement('a');
	
							if(options.link.hasOwnProperty('href') === true && this.isString(options.link.href) === true) {
								link.href = options.link.href;
							} else {
								link.href = '#';
							}
							
							if(options.link.hasOwnProperty('target') === true && this.isString(options.link.target) === true) {
								if(['_blank', '_self', '_parent', '_top'].includes(options.link.target) === true) {
									link.target = options.link.target;
								} else {
									link.target = '_self';
								}
							} else {
								link.target = '_self';
							}
							
							if(options.link.hasOwnProperty('text') === true && this.isString(options.link.text) === true) {
								link.innerText = options.link.text;
							} else {
								link.innerText = 'Link';
							}
							
							if(options.link.hasOwnProperty('title') === true && this.isString(options.link.title) === true) {
								link.title = options.link.title;
							} else {
								link.title = link.innerText;
							}
							
							if(options.link.hasOwnProperty('onclick') === true && this.isString(options.link.onclick) === true) {
								link.setAttribute('onclick', options.link.onclick);
							} 
							
							this.addClass(link, 'jwtpl-sysTooltip-link');
							tooltip.appendChild(link);
						}
	
						text.innerHTML = options.text;
						tooltip.appendChild(text);
					}
	
					this.event(closeIcon, 'click', (e) => {
						tooltip.remove();
					});
					
					body[0].insertAdjacentElement('beforeend', tooltip);
					tooltip.appendChild(closeIcon);
					this.removeClass(tooltip, 'jwtpl-gc-hidden1'); 
					this.addClass(tooltip, 'jwtpl-sysTooltip-type' + type);
					
					return true;
				} else {
					return false;
				}
			},
			
			closeTooltip: function() {
				let tooltip = this.get('.jwtpl-sysTooltip-inner', true);
				
				if(tooltip.length > 0) {
					tooltip[0].remove();
					return true;
				} else {
					return false;
				}
			},
			
			easyTooltip: function(text, x = 0, y = 0, noKill = false) {
				this.tooltip({
					text: text,
					xPos: x, 
					yPos: y,
					noKill: noKill 
				});
			},
	
			getDntStatus : function(){
				var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
				if(dnt === '1' || dnt === 'yes'){
					return true;
				} else {
					return false;
				}
			},
	
			setCookie : function(cookieName, cookieValue, exprireDays){
				if(this.isLiveHost() === false){
					if(this.type(cookieName) === undefined){
						this.printErrorMsg(".setCookie(cookieName, cookieValue, expriredAt) - cookieName must be defined");
						return false;
					} else if(this.type(cookieName) === 'String' && this.trim(cookieName) === ''){
						this.printErrorMsg(".setCookie(cookieName, cookieValue, expriredAt) - cookieName must be not empty string");
						return false;
					}
	
					if(this.type(cookieValue) === undefined){
						this.printErrorMsg(".setCookie(cookieName, cookieValue, expriredAt) - cookieValue must be defined");
						return false;
					} else if(this.type(cookieValue) === 'String' && this.trim(cookieValue) === ''){
						this.printErrorMsg(".setCookie(cookieName, cookieValue, expriredAt) - cookieValue must be not empty string");
						return false;
					}
				}
	
				var
					expires,
					date = new Date();
	
				if(this.type(exprireDays) !== undefined && this.type(exprireDays) === 'Number' && exprireDays > 0){
					date.setTime(date.getTime() + (exprireDays * 24 * 60 * 60 * 1000));
					expires = "expires=" + date.toUTCString();
				} else {
					date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
					expires = "expires=" + date.toUTCString();
				}
				
				document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/;samesite=strict;";
				return true;
			},
	
			getCookie : function(cookieName){
				if(this.type(cookieName) !== undefined && this.type(cookieName) === 'String' && cookieName.length > 0){
					var cookies = document.cookie;
					if(this.type(cookies) !== undefined && this.type(cookies) === 'String' && cookies.length > 0){
						var cookieArray = cookies.split(';');
						for(var i = 0; i < cookieArray.length;i++){
							var cookieData = cookieArray[i].split('=');
							if(this.trim(cookieData[0]) === this.trim(cookieName.trim())){
								if(this.type(cookieData[1]) !== undefined && this.type(cookieData[1]) === 'String' && cookieData[1].length > 0){
									return decodeURIComponent(cookieData[1]);
								}
							}
						}
					}
				} else {
					this.printErrorMsg(".getCookie(cookieName) - cookieName must be a not empty string");
				}
				return '';
			},
	
		    hasCookie : function(cookieName){
		    	return this.getCookie(cookieName) !== '';
		    },
	
			deleteCookie : function(cookieName) {
				if(this.type(cookieName) !== undefined && this.type(cookieName) === 'String' && cookieName.length > 0){
					document.cookie = cookieName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				}
				return true;
			},
	
		    isCookieEnabled : function(){
		    	return navigator.cookieEnabled;
		    },
	
		    isCookieFull : function(size){
		    	var length = document.cookie.length;
		    	if(this.isInt(size) === true){
		    		return (length + size) > 3000;
		    	} else {
		    		return length > 3000;
		    	}
		    },
	
		    style : function (element, prop, val) {
		    	if(this.type(element) === undefined){
		    		this.printErrorMsg(".style(domElement, cssProperty, cssValue) - domElement is undefined");
		    		return false;
		    	}
	
		    	if(this.type(element.style) === undefined){
		    		this.printErrorMsg(".style(domElement, cssProperty, cssValue) - domElement has no CSSStyleDeclaration property");
		    		return false;
		    	}
	
		    	if(this.type(prop) === undefined){
		    		this.printErrorMsg(".style(domElement, cssProperty, cssValue) - you need to specify cssProperty e.g backgroud-color");
		    		return false;
		    	}
	
		    	if(this.type(prop) === 'Object'){
		    		this.each(prop, function(property, value){
		    			element.style.setProperty(property, value);
		    		});
		    		return true;
		    	}
	
		    	if(this.type(prop) !== 'String'){
		    		this.printErrorMsg(".style(domElement, cssProperty, cssValue) - css cssProperty must be a string, [" + this.type(prop) + "] given instead");
		    		return false;
		    	}
	
		    	if(this.type(val) === undefined){
		    		this.printErrorMsg(".style(domElement, cssProperty, cssValue) - you need to specify cssValue value e.g 10px");
		    		return false;
		    	}
	
		    	if(this.type(val) !== 'String'){
		    		this.printErrorMsg(".style(domElement, cssProperty, cssValue) - css cssValue must be a string, [" + this.type(val) + "] given instead");
		    		return false;
		    	}
	
		    	element.style.setProperty(prop, val);
	
		    	return true;
		    },
	
		    show : function (element) {
		    	if(this.type(element) === undefined){
		    		this.printErrorMsg(".show(element) - element is undefined");
		    		return false;
		    	}
	
		    	var displayProp;
	
		    	if(element.hasAttribute('class') === true){
		    		if(this.isString(element.getAttribute('class')) === true){
			    		var
			    			id = this.md5(element.getAttribute('class')),
			    			item = getPropStorageItem(id);
	
			    		if(this.type(item) !== undefined && this.type(item.display) !== undefined && this.isString(item.display)){
			    			displayProp = item.display;
			    		}
		    		}
		    	}
	
		    	if(this.type(displayProp) !== undefined) {
		    		return this.style(element, 'display', displayProp);
		    	} else {
			        return this.style(element, 'display', 'block');
		    	}
		    },
	
		    hide : function (element) {
		    	if(this.type(element) === undefined){
		    		this.printErrorMsg(".hide(element) - element is undefined");
		    		return false;
		    	}
	
		    	if(element.hasAttribute('class') === true){
		    		var elementClass = element.getAttribute('class');
		    		if(this.isString(elementClass) === true){
			    		var
		    				id = this.md5(elementClass),
		    				cssProps = this.getCssProps(element);
	
				    	if(cssProps !== false && this.isString(cssProps.getPropertyValue('display')) !== false){
					    	setPropStorageItem(id, {'class': elementClass, 'display': cssProps.getPropertyValue('display')});
				    	}
		    		}
		    	}
	
		    	return this.style(element, 'display', 'none');
		    },
	
		    addClass: function (element, name) {
		    	if(this.type(element) === undefined){
		    		this.printErrorMsg(".addClass(domElement, className) - domElement is undefined");
		    		return false;
		    	}
	
		    	if(this.type(name) === undefined){
		    		this.printErrorMsg(".addClass(domElement, className) - you need to specify className");
		    		return false;
		    	}
	
		    	if(this.type(name) !== 'String'){
		    		this.printErrorMsg(".addClass(domElement, className) - className must be a string, [" + this.type(name) + "] given instead");
		    		return false;
		    	}
	
		    	if(this.type(element.className) === undefined){
		    		this.printErrorMsg(".hasClass(domElement, className) - element has no css class property or is undefined");
		    		return false;
		    	}
	
		    	var
		            i,
		            classList,
		            classParam;
	
		    	classList = element.className.split(" ");
	            classParam = name.split(" ");
	
	            for (i = 0; i < classParam.length; i++) {
	                if (classList.indexOf(classParam[i]) === -1) {
	                    element.className += " " + classParam[i];
	                }
	            }
	            element.className = element.className.trim();
	
	            return true;
		    },
	
		    removeClass: function (element, name) {
		    	if(this.type(element) === undefined){
		    		this.printErrorMsg(".removeClass(domElement, className) - domElement is undefined");
		    		return false;
		    	}
	
		    	if(this.type(name) === undefined){
		    		this.printErrorMsg(".removeClass(domElement, className) - you need to specify className");
		    		return false;
		    	}
	
		    	if(this.type(name) !== 'String'){
		    		this.printErrorMsg(".removeClass(domElement, className) - className must be a string, [" + this.type(name) + "] given instead");
		    		return false;
		    	}
	
		    	if(this.type(element.className) === undefined){
		    		this.printErrorMsg(".hasClass(domElement, className) - element has no css class property or is undefined");
		    		return false;
		    	}
	
		    	var
		            i,
		            classList,
		            classParam;
	
	            classList = element.className.split(" ");
	            classParam = name.split(" ");
	            for (i = 0; i < classParam.length; i++) {
	                while (classList.indexOf(classParam[i]) > -1) {
	                    classList.splice(classList.indexOf(classParam[i]), 1);
	                }
	            }
	
	            element.className = classList.join(" ");
	            return true;
		    },
	
		    hasClass : function(element, name){
		    	if(this.type(element) === undefined){
		    		this.printErrorMsg(".hasClass(domElement, className) - domElement is undefined");
		    		return false;
		    	}
	
		    	if(this.type(name) === undefined){
		    		this.printErrorMsg(".hasClass(domElement, className) - you need to specify className");
		    		return false;
		    	}
	
		    	if(this.type(name) !== 'String'){
		    		this.printErrorMsg(".hasClass(domElement, className) - className must be a string, [" + this.type(name) + "] given instead");
		    		return false;
		    	}
	
		    	if(this.type(element.className) === undefined){
		    		this.printErrorMsg(".hasClass(domElement, className) - element has no css class property or is undefined");
		    		return false;
		    	}
	
		    	var
		    		hasClass = false,
		    		classes = element.className.split(" ");
	
	    		for(var i=0; i<classes.length; i++){
	    			if(classes[i] === name){
	    				hasClass = true;
	    				break;
	    			}
	    		}
		    	return hasClass;
		    },
	
		    toggleClass : function(element, name) {
		    	if(this.type(element) === undefined){
		    		this.printErrorMsg(".toggleClass(domElement, className) - domElement is undefined");
		    		return false;
		    	}
	
		    	if(this.type(name) === undefined){
		    		this.printErrorMsg(".toggleClass(domElement, className) - you need to specify className");
		    		return false;
		    	}
	
		    	if(this.type(name) !== 'String'){
		    		this.printErrorMsg(".toggleClass(domElement, className) - className must be a string, [" + this.type(name) + "] given instead");
		    		return false;
		    	}
	
		    	if(this.type(element.className) === undefined){
		    		this.printErrorMsg(".toggleClass(domElement, className) - element has no css class property or is undefined");
		    		return false;
		    	}
	
		    	if(this.hasClass(element, name) === true){
		    		this.removeClass(element, name);
		    		return true;
		    	} else {
		    		this.addClass(element, name);
		    		return true;
		    	}
		    	return false;
		    },
	
		    toggle : function(element){
		    	if(this.type(element) === undefined){
		    		this.printErrorMsg(".toggle(domElement) - domElement is undefined");
		    		return false;
		    	}
	
		    	if(this.type(element.style) === undefined){
		    		this.printErrorMsg(".toggle(domElement) - domElement has no CSSStyleDeclaration property");
		    		return false;
		    	}
	
		    	try{
			    	if(window.getComputedStyle(element).display === "none"){
						return this.show(element);
					} else {
						return this.hide(element);
					}
		    	} catch(err){
		    		this.printErrorMsg(".toggle(domElement) - cannot invoke window.getComputedStyle(element) on element. exception: " + err);
		    		return false;
		    	}
	
		    	return false;
		    },
	
		    getCssProps : function(element, property) {
		    	if(this.type(element) === undefined){
		    		this.printErrorMsg(".getCssProps(element,property) - element is undefined");
		    		return false;
		    	}
		    	
		       	try {
			    	if(this.type(property) !== undefined){
			    		return window.getComputedStyle(element).getPropertyValue(property);	
			       	} else {
			       		return window.getComputedStyle(element);
			       	}
		    		 
		    	} catch(err) {
		    		this.printErrorMsg(".getCssProps(element,property) - " + err);
		    		return false;
		    	}
		    },
		    
		    getCoords : function(element){
		    	if(this.type(element) === undefined){
		    		this.printErrorMsg(".getCoods(domElement) - domElement is undefined");
		    		return false;
		    	}
	
		    	try {
		    		var e = element.getBoundingClientRect();
		    	} catch(err) {
		    		this.printErrorMsg(".getCoods(domElement) - " + err);
		    		return false;
		    	}
	
				return {
					top: e.top + pageYOffset,
					left: e.left + pageXOffset
				};
		    },
	
		    trim : function(str){
		    	if(this.type(str) !== 'String'){
		    		this.printErrorMsg(".trim() - function parameter must be a string");
		    		return '';
		    	} else {
		    		return str.replace(/^\s+|\s+$/g,'');
		    	}
		    },
		    
		    modifyStrSeoUrl : function(url, replaceList) {
		    	if(this.type(url) !== 'String'){
		    		this.printErrorMsg(".modifyUrl(url) - function parameter must be a string");
		    		return '';
		    	} else {
		    		replaceList = replaceList || {};
		    		url = url.toLowerCase();
		    		
		    		if(replaceList.hasOwnProperty(url) === true && this.type(replaceList[url]) !== undefined) {
		    			url = replaceList[url];
		    		}
		    		
		    		url = url.replaceAll('ä','ae').replaceAll('ü', 'ue').replaceAll('ö', 'oe').replaceAll('ß', 'ss');
		    		url = url.replaceAll(' ','-');
		    		url = url.replace(/[^a-z0-9]/g,'-');
		    		url = url.replace(/[-]{2,}/g,'-');
	
		    		if(url.charAt(0) === '-') {
		    			url = url.substring(1, url.length);
		    		}
		    		
		    		if(url.charAt(url.length - 1) === '-') {
		    			url = url.substring(0, url.length - 1);
		    		}
	
		    		return url;
		    	}
		    },
		    
		    ucFirst : function(str) {
		    	if(this.type(str) !== 'String'){
		    		this.printErrorMsg(".ucFirst(str) - function parameter must be a string");
		    		return '';
		    	} else {
		    		return str.charAt(0).toUpperCase() + str.slice(1);
		    	}
		    },
		    
		    ucWords : function(str, toUpper, toLower) {
		    	if(this.type(str) !== 'String'){
		    		this.printErrorMsg(".ucWords(str, toUpper, toLower) - function parameter must be a string");
		    		return '';
		    	} else {
	    			toUpper = toUpper || [];
	    			toLower = toLower || [];
	    			
		    		let 
		    			stringArr = str.split(' '),
		    			result = [];
		    		
		    		this.each(stringArr, function(item, index, _this){
		    			if(_this.isString(item) === true && _this.trim(item).length > 0) {
		    				let sm = _this.trim(item.toLowerCase());
		    				if(toUpper.includes(sm) === true) {
		    					item = item.toUpperCase();
		    				} else if(toLower.includes(sm) === true) {
		    					item = item.toLowerCase();
		    				} else {
		    					item = _this.ucFirst(item);
		    				}
		    				
		    				result.push(item);
		    			}
		    		});
	
		    		return result.join(' ');
		    	}
		    },
	
			mapCfg: function(cfg, key, fb) {
				if(this.isObject(cfg) === false){
					this.printErrorMsg('.extractCfg(cfg, key, fb) - cfg must be object. check [' + this.getProjectPath() + 'resource/js/config.js]');
					return fb;
				}
				
				if(this.isObject(cfg) === true && this.len(cfg) == 0){
					return fb;
				}
				
				if(this.isString(key) === false) {
					this.printErrorMsg('.extractCfg(cfg, key, fb) - key must be string');
					return fb;
				}
					
				let prop = key;
				prop = prop.split('.');
	
				if(prop.length > 2) {
					this.printErrorMsg('.extractCfg(cfg, key, fb) - complexe structure for key = [' + key + ']. example: noli.itemList, obo.title');
					return fb;
				}
				
				if(prop.length == 2) {
					return (this.type(cfg[prop[0]]) !== undefined && this.type(cfg[prop[0]][prop[1]]) !== undefined) ? cfg[prop[0]][prop[1]] : fb;	
				} else {
					return fb;
				}
			},
	
		    parseHTML: function(str) {
		    	if(this.isString(str) !== true){
		    		this.printErrorMsg(".parseHTML() - function parameter must be a string");
		    		return '';
		    	}
	
		    	var tmp = document.implementation.createHTMLDocument();
		    	tmp.body.innerHTML = str;
		    	return tmp.body.children;
	    	},
	
	    	parseInt: function(obj){
	    		if(this.type(obj) === undefined){
	    			this.printErrorMsg(".parseInt(obj) - function parameter is undefined");
	    			return false;
	    		}
	    		var parse = parseInt(obj);
	    		return isNaN(parse) === false ? parse : false;
	    	},
	
	    	parseFloat: function(obj){
	    		if(this.type(obj) === undefined){
	    			this.printErrorMsg(".parseFloat(obj) - function parameter is undefined");
	    			return false;
	    		}
	    		var parse = parseFloat(obj);
	    		return isNaN(parse) === false ? parse : false;
	    	},
	    	
	    	isBool: function(element) {
	    		return this.type(element) === 'Boolean';
	    	},
	
		    isNull: function(element){
		    	return this.type(element) === undefined;
		    },
	
		    isNumber: function(number){
		    	return isNaN(number) === false;
		    },
	
		    isInt : function(int){
		    	return this.type(int) === 'Number' && isFinite(int) && int === parseInt(int);
		    },
	
		    isFloat : function(float){
		    	return this.type(float) === 'Number' && isFinite(float) && float === parseFloat(float);
		    },
			
			//@deprecated
		    isString: function(string){
		    	return this.type(string) === 'String' && string.length > 0;
		    },
	
		    isStringNotEmpty: function(string){
		    	return this.type(string) === 'String' && string.length > 0;
		    },
	
		    isStringRaw: function(string){
		    	return this.type(string) === 'String';
		    },
	
		    isArray : function(array){
		    	return this.type(array) === 'Array' && this.type(array.length) !== undefined;
		    },
	
		    isFunction : function(fn){
		    	return this.type(fn) === 'Function';
		    },
	
		    isObject : function(obj){
		    	return this.type(obj) === 'Object';
		    },
	
			isDomObject: function(ele) {
				return ele instanceof Element || ele instanceof HTMLDocument; 
			},
	
		    isMap: function(map) {
		    	return this.type(map) === 'Map';
		    },
	
		    isMobile : function(){
				let 
					check = false,
					body = this.get('body');
			
				if(body.length > 0 && this.hasClass(body[0], 'jwtpl-sys-bodyAppDvM1') === true) {
					check = true;
				} else if(body.length > 0 && this.hasClass(body[0], 'jwtpl-sys-bodyAppDvM0') === true) {
					check = false;
				} else {
					(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
				}
		    	return check;
		    },
	
			isPortrait: function(){
				let body = this.get('body');
				return body.length > 0 ? this.hasClass(body[0], op) : false;
			},
			isLandscape: function(){
				let body = this.get('body');
				return body.length > 0 ? this.hasClass(body[0], ol) : false;		
			},
		    
		    isIos: function() {
		    	return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
		    },
		    
		    isIphone: function() {
		    	return /iPhone/i.test(navigator.platform);
		    },
	
		    isStartPage: function() {
		    	var 
		    		body = this.get('body');
		    	
		    	if(body.length > 0) {
		    		if(this.hasClass(body[0], 'jwtpl-sys-bodyPtHp') === true) {
		    			return true;
		    		} else {
		    			return false;
		    		}
		    	} else {
		    		return false;
		    	}
		    },
	
		    len: function(obj) {
		    	if(this.type(obj) === 'String' || this.isArray(obj) === true) {
		    		return obj.length;
		    	} else if(this.isObject(obj) === true) {
		    		return Object.keys(obj).length;
		    	} else {
		    		this.printInfoMsg('.len() - there is no length function for type = [' + this.type(obj) + ']');
		    	}
		    },
	
		    empty: function(domElement) {
		    	if(this.type(domElement) === undefined){
		    		this.printErrorMsg(".empty(domElement) - domElement is undefined");
		    		return false;
		    	}
	
		    	domElement.innerHTML = '';
		    },
	
		    width : function() {
		    	return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		    },
		    
		    height: function(el) {
		    	if(this.type(el) === undefined){
		    		this.printErrorMsg(".height(domElement) - domElement is undefined");
		    		return false;
		    	}
		    	
		    	return this.isNull(el.offsetHeight) === false ? el.offsetHeight : false;
		    },
	
			log: function(descr, modName = '') {
				if(this.isString(descr) === false) {
					this.printErrorMsg(".log(descr, modName = '') - descr must be a not emtpy string");
		    		return false;	
				}
				
				let 
					key = '',
					date = Date.now().toString(),
					rand = this.randomize().toString(),
					value = {ts: Date.now(), desc: descr, mod: modName};
				
				key = date + rand + '|' + descr;
				logStorage.set(key, value);
				
				this.printElement(value);
			},
			
			getLog: function(){
				return logStorage.size > 0 ? logStorage : '';
			},
			
			printLog: function(){
				for (const [key, value] of logStorage.entries()) {
				  this.printInfoMsg(key + " :{" + 'ts:' + value.ts  + ', ' + 'desc:' + value.desc  + ', ' + 'mod:' + value.mod  +'}');
				}
			},
			
			randomize: function(count) {
				if(window.crypto) {
					if(this.isInt(count) === false || count < 1 || count > 100) {
						let randArray = new Uint32Array(1);
						window.crypto.getRandomValues(randArray);
						return randArray.length > 0 ? randArray[0] : false;
					} else {
						let randArray = new Uint32Array(count);
						window.crypto.getRandomValues(randArray);
						return randArray;
					}	
				} else {
					return false;
				}
			},
			
			getAppCfg: function() {
				let 
					cfg = '',
					body = this.get('body');
				
				if(body.length > 0) {
				  for(let i=0; i<body[0].classList.length; i++) {
					let curr = body[0].classList[i];
					if(curr.includes('jwtpl-sysDraft-appSpecial') == true) {
						if(curr.includes('Gen') === true) {
							curr = curr.substring(curr.indexOf('Cfg'), curr.indexOf('Gen'));
						} else {
							curr = curr.substring(curr.indexOf('Cfg'), curr.length);
						}
						cfg = curr;
						break;
					}
				  }
				} 
				
				return cfg;
			}, 
			
			getAppGen: function() {
				let 
					gen = '',
					body = this.get('body');
				
				if(body.length > 0) {
				  for(let i=0; i<body[0].classList.length; i++) {
					let curr = body[0].classList[i];
					if(curr.includes('jwtpl-sys-bodyAppCfgGen') == true) {
						curr = curr.substring(curr.indexOf('Gen'), curr.length);
						gen = curr;
						break;
					}
				  }
				} 
				
				return gen;
			}, 
			
			getAppGenAsInt: function() {
				let appGenResult = this.getAppGen();
				return parseInt(appGenResult.replace('Gen',''));		
			}, 
			
			getAppInfo: function(getWhat = '') {
				let 
					iam = {'version': '', 'app': '', 'spuch': ''},
					body = this.get('body');
				
				getWhat = getWhat.toLocaleLowerCase();
				getWhat = this.trim(getWhat);
				
				if(body.length > 0) {
					let classList = body[0].classList;
					classList = Array.of(classList).join(',');
					classList = classList.replaceAll(' ', ',');
					classList += ',';
					if(classList.indexOf(',jwtpl-sys-bodyAppMmNg') !== -1) {
						iam.version = 'v9';
						if(classList.indexOf(',jwtpl-sys-bodyPtViLi,') !== -1) {
							iam.app = 'viewer';
						} else {
							iam.app = 'jobmarket';
						}
					} else {
						iam.version = 'v8';
						if(classList.indexOf(',jwtpl-vw,') !== -1) {
							iam.app = 'viewer';
						} else {
							iam.app = 'jobmarket';
						}
					}
					
					if(iam.version === 'v9'){
						this.each(body[0].classList, (it)=> {
							if(it.indexOf('jwtpl-sys-bodyAppSpuch') !== -1) {
								it = it.split('jwtpl-sys-bodyAppSpuch');
								if(it.length == 2){
									iam.spuch = it[1].toLowerCase();
								}
							}
						});					
					}
				}
				
				if(getWhat === '') {
					return iam;
				} else if(getWhat === 'version') {
					return iam.version;
				} else if(getWhat === 'app'){
					return iam.app;
				} else if(getWhat === 'spuch'){
					return iam.spuch;
				} else {
					return false;
				}
			},
	
		    setBaseHrefUrl: function(baseUrl){
		    	var hasChanged = false;
	
		    	if(this.type(baseUrl) === 'String' && baseUrl.length > 10){
		    		if(baseUrl.indexOf('http://') == 0 || baseUrl.indexOf('https://') == 0 || baseUrl.indexOf('//') == 0){
		    			var	baseTag = this.get('base');
	
		    			if(baseTag.length > 0 &&  this.type(baseTag[0]) !== undefined){
		    				baseTag[0].setAttribute('href', baseUrl);
		    				hasChanged = true;
		    			}
		    		}
		    	}
	
		    	return hasChanged;
		    },
	
		    getBaseHrefUrl: function(){
		    	var
		    		baseHref = '',
		    		baseTag = this.get('base');
	
	    		if(baseTag.length > 0){
	    			if(typeof baseTag[0] !== 'undefined' && baseTag[0].hasAttribute('href') === true && baseTag[0].getAttribute('href').length > 0){
	    				baseHref = baseTag[0].getAttribute('href');
	    			}
		    	}
	
	    		return baseHref;
		    },
	
		    getUrlParameter : function(param){
		    	if(this.type(param) === undefined || this.type(param) !== 'String'){
		    		this.printErrorMsg(".getUrlParameter(param) - param must be a not empty string");
		    		return false;
		    	}
	
		    	if(this.type(window.location.search) !== undefined && window.location.search.length > 0){
		    		var
		    			query = window.location.search.substring(1),
		    			items = query.split("&");
	
		    		for(var i=0; i<items.length; i++){
		    			var pair = items[i].split("=");
		    			if(pair[0] === param){
		    				return pair[1];
		    			}
		    		}
		    	}
		    	return false;
		    },
			
			runMatchedFuncs: function(funcName) {
				if(this.isStringRaw(funcName) === false){
					this.printErrorMsg(".runMatchedFuncs(funcName) - funcName as string required");
					return false;
				}
				
				funcName = this.trim(funcName);
				
				if(funcName.startsWith('jwTplJsLibObjectCallMe_') === true) {
					let func = Object.keys(window).filter(function(el){
						return el.indexOf(funcName) > -1;
					});	
					
					if(func.length > 0) {
						this.each(func, (f) => {
							this.safeCall(f);
						});
						return true;
					} 
				}
				return false;
			},
			
			safeCall: function(funcName, realRet = false, param1 = -1 , param2 = -1, param3 = -1) {
				if(funcName.indexOf('.') !== -1) {
					let split = funcName.split('.');
					
					if(split.length === 2) {
						if(this.type(window[split[0]]) !== undefined && this.type(window[split[0]][split[1]]) !== undefined) {
							try {
								if(realRet === false){						
									if(param1 !== -1 && param2 !== -1 && param3 !== -1) {
										window[split[0]][split[1]](param1, param2, param3);	
									} else if(param1 !== -1 && param2 !== -1) {
										window[split[0]][split[1]](param1, param2);
									} else if(param1 !== -1) {
										window[split[0]][split[1]](param1);
									} else {
										window[split[0]][split[1]]();
									}
									return true;
								} else {
									if(param1 !== -1 && param2 !== -1 && param3 !== -1) {
										return window[split[0]][split[1]](param1, param2, param3);	
									} else if(param1 !== -1 && param2 !== -1) {
										return window[split[0]][split[1]](param1, param2);
									} else if(param1 !== -1) {
										return window[split[0]][split[1]](param1);
									} else {
										return window[split[0]][split[1]]();
									}
								}
							} catch(e){
								return false;
							} 
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					if(this.type(window[funcName]) !== undefined) {
						try {
							if(realRet === false){						
								if(param1 !== -1 && param2 !== -1 && param3 !== -1) {
									window[funcName](param1, param2, param3);	
								} else if(param1 !== -1 && param2 !== -1) {
									window[funcName](param1, param2);
								} else if(param1 !== -1) {
									window[funcName](param1);
								} else {
									window[funcName]();
								}
								return true;
							} else {
								if(param1 !== -1 && param2 !== -1 && param3 !== -1) {
									return window[funcName](param1, param2, param3);	
								} else if(param1 !== -1 && param2 !== -1) {
									return window[funcName](param1, param2);
								} else if(param1 !== -1) {
									return window[funcName](param1);
								} else {
									return window[funcName]();
								}
							}
						} catch(e){
							return false;
						} 
					} else {
						return false;
					}
				}
			},
			
			safeAction: function(callback) {
				try {
					return callback();
				} catch (e) {
					this.printStackTrace(e.toString());
					return false;
				}
			},
			
			getAppGuiForKey: function(key, mode = '') {
				let guiTags = getAppGui();			
				if(guiTags === false){return false;}			
				if(this.isString(key) === false){
					this.printErrorMsg(".getAppGuiForKey(key) - param must be a not empty string");
					return false;
				}
				if(mode == 'skin'){
					return this.type(guiTags.get(key)[0]) !== undefined ?  guiTags.get(key)[0] : false;
				} else if(mode == 'display'){
					return this.type(guiTags.get(key)[1]) !== undefined ?  guiTags.get(key)[1] : false;
				} else {
					return guiTags.has(key) ? guiTags.get(key) : false;		
				}		
			},
			
			hasAppGuiForKey: function(key) {
				return this.getAppGuiForKey(key) !== false ? true : false;
			},
			
			getGuiTagForKey: function(key){
				if(this.isString(key) === false) {
					return false;
				}
				let ele, pattern = guiTagPattern;
				pattern = pattern.replace('#{pattern}', key.toLowerCase());
				ele = this.get(pattern);
				if(ele.length == 1) {		
					return ele[0].getAttribute('data-jwtpl-sys-gui') !== null ? ele[0].getAttribute('data-jwtpl-sys-gui') : false;
				} else {
					return false;
				}
			},
			
			getObjByGuiKey: function(key) {
				let guiTag = this.getGuiTagForKey(key);
				return guiTag !== false ? guiTag.split('|') : false;
			},
			
			getGuiTagList: function () {
				return document.querySelectorAll('[data-jwtpl-sys-gui]');
			},
					
			getGuiTag: function(key, target){
				let attr = '', guiTag = '', tags = [];
								
				if(this.isDomObject(target) === true) {
					attr = target.getAttribute('data-jwtpl-sys-gui');
					if(this.type(attr) === undefined) {
						return false;
					} else {
						guiTag = target.getAttribute('data-jwtpl-sys-gui');
					}
				}
				
				if(this.isString(target) === true) {
					if(target.split('|').length == 9){
						let ele, pattern = guiTagPattern;
						pattern = pattern.replace('#{pattern}', target.toLowerCase());
						ele = this.get(pattern);
						if(ele.length == 1) {
							attr = ele[0].getAttribute('data-jwtpl-sys-gui');
							if(this.type(attr) === undefined) {
								return false;
							} else {
								guiTag = ele[0].getAttribute('data-jwtpl-sys-gui');
							}
						}
					} else {
						try {
							let ele = this.get(target);
							if(ele.length == 1) {
								attr = ele[0].getAttribute('data-jwtpl-sys-gui');
								if(this.type(attr) === undefined) {
									return false;
								} else {
									guiTag = ele[0].getAttribute('data-jwtpl-sys-gui');
								}
							}	
						} catch(e){
							return false;
						}	
					} 
				}
	
				if(guiTag.length > 0){
					let tagCol = new Map();
					tags = guiTag.split('|');
					this.each(tags, (it) => {
						it = it.split(':')
						if(it.length == 2) {
							tagCol.set(it[0], it[1]);
						}
					});
	
					if(tags.length == 9){
						key = key.toLowerCase();
						if(key === 'name'){
							return tagCol.has('mn') === true ? tagCol.get('mn') : false;
						} else if(key === 'key') {
							return tagCol.has('id') === true ? tagCol.get('id') : false;
						} else if(key === 'skin') {
							if(tagCol.has('si') === true){
								let si = parseInt(tagCol.get('si'));
								return isNaN(si) === false ? si : false;
							} else {
								return false;
							}
						} else if(key === 'display') {
							let dm = parseInt(tagCol.get('dm'));
							return isNaN(dm) === false ? dm : false;
						} else if(key === 'version') {
							return tagCol.has('tv') === true ? tagCol.get('tv') : false;
						} else if(key === 'appjs') {
							let as = parseInt(tagCol.get('as'));
							return isNaN(as) === false ? (as == 1 ? true: false) : false; 
						} else if(key === 'appkey') {
							return tagCol.has('ak') === true ? tagCol.get('ak') : false;
						} else if(key === 'pos') {
							return tagCol.has('mp') === true ? tagCol.get('mp') : false;
						} else if(key === 'colorme') {
							return tagCol.has('cm') === true ? parseInt(tagCol.get('cm')) : false;
						} else if(key === 'all') {
							return guiTag;
						} else {
							return false;
						}
					} 
				} else {
					return false;
				}
			},
			//de format de2 mit führenden Nullen
			time: {
				year:() => {return new Date().getFullYear();},
				month:() => {return new Date().getMonth();},
				day:() => {return new Date().getDate();}, 
				hour:() => {return new Date().getHours();}, 
				min:() => {return new Date().getMinutes();}, 
				sec:() => {return new Date().getSeconds();}, 
				date:() => {return new Date();},
				msec:() => {return new Date().getMilliseconds();},
				millis:() => {return Date.now();},
				ts:() => {const d = new Date(); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;},
				de:() => {const d = new Date(); return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;},
				en:() => {const d = new Date(); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;}
			},
	
			sha1: async function(str) {
				const 
					msgBuffer = new TextEncoder('utf-8').encode(str),
					hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer),
					hashArray = Array.from(new Uint8Array(hashBuffer)),
					hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
					
				return hashHex;
			},
			
		    md5 : function (str) {
		    	var xl;
	
		    	var rotateLeft = function(lValue, iShiftBits) {
		    		return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		    	};
	
		    	var addUnsigned = function(lX, lY) {
		    		var lX4, lY4, lX8, lY8, lResult;
		    		lX8 = (lX & 0x80000000);
		    		lY8 = (lY & 0x80000000);
		    		lX4 = (lX & 0x40000000);
		    		lY4 = (lY & 0x40000000);
		    		lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		    		if (lX4 & lY4) {
		    			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		    		}
		    		if (lX4 | lY4) {
		    			if (lResult & 0x40000000) {
		    				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
		    			} else {
		    				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
		    			}
		    		} else {
		    			return (lResult ^ lX8 ^ lY8);
		    		}
		    	};
	
		    	var _F = function(x, y, z) {
		    		return (x & y) | ((~x) & z);
		    	};
		    	var _G = function(x, y, z) {
		    		return (x & z) | (y & (~z));
		    	};
		    	var _H = function(x, y, z) {
		    		return (x ^ y ^ z);
		    	};
		    	var _I = function(x, y, z) {
		    		return (y ^ (x | (~z)));
		    	};
	
		    	var _FF = function(a, b, c, d, x, s, ac) {
		    		a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
		    		return addUnsigned(rotateLeft(a, s), b);
		    	};
	
		    	var _GG = function(a, b, c, d, x, s, ac) {
		    		a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
		    		return addUnsigned(rotateLeft(a, s), b);
		    	};
	
		    	var _HH = function(a, b, c, d, x, s, ac) {
		    		a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
		    		return addUnsigned(rotateLeft(a, s), b);
		    	};
	
		    	var _II = function(a, b, c, d, x, s, ac) {
		    		a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
		    		return addUnsigned(rotateLeft(a, s), b);
		    	};
	
		    	var convertToWordArray = function(str) {
		    		var lWordCount;
		    		var lMessageLength = str.length;
		    		var lNumberOfWords_temp1 = lMessageLength + 8;
		    		var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
		    		var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
		    		var lWordArray = new Array(lNumberOfWords - 1);
		    		var lBytePosition = 0;
		    		var lByteCount = 0;
		    		while (lByteCount < lMessageLength) {
		    			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		    			lBytePosition = (lByteCount % 4) * 8;
		    			lWordArray[lWordCount] = (lWordArray[lWordCount] | (str
		    					.charCodeAt(lByteCount) << lBytePosition));
		    			lByteCount++;
		    		}
		    		lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		    		lBytePosition = (lByteCount % 4) * 8;
		    		lWordArray[lWordCount] = lWordArray[lWordCount]
		    				| (0x80 << lBytePosition);
		    		lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
		    		lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
		    		return lWordArray;
		    	};
	
		    	var wordToHex = function(lValue) {
		    		var wordToHexValue = '', wordToHexValue_temp = '', lByte, lCount;
		    		for (lCount = 0; lCount <= 3; lCount++) {
		    			lByte = (lValue >>> (lCount * 8)) & 255;
		    			wordToHexValue_temp = '0' + lByte.toString(16);
		    			wordToHexValue = wordToHexValue
		    					+ wordToHexValue_temp.substr(
		    							wordToHexValue_temp.length - 2, 2);
		    		}
		    		return wordToHexValue;
		    	};
	
		    	var utf8_encode = function(string) {
		    		string = (string + '').replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	
		    		var utftext = "";
		    		var start, end;
		    		var stringl = 0;
	
		    		start = end = 0;
		    		stringl = string.length;
		    		for (var n = 0; n < stringl; n++) {
		    			var c1 = string.charCodeAt(n);
		    			var enc = null;
	
		    			if (c1 < 128) {
		    				end++;
		    			} else if ((c1 > 127) && (c1 < 2048)) {
		    				enc = String.fromCharCode((c1 >> 6) | 192)
		    						+ String.fromCharCode((c1 & 63) | 128);
		    			} else {
		    				enc = String.fromCharCode((c1 >> 12) | 224)
		    						+ String.fromCharCode(((c1 >> 6) & 63) | 128)
		    						+ String.fromCharCode((c1 & 63) | 128);
		    			}
		    			if (enc != null) {
		    				if (end > start) {
		    					utftext += string.substring(start, end);
		    				}
		    				utftext += enc;
		    				start = end = n + 1;
		    			}
		    		}
	
		    		if (end > start) {
		    			utftext += string.substring(start, string.length);
		    		}
	
		    		return utftext;
		    	}
	
		    	var x = [], k, AA, BB, CC, DD, a, b, c, d, S11 = 7, S12 = 12, S13 = 17, S14 = 22, S21 = 5, S22 = 9, S23 = 14, S24 = 20, S31 = 4, S32 = 11, S33 = 16, S34 = 23, S41 = 6, S42 = 10, S43 = 15, S44 = 21;
	
		    	str = utf8_encode(str);
		    	x = convertToWordArray(str);
		    	a = 0x67452301;
		    	b = 0xEFCDAB89;
		    	c = 0x98BADCFE;
		    	d = 0x10325476;
	
		    	xl = x.length;
		    	for (k = 0; k < xl; k += 16) {
		    		AA = a;
		    		BB = b;
		    		CC = c;
		    		DD = d;
		    		a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
		    		d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
		    		c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
		    		b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
		    		a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
		    		d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
		    		c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
		    		b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
		    		a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
		    		d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
		    		c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
		    		b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
		    		a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
		    		d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
		    		c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
		    		b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
		    		a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
		    		d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
		    		c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
		    		b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
		    		a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
		    		d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
		    		c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
		    		b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
		    		a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
		    		d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
		    		c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
		    		b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
		    		a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
		    		d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
		    		c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
		    		b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
		    		a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
		    		d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
		    		c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
		    		b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
		    		a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
		    		d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
		    		c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
		    		b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
		    		a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
		    		d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
		    		c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
		    		b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
		    		a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
		    		d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
		    		c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
		    		b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
		    		a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
		    		d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
		    		c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
		    		b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
		    		a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
		    		d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
		    		c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
		    		b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
		    		a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
		    		d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
		    		c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
		    		b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
		    		a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
		    		d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
		    		c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
		    		b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
		    		a = addUnsigned(a, AA);
		    		b = addUnsigned(b, BB);
		    		c = addUnsigned(c, CC);
		    		d = addUnsigned(d, DD);
		    	}
	
		    	var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
	
		    	return temp.toLowerCase();
		    },
	
	
		    getHost : function(){
		    	var host = '';
		    	if(this.type(window.location) !== undefined){
		    		if(this.type(window.location.protocol) !== undefined && this.type(window.location.host) !== undefined){
		    			host = window.location.protocol + '//' + window.location.host;
		    		}
		    	}
	
		    	return host;
		    },
	
		    isLiveHost: function(){
		    	return this.isLocalHost() === false;
	
		    },
	
		    isLocalHost : function(){
		    	var
		    		match = false,
		    		currentHost = this.getHost();
	
		    	for(var i=0; i<localHosts.length; i++){
		    		if(currentHost.indexOf(localHosts[i]) != -1){
		    			match = true;
		    			break;
		    		}
		    	}
	
		    	return match;
			},

			isPreviewHost : function(){
		    	var
		    		match = false,
		    		currentHost = this.getHost();		    	
		    		if(currentHost.includes("ap.sites.jobware.net")){
		    			match = true;		    			
		    		}		    		
		    	return match;
			},
			
			isDevHost : function(){
		    	var
		    		match = false,
		    		currentHost = this.getHost();		    	
		    		if(currentHost.includes("ad.sites.jobware.net")){
		    			match = true;		    			
		    		}		    		
		    	return match;
			},
			
			isTestHost : function(){
		    	var
		    		match = false,
		    		currentHost = this.getHost();		    	
		    		if(currentHost.includes("at.sites.jobware.net")){
		    			match = true;		    			
		    		}		    		
		    	return match;
			},
			
			isIntegrationHost : function(){
		    	var
		    		match = false,
		    		currentHost = this.getHost();		    	
		    		if(currentHost.includes("ai.sites.jobware.net")){
		    			match = true;		    			
		    		}		    		
		    	return match;
			},
			
			isRealLocalHost : function(){
		    	var
		    		match = false,
		    		currentHost = this.getHost();		    	
		    		if(currentHost.includes("localhost")){
		    			match = true;		    			
		    		}		    		
		    	return match;
			},
	
			getConsentStatus: function(){
				var status = false;
				var scriptTag = this.get('[data-jwtpl-sys-jsapiconsent]');
				if(scriptTag.length > 0){
					status = scriptTag[0].getAttribute('data-jwtpl-sys-jsapiconsent')
				}
				return status;
			},
			
			matchString: function(str, subject) {
				if(this.isStringNotEmpty(str) === false){
		    		this.printErrorMsg(".matchString(str, subject) - str as string required");
		    		return false;
				}
				if(this.isStringNotEmpty(subject) === false){
		    		this.printErrorMsg(".matchString(str, subject) - str as string required");
		    		return false;
				}
				str = this.trim(str);
				subject = this.trim(subject);
				let re = new RegExp(`.*^${str}$.*`, 'gi');
				return re.test(subject);
			},
			
			matchRegex: function(regex, subject) {
				if(this.isString(regex) === false){
		    		this.printErrorMsg(".matchRegex(regex, subject) - regex must be a not empty string");
		    		return false;
				}
				if(this.isString(subject) === false){
		    		this.printErrorMsg(".matchRegex(regex, subject) - subject must be a not empty string");
		    		return false;
				}
				
		    	var 
		    		run,
		    		matches = [],
		    		regex = new RegExp(regex, 'g');
		    	
		    	while ((run = regex.exec(subject)) !== null) {
		    	    if (run.index === regex.lastIndex) {
		    	        regex.lastIndex++;
		    	    }
		    	    matches.push(run);
		    	}
		    	
		    	return matches;
			},
			
			doJsCheckUp: function() {
				if(this.isLiveHost() === false){
					let 
						jq = this.type(jQuery) !== undefined,
						base = this.getBaseObject() !== false;
					
					return [jq, base];
				}
			},
	
		    printElement : function(element){
		    	if (this.isLocalHost() === true) {
		    		console.log(element);
		    	}
		    },
	
		    printInfoMsg : function(msg){
		    	if (this.isLocalHost() === true) {
			    	if(this.type(msg) === 'String' && msg.length > 0){
			    		console.info('%c' + appName + ':' + msg, 'color: ' + infoColor + ';');
			    	}
		    	}
		    },
	
		    printErrorMsg : function(msg){
		    	if (this.isLocalHost() === true) {
			    	if(this.type(msg) === 'String' && msg.length > 0){
			    		console.error('%c' + appName  + ':' + msg, 'color: ' + errorColor + ';');
			    	}
		    	}
		    },
		    
		    printStackTrace: function(msg){
		    	if (this.isLocalHost() === true) {
			    	if(this.type(msg) === 'String' && msg.length > 0){
			    		console.trace('%c' + appName + ':' + msg, 'color: ' + errorColor + ';');
			    	}
		    	}
		    },
			
			_gui: function() {
				const 
					_api = this;
				return {
					init: function(){
						this.doLazyLoad();
						this.doBgLazyLoad();
						this.doJsCfgLazyLoad();
						return true;
					},
					
					doLazyLoad: function() {
						const observer = new IntersectionObserver(function(entries, self) {
						  entries.forEach(entry => {
						    if(entry.isIntersecting) {
								if(_api.type(entry.target.dataset) !== undefined && _api.type(entry.target.dataset.jwtplSysimgLazysrc) !== undefined && _api.isStringNotEmpty(entry.target.dataset.jwtplSysimgLazysrc) === true) {
									entry.target.src = entry.target.dataset.jwtplSysimgLazysrc;
									entry.target.removeAttribute('data-jwtpl-sysImg-lazySrc');
							      	self.unobserve(entry.target);
								}
						    }
						  });
						});
						
						let lazyImg = _api.get('[data-jwtpl-sysImg-lazySrc]', true);
						if(lazyImg.length > 0) {
							_api.each(lazyImg, img => {
								observer.observe(img);
							});
						}					
					},
					
					doBgLazyLoad: function() {
						const observer = new IntersectionObserver(function(entries, self) {
						  entries.forEach(entry => {
						    if(entry.isIntersecting) {														   
								if(_api.type(entry.target.dataset) !== undefined && _api.type(entry.target.dataset.jwtplSysbgimgLazysrc) !== undefined && _api.isStringNotEmpty(entry.target.dataset.jwtplSysbgimgLazysrc) === true) {
									_api.style(entry.target, 'background', 'url(' + entry.target.dataset.jwtplSysbgimgLazysrc + ')');
									entry.target.removeAttribute('data-jwtpl-sysBgImg-lazySrc');
						      		self.unobserve(entry.target);	
								}
						    }
						  });
						});
						
						let lazyBgImg = _api.get('[data-jwtpl-sysBgImg-lazySrc]', true);
						if(lazyBgImg.length > 0) {
							_api.each(lazyBgImg, bgImg => {
								observer.observe(bgImg);
							});
						}	
					},
					
					doJsCfgLazyLoad: function() {
						if(_api.getAppInfo('spuch') === '' && _api.getBaseObject() !== false && _api.getBaseObject()._globalGetCfg('lazyLoad') !== false) {
							const observerBg = new IntersectionObserver(function(entries, self) {
							  entries.forEach(entry => {
							    if(entry.isIntersecting) {														  	
									if(_api.type(entry.target.dataset) !== undefined && _api.type(entry.target.dataset.jwtplSysbgimgLazyjsrealsrc) !== undefined && _api.isStringNotEmpty(entry.target.dataset.jwtplSysbgimgLazyjsrealsrc) === true) {
										_api.style(entry.target, 'background', 'url(' + entry.target.dataset.jwtplSysbgimgLazyjsrealsrc + ')');										   
										entry.target.removeAttribute('data-jwtpl-sysBgImg-lazyJsSrc');
										entry.target.removeAttribute('data-jwtpl-sysBgImg-lazyJsRealSrc');
										entry.target.removeAttribute('data-jwtpl-sysLoopBgImg-lazyJsSrc');
							      		self.unobserve(entry.target);	
									}
							    }
							  });
							});
							
							const observerImg = new IntersectionObserver(function(entries, self) {
							  entries.forEach(entry => {
							    if(entry.isIntersecting) {														  	
									if(_api.type(entry.target.dataset) !== undefined && _api.type(entry.target.dataset.jwtplSysimgLazyjsrealsrc) !== undefined && _api.isStringNotEmpty(entry.target.dataset.jwtplSysimgLazyjsrealsrc) === true) {
										entry.target.src = entry.target.dataset.jwtplSysimgLazyjsrealsrc;
										entry.target.removeAttribute('data-jwtpl-sysImg-lazyJsSrc');
										entry.target.removeAttribute('data-jwtpl-sysImg-lazyJsRealSrc');
										entry.target.removeAttribute('data-jwtpl-sysLoopImg-lazyJsSrc');
								      	self.unobserve(entry.target);
									}
							    }
							  });
							});
							
							_api.each(_api.getBaseObject()._globalGetCfg('lazyLoad'), (values, key) => {
								key = key.toLowerCase();
								if(_api.isStringNotEmpty(key) === true && key.length > 0) {
									if(!(key.includes('|cm:'))){																	
										key = key.concat('|cm:0');
									}
									let mods = _api.get('[data-jwtpl-sys-gui="' + key + '"]');
									_api.each(mods, (it) => {
										let urlsBg= new Map(), urls = new Map(), def = new Map();
										_api.each(values, (v,k) => {
											if(k.indexOf('loop/default/') !== -1) {
												def.set(k, v);
											} else if(k.indexOf('loop/urls/') !== -1) {
												urls.set(k, v);
											} else if(k.indexOf('loop/bg/urls/') !== -1) {
												urlsBg.set(k, v);
											}											
											if(k.indexOf('loop/urls/') !== -1) {
												k = k.replace('loop/urls/', '');
												let eles = it.querySelectorAll('[data-jwtpl-sysLoopImg-lazyJsSrc="' + k + '"]');
												_api.each(eles, (e, i) => {
													let parent = e.parentElement;
													if(_api.isNull(parent) === false && parent.hasAttribute('href') === true && parent.getAttribute('href') !== '') {
														let 
															url = parent.getAttribute('href').replace(_api.getProjectPath(), '/'),
															entry = urls.has('loop/urls/' + k) ? urls.get('loop/urls/' + k) : false;

														if(entry !== false && _api.isNull(entry[url]) === false && entry[url] !== '') {
															e.setAttribute('data-jwtpl-sysImg-lazyJsRealSrc', entry[url]);
															observerImg.observe(e);
														} else {
															let dv = def.has('loop/default/' + k) ? def.get('loop/default/' + k) : false;
															if(dv !== false && dv !== '') {
																e.setAttribute('data-jwtpl-sysImg-lazyJsRealSrc', dv);
																observerImg.observe(e)
															}	
														}
													}
												});												
											} else if(k.indexOf('loop/bg/urls/') !== -1) {
												k = k.replace('loop/bg/urls/', '');
												let eles = it.querySelectorAll('[data-jwtpl-sysLoopBgImg-lazyJsSrc="' + k + '"]');
												_api.each(eles, (e, i) => {
													if(e.hasAttribute('href') === true && e.getAttribute('href') !== '') {
														let 
															url = e.getAttribute('href').replace(_api.getProjectPath(), '/'),
															entry = urlsBg.has('loop/bg/urls/' + k) ? urlsBg.get('loop/bg/urls/' + k) : false;
														
														if(entry !== false && _api.isNull(entry[url]) === false && entry[url] !== '') {
															e.setAttribute('data-jwtpl-sysBgImg-lazyJsRealSrc', entry[url]);
															observerBg.observe(e);
														} else {
															let dv = def.has('loop/default/' + k) ? def.get('loop/default/' + k) : false;
															if(dv !== false && dv !== '') {
																e.setAttribute('data-jwtpl-sysBgImg-lazyJsRealSrc', dv);
																observerBg.observe(e);
															}	
														}
													}
												});
											} else if(k.indexOf('loop/bg') !== -1) {
												k = k.replace('loop/bg/', '');				
												let eles = it.querySelectorAll('[data-jwtpl-sysLoopBgImg-lazyJsSrc="' + k + '"]');	
												_api.each(eles, (e, i) => {
													if(_api.type(v[i]) !== undefined) {
														e.setAttribute('data-jwtpl-sysBgImg-lazyJsRealSrc', v[i]);
														observerBg.observe(e);
													} else {
														let dv = def.has('loop/default/' + k) ? def.get('loop/default/' + k) : false;
														if(dv !== false && dv !== '') {
															e.setAttribute('data-jwtpl-sysBgImg-lazyJsRealSrc', dv);
															observerBg.observe(e);
														}
													}
												});	
											} else if(k.indexOf('loop') !== -1) {
												k = k.replace('loop/', '');
												let eles = it.querySelectorAll('[data-jwtpl-sysLoopImg-lazyJsSrc="' + k + '"]');
												_api.each(eles, (e, i) => {
													if(_api.type(v[i]) !== undefined) {
														e.setAttribute('data-jwtpl-sysImg-lazyJsRealSrc', v[i]);
														observerImg.observe(e);
													} else {
														let dv = def.has('loop/default/' + k) ? def.get('loop/default/' + k) : false;
														if(dv !== false && dv !== '') {
															e.setAttribute('data-jwtpl-sysImg-lazyJsRealSrc', dv);
															observerImg.observe(e);
														}
													}
												});
											} else if(k.indexOf('bg/') !== -1) {
												k = k.replace('bg/', '');
												let ele = it.querySelector('[data-jwtpl-sysBgImg-lazyJsSrc="' + k + '"]');	
												if(_api.type(ele) !== undefined) {
													ele.setAttribute('data-jwtpl-sysBgImg-lazyJsRealSrc', v);
													observerBg.observe(ele);
												}
											} else {
												let ele = it.querySelector('[data-jwtpl-sysImg-lazyJsSrc="' + k + '"]');
												if(_api.type(ele) !== undefined) {
													ele.setAttribute('data-jwtpl-sysImg-lazyJsRealSrc', v);
													observerImg.observe(ele);
												}
											}										
										});
									});	
								}
							});						
						}
					}
				}
			},
			
			_cc: function() {
				const 
					_api = this;
				return {
					init: function(){
						return true;
					},
					
					getConsentMode: function() {
						let mode = _api.getConsentStatus().toLowerCase().replace('true|', '').replace('false|', '');
						return _api.trim(mode);
					}
				}
			},
		    
		    _tpl: function() {
		    	const 
		    		_api = this,
		    		jsonApiPath = '_api/json?jmax=',
		    		deleteNoMatchTags = false;
		    	
		    	var
		    		data = false,
		    		tpl = false,
		    		path = JwTplJsLib.getProjectPath() + jsonApiPath;
		    	
		    	return {
					init: function() {
						return true;
					},
					
		    		call: function(param) {
				    	if(_api.type(param) === undefined){
				    		_api.printErrorMsg("._tpl.call(param) - param must be defined");
				    		return false;
				    	} else if(_api.isString(param) === false){
				    		_api.printErrorMsg("._tpl.call(param) - param must be not empty string");
				    		return false;
				    	}
	
				  		_api.ajax({
			    			url: path + param,
			    			method:'get', 
			    			callback:function(data){
			    				var json = _api.jsonParse(data);
			    				if(json !== false){
			    					JwTplJsLib._tpl().setData(json);
			    				} else {
			    					_api.printErrorMsg("._tpl.call(url) - cannot parse json for url [" + url + "]");
			    		    		return false;
			    				}
			    			}
			    		});
		    		},
	
		    		setData: function(obj) {
		    			if(_api.isObject(obj) === true){
		    				data = obj;
		    				var 
		    					json = this.getDataItem('data.list'),
		    					tpl = this.getDataItem('data.tpl');
		    				this.setTpl(tpl);
		    				this.assign();
		    			} else {
		    				_api.printErrorMsg("._tpl.setData(obj) -  obj must be an object, [" + _api.type(obj) + "] given instead");
		    			}
		    		},
		    		
		    		getData: function() {
		    			return _api.isObject(data) === true ? data : false;
		    		},
		    		
				    setTpl: function(template){
				    	if(_api.isNull(template) === false && _api.isString(template) !== false){
				    		tpl = template;
				    	} else {
				    		_api.printErrorMsg(".setTpl(tpl) - tpl must be a not empty string. [" + _api.type(template) + "] given instead");
				    	}
				    },
		    		
				    getTpl: function(){
				    	return tpl !== false ? tpl : false;
				    },		
		    		
				    getDataItem: function(data){
				    	if(_api.type(data) === undefined){
				    		_api.printErrorMsg(".getSection(data) - data must be defined");
				    		return false;
				    	} else if(_api.isString(data) === false){
				    		_api.printErrorMsg(".getSection(data) - data must be not empty string");
				    		return false;
				    	}
				    	
				    	var 
				    		entry = this.getData();
				    	
				    	if(entry !== false){
				    		var 
				    			split = data.split('.'),
				    			len = split.length;
				    		
				    		if(len === 1 && _api.type(entry[split[0]]) !== undefined){
				    			return entry[split[0]];
				    		} if(len === 2 && _api.type(entry[split[0]]) !== undefined && _api.type(entry[split[0]][split[1]]) !== undefined){
				    			return entry[split[0]][split[1]];
				    		} if(len === 3 && (_api.type(entry[split[0]]) !== undefined) && (_api.type(entry[split[0]][split[1]]) !== undefined) && (_api.type(entry[split[0]][split[1]][split[2]]) !== undefined) ){
				    			return entry[split[0]][split[1]][split[2]];
				    		} if(len === 4 && (_api.type(entry[split[0]]) !== undefined) && (_api.type(entry[split[0]][split[1]]) !== undefined) && (_api.type(entry[split[0]][split[1]][split[2]]) !== undefined) && (_api.type(entry[split[0]][split[1]][split[2]][split[3]]) !== undefined)){
				    			return entry[split[0]][split[1]][split[2]][split[3]];
				    		} if(len === 5 && (_api.type(entry[split[0]]) !== undefined) && (_api.type(entry[split[0]][split[1]]) !== undefined) && (_api.type(entry[split[0]][split[1]][split[2]]) !== undefined) && (_api.type(entry[split[0]][split[1]][split[2]][split[3]]) !== undefined) && (_api.type(entry[split[0]][split[1]][split[2]][split[3]][split[4]]) !== undefined)){
				    			return entry[split[0]][split[1]][split[2]][split[3]][split[4]];
				    		} else{
				    			_api.printInfoMsg('.getSection() - no property [' + split.join('.') + '] found');
				    			return '';
				    		}
				    	} else {
				    		_api.printInfoMsg('.getSection() - no ajax entry found');
				    		return '';
				    	}
				    	
				    	return '';
				    },
				    
				    assign: function(){
				    	var 
				    		template = this.getTpl(),
				    		loops = _api.matchRegex('{#:loop}(.*?){#:\/loop}', this.getTpl());
	
				    	if(_api.len(loops) > 0) {
				    		var loopData = loops[0];
				    		for(var i=0; i<loopData.length; i++){
				    			if(i > 0){
				    				var 
				    					tmp = '',
				    					data = this.getDataItem('data.list'); 
	
				    				for(var j=0; j<_api.len(data); j++){
				    					var 
				    						tagData,
				    						loopTpl = loopData[i];
				    					
				    					loopTpl = loopTpl.replaceAll('{#:loopIndex}', j);
				    					tagData =_api.matchRegex('{#:(.*?)}', loopTpl);
				    					
				    					if(tagData.length > 0){
				    						for(var k=0; k<tagData.length; k++){
				    							if( _api.isNull(tagData[k][1]) === false){
				    								if(_api.isString(this.getDataItem(tagData[k][1])) === true){
				    									loopTpl = loopTpl.replace('{#:' + tagData[k][1] +'}', this.getDataItem(tagData[k][1]));
				    								}
				    							}
				    						}
				    					}
				    					tmp += loopTpl;
				    				}
				    				template = template.replace(loopData[i], tmp);
				    				template = template.replace('{#:loop}', '').replace('{#:/loop}', '');
				    			}
				    		}
				    	}
				  
				    	var tplVars = _api.matchRegex('{#:(.*?)}', template);  	
				    	
				    	if(_api.len(tplVars) > 0) {
				    		var tagsData = tplVars;
				    		for(var x=0; x<tplVars.length; x++){
				    			if(_api.isNull(tplVars[x][1]) === false) {
				    				if(_api.isString(this.getDataItem(tplVars[x][1])) === true){
				    					template = template.replace('{#:' + tplVars[x][1] + '}', this.getDataItem(tplVars[x][1]));
				    				}
				    			}
				    		}
				    	}
				    	return template;
				    }		    
		    	}
		    }
		}
	})();
}
