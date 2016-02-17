(function(a) {
	if (!window.manto) {
		window.manto = {
			defaultConfig : {
				cookieDomain : location.hostname,
				trackCode : "",
				pageType : "99"
			},
			init : function(b) {
				if (b) {
					a.extend(true, this.defaultConfig, b)
				}
				var c = location.hostname;
				if (!((c.substr(c.length
						- ("." + this.defaultConfig.cookieDomain).length)) == ("." + this.defaultConfig.cookieDomain) || c === this.defaultConfig.cookieDomain)) {
					this.defaultConfig.cookieDomain = c
				}
				this.mcctrack.init()
			},
			cookieTool : function(c, i, k) {
				if (typeof i == "undefined") {
					var d = null;
					var h = document.cookie.match(new RegExp("(^| )" + c
							+ "=([^;]*)(;|$)"));
					if (h != null) {
						d = unescape(h[2])
					}
					return d
				} else {
					k = k || {};
					if (i === null) {
						i = "";
						k.expires = -1
					}
					var f = "";
					if (k.expires) {
						var e;
						if (typeof k.expires == "number") {
							e = new Date();
							e.setTime(e.getTime()
									+ (k.expires * 24 * 60 * 60 * 1000));
							f = "; expires=" + e.toUTCString()
						} else {
							if (k.expires.toUTCString) {
								f = "; expires=" + k.expires.toUTCString()
							}
						}
					}
					var j = k.path ? "; path=" + k.path : "";
					var g = k.domain ? "; domain=" + k.domain : "";
					var b = k.secure ? "; secure" : "";
					document.cookie = c + "=" + encodeURIComponent(i) + f + j
							+ g + b
				}
				return d
			},
			mcctrack : {
				config : {
					serviceURI : "http://t.msn.com.cn/activity/l.gif",
					version : "1.2"
				},
				trackInfo : {
					domain : location.hostname
				},
				init : function() {
					this.trackInfo.location = window.location.href;
					this.trackInfo.referer = document.referrer;
					this.trackInfo.method = "";
					this.trackInfo.headline = "";
					this.sendTracking();
					a(document).bind("click", b);
					a(window).bind("unload", function() {
						manto.mcctrack.sendTracking({
							location : "",
							referer : "",
							evt : "unload"
						})
					});
					function b(e) {
						if (e && e.target && e.button != 2) {
							var c = a(e.target);
							var g = c.filter("*:not(img)[href]:first");
							if (!g.length) {
								g = c.closest("*:not(img)[href]")
							}
							if (g.length && g[0].href) {
								var d;
								try {
									d = g.text() || g.attr("alt")
											|| a("[alt]", g).attr("alt") || ""
								} catch (f) {
									d = ""
								}
								manto.mcctrack.sendTracking({
									location : g[0].href,
									referer : window.location.href,
									evt : "click",
									headline : d.substr(0, 50),
									winWidth : a(window).width().toString(),
									x : e.pageX.toString(),
									y : e.pageY.toString()
								})
							}
						}
					}
				},
				sendTracking : function(c) {
					var d = function() {
						return (((1 + Math.random()) * 65536) | 0).toString(16)
								.substring(1)
					};
					c = c || {};
					var b = manto.cookieTool("manto_vjid") || "";
					if (!b) {
						b = d() + d() + d() + d() + d() + d() + d() + d();
						manto.cookieTool("manto_vjid", b, {
							expires : new Date(3000, 1, 1),
							path : "/",
							domain : manto.defaultConfig.cookieDomain
						})
					}
					if (!this.trackInfo.requesID) {
						this.trackInfo.requesID = d() + d() + d() + d() + d()
								+ d() + d() + d() + "|"
								+ manto.defaultConfig.pageType + "^"
								+ manto.defaultConfig.trackCode
					}
					var f = [
							c.location === "" ? ""
									: (c.location || this.trackInfo.location),
							c.referer === "" ? ""
									: (c.referer || this.trackInfo.referer),
							c.evt || this.trackInfo.method,
							(c.headline || this.trackInfo.headline).replace(
									/\s/g, "").replace(new RegExp("`", "g"),
									"'"),
							window.screen.width + "x" + window.screen.height,
							c.winWidth || "", (c.x || "") + "," + (c.y || ""),
							this.trackInfo.requesID ].join("`");
					var h = "ct=&mj=" + encodeURIComponent((b)) + "&d="
							+ (c.domain || this.trackInfo.domain) + "&v="
							+ this.config.version + "&c="
							+ encodeURIComponent(f);
					var g = this.config.serviceURI + "?nocache="
							+ (new Date()).getTime() + "&" + h;
					g = g.length > 2048 ? g.substr(0, 2048) : g;
					var e = new Image();
					e.src = g
				}
			}
		}
	}
})(jQuery);