const user = {
    name: 'Kim',
    active: true,
    cart: [],
    purchases: []
  }
  const history1 = [];
  const compose = (f, g) => (...args) => f(g(...args))
  const pipe = (f, g) => (...args) => g(f(...args))
  const purchaseItem  = (...fns) => fns.reduce(compose);
  const purchaseItem2  = (...fns) => fns.reduce(pipe);
 console.log( purchaseItem2(
    addItemToCart,
    applyTaxToItems,
    buyItem,
    emptyUserCart,
  )(user, {name: 'laptop', price: 60}))
  // purchaseItem(
  //   emptyUserCart,
  //   buyItem,
  //   applyTaxToItems,
  //   addItemToCart
  // )(user, {name: 'laptop', price: 50})
  function addItemToCart(user, item) {
    history1.push(user)
    const updatedCart = user.cart.concat(item)
    return Object.assign({}, user, {cart: updatedCart});
  }
  
  function applyTaxToItems(user) {
    history1.push(user)
    const {cart} = user;
    const taxRate = 1.3;
    const updatedCart = cart.map(item => {
      return {
        name: item.name,
        price: item.price*taxRate
      }
    })
    return Object.assign({}, user, { cart: updatedCart });
  }
  
  function buyItem(user) {
    history1.push(user)
    const itemsInCart = user.cart;
    return Object.assign({}, user, { purchases: itemsInCart });
  }
  function emptyUserCart(user) {
    history1.push(user)
    return Object.assign({}, user, { cart: [] });
  }