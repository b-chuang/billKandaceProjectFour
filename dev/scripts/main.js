
const app = {};

// assign variables for the API URL and key
app.apiURL = 'https://openapi.etsy.com/v2/listings/active.js';
app.api_key = '8zdq9j960j81dpfuohsa0pnm';

let userGender;
let userCategory;

// a function for making the ajax request that takes two parameters, gender & category
app.getUserResult = (gender, category) => {
    console.log(gender, category);
    $.ajax({
        url: app.apiURL,
        method: 'GET',
        dataType: 'jsonp',
        data: {
            api_key: app.api_key,
            format: 'jsonp',
            tags: gender,
            category: category,
            includes: 'Images(url_fullxfull)'
        }
    })
        .then((res) => {
            // after the results are returned, create a new variable for the resulting array
            const resultArray = res.results;

            // create an empty array for the three random items from Etsy
            app.numberGenerator(resultArray);
            app.globalList = resultArray;
        });
    };

    // generate three different random numbers to select three items from the resulting array that we will display on the page

app.globalList = [];     

app.numberGenerator = function (firstArray) {

    const finalResult = [];

    // we splice the item so that it does not repeat in our results; we used (item1, item1) because it is the required syntax and just (item1) didn't give us the results we wanted
    const randomNumber1 = Math.floor(Math.random() * firstArray.length)
    const item1 = firstArray.splice(randomNumber1, 1)[0];
    

    const randomNumber2 = Math.floor(Math.random() * firstArray.length)
    const item2 = firstArray.splice(randomNumber2, 1)[0];
    
    const randomNumber3 = Math.floor(Math.random() * firstArray.length)
    const item3 = firstArray.splice(randomNumber3, 1)[0];
    

    // after we have three random items, we push them into our new array finalResult
    finalResult.push(item1, item2, item3);

    app.showResults(finalResult);
};

app.showResults = function(array){
    // use the forEach method to display item info on page
    $('.giftContainer').empty();
    $('.submitChange').empty();


    
    let i = 1

    array.forEach((item) => {

        const giftPiece = $('<div>').addClass('giftResult' + i).addClass('giftResult')
        const imageDiv = $(`<div class="giftImage${i}">`);
        const image = $('<img>').attr('src', item.Images[0].url_fullxfull).addClass('image' + i);
        imageDiv.append(image);
        const longTitle = (item.title).substr(0,70);
        const title = $('<h2>').addClass('itemTitle' + i).html(`${longTitle}...`);
        const price = $('<h3>').addClass('itemPrice' + i).html(`$${item.price} USD`);
        const linkDiv = $('<div>').addClass('linkChange' + i);
        const change = $('<input type="submit" id="changeItem" value="Change Item">').addClass('changeItem' + i);
        // link item button here instead of input
        const linkToItem = $('<a>').attr('href', item.url).attr('id', "linkItem" + i).attr('target', '_blank').html('<i class="fas fa-external-link-alt">');
        linkDiv.append(change, linkToItem);

        i++

        giftPiece.append(imageDiv, title, price, linkDiv);
        $('.giftContainer').append(giftPiece);

    });
    
    const changeButton = $('<div>').addClass('submitChange').append($('<h2 class="giftifyHeading">Here are the gift items we’ve curated for you</h2>')).append($('<input type="submit" id="submitChange" value="Change All Items">'));
    $('.gifts').append(changeButton);
    };

// form submit
$('form').on('submit', function(e){
    e.preventDefault();
    userGender = $('input[name=gender]:checked').val();
    userCategory = $('input[name=category]:checked').val();
    app.getUserResult(userGender, userCategory);
});

// generate one random number to change one item
app.changeGenerator = function (array){
    const newItemNumber = Math.floor(Math.random() * array.length)
    const newItem = array[newItemNumber];
    return newItem;
}

//change single items as opposed to all three
$('.giftContainer').on('click', '.changeItem1', function (e) {
    e.preventDefault();

    const updatedItem = app.changeGenerator(app.globalList);

    $('.giftResult1').empty();

    const updatedImageDiv1 = $(`<div class="giftImage1">`);
    const updatedImage1 = $('<img>').attr('src', updatedItem.Images[0].url_fullxfull).addClass('image1');
    updatedImageDiv1.append(updatedImage1);
    const updatedLongTitle1 = (updatedItem.title).substr(0,70);
    const updatedTitle1 = $('<h2>').addClass('itemTitle1').html(`${updatedLongTitle1}...`);
    const updatedPrice1 = $('<h3>').addClass('itemPrice1').html(`$${updatedItem.price} USD`);
    const linkDiv1 = $('<div>').addClass('linkChange1');
    const updatedChange1 = $('<input type="submit" id="changeItem" value="Change Item">').addClass('changeItem1');
    const linkToItem1 = $('<a>').attr('href', updatedItem.url).attr('id', "linkItem1").attr('target', '_blank').html('<i class="fas fa-external-link-alt">');
    linkDiv1.append(updatedChange1, linkToItem1);

    $('.giftResult1').append(updatedImageDiv1, updatedTitle1, updatedPrice1, linkDiv1);
})


