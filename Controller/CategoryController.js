function category($scope, $http) {
    const categoryApi = "http://localhost:3000/categories";

    $scope.updateIndex = -1;


    $scope.category = {
        name: "",
        status: true
    };

    function clear() {
        $scope.category = {
            name: "",
            status: true
        };
    }


    $scope.btnUpdateOnClick = function (event, index) {
        event.preventDefault();

        const p = $scope.listCategory[index];
        $scope.category.name = p.name;
        $scope.category.status = p.status;
        $scope.updateIndex = index;
    }

    $scope.listCategory = [];

    $http.get(categoryApi).then(function (response) {
        $scope.listCategory = response.data;
    });


    function post() {
        $http.post(categoryApi, $scope.category)
            .then(function (response) {
                $scope.listCategory.push($scope.category);
                clear();
            });
    }

    function put() {
        $http.put(categoryApi + "/" + $scope.listCategory[$scope.updateIndex].id, $scope.category)
            .then(function (response) {
                $scope.listCategory[$scope.updateIndex] = Object.assign({}, $scope.category);
                clear
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

        $http.delete(category + "/" + $scope.listCategory[index].id)
            .then(function (response) {
                $scope.listCategory.splice(index, 1);
            });
    }

}