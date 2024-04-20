$(document).ready(function () {

    var url = window.location.href;
    var listLink = url.split('=')[1];
    console.log(listLink);

    $.ajax
            ({
                type: "GET",
                url: "http://wishlists.loc/api/wishlist-link/" + listLink,
                success: function (response) {
                  document.getElementById("WishlistName").textContent=response.name
                  document.getElementById("WishlistDesc").textContent=response.description

                     $.each(response.gift_cards, function (key, value) {
                      let img = './GiftCards.webp';
                      if (value.image !== null){
                          img = value.image;
                      }
                      let price = "";
                      if (value.price !== null){
                        price = '<p class="card-text" id="priceText">' + value.price + ' тенге</p>';
                      }
                      let link = "";
                      if (value.link !== null){
                        link = '<p class="card-text" id="linkText"> <a href="http://' + value.link + '" >Ссылка</a></p>';
                      }
                      $('#cards').append('<div class="col-12 col-md-3">'+
                      '<div class="card shadow-sm">' +
                        '<img src="'+img+'" class="img-fluid" alt="Responsive image">' +
                       ' <div class="card-body">' +
                         ' <h5 class="card-text" id="NameText">' + value.title + '</h5>' +
                         ' <p class="card-text" id="DescText">' + value.description + '</p>' +
                         price +
                         link +
                          '<div class="d-flex justify-content-between align-items-center">' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                   ' </div>' 
                      );
                    })
                },
                error: function () {
                    console.log("error")
                }
                
            });


})


