/**
 * Left tree
 * 
 * @asset(qx/icon/${qx.icontheme}/22/places/user-desktop.png)
 * 
 */

qx.Class.define("beege.views.Tree", {

	extend : qx.ui.tree.Tree,

	construct : function(type) {
		this.base(arguments);

		this.set({
			width : 200,
			height : 400,
			hideRoot : true
		});
		//this.setAppearance("demo-tree");

		this.__type = type;

		this.init();
	},

	members : {
		__type : null,

		init : function() {
			var root = new qx.ui.tree.TreeFolder("root");
			root.setOpen(true);
			this.setRoot(root);

			var menu = new qx.ui.menu.Menu();
			var newButton = new qx.ui.menu.Button(this.tr("New"));
			newButton.addListener("execute", function() {
				if (this.getSelection().length > 0) {
					var treeNode = this.getSelection()[0];
					console.log(treeNode);
					var type = treeNode.getUserData();
					switch (type) {
					default:
						var child = new qx.ui.tree.TreeFile(this.tr("file"));
						child.setContextMenu(menu);
						treeNode.add(child);
						treeNode.setOpen(true);
					}
				}
			}, this);
			menu.add(newButton);

			menu.add(new qx.ui.menu.Button(this.tr("Edit")));

			var deleteButton = new qx.ui.menu.Button(this.tr("Delete"));
			deleteButton.addListener("execute", function() {
				if (this.getSelection().length > 0) {
					var treeNode = this.getSelection()[0];
					treeNode.setContextMenu(null);
					treeNode.dispose();
				}
			}, this);
			menu.add(deleteButton);

			menu.add(new qx.ui.menu.Separator());

			menu.add(new qx.ui.menu.RadioButton(this.tr("Delete")));

			beege.models.WebSocket.getInstance().send({cmd : "tree"});
			beege.models.WebSocket.getInstance().addListener("tree", function(evt) {
				var data = evt.getData();
				for ( var key in data.data) {
					var child;
					var tmp = data.data[key];
					if (tmp.leaf) {
						child = new qx.ui.tree.TreeFile(tmp.title);
					} else {
						child = new qx.ui.tree.TreeFolder(tmp.title);
					}
					child.setUserData("type", this.__type);
					child.setContextMenu(menu);
					root.add(child);
				}
			}, this);
		}
	}
});