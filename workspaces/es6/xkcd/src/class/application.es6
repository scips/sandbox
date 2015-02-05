class Application {
    constructor () {
        this.dataProvider = new Provider('http://xkcd.com/info.0.json','http://xkcd.com/{id}/info.0.json');
        this.ui = new Ui();
    }

    listen() {
        $('body').on('dataloaded', () => {
            this.render();
        });
        $('body').on('bottomreached', () => {
            console.log('bottom reached');
        });
    }

    start () {
        this.listen();
        this.ui.listen();
        this.itemTemplate = Handlebars.compile($('#js-tpl-image-item').html());
    }
}

$(function (){
    window.application = new Application();
    window.application.start();
});
