"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var Application = (function () {
    function Application() {
        this.dataProvider = new Provider("http://xkcd.com/info.0.json", "http://xkcd.com/{id}/info.0.json");
        this.ui = new Ui();
    }

    _prototypeProperties(Application, null, {
        listen: {
            value: function listen() {
                var _this = this;
                $("body").on("dataloaded", function () {
                    _this.render();
                });
                $("body").on("bottomreached", function () {
                    console.log("bottom reached");
                });
            },
            writable: true,
            configurable: true
        },
        start: {
            value: function start() {
                this.listen();
                this.ui.listen();
                this.itemTemplate = Handlebars.compile($("#js-tpl-image-item").html());
            },
            writable: true,
            configurable: true
        }
    });

    return Application;
})();

$(function () {
    window.application = new Application();
    window.application.start();
});
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var Image = (function () {
    function Image(title, url) {
        this.data = { title: title, url: url };
        this.template = null;
    }

    _prototypeProperties(Image, null, {
        render: {
            value: function render(selector) {
                $(selector).append(this.template(this.data));
            },
            writable: true,
            configurable: true
        },
        setTemplate: {
            value: function setTemplate(handleBarTemplate) {
                this.template = handleBarTemplate;
            },
            writable: true,
            configurable: true
        }
    });

    return Image;
})();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var ArrayList = (function () {
    function ArrayList() {
        this.list = null;
        this.position = null;
    }

    _prototypeProperties(ArrayList, null, {
        addItem: {
            value: function addItem(position, item) {
                if (!this.list) {
                    this.list = [];
                }
                this.list[position] = item;
                this.position = position;
            },
            writable: true,
            configurable: true
        },
        next: {
            value: function next() {
                if (this.hasNext()) {
                    this.position++;
                    return this.current();
                }
                return null;
            },
            writable: true,
            configurable: true
        },
        previous: {
            value: function previous() {
                if (this.hasPrevious()) {
                    this.position--;
                    return this.current();
                }
                return null;
            },
            writable: true,
            configurable: true
        },
        hasPrevious: {
            value: function hasPrevious() {
                if (this.position && this.list[this.position - 1]) {
                    return true;
                }
                return false;
            },
            writable: true,
            configurable: true
        },
        hasNext: {
            value: function hasNext() {
                if (this.position && this.list[this.position + 1]) {
                    return true;
                }
                return false;
            },
            writable: true,
            configurable: true
        },
        current: {
            value: function current() {
                if (this.list && this.list[this.position]) {
                    return this.list[this.position];
                }
                return null;
            },
            writable: true,
            configurable: true
        }
    });

    return ArrayList;
})();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var Provider = (function () {
    function Provider(url, urlById) {
        this.LocalStorageKey = "xkcdList";
        this.url = "https://jsonp.nodejitsu.com/?url=" + url;
        this.urlById = "https://jsonp.nodejitsu.com/?url=" + urlById;
        this.list = localStorage.getItem(this.LocalStorageKey);
        if (!this.list) {
            this.list = new ArrayList();
        }
    }

    _prototypeProperties(Provider, null, {
        fetchLast: {
            value: function fetchLast() {
                var _this = this;
                $.ajax(this.url).then(function (data, status, jqXHR) {
                    _this.list.addItem(parseInt(data.num), data);
                    var e = $.Event("dataloaded.", data);
                    $("body").trigger(e);
                }, function (jqXHR, status, errorThrown) {
                    console.error("error", errorThrown);
                });
            },
            writable: true,
            configurable: true
        },
        fetch: {
            value: function fetch(id) {
                var _this = this;
                var url = this.urlById.replace("{id}", id);
                $.ajax(url).then(function (data, status, jqXHR) {
                    _this.list.addItem(parseInt(data.num), data);
                    var e = $.Event("dataloaded.", data);
                    $("body").trigger(e);
                }, function (jqXHR, status, errorThrown) {
                    console.error("error", errorThrown);
                });
            },
            writable: true,
            configurable: true
        },
        save: {
            value: function save() {
                localStorage.setItem(this.LocalStorageKey, this.list);
            },
            writable: true,
            configurable: true
        }
    });

    return Provider;
})();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var Ui = (function () {
    function Ui() {
        this.infinite = null;
    }

    _prototypeProperties(Ui, null, {
        listen: {
            value: function listen() {
                this.infinite = new Waypoint.Infinite({
                    element: $("footer")[0]
                });
                $(window).scroll(function () {
                    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                        console.log($(window).scrollTop(), "+", $(window).height(), " == ", $(document).height());
                        var e = $.Event("bottomreached");
                        $("body").trigger(e);
                    }
                });
            },
            writable: true,
            configurable: true
        }
    });

    return Ui;
})();
//# sourceMappingURL=all.js.map