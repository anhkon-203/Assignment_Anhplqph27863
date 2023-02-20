// Đăng nhập
app.controller('loginCtrl', function ($scope, $rootScope, $http, $location) {
  var url = "http://localhost:3000/users";
// Lấy danh sách user từ server
  $http.get(url).then(
    function (response) {
      $rootScope.users = response.data;
    }
  );
// Xử lí đăng nhập
  $scope.login = function ($event) {
    $event.preventDefault(); 
    $scope.message = null;
// Kiểm tra username và password
    if (!$scope.username || !$scope.password) {
      $scope.message = { text: "Username và password không được để trống", type: "alert-danger" };
      return;
    }
// Kiểm tra thông tin đăng nhập và chuyển hướng đến trang Index
    var user = checkLogin($scope.username, $scope.password);

    if (user !== null) {
      $rootScope.currentUser = user;
      $location.path('/Index');
    } else {
      $scope.message = { text: "Sai tài khoản hoặc mật khẩu", type: "alert-danger" };
    }
  };

  function checkLogin(user, pass) {
    for (var i = 0; i < $rootScope.users.length; i++) {
      if ($rootScope.users[i].username === user && $rootScope.users[i].password === pass) {
        return $rootScope.users[i];
      }
    }
    return null;
  }

});

// Đăng ký
app.controller('registerCtrl', function ($scope, $http) {
  var url = "http://localhost:3000/users";
// Xử lí đăng ký
  $scope.register = function () {
    var data = {
      username: $scope.usernameRegister,
      password: $scope.passwordRegister
    };

    // Kiểm tra mật khẩu xác nhận
    if ($scope.passwordRegister !== $scope.confirmPassword) {
      $scope.errorMsg = "Mật khẩu xác nhận không khớp";
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    // Kiểm tra tên đăng nhập đã tồn tại
    $http.get('http://localhost:3000/users?username=' + $scope.usernameRegister)
      .then(function (response) {
        if (response.data.length > 0) {
          alert("Tên đăng nhập đã tồn tại");
        } else {
          // Tạo mới tài khoản
          $http.post(url, data)
            .then(function (response) {
              console.log('Đăng ký tài khoản thành công:', response.data);
              alert("Đăng ký tài khoản thành công");
              // Đóng modal
              $('#registerModal').modal('hide');
            }
            , function (response) {
              console.log('Đăng ký tài khoản thất bại:', response.data);
              alert("Đăng ký tài khoản thất bại");
          });
        }
      });
  };
});
// Đăng xuất
app.controller('navCtrl', function ($scope, $rootScope, $location) {
  $scope.logout = function () {
    $rootScope.currentUser = null;
  };
});