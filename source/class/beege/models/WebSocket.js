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
 * WebSocket通信模块
 * 
 * @ignore(WebSocket)
 */
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
			
			// 当WebSocket打开后，发送缓存的请求消息，然后触发onopen
			this.__websocket.onopen = function(evt) {
				__this.debug("open websockt connect.");
				__this.__status = true;
				__this.send({"cmd" : "hearbeat"});
				__this.fireDataEvent("onopen", evt);
			};
			// 收到服务器端的消息
			this.__websocket.onmessage = function(evt) {
				__this.debug("receive message:", evt.data);
				var msg = JSON.parse(evt.data);
				// 需要登录
				if (msg.cmd == "login" && msg.code == 1) {
					//__this.__status = false;
				}
				// 成功登录消息
				if (msg.cmd == "login" && msg.code == 0) {
					while(message = __this.__messages.shift()){
						__this.send(message);
					}
				}
				__this.fireDataEvent(msg["cmd"], msg);
			};
			// WebSocket被关闭，再次连接
			this.__websocket.onclose = function(evt) {
				__this.debug("websocket connect is closed.");
				__this.__status = false;
				__this.fireDataEvent("onclose", evt);
			};
			// 通信发生错误，再次连接
			this.__websocket.onerror = function(evt) {
				__this.debug("websocket connect is error.");
				__this.debug(evt);
				__this.__status = false;
				__this.fireDataEvent("onerror", evt);
			};
		},

		send : function(data) {
			if (this.__status) {
				this.debug("send message:", JSON.stringify(data));
				this.__websocket.send(JSON.stringify(data));
			} else {
				this.debug("enter queue...");
				this.__messages.push(data);
			}
		}
	}
});