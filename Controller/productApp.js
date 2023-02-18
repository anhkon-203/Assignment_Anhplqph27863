const productApi =  "http://localhost:3000/products";
const categoryApi = "http://localhost:3000/categories";

app.controller('productController', function($scope, $http) {
  $http.get(productApi)
    .then(function(response) {
      $scope.listProduct = response.data;
    });
  $http.get(categoryApi).then(function(response) {
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

  $scope.selectCategory = function(category) {
    $scope.selectedCategory = category;
  };
});
app.controller('productDetailController', function($scope, $http, $routeParams) {
  var productId = $routeParams.productId;
  var id = $routeParams.id;
  $http.get('http://localhost:3000/products/' + id).then(function(response) {
    $scope.product = response.data;
  });
});



// Controller của trang chi tiết sản phẩm
