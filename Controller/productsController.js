const productApi = "http://localhost:3000/products";
function product($scope, $http) {
    $scope.listProduct = [];
    $http.get(productApi).then(function (response) {
        $scope.listProduct = response.data;
    });


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
    
    
    // var newProdcut = {
    //     name: $scope.product.name,
    //     price: $scope.product.price,
    //     status: $scope.product.status,
    //     category: $scope.product.category,
    //     image: ""
    // };

    // $http({
    //     method: 'POST',
    //     url: 'http://localhost:3000/products', // Thay đổi URL để phù hợp với đường dẫn của API của bạn
    //     data: newObject
    // }).then(function (response) {
    //     // Xử lý phản hồi thành công từ JSON Server
    //     console.log('Thêm đối tượng thành công:', response.data);
    // }, function (error) {
    //     // Xử lý lỗi nếu có
    //     console.error('Lỗi khi thêm đối tượng:', error);
    // });

}

function category($scope, $http) {
    $scope.listCategory = [];
    $http.get("http://localhost:3000/categories").then(function (response) {
        $scope.listCategory = response.data;
    });
}


function convertImage() {
    const input = document.querySelector('input[type="file"]');
    const file = input.files[0];

    // Tạo một đối tượng FileReader để đọc nội dung của tệp.
    const reader = new FileReader();

    // Đăng ký một sự kiện 'load' với đối tượng reader để thực hiện các hành động sau khi tệp đã được đọc.
    reader.addEventListener('load', (event) => {
        // Lấy nội dung của tệp dưới dạng chuỗi base64.
        const base64String = event.target.result;
        return base64String;
    });

    // Đọc tệp dưới dạng URL dữ liệu và kích hoạt sự kiện 'load' khi đọc tệp hoàn tất.
    reader.readAsDataURL(file);
}