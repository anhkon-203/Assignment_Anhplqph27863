const productApi = "http://localhost:3000/products";
const categoryApi = "http://localhost:3000/categories";

app.controller('productController', function ($scope, $http) {
  $http.get(productApi)
    .then(function (response) {
      $scope.listProduct = response.data;
    });
  $http.get(categoryApi).then(function (response) {
    $scope.listCategory = response.data;
  });
  $scope.product = {
    name: "",
    price: 0,
    status: true,
    category: 1,
    image: ""
  };
  $scope.category = {
    name: "",
  };

  $scope.selectCategory = function (category) {
    $scope.selectedCategory = category;
  };
});
app.controller('productDetailController', function ($scope, $http, $routeParams, $rootScope, $location) {
  var cartAPI = "http://localhost:3000/carts";
  var id = $routeParams.id;
  $http.get(productApi + '/' + id).then(function (response) {
    $scope.product = response.data;
  });

  $scope.addToCart = function (product, quantity, $event) {
    $event.preventDefault();
    if (!$rootScope.currentUser) {
      $location.path('/login');
      return;
    }
    var userId = $rootScope.currentUser.id;
    var data = {
      idUser: userId,
      idProduct: product.id,
      quantity: quantity
    };

    $http.post(cartAPI, data)
      .then(function (response) {
        console.log('Thêm vào giỏ hàng thành công');

      }, function (error) {
        console.log('Thêm vào giỏ hàng không thành công');
      });
  };
});





