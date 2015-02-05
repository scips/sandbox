class Application {
    constructor () {
        this.dataProvider = new Provider('http://xkcd.com/info.0.json','http://xkcd.com/{id}/info.0.json');
    }

    listen() {
        $('body').on('dataloaded', ()=>{
            this.render();
        });
    }

    start () {
        this.listen();
        this.itemTemplate = Handlebars.compile($('#js-tpl-image-item').html());
        this.dataProvider.fetchLast();
    }

    render () {
        var current = this.dataProvider.list.current();
        var image = new Image(current.transcript, current.img);
        image.setTemplate(this.itemTemplate)
        image.render('.js-image-list');
    }
}

$(function (){
    window.application = new Application();
    window.application.start();
});
