window.addEventListener('DOMContentLoaded', function() {

    let regexName = RegExp('^[A-Z]{1}[a-z]{2,}$');
    let regexEmail = RegExp('^[a-z]{1,}[0-9]{1,}[@][a-z]{1,10}[.]{1}[com]{1,3}$');
    let regexPass = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!#]*)[a-zA-Z0-9@!#*]{8,}$');
    let regexMobile = RegExp('^[6-9]{1}[0-9]{9,}$')


    const enterName = document.getElementById('enterName');
    const enterEmail = document.getElementById('enterEmail');
    const loginEmail = document.getElementById('enterEmail2');
    const loginPassword = document.getElementById('enterPassword2')
    const loginButton = document.getElementById('loginButton')
    const enterPassword = document.getElementById('enterPassword');
    const enterPhoneNumber = document.getElementById('enterPhoneNumber');
    const incorrectName = document.getElementById('incorrectName');
    const incorrectEmail = document.getElementById('incorrectEmail');
    const incorrectPassword = document.getElementById('incorrectPassword');
    const incorrectPhoneNumber = document.getElementById('incorrectPhoneNumber');
    const incorrectEmailLogin = document.getElementById('incorrectEmailLogin');
    const incorrectPassword2 = document.getElementById('incorrectPassword2');
    const loginHeading = document.getElementById('loginHeading');
    const signupHeading = document.getElementById('signupHeading');
    const loginDetails = document.getElementById('loginDetails');
    const signupDetails = document.getElementById('signupDetails');

    const redIdentifierLogin1 = document.querySelector('redIdentifierLogin')
    const redIdentifierSignup1 = document.querySelector('redIdentifierSignup')

    const signupButton = document.getElementById('signupButton');

    let name;
    let email;
    let password;
    let mobileNumber;
    let inEmail;
    let inPassword;


    let inputValue1 = false;
    let inputValue2 = false;
    let inputValue3 = false;
    let inputValue4 = false;
    let inputValue5 = false;
    let inputValue6 = false;


    enterName.addEventListener('change', function() {
        name = enterName.value;
        console.log("Hey Mrunal")
    })

    enterEmail.addEventListener('change', function() {
        email = enterEmail.value;
        console.log(email);
    })

    enterPassword.addEventListener('change', function() {
        password = enterPassword.value;
    })

    enterPhoneNumber.addEventListener('change', function() {
        mobileNumber = enterPhoneNumber.value;
        console.log(mobileNumber);
    })

    loginHeading.addEventListener('click', function() {
        signupDetails.style.display = 'none';
        loginDetails.style.display = "flex";
        // redIdentifierSignup1.style.visibility = "hidden"

    })

    signupHeading.addEventListener('click', function() {
        signupDetails.style.display = 'flex';
        loginDetails.style.display = "none";

        // redIdentifierLogin1.style.visibility = "hidden"

    })

    // SIGNUP PAGE

    signupButton.addEventListener('click', function() {

        let isNameValid = regexName.test(name)
        if (isNameValid == false) {
            enterName.style.border = "1px solid red"
            incorrectName.style.visibility = "visible"
        } else if (isNameValid == true) {
            inputValue1 = true;
            enterName.style.border = "1px solid green"
                // incorrectName.style.visibility= "hidden"
        }



        let isEmailValid = regexEmail.test(email)
        if (isEmailValid == false) {
            enterEmail.style.border = "1px solid red"
            incorrectEmail.style.visibility = "visible"

        } else if (isEmailValid == true) {
            inputValue2 = true;
            enterEmail.style.border = "1px solid green"
            incorrectEmail.style.visibility = "hidden"
        }

        let isPasswordValid = regexPass.test(password)
        if (isPasswordValid == false) {
            enterPassword.style.border = "1px solid red"
            incorrectPassword.style.visibility = "visible"

        } else if (isPasswordValid == true) {
            inputValue3 = true;
            enterPassword.style.border = "1px solid green"
            incorrectPassword.style.visibility = "hidden"
        }

        let isMobileValid = regexMobile.test(mobileNumber)
        if (isMobileValid == false) {
            enterPhoneNumber.style.border = "1px solid red"
            incorrectPhoneNumber.style.visibility = "visible"
        } else if (isMobileValid == true) {
            inputValue4 = true;
            enterPhoneNumber.style.border = "1px solid green"
            incorrectPhoneNumber.style.visibility = "hidden"
        }

        console.log(inputValue1, inputValue2, inputValue3, inputValue4)

        if ((inputValue1 = true) && (inputValue2 = true) && (inputValue3 = true) && (inputValue4 = true)) {

            let objectSignup = {
                fullName: name,
                email: email,
                password: password,
                phone: mobileNumber,

            }

            let serverobj = JSON.stringify(objectSignup)
            console.log(objectSignup)

            requirejs(['../Service/userService.js'], (methods) => {
                methods.ajaxPost("https://bookstore.incubation.bridgelabz.com/bookstore_user/registration", serverobj).then(function(response) {
                    console.log(response.data.result.accessToken)
                    localStorage.setItem('token', response.data.result.accessToken)
                }).catch(function(error) {
                    console.log(error)
                })



            })
        }


    })



    // LOGIN PAGE

    loginEmail.addEventListener('change', function() {
        inEmail = loginEmail.value;
    })

    loginPassword.addEventListener('change', function() {
        inPassword = loginPassword.value;
    })

    loginButton.addEventListener('click', function() {
        let isEmailValid = regexEmail.test(inEmail)
        if (isEmailValid == false) {
            loginEmail.style.border = "1px solid red"
            incorrectEmailLogin.style.visibility = "visible"

        } else if (isEmailValid == true) {
            inputValue1 = true;
            loginEmail.style.border = "1px solid green"
            incorrectEmailLogin.style.visibility = "hidden"
        }

        let isPasswordValid = regexPass.test(inPassword)
        if (isPasswordValid == false) {
            loginPassword.style.border = "2px solid red"
            incorrectPassword2.style.visibility = "visible"

        } else if (isPasswordValid == true) {
            inputValue2 = true;
            loginPassword.style.border = "1px solid green"
            incorrectPassword2.style.visibility = "hidden"
        }
        console.log("helloo")
        console.log(inputValue2)
        console.log(inputValue1)

        if ((inputValue5 = true) && (inputValue6 = true)) {

            console.log("signin")
            let objectLogin = {
                "email": inEmail,
                "password": inPassword,
            }

            let serverobj = JSON.stringify(objectLogin)

            requirejs(['../service/userService.js'], (methods) => {
                methods.ajaxPost("https://bookstore.incubation.bridgelabz.com/bookstore_user/login", serverobj).then(function(response) {


                    console.log(response)
                    let a = JSON.parse(response)
                    console.log(a.result.accessToken)

                    localStorage.setItem("token", a.result.accessToken)
                    window.location = "../HomePage/Homepage.html"
                }).catch(function(error) {
                    console.log(error)
                })



            })


        }

    })







})