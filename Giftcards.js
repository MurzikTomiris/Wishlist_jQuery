$(document).ready(function () {
    let searchParams = new URLSearchParams(window.location.search)
    const wishlistsId = searchParams.get('id')
    //console.log(wishlistsId)

    $.ajax
        ({
            type: "GET",
            async: false,
            url: "http://wishlists.loc/api/wishlist/" + wishlistsId,
            success: function (response) {
                //console.log(response)
                document.getElementById("WishlistName").textContent=response.name
                document.getElementById("WishlistDesc").textContent=response.description
            },
            error: function () {
                console.log("error")
            }
        });

    $.ajax
            ({
                type: "GET",
                url: "http://wishlists.loc/api/giftcards/" + wishlistsId,
                success: function (response) {
                    $.each(response, function (key, value) {
                        let img = './GiftCards.webp';
                        if (value.image !== null){
                            img = value.image;
                        }
                        $('#cards').append('<div class="col-12 col-md-3">'+
                        '<div class="card shadow-sm">' +
                          '<img src="'+img+'" class="img-fluid" alt="Responsive image">' +
                         ' <div class="card-body">' +
                           ' <h5 class="card-text" id="NameText">' + value.title + '</h5>' +
                           ' <p class="card-text" id="DescText">' + value.description + '</p>' +
                            '<div class="d-flex justify-content-between align-items-center">' +
                             ' <div class="btn-group">' +
                                '<button class="btn btn-sm btn-outline-secondary"><i class="fa fa-pencil" onclick="EditGift(' + value.id + ')"></i></button>' +
                               ' <button class="btn btn-sm btn-outline-secondary"><i class="fa fa-trash" onclick="DeleteGift(' + value.id + ',' + wishlistsId +')"></i></button>' +
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

    $("#btnCreateGift").click(function () {
        $("#CreateGiftModal").modal("show");
    })

    $("#btnCreate").click(function (e) {
        e.preventDefault();
        var MyData = {
            "title": $('#nameCreate').val(),
            "description": $('#descriptionCreate').val(),
            "price": $('#priceCreate').val(),
            "link": $('#linkCreate').val(),
            "image": $('#imageCreate').val(),
            "wishlist_id": wishlistsId
        }
        //console.log(MyData)
        $.ajax
            ({
                type: "POST",
                headers: { 'Content-Type': 'application/json'},
                url: "http://wishlists.loc/api/giftcard",
                data: JSON.stringify(MyData),
                success: function (response) {
                    window.location.href ='./Giftcards.html?id='+wishlistsId;
                    //console.log(MyData)
                },
                error: function () {
                    console.log("error")
                }
            });
    })

    $("#btnUpdGift").click(function (e) {
        e.preventDefault();
        var id =  $('#idUpd').val()
        var MyData = {
            "title": $('#nameUpd').val(),
            "description": $('#descriptionUpd').val(),
            "price": $('#priceUpd').val(),
            "link": $('#linkUpd').val(),
            "image": $('#imageUpd').val()
        }
        console.log(MyData)
        $.ajax
            ({
                type: "PUT",
                headers: { 'Content-Type': 'application/json'},
                url: "http://wishlists.loc/api/giftcard/" + id,
                data: JSON.stringify(MyData),
                success: function (response) {
                    window.location.href ='./Giftcards.html?id='+wishlistsId;
                    //console.log(MyData)
                },
                error: function () {
                    console.log("error")
                }
            });
    })



})


function DeleteGift(id, wishlistsId) {
    $.confirm({
        title: 'Вы уверенны?',
        content: 'Удалить',
        buttons: {
            confirm: function () {
                $.ajax
                    ({
                        type: "PUT",
                        async: false,
                        url: "http://wishlists.loc/api/disable-giftcard/" + id,
                        success: function () {
                            $.alert('Карточка удалена!');  
                            window.location.href ='./Giftcards.html?id='+wishlistsId;                          
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


function EditGift(id) {
    $.ajax
        ({
            type: "Get",
            async: false,
            url: "http://wishlists.loc/api/giftcard/" + id,
            success: function (response) {
                $('#idUpd').val(response.id);
                $('#nameUpd').val(response.title);
                $('#descriptionUpd').val(response.description);
                $('#priceUpd').val(response.price);
                $('#linkUpd').val(response.link);
                $('#imageUpd').val(response.image);
            },
            error: function () {
                console.log("error")
            }
        });
    $("#UpdGiftModal").modal("show");
}

function OpenWishlist(){
    window.location.href ='./wishlist.html'; 
}



