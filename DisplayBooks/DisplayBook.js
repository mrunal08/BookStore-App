window.addEventListener('DOMContentLoaded', function() {

    console.log("Hi")
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params)
    const user = document.querySelector('.user')

    const flexContainer = document.querySelector('.displayMainInnerContainer2')

    const cart = document.querySelector('.cart')
    const userOptions = document.querySelector('.userOptions')
    const wishBtn = document.querySelector('.wishBtn')
    const bookIcon = document.querySelector('.bookIcon')
    const wishBAdded = document.getElementById('wishBAdded')
    let counterDisplay = document.getElementById('counter-display');

    bookIcon.addEventListener('click', function() {
        window.location.href = '../HomePage/HomePage.html'
    })

    cart.addEventListener('click', function() {
        window.location.href = '../Cart/Cart.html'
    })

    wishBtn.addEventListener('click', function() {
        window.location = "http://localhost:5000/WishList/Wishlist.html";


    })

    $(document).on('click', '.displayMainInnerContainer', function(event) {
        console.log(event.target.id)
        let idValue = event.currentTarget.id
        console.log(idValue)



    })



    requirejs(['../Service/userService.js'], (methods) => {

        methods.ajaxGet("https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book").then(function(response) {
            let a = JSON.parse(response)
            let serverResponse = a.result;

            console.log(serverResponse)



            let filterArray = serverResponse.filter(function(book) {
                return book._id == params.id;
                // return book._id == "60a8aab496edee0015d919dc";
            })
            console.log(filterArray)


            flexContainer.innerHTML = filterArray.map(function(book1) {
                return `<div class="bookDesc1">
                <div class="bookName1" id="bookName">${book1.bookName}</div>
                <div class="author1" id="author">${book1.author}</div>
    
    
                <div class="rating1">
                    <div class="star1" id=${book1._id}>4.5 &#9734;</div>
                    <div class="starRating1" id=${book1._id}>(20)</div>
                </div>
    
                <div class="price1">
                    <div class="price11" id=${book1._id}>Rs. ${book1.discountPrice}</div>
                    <div class="originalPrice1" id=${book1._id}> ${book1.price}</div>
                </div>
                
    
    
            </div>
    
    
            <div class="bookDetails">
                <div class="bk1">⚬ Book Detail</div>
                <div class= "bk2"><p>Although aimed at a somewhat young age group, the book series has gained fair acclaim by critics and fans alike, especially in terms of storyline. They're noted for their spectacular illustrations, and creative integration between the stories told in the books, and the references to the movies. A fair share of readers agree that the stories are too short, but do make up in the number of volumes and their price of about five dollars.Wonder what Jack's crew did aboard the Fleur de la Mort after leaving Jack and the Barnacle in City of Gold? Want to know how they met Billy Turner? </p></div>
            </div>`
            }).join(' ');

        })

    })



    user.addEventListener('click', function() {
        console.log("user")
        userOptions.style.display = "flex";

    })




    //Add to Cart.

    bagButton.addEventListener('click', function() {


        bagButton.style.display = 'none'
        productCounter.style.display = "flex"
        counterDisplay.innerHTML = 1;

        let object = {
            product_id: params.id,

        }
        console.log(object)
        let b = object.product_id
        console.log(b)

        requirejs(['../service/dataService.js'], function(methods) {
            methods.addCart(object).then(function(cartResponse) {
                console.log('bag')

                console.log(cartResponse)


            })


        })




    })


    // Add to Wishlist

    wishButton.addEventListener('click', function() {

        wishBAdded.style.display = 'flex'
        wishButton.style.display = 'none'

        let objWish = {
            product_id: params.id,

        }

        console.log(objWish);

        requirejs(['../service/dataService.js'], function(methods) {
            methods.wish(objWish).then(function(wishResponse) {
                console.log(wishResponse)

            })
        })

    })


    // COUNTER CODE


    let cartQid;
    let filterArry;
    let x;
    let y;

    let cnt;
    let bookNum;
    let cnt2;
    let bookNum2;

    $(document).on('click', '.counter-plus', function() {

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






        x = $(`.counter-display`).html();
        // x = counterDisplay.innerHTML
        console.log(x)
        y = parseInt(x)
        console.log(y);

        y = y + 1;

        console.log(y)



        let cartCount = {
            // _id: cartQid,
            "quantityToBuy": y,
        }

        console.log(cartCount)
        console.log(cartCount.quantityToBuy);

        let actObj = JSON.stringify(cartCount);





        ajaxGet(`
        https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items`)
            .then(function(result) {
                // console.log(result);




                function ajax(url) {
                    return new Promise(function(resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                                // console.log(xhr.response, xhr.responseXML);
                                resolve(xhr.responseText)
                            }
                        };
                        xhr.open('PUT', url, true);
                        xhr.setRequestHeader('x-access-token', localStorage.getItem('token'));
                        xhr.setRequestHeader("Content-type", "application/json");

                        xhr.onerror = reject;

                        xhr.send(actObj);
                    });
                }


                // console.log(JSON.parse(result.result))
                let a = JSON.parse(result)
                console.log(a.result)

                let resArr = a.result

                let b = resArr.filter(function(books) {
                    console.log(books)
                    if (books.product_id._id == params.id) {
                        return books


                    }

                })
                console.log(b)
                let cartId = b[0]._id;
                console.log(cartId)

                ajax(`https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${cartId}`)
                    .then(function(result) {
                        console.log(result)
                        let a = JSON.parse(result)
                        console.log(a)

                        let b = a.result
                        console.log(b)



                        ajaxGet(`https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items`)
                            .then(function(result) {

                                console.log(result)
                                let a = JSON.parse(result)
                                console.log(a)

                                let b = a.result
                                console.log(b)

                                let filtArr = b.filter(function(book4) {
                                    if (book4._id == cartId) {
                                        return book4
                                    }

                                })
                                console.log(filtArr[0].quantityToBuy)


                                $('.counter-display').html(filtArr[0].quantityToBuy)
                            })

                    })

            })
            .catch(function(error) {
                console.log(error)
                    // An error occurred
            });






    });



    $(document).on('click', '.counter-minus', function() {

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






        x = $(`.counter-display`).html();
        // x = counterDisplay.innerHTML
        console.log(x)
        y = parseInt(x)
        console.log(y);


        if (y > 0) {
            y = y - 1;
        } else if (y == 0) {
            return y;
        }



        console.log(y)



        let cartCount = {
            // _id: cartQid,
            "quantityToBuy": y,
        }

        console.log(cartCount)
        console.log(cartCount.quantityToBuy);

        let actObj = JSON.stringify(cartCount);



        https: //bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${cartId}

            ajaxGet(`https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items`)
            .then(function(result) {
                // console.log(result);




                function ajax(url) {
                    return new Promise(function(resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                                // console.log(xhr.response, xhr.responseXML);
                                resolve(xhr.responseText)
                            }
                        };
                        xhr.open('PUT', url, true);
                        xhr.setRequestHeader('x-access-token', localStorage.getItem('token'));
                        xhr.setRequestHeader("Content-type", "application/json");

                        xhr.onerror = reject;

                        xhr.send(actObj);
                    });
                }


                // console.log(JSON.parse(result.result))
                let a = JSON.parse(result)
                console.log(a.result)

                let resArr = a.result

                let b = resArr.filter(function(books) {
                    console.log(books)
                    if (books.product_id._id == params.id) {
                        return books


                    }

                })
                console.log(b)
                let cartId = b[0]._id;
                console.log(cartId)

                ajax(`https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${cartId}`)
                    .then(function(result) {
                        console.log(result)
                        let a = JSON.parse(result)
                        console.log(a)

                        let b = a.result
                        console.log(b)



                        ajaxGet(`https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items`)
                            .then(function(result) {

                                console.log(result)
                                let a = JSON.parse(result)
                                console.log(a)

                                let b = a.result
                                console.log(b)

                                let filtArr = b.filter(function(book4) {
                                    if (book4._id == cartId) {
                                        return book4
                                    }

                                })
                                console.log(filtArr[0].quantityToBuy)


                                $('.counter-display').html(filtArr[0].quantityToBuy)
                            })

                    })

            })
            .catch(function(error) {
                console.log(error)
                    // An error occurred
            });






    });




    let quant;
    let quant4;
    let filterArry3;
    let filterArry4;


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
            // console.log(bookNum3.quantityToBuy)

            filterArry3 = bookNum3.filter(function(book) {
                // console.log(book)
                return book.product_id._id == params.id;
                // quant = filterArry3.quantityToBuy

            })
            console.log(filterArry3)

            quant = filterArry3.map(function(book) {
                if (book.quantityToBuy > 0) {
                    bagButton.style.display = 'none';
                    productCounter.style.display = 'flex';

                }
                console.log(book.quantityToBuy)
                return book.quantityToBuy



            })

            counterDisplay.innerHTML = quant[0]
            console.log(quant)

        })
        .catch(function(error) {
            console.log(error)
                // An error occurred
        });



    function ajaxGet4(url) {
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


})