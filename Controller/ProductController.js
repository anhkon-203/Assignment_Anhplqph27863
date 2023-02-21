function product($scope, $http) {
    const productApi = "http://localhost:3000/products";
    $scope.updateIndex = -1;
    $scope.product = {
        name: "",
        price: 0,
        status: true,
        category: 1,
        image: ""
    };
    $scope.showUrl = function () {
        var fullPath = document.getElementById("myFileInput").value;
        
        $scope.product.image = fullPath.split('\\').pop();;
    };
    function clear() {
        $scope.product = {
            name: "",
            price: 0,
            status: true,
            category: 1,
            image: ""
        };
        $scope.updateIndex = -1;
    }
    $scope.btnUpdateOnClick = function (event, index) {
        event.preventDefault();
        const p = $scope.listProduct[index];
        $scope.product.name = p.name;
        $scope.product.price = p.price;
        $scope.product.status = p.status;
        document.getElementById("category").value = p.category;
        $scope.updateIndex = index;
    }

    $scope.listProduct = [];
    $http.get(productApi).then(function (response) {
        $scope.listProduct = response.data;
    });
    function post() {
        $http.post(productApi, $scope.product)
            .then(function (response) {
                $scope.listProduct.push($scope.product);
                clear();
            });
    }
    function put() {
        $http.put(productApi + "/" + $scope.listProduct[$scope.updateIndex].id, $scope.product)
            .then(function (response) {
                $scope.listProduct[$scope.updateIndex] = Object.assign({}, $scope.product);
                clear();
            });
    }
    $scope.save = function (event) {
        event.preventDefault();
        if ($scope.updateIndex == -1) {
            post();
        } else {
            put();
        }
    }

    $scope.delete = function (event, index) {
        event.preventDefault();

        $http.delete(productApi + "/" + $scope.listProduct[index].id)
            .then(function (response) {
                $scope.listProduct.splice(index, 1);
            });
    }

    $http.get("/db/data.json").then(function (response) {
        $scope.categories = response.data.categories;
    });

    $scope.getNameByID = function (categoryID) {
        var category = $scope.categories.find(function (category) {
            return category.id == categoryID;
        });
        return category ? category.name : '';
    };

    $scope.clear = function (event) {
        event.preventDefault();
        clear();
    }

}

function getListCategory($scope, $http) {
    $scope.listCategory = [];
    $http.get("http://localhost:3000/categories").then(function (response) {
        $scope.listCategory = response.data;
    });
}
