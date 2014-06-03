/*******************************************************************************
 * 
 * beegeclient - the new admin console of web development
 * 
 * Copyright: 2014-2015
 * 
 * License:
 * 
 * Authors: hugb(hu198021688500@163.com)
 * 
 ******************************************************************************/

/**
 * This is the main application class of your custom application "beege"
 * 
 * @asset(beege/*)
 */
qx.Class.define("beege.Application", {
	
	extend : qx.application.Standalone,
	
	construct : function() {
		this.base(arguments);
		
		//var uri = qx.util.ResourceManager.getInstance().toUri("beege/css/apiviewer.css");
		//qx.bom.Stylesheet.includeFile(uri);
	},

	members : {
		/**
		 * This method contains the initial application code and gets called
		 * during startup of the application
		 * 
		 * @lint ignoreDeprecated(alert)
		 */
		main : function() {
			this.base(arguments);

			if (qx.core.Environment.get("qx.debug")) {
				qx.log.appender.Native;
				qx.log.appender.Console;
			}

			qx.locale.Manager.getInstance().setLocale("zh");

			this.mainView = new beege.views.Main();
			this.getRoot().add(this.mainView, {edge : 0});

			beege.models.WebSocket.getInstance().addListener("login", function(evt) {
				if (evt.getData().code == 1) { 
					var login = new beege.views.Login();
					this.getRoot().add(login, {left : "40%", top : "30%"});
					login.open();
				}
			}, this);
		},
		
		finalize : function() {
			this.base(arguments);
		}
	},
	
	destruct : function() {
		this._disposeObjects("mainView");
	}
});
