var app = angular.module("myapp", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
    //inject $locationProvider service
    $locationProvider.hashPrefix(""); // add configuration
    $routeProvider
      // menu
      .when("/index", {
        templateUrl: "/View/Index.html",
        controller: "productController", // remove or add a controller here
      })
      .when("/product", {
        templateUrl: "/View/Product.html",
        controller: "productController", // remove or add a controller here
      })
      .when("/introduce", {
        templateUrl: "/View/Introduce.html",
        // controller: "addCategoryController", // remove or add a controller here
      })
      .when("/event", {
        templateUrl: "/View/Event.html",
        // controller: "addCategoryController", // remove or add a controller here
      })
      .when("/login", {
        templateUrl: "/View/FormLogin.html",
        controller: "loginCtrl", // remove or add a controller here
      })
      .when("/shoppingCart", {
        templateUrl: "/View/shoppingCart.html",
        // controller: "addCategoryController", // remove or add a controller here
      })
      .when("/pushProduct", {
        templateUrl: "/View/purchasedProducts.html",
        // controller: "addCategoryController", // remove or add a controller here
      })
      .when("/products/:id", {
        templateUrl: "/View/productDetails.html",
        controller: "productDetailController", // remove or add a controller here
      })
      
      .otherwise(
        {
            redirectTo: "/index"
        });


});



      