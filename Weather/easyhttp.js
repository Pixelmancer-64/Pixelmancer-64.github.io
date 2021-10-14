class EasyHttp {
    constructor(){
        this.http = new XMLHttpRequest();
    }

    async get(url) {
        const response = (await (fetch(url))).json();
        return response;
      }
}