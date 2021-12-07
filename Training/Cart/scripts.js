const user = {
    name: 'Kim',
    active: true,
    cart: [],
    purchases: []
}

const compose = (f, g) => (...args) => f(g(...args))
const purchaseItem  = (...fns) => fns.reduce(compose);

console.log(purchaseItem(
  emptyUserCart,
  buyItem,
  applyTaxToItems,
  addItemToCart,
)(user, {name: 'laptop', price: 60}))

function addItemToCart(user, item) {
  const updatedCart = user.cart.concat(item)
  return Object.assign({}, user, {cart: updatedCart});
}

function applyTaxToItems(user) {
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
  const itemsInCart = user.cart;
  return Object.assign({}, user, { purchases: itemsInCart });
}
function emptyUserCart(user) {
  return Object.assign({}, user, { cart: [] });
}