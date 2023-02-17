const productApi =  "http://localhost:3000/products";
app.controller('productController', function($scope, $http) {
  $http.get(productApi)
    .then(function(response) {
      $scope.listProduct = response.data;
    });

  $scope.product = {
    name: "",
    price: 0,
    status: true,
    category: 1,
    image: ""
  };
});
