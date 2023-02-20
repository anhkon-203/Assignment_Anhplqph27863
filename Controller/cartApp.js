
app.controller('cartController', function ($scope, $http, $rootScope, $location) {
const productApiCart = "http://localhost:3000/products";
const cartAPI = "http://localhost:3000/carts";
// check login
    if (!$rootScope.currentUser) {
        $location.path('/login');
        return;
    }
    // get,delete  dữ liệu từ api
    $scope.carts = [];
    $scope.products = [];
    var userId = $rootScope.currentUser.id;
    $http.get(cartAPI + '?idUser=' + userId).then(function (response) {
        $scope.carts = response.data;
    });
    
    $http.get(productApiCart).then(function (response) {
        $scope.products = response.data;
    });
    $scope.deleteProduct = function (cart, $event) {
        $event.preventDefault();
        $http.delete(cartAPI + '/' + cart.id).then(function (response) {
            var index = $scope.carts.indexOf(cart);
            $scope.carts.splice(index, 1);
        });
    }
    
    
});

