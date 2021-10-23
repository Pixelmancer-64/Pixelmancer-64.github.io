class EasyAjax {
    constructor(){
        this.http = new XMLHttpRequest();
    }

    get(url, callback){
        this.http.open('GET', url, true);
        this.http.send();
        this.http.onload = () =>{
            if(this.http.status === 200){
                callback(null, JSON.parse(this.http.responseText));
            }else{
                callback('Error : '+this.http.status);
            }
        }
    }
}
