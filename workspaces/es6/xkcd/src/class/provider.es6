class Provider{
    constructor(url,urlById) {
        this.LocalStorageKey = 'xkcdList';
        this.url = 'https://jsonp.nodejitsu.com/?url='+url;
        this.urlById = 'https://jsonp.nodejitsu.com/?url='+urlById;
        this.list = localStorage.getItem(this.LocalStorageKey);
        if(!this.list){
            this.list = new ArrayList();
        }
    }

    fetchLast() {
        $.ajax(this.url).then( (data, status, jqXHR)=>{
            this.list.addItem(parseInt(data.num), data);
            var e = $.Event('dataloaded.',data);
            $('body').trigger(e);
        },(jqXHR, status, errorThrown)=>{
            console.error('error',errorThrown);
        });
    }

    fetch(id) {
        var url = this.urlById.replace('{id}',id);
        $.ajax(url).then( (data, status, jqXHR)=>{
            this.list.addItem(parseInt(data.num), data);
            var e = $.Event('dataloaded.',data);
            $('body').trigger(e);
        },(jqXHR, status, errorThrown)=>{
            console.error('error',errorThrown);
        });    
    }

    save() {
        localStorage.setItem(this.LocalStorageKey,this.list);
    }
}