window.addEventListener('DOMContentLoaded', function() {
    let counterDisplay = document.querySelector('.counter-display');
    let counterMinus = document.querySelector('.counter-minus');
    let counterPlus = document.querySelector('.counter-plus');
    const cart = document.querySelector('.cart')
    const user = document.querySelector('.user')
    const userOptions = document.querySelector('.userOptions')
    const wishBtn = document.querySelector('.wishBtn')
    const cartContainer = document.querySelector('.cart-container')

    const placeOrderBtn = document.querySelector('.placeOrder')
    const AddressDetails = document.querySelector('.AddressDetails')
    const CustomerDetails = document.querySelector('.CustomerDetails')
    const continueButton = document.querySelector('.cntButton')

    const OrderSummary = document.querySelector('.OrderSummary')
    const OrderSummary1 = document.querySelector('.OrderSummary1')

    const inputAddress = document.querySelector('.inputAddress')
    const inputCity = document.querySelector('.inputCity')
    const inputState = document.querySelector('.inputState')

    const once = document.querySelector('.once')

    const checkoutButton = document.querySelector('.checkoutButton')


    const removeItem = document.querySelector('.removeItem')


    let remCart = "";

    let city1;
    let state1;
    let address;
    let h = "Home";


    inputAddress.addEventListener('change', function() {
        address = inputAddress.value;

        console.log(address)

    })

    inputCity.addEventListener('change', function() {
        city1 = inputCity.value
    })

    inputState.addEventListener('change', function() {
        state1 = inputState.value;
    })




    placeOrderBtn.addEventListener('click', function() {
        AddressDetails.style.display = 'none';
        CustomerDetails.style.display = 'flex';
        placeOrderBtn.style.display = 'none';
    })

    continueButton.addEventListener('click', function() {
        OrderSummary.style.display = 'none';
        OrderSummary1.style.display = 'flex';

    })



    $(document).on('click', '.bookHead', function(event) {
        remCart = event.target.id
            // console.log(remCart)

        $(document).on('click', '.removeItem', function() {
            console.log("hello")
            let cartDelete = {
                product_id: remCart,
            }

            console.log(cartDelete)
            requirejs(['../Service/dataService.js'], (methods) => {
                methods.deleteCart(cartDelete).then(function(delCart) {
                    console.log(delCart)
                    location.reload();
                })

                // location.reload();
            })
        })



    })


    continueButton.addEventListener('click', function() {

        let obj4 = {
            addressType: h,
            fullAddress: address,
            city: city1,
            state: state1,
        }

        console.log(obj4);

        requirejs(['../service/dataService.js'], (methods) => {
            methods.editUser(obj4).then(function(editedUser) {
                console.log(editedUser)
                console.log(editedUser.status)

                if (editedUser.status === 200) {
                    continueButton.style.display = 'none';

                }

            })
        });

    })

    let count = 1;
    let cartBook = [];
    let crtBook = [];
    let cartQid;
    let filterArry;
    let x;
    let y;

    let cnt;

    let cnt2;


    $(document).on('click', '.counter-plus', function(event) {
        let cartQid = event.target.id

        x = $(`#${cartQid}.counter-display`).html();
        console.log(x)
        y = parseInt(x)
            // console.log(y);

        y = y + 1;



        let cartCount = {

            "quantityToBuy": y,
        }

        console.log(cartCount.quantityToBuy);

        let actObj = JSON.stringify(cartCount);


        function ajax(url) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                        // console.log(xhr.response, xhr.responseXML);
                        resolve(xhr.response)
                    }
                };
                xhr.open('PUT', url, true);
                xhr.setRequestHeader('x-access-token', localStorage.getItem('token'));
                xhr.setRequestHeader("Content-type", "application/json");

                xhr.onerror = reject;

                xhr.send(actObj);
            });
        }

        function ajaxGet(url) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                        // console.log(xhr.response, xhr.responseXML);
                        resolve(xhr.response)
                    }
                };
                xhr.open('GET', url, true);
                xhr.setRequestHeader('x-access-token', localStorage.getItem('token'));
                xhr.setRequestHeader("Content-type", "application/json");

                xhr.onerror = reject;

                xhr.send();
            });
        }




        ajaxGet(`https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items`)
            .then(function(result) {
                // console.log(result + "hello");
                $(`#${cartQid}.counter-display`).html(cnt)
                let Res = JSON.parse(result);
                console.log(Res.result);

                filterArry = Res.result.filter(function(book) {
                    return book._id == cartQid;
                })

                bookNum = filterArry.map(function(book3) {
                    cnt = book3.quantityToBuy

                    console.log(cnt)

                });



                console.log(filterArry)
                    // console.log(cartQid)
                ajax(`https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${cartQid}`)
                    .then(function(result) {

                        console.log(result);
                        let j = JSON.parse(result); {
                            console.log(j)
                        }


                    })

                .catch(function(error) {
                    console.log(error)
                        // An error occurred
                });


            })
            .catch(function(error) {
                console.log(error)
                    // An error occurred
            });




    });








    $(document).on('click', '.counter-minus', function(event) {
        cartQid = event.target.id

        x = $(`#${cartQid}.counter-display`).html();
        // console.log(x)
        y = parseInt(x)
            // console.log(y);

        if (y > 0) {
            y = y - 1;
        } else if (y == 0) {
            return y;
        }


        let cartCount = {

            quantityToBuy: y,
        }

        console.log(cartCount.quantityToBuy);


        let actObj = JSON.stringify(cartCount);


        function ajax(url) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === xhr.DONE && xhr.status === 200) {

                        resolve(xhr.response)
                    }
                };
                xhr.open('PUT', url, true);
                xhr.setRequestHeader('x-access-token', localStorage.getItem('token'));
                xhr.setRequestHeader("Content-type", "application/json");

                xhr.onerror = reject;

                xhr.send(actObj);
            });
        }



        function ajaxGet(url) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                        // console.log(xhr.response, xhr.responseXML);
                        resolve(xhr.response)
                    }
                };
                xhr.open('GET', url, true);
                xhr.setRequestHeader('x-access-token', localStorage.getItem('token'));
                xhr.setRequestHeader("Content-type", "application/json");

                xhr.onerror = reject;

                xhr.send();
            });
        }



        ajax(`https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${cartQid}`)
            .then(function(result) {
                // console.log("hii")
                console.log(result);

                ajaxGet(`https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items`)
                    .then(function(result) {

                        $(`#${cartQid}.counter-display`).html(cnt2)
                        let Res = JSON.parse(result);
                        console.log(Res.result);

                        filterArry = Res.result.filter(function(book) {
                            return book._id == cartQid;
                        })

                        console.log(filterArry)
                        bookNum2 = filterArry.map(function(book3) {
                            console.log(book3.quantityToBuy)
                            cnt2 = book3.quantityToBuy

                        });



                    })
                    .catch(function(error) {
                        console.log(error)

                    });


            })
            .catch(function(error) {
                console.log(error)
                    // An error occurred
            });


    });




    user.addEventListener('click', function() {
        console.log("user")
        userOptions.style.display = "flex";

    })

    wishBtn.addEventListener('click', function() {
        window.location = "http://localhost:5000/Pages/Wishlist.html";

    })




    function ajaxGet1(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    // console.log(xhr.response, xhr.responseXML);
                    resolve(xhr.response)
                }
            };
            xhr.open('GET', url, true);
            xhr.setRequestHeader('x-access-token', localStorage.getItem('token'));
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.onerror = reject;

            xhr.send();
        });
    }

    ajaxGet1(`https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items`)
        .then(function(result) {

            let Res = JSON.parse(result);
            // console.log(Res.result);
            let bookNum3 = Res.result
            console.log(bookNum3);


            cartContainer.innerHTML = bookNum3.map(function(cartItem) {

                return `
            <div class="bookHead" id="${cartItem._id}">
                <div class="bookContainer" id="${cartItem._id}">
                    <img src="../Images/alchemist (1).png" width="100%" height="100%" id="${cartItem._id}">
                </div>
                <div class="detailContainer" id="${cartItem._id}">

                    <div class="bookName1" id="bookName">${cartItem.product_id.bookName}</div>
                    <div class="author1" id="author">${cartItem.product_id.author}</div>

                    <div class="price1" id="${cartItem._id}">
                        <div class="price11" id="${cartItem._id}">Rs. ${cartItem.product_id.discountPrice}</div>
                        <div class="originalPrice1" id="${cartItem._id}"> ${cartItem.product_id.price}</div>
                    </div> <div class="counterHead" id="${cartItem._id}">
                    <button class="counter-minus" id="${cartItem._id}">-</button>
                    <div class="counter-display" id="${cartItem._id}">${cartItem.quantityToBuy}</div>
                    
                    <button class="counter-plus" id="${cartItem._id}">+</button>
                    
                    <button class="removeItem" id="${cartItem._id}">Remove</button>
                    
                
            </div>

                </div>
            </div>`
            }).join(' ');




        })
        .catch(function(error) {
            console.log(error)
                // An error occurred
        });



    continueButton.addEventListener('click', function() {
        console.log('check')

        requirejs(['../service/dataService.js'], (methods) => {
            methods.getCartItems().then(function(crt) {
                console.log(crt.data.result)
                console.log(crt.data.result[0]._id)
                crtBook = crt.data.result;

                console.log(crtBook)

                once.innerHTML = crtBook.map(function(crtItem) {
                    return `  <div class="itemContainer">
                    <div class="bookImg1">
                        <img src="../Images/alchemist (1).png"/>
                    </div>
                    <div class="bookDetails1">
                        <div class="bookTitle1">${crtItem.product_id.bookName}</div>
                        <div class="bookAuthor1">${crtItem.product_id.author} </div>
                        <div class= "fullPrice">
                            <div class="sellPrice">Rs. ${crtItem.product_id.discountPrice}</div>
                            <div class="nonSellPrice">${crtItem.product_id.price}</div>
                        </div>
                    </div>
                </div>`
                })

            })

            checkoutButton.addEventListener('click', function() {

                console.log('checkoutBtn')

                console.log(crtBook)
                    //   console.log(crtBook.product_id.bookName)
                let nme = crtBook.map(function(book) {
                    return {
                        product_id: `${book._id}`,
                        product_name: `${book.product_id.bookName}`,
                        product_quantity: `${book.quantityToBuy}`,
                        product_price: `${book.product_id.price}`,
                    }
                })
                console.log(nme);


                let objOrder = {
                    orders: nme,
                }




                console.log(objOrder)
                console.log(crtBook)
                    // console.log(crtBook.bookName)

                requirejs(['../service/dataService.js'], (methods) => {
                    console.log('hello');
                    methods.addOrder(objOrder).then(function(finalOrder) {
                        console.log(finalOrder.status);
                        if (finalOrder.status === 200) {
                            window.location = "../Order/Order.html"
                        }
                        console.log(finalOrder.data.result)
                            // crtBook = crt.data.result;
                            // console.log(crtBook)



                    })

                })

            })
        })
    })



})