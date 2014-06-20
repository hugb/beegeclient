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
	},

	members : {

		main : function() {
			this.base(arguments);

			if (qx.core.Environment.get("qx.debug")) {
				qx.log.appender.Native;
				qx.log.appender.Console;
			}
			
			this.mainView = new beege.views.Main();
			this.loginView = new beege.views.Login();
			this.settingsView = new beege.views.Settings();
			
			// 设置主题
			var theme = qx.Theme.getByName(qx.bom.Cookie.get("theme_name"));
			if (theme && qx.theme.manager && qx.theme.manager.Meta) {
				qx.theme.manager.Meta.getInstance().setTheme(theme);
			}
			// 设置语言
			var lang = qx.bom.Cookie.get("lang_name");
			if (lang) {
				qx.locale.Manager.getInstance().setLocale(lang);
			}
			
			this.getRoot().add(this.mainView, {edge : 0});
			
			this.mainView.toolbar.getSettingsButton().addListener("execute", function() {
				this.getRoot().add(this.settingsView, {left : "40%", top : "30%"});
				this.settingsView.open();
			}, this);

			beege.models.WebSocket.getInstance().addListener("login", function(evt) {
				if (evt.getData().code == 1) { 
					this.getRoot().add(this.loginView, {left : "40%", top : "30%"});
					this.loginView.open();
				}
			}, this);
		},
		
		finalize : function() {
			this.base(arguments);
		}
	},
	
	destruct : function() {
		this._disposeObjects("mainView");
		//this._disposeObjects("loginView");
		//this._disposeObjects("settingsView");
	}
});