$('.giftContainer').on('click', '.changeItem2', function (e) {
    e.preventDefault();
    const updatedItem = app.changeGenerator(app.globalList);

    $('.giftResult2').empty();

    const updatedImageDiv2 = $(`<div class="giftImage2">`);
    const updatedImage2 = $('<img>').attr('src', updatedItem.Images[0].url_fullxfull).addClass('image2');
    updatedImageDiv2.append(updatedImage2);
    const updatedLongTitle2 = (updatedItem.title).substr(0,70);
    const updatedTitle2 = $('<h2>').addClass('itemTitle2').html(`${updatedLongTitle2}...`);
    const updatedPrice2 = $('<h3>').addClass('itemPrice2').html(`$${updatedItem.price} USD`);
    const linkDiv2 = $('<div>').addClass('linkChange2');
    const updatedChange2 = $('<input type="submit" id="changeItem" value="Change Item">').addClass('changeItem2');
    const linkToItem2 = $('<a>').attr('href', updatedItem.url).attr('id', "linkItem2").attr('target', '_blank').html('<i class="fas fa-external-link-alt">');
    linkDiv2.append(updatedChange2, linkToItem2);

    $('.giftResult2').append(updatedImageDiv2, updatedTitle2, updatedPrice2, linkDiv2);
})


$('.giftContainer').on('click', '.changeItem3', function (e) {
    e.preventDefault();

    const updatedItem = app.changeGenerator(app.globalList);
    $('.giftResult3').empty();

    const updatedImageDiv3 = $(`<div class="giftImage3">`);
    const updatedImage3 =$('<img>').attr('src', updatedItem.Images[0].url_fullxfull).addClass('image3');
    updatedImageDiv3.append(updatedImage3);
    const updatedLongTitle3 = (updatedItem.title).substr(0,70);
    const updatedTitle3 = $('<h2>').addClass('itemTitle3').html(`${updatedLongTitle3}...`);
    const updatedPrice3 = $('<h3>').addClass('itemPrice3').html(`$${updatedItem.price} USD`);
    const linkDiv3 = $('<div>').addClass('linkChange3');
    const updatedChange3 = $('<input type="submit" id="changeItem" value="Change Item">').addClass('changeItem3');
    const linkToItem3 = $('<a>').attr('href', updatedItem.url).attr('id', "linkItem3").attr('target', '_blank').html('<i class="fas fa-external-link-alt">');
    linkDiv3.append(updatedChange3, linkToItem3);

    $('.giftResult3').append(updatedImageDiv3, updatedTitle3, updatedPrice3, linkDiv3);
})


// REFRSH ALL
//Bug at momement, it this button refreshes entire page, may not return down to gift items section
 $('.gifts').on('click', '#submitChange', function(e){
    e.preventDefault();
    
    app.getUserResult(userGender, userCategory);
 });

//flickity jQuery
$(function() {
    $('.main-carousel').flickity({
        wrapAround: true,
        pageDots: false
    });
});

$(function () {
    console.log("hello");
  });

  $('a').smoothScroll({
    offset: -1,
    speed: 700
  });



//User comes to site, starts off with option to select a category (that we have predetermined and given as choices)
//Men, Women, Unisex
//Clothing, art, jewellry, toys, home

//submit ajax request based on the search parameters
//get category

//Etsy API only allows 25 results back
//from here we will use a function to grab 3 of the 25 results then display on the page for the user to see.

//the display will have an image, the title with limited to showing only first 20 letters. Also have a link to the etsy item

//The user will have 2 options
//1  is to refresh the results >> which generates 3 more random from the same category user selected.

//2 If the user is happy they can select Get these gifts.

//*Extra. The prices will be added together to produce a sum total to let the user know the total price of the 3 gift combo pack.

//When user selects Get these gifts >> 3 pages will be generated, each of the gift items (from the url array)


app.init = function(){
    console.log('it is working');
};


$(function () {
    app.init();
}); 
