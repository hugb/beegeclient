/*******************************************************************************
 * 
 * 窗体管理 jtcloud.view.WinToolbar.getInstance()
 * 
 * #asset(qx/icon/${qx.icontheme}/48/devices/*)
 * 
 ******************************************************************************/

qx.Class.define("beege.views.WinToolbar", {
	type : "singleton",
	extend : qx.ui.container.SlideBar,
	construct : function() {
		this.base(arguments);
		this.setLayout(new qx.ui.layout.HBox(3));

		this.set({
					width : 300
				});

		var icons = ["audio-card.png", "audio-input-microphone.png",
				"battery.png", "camera-photo.png", "camera-web.png",
				"computer.png", "display.png", "drive-harddisk.png",
				"drive-optical.png", "input-keyboard.png",
				"network-wired.png", "network-wireless.png"];

		for (var i = 0; i < icons.length; i++) {
			this.add((new qx.ui.basic.Image("icon/48/devices/"
					+ icons[i])).set({
						decorator : "main",
						padding : 4
					}));
		}

		var toggle = new qx.ui.form.ToggleButton("Toggle size");

		toggle.addListener("changeValue", function(e) {
			this.setWidth(e.getData() ? 800 : 300);
		});

	},
	members : {
		test : function() {
			this.debug("debug");
			this.info("info");
			this.warn("warn");
			this.error("error");
		},
		addWin : function() {

		},
		removeWin : function() {

		},
		openWin : function() {

		},
		hiddenWin : function() {

		}
	}
});