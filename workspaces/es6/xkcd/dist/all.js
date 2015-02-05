"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var Application = (function () {
    function Application() {
        this.dataProvider = new Provider("http://xkcd.com/info.0.json", "http://xkcd.com/{id}/info.0.json");
    }

    _prototypeProperties(Application, null, {
        listen: {
            value: function listen() {
                var _this = this;
                $("body").on("dataloaded", function () {
                    _this.render();
                });
            },
            writable: true,
            configurable: true
        },
        start: {
            value: function start() {
                this.listen();
                this.itemTemplate = Handlebars.compile($("#js-tpl-image-item").html());
                this.dataProvider.fetchLast();
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var current = this.dataProvider.list.current();
                var image = new Image(current.transcript, current.img);
                image.setTemplate(this.itemTemplate);
                image.render(".js-image-list");
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
//# sourceMappingURL=all.js.map