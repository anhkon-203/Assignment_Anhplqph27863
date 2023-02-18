const productApi = "http://localhost:3000/products";
const categoryApi = "http://localhost:3000/categories";

app.controller('productController', function ($scope, $http) {
  $http.get(categoryApi).then(function (response) {
    $scope.listCategory = response.data;
    // load products after categories are loaded
    $http.get(productApi).then(function (response) {
      $scope.listProduct = response.data.map(function (product) {
        // replace category_id with category object
        if (typeof product.category === 'string') {
          var categoryId = parseInt(product.category);
          if (!isNaN(categoryId)) {
            product.category = $scope.listCategory.find(function (category) {
              return category.id === categoryId;
            });
          }
        }
        return product;
      });
    });
  });

  $scope.filterByCategory = function(product) {
    if (!$scope.selectedCategoryId) {
      return true; // Nếu không chọn danh mục thì hiển thị tất cả sản phẩm
    }
    return product.category === $scope.selectedCategoryId;
  };

  $scope.getAllProducts = function() {
    $http.get(productApi).then(function (response) {
      $scope.listProduct = response.data.map(function (product) {
        // replace category_id with category object
        if (typeof product.category === 'string') {
          var categoryId = parseInt(product.category);
          if (!isNaN(categoryId)) {
            product.category = $scope.listCategory.find(function (category) {
              return category.id === categoryId;
            });
          }
        }
        return product;
      });
      $scope.selectedCategoryId = null; // Reset danh mục được chọn
    });
  };
});
