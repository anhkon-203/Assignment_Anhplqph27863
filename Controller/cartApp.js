const productApiCart = "http://localhost:3000/products";
const cartAPI = "http://localhost:3000/carts";
app.controller('cartController', function ($scope, $http, $rootScope, $location) {

    if (!$rootScope.currentUser) {
        $location.path('/login');
        return;
    }
    $scope.carts = [];
    $scope.products = [];
    var userId = $rootScope.currentUser.id;
    $http.get(cartAPI + '?idUser=' + userId).then(function (response) {
        $scope.carts = response.data;
    });
    $http.get(productApiCart).then(function (response) {
        $scope.products = response.data;
    });
});

