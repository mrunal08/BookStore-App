define([''], function() {

    //Login and Signup
    var methods = {};
    methods.ajaxPost = function(url, obj) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    console.log(xhr.response, xhr.responseXML);
                    resolve(xhr.response)
                }
            };
            xhr.open('POST', url, true);
            //xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.onerror = reject;

            xhr.send(obj)

        });
    }



    //GET
    methods.ajaxGet = function(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    console.log(xhr.response, xhr.responseXML);
                    resolve(xhr.response)
                }
            };
            xhr.open('GET', url, true);
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            // xhr.setRequestHeader("Content-type", "multipart/form-data");

            xhr.onerror = reject;

            xhr.send()

        });
    }

    methods.ajaxAddToCart = function(url, obj) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    console.log(xhr.response, xhr.responseXML);
                    resolve(xhr.response)
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.onerror = reject;

            xhr.send(obj)

        });
    }
    const config = {
        headers: {
            "x-access-token": "token",
            "Content-Type": "application/json"
        }
    };

    const headerconfig = {
        headers: {
            'accept': 'application/json',
            'x-access-token': localStorage.getItem('token'),

        }
    }



    console.log(headerconfig);


    var methods = {};
    methods.signup = async function(signupObj) {
        let response = await axios.post('https://bookstore.incubation.bridgelabz.com/bookstore_user/admin/registration', signupObj);

        return response;

    }

    methods.signin = async function(loginObj) {
        let loginResponse = await axios.post('https://bookstore.incubation.bridgelabz.com/bookstore_user/admin/login', loginObj);
        return loginResponse;
    }

    methods.getBooks = async function() {
        let getResponse = await axios.get('https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book', config);
        return getResponse;
    }

    methods.addCart = async function(obj1) {
        console.log(obj1)
        let a = obj1.product_id
        console.log(a)

        // let cartResponse = await axios.get('https://new-bookstore-backend.herokuapp.com/bookstore_user​/add_cart_item​', obj1, config);
        let cartResponse = await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add_cart_item/${a}`, obj1, headerconfig);

        return cartResponse;
    }

    methods.getCartItems = async function() {
        console.log(headerconfig);
        let getCart = await axios.get('https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items', { headers: { "x-access-token": localStorage.getItem('token'), "Content-Type": "application/json" } });

        return getCart;
    }

    methods.addQuantity = async function(cartCount) {
        let b = cartCount._id
        console.log(b)
        let bookQuantity = await axios.put(`https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${b}`, cartCount, headerconfig);
        return bookQuantity;
    }

    methods.wish = async function(objWish) {
        let c = objWish.product_id
        console.log(c)
        let wishResponse = await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add_wish_list/${c}`, objWish, headerconfig);
        return wishResponse;
    }

    methods.getwishItems = async function() {
        let getWish = await axios.get('https://bookstore.incubation.bridgelabz.com/bookstore_user/get_wishlist_items', headerconfig)
        return getWish;
    }

    methods.deleteWish = async function(objDelete) {
        let d = objDelete.product_id
        console.log(d)
        let delWish = await axios.delete(`https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_wishlist_item/${d}`, headerconfig)
        return delWish;
    }

    methods.deleteCart = async function(cartDelete) {
        let e = cartDelete.product_id
        console.log(e)
        let delCart = await axios.delete(`https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/${e}`, headerconfig)
        return delCart;
    }

    methods.editUser = async function(obj4) {
        let editedUser = await axios.put('https://bookstore.incubation.bridgelabz.com/bookstore_user/edit_user/', obj4, headerconfig);
        return editedUser;
    }

    methods.addOrder = async function(objOrder) {
        let finalOrder = await axios.post('https://bookstore.incubation.bridgelabz.com/bookstore_user/add/order', objOrder, headerconfig);
        return finalOrder;
    }


    return methods;


})