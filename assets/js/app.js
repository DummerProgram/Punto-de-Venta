angular.module("myApp",["LocalStorageModule", "ngResource", "ngRoute"])
.config(["$routeProvider", function (rp) {
    rp.when("/", {
        templateUrl : "assets/views/sale.html",
        controller : "controllerSale",
      }
    )
    rp.when("/client", {
        templateUrl : "assets/views/client.html",
        controller: "controllerClient",
      }
    )
    rp.when("/product", {
      templateUrl : "assets/views/product.html",
      controller: "controllerProduct",
      }
    )
  }
])
