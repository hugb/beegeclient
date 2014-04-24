/**************************************************************************
 * 
 * @ignore(WebSocket)
 * 
 **************************************************************************/
qx.Class.define("beege.models.WebSocket", {
	extend : qx.core.Object,

	type : "singleton",

	construct : function() {
		this.base(arguments);

		this.connect();
	},

	events : {
		"onopen" : "qx.event.type.Data",
		"onmessage" : "qx.event.type.Data",
		"onclose" : "qx.event.type.Data",
		"onerror" : "qx.event.type.Data",
		
		"login" : "qx.event.type.Data",
		"menu" : "qx.event.type.Data",
		"tree" : "qx.event.type.Data"
	},

	members : {
		__login : false,
		__status : false,
		__messages : [],
		__tempMessage : [],

		connect : function() {
			var __this = this;
			
			this.__websocket = new WebSocket(qx.core.Environment.get("adminconsole.wsuri"));

			this.__websocket.onopen = function(evt) {
				__this.debug("open websockt connect.");
				__this.__status = true;
				for ( var x in __this.__messages) {
					__this.send(__this.__messages[x]);
				}
				__this.fireDataEvent("onopen", evt);
			};
			this.__websocket.onmessage = function(evt) {
				__this.debug("receive original message:", evt.data);
				var msg = JSON.parse(evt.data);
				if (msg.cmd == "login" && msg.code == 0) {
					__this.__login = true;
					for ( var x in __this.__messages) {
						__this.send(__this.__messages[x]);
					}
				}
				__this.fireDataEvent(msg["cmd"], msg);
			};
			this.__websocket.onclose = function(evt) {
				__this.fireDataEvent("onclose", evt);
			};
			this.__websocket.onerror = function(evt) {
				__this.fireDataEvent("onerror", evt);
			};
		},

		send : function(data) {
			if (!this.__login && data.cmd != "login"){
				this.__tempMessage.push(data);
			} 
			if (this.__status) {
				this.debug("send message:", JSON.stringify(data));
				this.__websocket.send(JSON.stringify(data));
			} else {
				this.__messages.push(data);
			}
		}
	}
});