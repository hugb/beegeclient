qx.Class.define("beege.views.Body", {

	extend : qx.ui.container.Composite,

	construct : function() {
		this.base(arguments);

		this.setLayout(new qx.ui.layout.HBox());

		this.add(this.__createMainSplit(), {flex : 1});

		//this.getAccordionMenu();
	},

	members : {
		__mainSplit : null,
		__childSplit : null,

		__accordion : null,

		__mainView : null,

		__stack : null,
		__logView : null,

		__windowManager : null,
		__desktop : null,
		__upload : null,

		test : 0,

		/**
		 * 创建主要的窗体
		 * 
		 * @return {}
		 */
		__createMainView : function() {
			this.__mainView = new qx.ui.embed.Iframe().set({
				nativeContextMenu : true
			});

			return this.__mainView;
		},

		/**
		 * 创建页面中间部分的分割窗体
		 * 
		 * @ignore(qxc)
		 * @return {}
		 */
		__createMainSplit : function() {
			this.__mainSplit = new qx.ui.splitpane.Pane("horizontal");

			//this.__accordion = new beege.views.Accordion();
			//this.__mainSplit.add(this.__accordion, 1);
			this.__tree = new beege.views.Tree(1);
			this.__mainSplit.add(this.__tree, 1);

			this.__childSplit = new qx.ui.splitpane.Pane("vertical");
			this.__childSplit.setDecorator(null);
			this.__childSplit.add(this.__createMainView(), 4);
			this.__mainSplit.add(this.__childSplit, 5);

			this.__stack = new qx.ui.container.Stack();
			this.__stack.setDecorator("main");
			this.__childSplit.add(this.__stack, 1);

			this.__logView = new qxc.ui.logpane.LogView();
			this.__logView.fetch();

			var logView = this.__logView;
			window.setInterval(function() {
				logView.fetch();
			}, 1000);

			this.__logView.setDecorator(null);
			this.__stack.add(this.__logView);

			this.__taskView = new beege.views.Task();
			this.__taskView.setDecorator(null);
			this.__stack.add(this.__taskView);

			this.__stack.resetSelection();
			this.__stack.exclude();

			return this.__mainSplit;
		},

		getAccordionMenu : function() {
			beege.models.WebSocket.getInstance().send({cmd : "menu", data : ""});
			beege.models.WebSocket.getInstance().addListener("menu", function(evt) {
				var data = evt.getData();
				for ( var key in data.data) {
					var tree = new beege.views.Tree(data.data[key].type);
					this.__accordion.addBtn(parseInt(key), data.data[key].title, tree);
				}
			}, this);
		},

		getStack : function() {
			return this.__stack;
		},

		getLogView : function() {
			return this.__logView;
		},

		getTaskView : function() {
			return this.__taskView;
		},

		getMainView : function() {
			return this.__mainView;
		},

		getDesktop : function() {
			return this.__desktop;
		},

		getUpload : function() {
			return this.__upload;
		},

		getWindowManager : function() {
			return this.__windowManager;
		}
	}
});