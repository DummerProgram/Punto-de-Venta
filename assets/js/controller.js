angular.module("myApp")
.controller("controllerSale", ["$scope", "ToDoService", function (s, t) {
    t.initializeLocalStorage("angular-toDoList-client");
    s.toDoListClient = t.getAll()
    t.initializeLocalStorage("angular-toDoList-product");
    s.toDoListProduct = t.getAll()
    t.initializeLocalStorage("angular-toDoList-sale");
    s.toDoListSale = t.getAll()
    t.initializeLocalStorage("angular-toDoList-total")
    s.toDoListTotal = t.getAll()
    s.flagdivform = false
    s.flagdivformtotal = false
    s.flagdivtotal = false
    s.flagbutton = true
    s.flagbuttontotal = true
    s.flagbuttonconfirm = true
    s.productObj = {}
    s.sale = {}
    s.total = {}
    s.surplus =""

    s.validateDiv = function () {
      if( s.sale.cliente != "" && s.sale.cliente != null && s.sale.cliente != undefined &&
      s.sale.producto != "" && s.sale.producto != null && s.sale.producto != undefined){
        s.productObj = s.toDoListProduct.find( element => element.nombre === s.sale.producto )
        s.sale.precio = "$" + s.productObj.precio
        s.flagdivform = true
        s.flagbutton = false
      }else{
        s.flagdivform = false
        s.flagbutton = true
      }
    }

    s.addSale = function () {
      s.sale.codigo = s.productObj.codigo
      s.sale.precio = s.productObj.precio
      s.sale.total = String( parseInt(s.productObj.precio, 10) * parseInt(s.sale.cantidad, 10) )
      s.productObj.cantidad = String( parseInt(s.productObj.cantidad, 10) - parseInt(s.sale.cantidad, 10) )
      t.initializeLocalStorage("angular-toDoList-product");
      s.toDoListProduct = t.getAll()
      t.upDate(s.productObj)
      t.initializeLocalStorage("angular-toDoList-sale");
      s.toDoListSale = t.getAll()
      t.add(s.sale)
      s.productObj = {}
      s.sale = {}
      s.flagdivform = false
    }

    s.validateTotal = function (){
      if(s.total.cliente != "" && s.total.cliente != null && s.total.cliente != undefined){
        let total = 0, productos = 0, totalArray = [], indexTotal = 0, indexSale = 0
        t.initializeLocalStorage("angular-toDoList-total")
        s.toDoListTotal = t.getAll()
        t.initializeLocalStorage("angular-toDoList-sale");
        s.toDoListSale = t.getAll()
        s.flagdivformtotal = true
        indexTotal = s.toDoListTotal.findIndex( (element, indexTotal) => element.cliente === s.total.cliente )
        indexSale = s.toDoListSale.findIndex( (element, indexSale) => element.cliente === s.total.cliente )
        if(s.toDoListSale.length != 0){
          if(s.toDoListTotal.length != 0){
            if(indexTotal < 0 && indexSale >= 0){
              s.flagbuttontotal = false
              totalArray = s.toDoListSale.filter( element => element.cliente === s.total.cliente )
              totalArray.forEach((item) => {
                  productos += 1
                  total += parseInt( item.total, 10 )
                }
              )
              s.total.productos = String (productos)
              s.total.total = String(total)
            }else{
              if(indexTotal >= 0 && indexSale < 0){
                s.flagbuttontotal = false
                s.total.productos = s.toDoListTotal[indexTotal].productos
                s.total.total = s.toDoListTotal[indexTotal].total
              }
            }
            if(indexTotal >= 0 && indexSale >= 0){
              s.flagbuttontotal = false
              totalArray = s.toDoListSale.filter( element => element.cliente === s.total.cliente )
              totalArray.forEach((item) => {
                  productos += 1
                  total += parseInt( item.total, 10 )
                }
              )
              s.total.productos = String ( parseInt ( s.toDoListTotal[indexTotal].productos, 10 ) + productos)
              s.total.total = String ( parseInt ( s.toDoListTotal[indexTotal].total, 10 ) + total )
              console.log(s.total.productos);
            }else{
              if(indexTotal < 0 && indexSale < 0){
                s.flagbuttontotal = true
                s.total.productos = "Ninguno"
                s.total.total = "0"
              }
            }
          }else{
            if(indexSale >= 0){
              s.flagbuttontotal = false
              totalArray = s.toDoListSale.filter( element => element.cliente === s.total.cliente )
              totalArray.forEach((item) => {
                  productos += 1
                  total += parseInt( item.total, 10 )
                }
              )
              s.total.productos = String (productos)
              s.total.total = String(total)
            }else{
              if(indexSale < 0){
                s.flagbuttontotal = true
                s.total.productos = "Ninguno"
                s.total.total = "0"
              }
            }
          }
        }else{
          if(indexTotal >= 0){
            s.flagbuttontotal = false
            s.total.productos = s.toDoListTotal[indexTotal].productos
            s.total.total = s.toDoListTotal[indexTotal].total
          }else{
            if(indexTotal < 0){
              s.flagbuttontotal = true
              s.total.productos = "Ninguno"
              s.total.total = "0"
            }
          }
        }
      } else {
        s.flagdivformtotal = false
        s.flagbuttontotal = true
      }
    }

    s.confirmTotal = function () {
      s.total.total = String( parseInt(s.total.total, 10) - parseInt(s.total.subtotal, 10))
      s.flagdivformtotal = false
      s.flagbuttontotal = true
      s.flagdivtotal = true
      s.flagbuttonconfirm = false
    }

    s.addTotal = function () {
      t.initializeLocalStorage("angular-toDoList-total")
      s.toDoListTotal = t.getAll()
      if (s.toDoListTotal.length != 0) {
        let index = this.toDoListTotal.findIndex( (element, index) => element.cliente === s.total.cliente)
        if(index >= 0){
          if(s.total.total != 0){
            t.upDate(s.total)
          }else{
            t.initializeLocalStorage("angular-toDoList-total")
            s.toDoListTotal = t.removeItemTotal(s.total)
            window.alert("Pagado")
          }
        }else{
          if(s.total.total != 0){
            t.add(s.total)
          }else{
            window.alert("Pagado")
          }
        }
      }else{
        if(s.total.total != 0){
          t.add(s.total)
        }else{
          window.alert("Pagado")
        }
      }
      s.total = {}
      t.initializeLocalStorage("angular-toDoList-sale")
      s.toDoListSale = t.getAll()
      s.toDoListSale = []
      t.clean()
      s.toDoListTotal = []
      s.flagdivtotal = false
      s.flagbuttonconfirm = true
    }


  }
])
.controller("controllerClient", ["$scope", "ToDoService", function (s, t) {
    t.initializeLocalStorage("angular-toDoList-client");

    s.toDoListClient = t.getAll()
    s.flagbutton = true
    s.client = {}

    s.validate = function () {
      if( s.client.nombre != "" && s.client.nombre != null && s.client.nombre != undefined
      && s.client.telefono != "" && s.client.telefono != null && s.client.telefono != undefined
      && s.client.direccion != "" && s.client.direccion != null && s.client.direccion != undefined ){
        s.flagbutton = false
      }else{
        s.flagbutton = true
      }
    }

    s.addClient = function () {
      t.add(s.client)
      s.client = {}
      s.flagbutton = true
    }

    s.removeClient = function (item) { s.toDoListClient = t.removeItem(item) }

  }
])
.controller("controllerProduct", ["$scope", "ToDoService", function (s, t) {
    t.initializeLocalStorage("angular-toDoList-product");

    s.toDoListProduct = t.getAll()
    s.flagbutton = true
    s.product = {}

    s.validate = function () {
      if( s.product.nombre != "" && s.product.nombre != null && s.product.nombre != undefined &&
      s.product.codigo != "" && s.product.codigo != null && s.product.codigo != undefined &&
      s.product.medida != "" && s.product.medida != null && s.product.medida != undefined &&
      s.product.cantidad != "" && s.product.cantidad != null && s.product.cantidad != undefined &&
      s.product.precio != "" && s.product.precio != null && s.product.precio != undefined
      ){
        s.flagbutton = false
      }else{
        s.flagbutton = true
      }
    }

    s.addProduct = function () {
      t.add(s.product)
      s.product = {}
      s.flagbutton = true;
    }

    s.removeProduct = function (item) { s.toDoListProduct = t.removeItem(item) }

  }
])
