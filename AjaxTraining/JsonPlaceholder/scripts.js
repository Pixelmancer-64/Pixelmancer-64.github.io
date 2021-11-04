const http = new EasyHttp
const data = {
    title: 'My custom post test',
    body: 'hello world!'
};

// http.get('https://jsonplaceholder.typicode.com/posts', function(status, response){
//     if(status){
//         console.log(status);
//     } else {
//         console.log(response);
//     }
// })

// http.get('https://jsonplaceholder.typicode.com/posts/1', function(status, response){
//     if(status){
//         console.log(status);
//     } else {
//         console.log(response);
//     }
// })

// http.post('https://jsonplaceholder.typicode.com/posts', data, function(status, response){
//     if(status){
//         console.log(status);
//     } else {
//         console.log(response);
//     }
// })

// http.put('https://jsonplaceholder.typicode.com/posts/1', data, function(status, response){
//     if(status){
//         console.log(status);
//     } else {
//         console.log(response);
//     }
// })

http.delete('https://jsonplaceholder.typicode.com/posts/1', function(status, response){
    if(status){
        console.log(status);
    } else {
        console.log(response);
    }
})