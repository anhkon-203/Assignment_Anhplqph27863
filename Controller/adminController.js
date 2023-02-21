
const app = angular.module("product_module", ["ngRoute"]);

app.controller("product_controller", product);

app.controller("category_getList", getListCategory);

app.controller("category_controller", category)

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/addProduct", {
            templateUrl: "/View/addProducts.html",

        })
        .when("/addCategory", {
            templateUrl: "/View/addCategory.html",

        })
        .otherwise(
            {
                redirectTo: "/addProduct"
            });


});