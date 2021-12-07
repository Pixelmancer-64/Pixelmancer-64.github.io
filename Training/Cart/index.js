const user = {
    name: 'Kim',
    active: true,
    cart: [],
    purchases: []
}

function addItemToCart(user, ...args){
    args.forEach(e => {
        e.price = (e.price * 1.03).toFixed(2);
        user.cart.push(e);
    });
}

function buyItem(user){
    user.cart.forEach(e => {
        user.purchases.push(e);
    })
    user.cart = [];
}



addItemToCart(user, {name: 'laptop', price: 60}, {name: 'cinema', price: 60});

buyItem(user)

console.log(user)