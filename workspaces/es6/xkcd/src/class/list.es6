class ArrayList{
    constructor(){
        this.list = null;
        this.position = null;
    }
    addItem(position,item){
        if(!this.list){
            this.list = [];
        }
        this.list[position]=item;
        this.position = position;
    }
    next(){
        if(this.hasNext()){
            this.position++;
            return this.current();
        }
        return null;
    }
    previous(){
        if(this.hasPrevious()){
            this.position--;
            return this.current();
        }
        return null;
    }
    hasPrevious(){
        if(this.position && this.list[this.position-1]){
            return true;
        }
        return false;
    }
    hasNext(){
        if(this.position && this.list[this.position+1]){
            return true;
        }
        return false;
    }
    current(){
        if(this.list && this.list[this.position]){
            return this.list[this.position];
        }
        return null;
    }
}