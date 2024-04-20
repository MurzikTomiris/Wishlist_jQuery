$(document).ready(function () {

    $("#btnRegister").click(function () {

        var MyData = {
            "login": $('#login').val(),
            "password": $('#password').val(),
            "name": $('#name').val(),
            "email": $('#email').val(),
        }
        console.log(MyData)
        $.ajax
            ({
                type: "POST",
                headers: { 'Content-Type': 'application/json' },
                url: "http://wishlists.loc/api/account",
                data: JSON.stringify(MyData),
                success: function (response) {
                    window.localStorage.setItem('token', response.token);
                    window.location.replace('./wishlist.html');
                },
                error: function () {
                    console.log("error")
                }
            });
    })

    $("#btnLogin").click(function (e) {
        e.preventDefault()

        var MyData = {
            "login": $('#floatingLogin').val(),
            "password": $('#floatingPassword').val()
        }
        console.log(MyData)
        $.ajax
            ({
                type: "POST",
                headers: { 'Content-Type': 'application/json' },
                url: "http://wishlists.loc/api/login",
                data: JSON.stringify(MyData),
                success: function (response) {
                    console.log("success")
                    window.localStorage.setItem('token', response.token);
                    window.location.replace('./wishlist.html');
                },
                error: function () {
                    console.log("error")
                }
            });
    })

    $("#btOpenModalLogin").click(function () {
        $("#modalLogin").modal("show");
    })
});
