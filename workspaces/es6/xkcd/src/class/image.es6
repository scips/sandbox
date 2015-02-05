class Image {
    constructor (title,url) {
        this.data = {title: title, url: url};
        this.template = null;
    }

    render (selector) {
        $(selector).append(this.template(this.data));
    }

    setTemplate (handleBarTemplate) {
        this.template = handleBarTemplate;
    }
}