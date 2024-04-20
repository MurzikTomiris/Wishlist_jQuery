$(document).ready(function () {

    $.ajax
            ({
                type: "GET",
                url: "http://wishlists.loc/api/wishlists",
                headers: { "token": window.localStorage.getItem('token') },
                success: function (response) {
                    //console.log(response);
                    $.each(response, function (key, value) { 
                        $('#cards').append('<div class="col-12 col-md-3">'+
                        '<div class="card shadow-sm">' +
                          '<img src="./Wishlist.png" class="img-fluid" alt="Responsive image">' +
                         ' <div class="card-body">' +
                           ' <h5 class="card-text" id="NameText">' + value.name + '</h5>' +
                           ' <p class="card-text" id="DescText">' + value.description + '</p>' +
                            '<div class="d-flex justify-content-between align-items-center">' +
                             ' <div class="btn-group">' +
                                '<button class="btn btn-sm btn-outline-secondary"><i class="fa fa-eye"  onclick="OpenWishlist(' + value.id + ')"></i></button>' +
                                '<button class="btn btn-sm btn-outline-secondary"><i class="fa fa-share"  onclick="SendWishlist(\'' + value.listLink + '\')"></i></button>' +
                                '<button class="btn btn-sm btn-outline-secondary"><i class="fa fa-pencil" onclick="EditWishlist(' + value.id + ')"></i></button>' +
                               ' <button class="btn btn-sm btn-outline-secondary"><i class="fa fa-trash" onclick="DeleteWishlist(' + value.id + ')"></i></button>' +
                              '</div>' +
                            '</div>' +
                          '</div>' +
                        '</div>' +
                     ' </div>' 
                        );
                    });
                },
                error: function () {
                    console.log("error")
                }
            });

    $("#btnCreateWishlist").click(function () {
        $("#CreateWishlistModal").modal("show");
    })

    $("#btnCreate").click(function (e) {
        e.preventDefault();
        var MyData = {
            "name": $('#nameCreate').val(),
            "description": $('#descriptionCreate').val()
        }
        //console.log(MyData)
        $.ajax
            ({
                type: "POST",
                headers: { 'Content-Type': 'application/json',
                            "token": window.localStorage.getItem('token') },
                url: "http://wishlists.loc/api/wishlist",
                data: JSON.stringify(MyData),
                success: function (response) {
                    window.location.href ='./wishlist.html';
                    //console.log(MyData)
                },
                error: function () {
                    console.log("error")
                }
            });
    })

    $("#btnUpdWishlist").click(function (e) {
        e.preventDefault();
        var id =  $('#idUpd').val()
        var MyData = {
            "name": $('#nameUpd').val(),
            "description": $('#descriptionUpd').val()
        }
        //console.log(MyData)
        //console.log(id)
        $.ajax
            ({
                type: "PUT",
                headers: { 'Content-Type': 'application/json'},
                url: "http://wishlists.loc/api/wishlist/" + id,
                data: JSON.stringify(MyData),
                success: function (response) {
                    window.location.href ='./wishlist.html';
                    //console.log(MyData)
                },
                error: function () {
                    console.log("error")
                }
            });
    })

    $("#btnAccount").click(function () {
        $.ajax
        ({
            type: "GET",
            async: false,
            headers: { "token": window.localStorage.getItem('token') },
            url: "http://wishlists.loc/api/account",
            success: function (response) {
                $('#login').val(response.login);
                $('#password').val(response.password);
                $('#name').val(response.name);
                $('#email').val(response.email);
            },
            error: function () {
                console.log("error")
            }
        });
    $("#EditAccount").modal("show");
    })

    $("#btnEditAccount").click(function (e) {
        e.preventDefault();
        var MyData = {
            "login": $('#login').val(),
            "password": $('#password').val(),
            "name": $('#name').val(),
            "email": $('#email').val()
        }
        //console.log(MyData)
        $.ajax
            ({
                type: "PUT",
                headers: { 'Content-Type': 'application/json',
                            "token": window.localStorage.getItem('token') },
                url: "http://wishlists.loc/api/account",
                data: JSON.stringify(MyData),
                success: function (response) {
                    $.alert('Изменения сохранены');  
                },
                error: function () {
                    console.log("error")
                }
            });
    })

    $("#btnDeleteAccount").click(function () {
        $.confirm({
            title: 'Вы уверенны?',
            content: 'Удалить',
            buttons: {
                confirm: function () {
                    $.ajax
                    ({
                        type: "DELETE",
                        headers: { 'Content-Type': 'application/json',
                                    "token": window.localStorage.getItem('token') },
                        url: "http://wishlists.loc/api/account",
                        success: function (response) {
                            window.location.href ='./Index.html';
                        },
                        error: function () {
                            console.log("error")
                        }
                    });
                },
                cancel: function () {
                    $.alert('Отмена');
                },           
            }
        });
        
    })

})

function DeleteWishlist(id) {
    //console.log("DeleteWishlist "+id)
    $.confirm({
        title: 'Вы уверенны?',
        content: 'Удалить',
        buttons: {
            confirm: function () {
                $.ajax
                    ({
                        type: "PUT",
                        async: false,
                        url: "http://wishlists.loc/api/disable-wishlist/" + id,
                        success: function () {
                            $.alert('Deleted!');  
                            window.location.href ='./wishlist.html';                          
                        },
                        error: function () {
                            console.log("error")
                        }
                    });
            },
            cancel: function () {
                $.alert('Отмена');
            },           
        }
    });
}

function EditWishlist(id) {
    //console.log("EditWishlist "+id)
    $.ajax
        ({
            type: "Get",
            async: false,
            url: "http://wishlists.loc/api/wishlist/" + id,
            success: function (response) {
                $('#nameUpd').val(response.name);
                $('#idUpd').val(response.id);
                $('#descriptionUpd').val(response.description);
            },
            error: function () {
                console.log("error")
            }
        });
    $("#EditWishlistModal").modal("show");
}

function OpenWishlist(id) {
    window.location.href ='./Giftcards.html?id='+id; 
}

function SendWishlist(listLink) {
    var textToCopy = `file:///C:/Tomiris/Courses/Step/php/WishlistFront/wishlistbyurl.html?listLink=${listLink}`;
    console.log(textToCopy);

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log('Текст скопирован в буфер обмена: ' + textToCopy);
        })
        .catch((error) => {
            console.error('Не удалось скопировать текст: ' + error);
        });
}