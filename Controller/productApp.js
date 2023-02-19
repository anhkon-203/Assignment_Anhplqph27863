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
    event.preventDefault();
    $scope.selectedCategory = category;
  };
});
app.controller('productDetailController', function($scope, $http, $routeParams,$rootScope,$location) {
  event.preventDefault();
  var productId = $routeParams.productId;
  var id = $routeParams.id;
  $http.get(productApi + '/' + id).then(function(response) {
    $scope.product = response.data;
  });
  $scope.addToCart = function(product, quantity) {
    if (!$rootScope.currentUser) {
      // Nếu người dùng chưa đăng nhập, yêu cầu người dùng đăng nhập
      $location.path('/Index');
      alert('Bạn phải đăng nhập để thực hiện chức năng này');
    } else {
      // Nếu người dùng đã đăng nhập
      var cart = $rootScope.currentUser.cart;
      if (!cart) {
        // Nếu đối tượng giỏ hàng chưa tồn tại, tạo mới đối tượng giỏ hàng
        cart = {
          items: []
        };
        $rootScope.currentUser.cart = cart;
      }
      // Thêm sản phẩm vào đối tượng giỏ hàng
      cart.items.push({
        product: product,
        quantity: quantity
      });
      // Lưu thông tin người dùng vào localStorage để giữ đăng nhập sau khi tắt trình duyệt
      // localStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser));
      alert('Thêm sản phẩm vào giỏ hàng thành công');
    }
  };
  
});
