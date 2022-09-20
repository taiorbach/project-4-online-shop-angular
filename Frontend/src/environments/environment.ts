export const environment = {
  production: false,
  registerUrl: "http://localhost:3005/api/auth/register/",
  loginUrl: "http://localhost:3005/api/auth/login/",
  usersUrl: "http://localhost:3005/api/auth/users/",

  productsUrl: "http://localhost:3005/api/products/",
  productsByCategoryUrl: "http://localhost:3005/api/products-by-category/",
  productsImagesUrl: "http://localhost:3005/api/products/images/",
  productCountUrl: "http://localhost:3005/api/products-count/",
  categoriesUrl: "http://localhost:3005/api/categories/",

  cartsUrl: "http://localhost:3005/api/carts/",
  cartProductUrl: "http://localhost:3005/api/cart-products/",
  cartProductsByCartUrl: "http://localhost:3005/api/products-by-cart/",
  cartByUserUrl: "http://localhost:3005/api/cart-by-user/",

  ordersUrl: "http://localhost:3005/api/orders",
  countOrdersUrl: "http://localhost:3005/api/orders-count",
  checkDateOrder: "http://localhost:3005/api/orders-dates",


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
