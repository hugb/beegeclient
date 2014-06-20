/**
 * This ${mySizes}
 * 
 * @asset(qx/icon/${qx.icontheme}/22/actions/media-playback-start.png)
 * @asset(qx/icon/${qx.icontheme}/22/apps/utilities-color-chooser.png)
 * @asset(qx/icon/${qx.icontheme}/22/apps/utilities-log-viewer.png)
 * @asset(qx/icon/${qx.icontheme}/22/apps/internet-web-browser.png)
 * @asset(qx/icon/${qx.icontheme}/22/apps/utilities-help.png)
 * @asset(qx/icon/${qx.icontheme}/22/mimetypes/executable.png)
 * @asset(beege/images/user_22.png)
 */

qx.Class.define("beege.views.Toolbar", {

	extend : qx.ui.toolbar.ToolBar,

	construct : function() {
		this.base(arguments);

		this.__createBar();
	},

	members : {
		__viewGroup : null,
		__themeGroup : null,

		__runButton : null,
		__settingsBtn: null,

		__createBar : function() {
			this.__runButton = new qx.ui.toolbar.Button(this.tr("Run"), "icon/22/actions/media-playback-start.png");
			this.add(this.__runButton);
			
			this.__runButton.addListener("execute", function(){
				beege.models.WebSocket.getInstance().send({cmd : "menu", data : ""});
			}, this);

			this.addSpacer();
			
			var userMenu = new qx.ui.menu.Menu();
			var resetPasswordBtn = new qx.ui.menu.Button(this.tr("Reset Password"));
			userMenu.add(resetPasswordBtn);
			userMenu.addSeparator();
			this.__settingsBtn = new qx.ui.menu.Button(this.tr("Settings"));
			userMenu.add(this.__settingsBtn);
			this.add(new qx.ui.toolbar.MenuButton(this.tr("User"), "beege/images/user_22.png", userMenu));

			var viewPart = new qx.ui.toolbar.Part();
			this.add(viewPart);

			var logView = new qx.ui.toolbar.RadioButton(this.tr("Log"), "icon/22/apps/utilities-log-viewer.png");
			logView.setToolTipText(this.tr("Display log file"));
			logView.setUserData("value", "log");
			logView.setModel("log");
			viewPart.add(logView);

			var taskView = new qx.ui.toolbar.RadioButton(this.tr("Task"), "icon/22/apps/internet-web-browser.png");
			taskView.setToolTipText(this.tr("Display my task"));
			taskView.setUserData("value", "task");
			taskView.setModel("task");
			viewPart.add(taskView);

			this.__viewGroup = new qx.ui.form.RadioGroup();
			this.__viewGroup.setAllowEmptySelection(true);
			this.__viewGroup.add(logView, taskView);		
			
			var menu = new qx.ui.menu.Menu();
			var checkBtn = new qx.ui.menu.CheckBox(this.tr("Check"));
			menu.add(checkBtn);

			menu.addSeparator();
			
			var aboutBtn = new qx.ui.menu.Button(this.tr("About"));
			menu.add(aboutBtn);
			
			this.__helpButton = new qx.ui.toolbar.MenuButton(this.tr("Help"), "icon/22/apps/utilities-help.png", menu);
			this.__helpButton.setToolTipText("Debugging options");
			this.add(this.__helpButton);
		},

		getViewGroup : function() {
			return this.__viewGroup;
		},

		getThemeGroup : function() {
			return this.__themeGroup;
		},

		getRunButton : function() {
			return this.__runButton;
		},
		
		getSettingsButton : function() {
			return this.__settingsBtn;
		}
	}
});