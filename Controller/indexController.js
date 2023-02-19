var app = angular.module("myapp", ["ngRoute"]);
app.run(function ($rootScope, $location, $anchorScroll) {
  // Bắt sự kiện khi chuyển page
  $rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {
    // Đưa trang lên đầu
    $anchorScroll();
  });
});

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    // menu
    .when("/index", {
      templateUrl: "/View/Index.html",
      controller: "productController",
    })
    .when("/product", {
      templateUrl: "/View/Product.html",
      controller: "productController",
    })
    .when("/introduce", {
      templateUrl: "/View/Introduce.html",
    })
    .when("/event", {
      templateUrl: "/View/Event.html",
    })
    .when("/login", {
      templateUrl: "/View/FormLogin.html",
      controller: "loginCtrl",
    })
    .when("/shoppingCart", {
      templateUrl: "/View/shoppingCart.html",
    })
    .when("/pushProduct", {
      templateUrl: "/View/purchasedProducts.html",
    })
    .when("/products/:id", {
      templateUrl: "/View/productDetails.html",
      controller: "productDetailController",
    })

    .otherwise(
      {
        redirectTo: "/index"
      });



});



