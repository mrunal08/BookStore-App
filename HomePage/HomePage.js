window.addEventListener('DOMContentLoaded', function() {

    const flexContainer1 = document.querySelector('.flex-container1');
    const user = document.querySelector('.user')
    const wishBtn = document.querySelector('.wishBtn')
    const userOptions = document.querySelector('.userOptions')
    const cart = document.querySelector('.cart')
    const searchInput = document.querySelector('.search-input')
    const logout = document.querySelector('.logoutB')

    const cartB = document.querySelector('.crt')
    const listContainer = document.querySelector('#list')

    let logoutToken = ""

    wishBtn.addEventListener('click', function() {
        window.location = "http://localhost:5000/WishList/Wishlist.html";


    })

    cart.addEventListener('click', function() {
        window.location = "http://localhost:5000/Cart/Cart.html"
    })

    cartB.addEventListener('click', function() {
        window.location = "http://localhost:5000/Cart/Cart.html"
    })



    logout.addEventListener('click', function() {
        localStorage.setItem("token", logoutToken)
        window.location = "http://localhost:5000/Login/Login.html"
    })




    requirejs(['../Service/userService.js'], (methods) => {



        requirejs(['../Service/userService.js'], (methods) => {
            methods.ajaxGet("https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book").then(function(response) {
                let a = JSON.parse(response)
                let serverResponse = a.result;
                // localStorage.setItem("token", a.result.accessToken)
                console.log(serverResponse)
                const listArray = []

                listArray.push(serverResponse)
                console.log(listArray)


                flexContainer1.innerHTML = serverResponse.map(function(book) {
                    return `<div class="bookContainer" id=${book._id}> 
                <div class="imgContainer" >
                <div class="book"id=${book._id}><img src="/Images/alchemist (1).png" class ="img"> </div>
                </div> 
                <div class="bookName"id=${book._id}>${book.bookName}</div>
                <div class="author"id=${book._id}>${book.author}</div>
                <div class="rating">
                <div class="star" id=${book._id}>4.5 &#9734;</div>
                <div class="starRating" id=${book._id}>(20)</div>
                </div>
                <div class="price">
                <div class="price1"id=${book._id}>Rs. ${book.discountPrice}</div>
                <div class="originalPrice"id=${book.price}> ${book.price}</div>
                </div>
                </div>`;

                }).join('');
            }).catch(function(error) {
                console.log(error)
            })



        })



    })



    $(document).on('click', '.bookContainer', function(event) {
        // localStorage.setItem("token", a.result.accessToken)
        console.log(event.target.id)

        console.log(event.target.textContent)
            // let params = new URLSearchParams(url.search);
            // window.location = `http://localhost:5000/DisplayBooks/DisplayBook.html?id=${event.target.id}`
            // let url = new URL('http://localhost:5000/DisplayBooks/DisplayBook.html');
            //    params.append('id', event.target.value)
            // window.location = `http://localhost:5000/DisplayBooks/DisplayBook.html/?id=${event.target.id}`
            //     // console.log(url)
        let a = event.target.id
        window.location = `http://localhost:5000/DisplayBooks/DisplayBook?id=${a}`



        //Add a second foo parameter.
        // params.append('foo', 4);
        //Query string is now: 'foo=1&bar=2&foo=4'


    })


    user.addEventListener('click', function() {
        console.log("user")
        userOptions.style.display = "flex";

    })

    // function paginate(array, page_size, page_number) {
    //     // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    //     return array.slice((page_number - 1) * page_size, page_number * page_size);
    // }

    // console.log(paginate([1, 2, 3, 4, 5, 6], 2, 2));
    // console.log(paginate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 4, 1));





    // localStorage.setItem("token", a.result.accessToken)





})


window.addEventListener('DOMContentLoaded', function() {
    requirejs(['../Service/userService.js'], (methods) => {
        methods.ajaxGet("https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book").then(function(response) {
            let a = JSON.parse(response)
            let serverResponse = a.result[0];

            const listArray = []

            listArray.push(serverResponse)
            console.log(listArray)




            let count = 0;

            let num1 = document.querySelector('.num1')
            let num2 = document.querySelector('.num2')
            let num3 = document.querySelector('.num3')
            let num4 = document.querySelector('.num4')
            let num5 = document.querySelector('.num5')
            let num6 = document.querySelector('.num6')







            $(".num1").click(function() {
                console.log(this)

                let listNew = listArray.slice(0, 20)
                console.log(listNew)
            })




            // prev.addEventListener('click', function() {
            //     if (count > 0) {
            //         count = count - 1;
            //     }


            //     title.innerHTML = array1[count].title;
            //     description.innerHTML = array1[count].description;

            //     if (count < 0) {
            //         count = 0;
            //         console.log("less than 0")
            //         title.innerHTML = array1[count].title;
            //         description.innerHTML = array1[count].description;
            //     }

            // })


        })
    })

})