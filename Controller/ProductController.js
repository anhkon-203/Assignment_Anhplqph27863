function product($scope, $http) {
    const productApi = "http://localhost:3000/products";

    $scope.updateIndex = -1;

    $scope.convert = "";


    $scope.input = function () {

        const input = document.querySelector('input[type="file"]');
        const file = input.files[0];

        // Tạo một đối tượng FileReader để đọc nội dung của tệp.
        const reader = new FileReader();

        // Đăng ký một sự kiện 'load' với đối tượng reader để thực hiện các hành động sau khi tệp đã được đọc.
        reader.addEventListener('load', (event) => {
            // Lấy nội dung của tệp dưới dạng chuỗi base64.
            const base64String = event.target.result;
            $scope.convert = base64String;
        });

        // Đọc tệp dưới dạng URL dữ liệu và kích hoạt sự kiện 'load' khi đọc tệp hoàn tất.
        reader.readAsDataURL(file);

    }

    $scope.product = {
        name: "",
        price: 0,
        status: true,
        category: 1,
        image: $scope.convert
    };

    function clear() {
        $scope.product = {
            name: "",
            price: 0,
            status: true,
            category: 1,
            image: ""
        };
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

        $http.delete(productApi + "/" + $scope.listProduct[index].id)
            .then(function (response) {
                $scope.listProduct.splice(index, 1);
            });
    }

    $http.get("data.json").then(function (response) {
        $scope.categories = response.data.categories;
    });

    $scope.getNameByID = function (categoryID) {
        var category = $scope.categories.find(function (category) {
            return category.id === categoryID;
        });
        return category ? category.name : '';
    };

}

function getListCategory($scope, $http) {
    $scope.listCategory = [];
    $http.get("http://localhost:3000/categories").then(function (response) {
        $scope.listCategory = response.data;
    });
}


