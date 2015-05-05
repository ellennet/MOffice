cordova.define("org.apache.cordova.MOffice.CustomNativeAccess", function(require, exports, module) {

	var cordova = require('cordova');  
	var exec = require('cordova/exec');
      
    var CustomNativeAccess = function() {};  
    
    CustomNativeAccess.prototype.dominoLogin = function(success, error, username, password) {  		
        exec(success, error, 'DominoLoginPlugin', 'dominoLogin', [username,password]);
		window.localStorage.username = username;
		window.localStorage.password = password;		
    };	
	
	CustomNativeAccess.prototype.getLogin = function(success, error) {
		exec(success, error, 'DominoLoginPlugin', 'getLogin',[]);
	};

	CustomNativeAccess.prototype.sysExit = function(success, error) {		
		exec(success, error, 'DominoLoginPlugin', 'sysExit',[]);
	};	
	
	CustomNativeAccess.prototype.call = function(success, error, number) {
		exec(success, error, 'DominoLoginPlugin', 'call',[number]);
	};	
	
	CustomNativeAccess.prototype.sms = function(success, error, number) {
		exec(success, error, 'DominoLoginPlugin', 'sms',[number]);
	};		
	      
    var customNativeAccess = new CustomNativeAccess();  
    module.exports = customNativeAccess;	

});