const productApi = "http://localhost:3000/products";
function product($scope, $http) {
    $scope.listProduct = [];
    $http.get(productApi).then(function (response) {
        $scope.listProduct = response.data;
    });

    function category($scope, $http) {
        $scope.listCategory = [];
        $http.get("http://localhost:3000/categories").then(function (response) {
            $scope.listCategory = response.data;
        });
    }
    $scope.updateIndex = -1;

    $scope.product = {
        name: "",
        price: 0,
        status: true,
        category: 1,
        image: ""
    };
    function them() {
        $http.post("http://localhost:3000/products", $scope.product)
            .then(function (response) {
                console.log(response);
            });;

    }
    function sua()
    {
        $http.put(productApi + "/" + $scope.listProduct[$scope.updateIndex].id, $scope.product)
        // $scope.listProduct[$scope.updateIndex] = $scope.product;
        $scope.listProduct[$scope.updateIndex] = Object.assign({}, $scope.product);
    }
    $scope.save = function (event) {
        // Chặn hành động mặc định của form (sự kiện submit sẽ gây tải lại page)
        // console.log(event)
        event.preventDefault();
      
        if ($scope.updateIndex == -1) {
          them();
        
        } else {
            sua();
           
        }
    }

    $scope.btnDeleteOnClick = function(event, index) {
        event.preventDefault();
        $http.delete(productApi + "/" + $scope.listProduct[index].id)
            .then(function (response) {
                console.log(response);
            });
        $scope.listProduct.splice(index, 1);
    }
    $scope.btnUpdateOnClick = function(event, index) {
        event.preventDefault();
    
        const p = $scope.listProduct[index];
        $scope.product.name = p.name;
        $scope.product.price = p.price;
        $scope.product.status = (p.status === "true");
        $scope.product.category = p.category;
        $scope.updateIndex = index;
        
        if ($scope.product.status) {
            $scope.product.status = true;
        } else {
            $scope.product.status = false;
        }
    };
    
    
}



