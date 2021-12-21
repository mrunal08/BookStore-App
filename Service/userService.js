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
            // xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
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
                    // console.log(xhr.response, xhr.responseXML);
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

    return methods;
})