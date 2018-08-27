(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var app = {};

// assign variables for the API URL and key
app.apiURL = 'https://openapi.etsy.com/v2/listings/active.js';
app.api_key = '8zdq9j960j81dpfuohsa0pnm';

var userGender = void 0;
var userCategory = void 0;

// a function for making the ajax request that takes two parameters, gender & category
app.getUserResult = function (gender, category) {
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
    }).then(function (res) {
        // after the results are returned, create a new variable for the resulting array
        var resultArray = res.results;

        // create an empty array for the three random items from Etsy
        app.numberGenerator(resultArray);
        app.globalList = resultArray;
    });
};

// generate three different random numbers to select three items from the resulting array that we will display on the page

app.globalList = [];

app.numberGenerator = function (firstArray) {

    var finalResult = [];

    // we splice the item so that it does not repeat in our results; we used (item1, item1) because it is the required syntax and just (item1) didn't give us the results we wanted
    var randomNumber1 = Math.floor(Math.random() * firstArray.length);
    var item1 = firstArray.splice(randomNumber1, 1)[0];

    var randomNumber2 = Math.floor(Math.random() * firstArray.length);
    var item2 = firstArray.splice(randomNumber2, 1)[0];

    var randomNumber3 = Math.floor(Math.random() * firstArray.length);
    var item3 = firstArray.splice(randomNumber3, 1)[0];

    // after we have three random items, we push them into our new array finalResult
    finalResult.push(item1, item2, item3);

    app.showResults(finalResult);
};

app.showResults = function (array) {
    // use the forEach method to display item info on page
    $('.giftContainer').empty();
    $('.submitChange').empty();

    var i = 1;

    array.forEach(function (item) {

        var giftPiece = $('<div>').addClass('giftResult' + i).addClass('giftResult');
        var imageDiv = $('<div class="giftImage' + i + '">');
        var image = $('<img>').attr('src', item.Images[0].url_fullxfull).addClass('image' + i);
        imageDiv.append(image);
        var longTitle = item.title.substr(0, 70);
        var title = $('<h2>').addClass('itemTitle' + i).html(longTitle + '...');
        var price = $('<h3>').addClass('itemPrice' + i).html('$' + item.price + ' USD');
        var linkDiv = $('<div>').addClass('linkChange' + i);
        var change = $('<input type="submit" id="changeItem" value="Change Item">').addClass('changeItem' + i);
        // link item button here instead of input
        var linkToItem = $('<a>').attr('href', item.url).attr('id', "linkItem" + i).attr('target', '_blank').html('<i class="fas fa-external-link-alt">');
        linkDiv.append(change, linkToItem);

        i++;

        giftPiece.append(imageDiv, title, price, linkDiv);
        $('.giftContainer').append(giftPiece);
    });

    var changeButton = $('<div>').addClass('submitChange').append($('<h2 class="giftifyHeading">Here are the gift items we’ve curated for you</h2>')).append($('<input type="submit" id="submitChange" value="Change All Items">'));
    $('.gifts').append(changeButton);
};

// form submit
$('form').on('submit', function (e) {
    e.preventDefault();
    userGender = $('input[name=gender]:checked').val();
    userCategory = $('input[name=category]:checked').val();
    app.getUserResult(userGender, userCategory);
});

// generate one random number to change one item
app.changeGenerator = function (array) {
    var newItemNumber = Math.floor(Math.random() * array.length);
    var newItem = array[newItemNumber];
    return newItem;
};

//change single items as opposed to all three
$('.giftContainer').on('click', '.changeItem1', function (e) {
    e.preventDefault();

    var updatedItem = app.changeGenerator(app.globalList);

    $('.giftResult1').empty();

    var updatedImageDiv1 = $('<div class="giftImage1">');
    var updatedImage1 = $('<img>').attr('src', updatedItem.Images[0].url_fullxfull).addClass('image1');
    updatedImageDiv1.append(updatedImage1);
    var updatedLongTitle1 = updatedItem.title.substr(0, 70);
    var updatedTitle1 = $('<h2>').addClass('itemTitle1').html(updatedLongTitle1 + '...');
    var updatedPrice1 = $('<h3>').addClass('itemPrice1').html('$' + updatedItem.price + ' USD');
    var linkDiv1 = $('<div>').addClass('linkChange1');
    var updatedChange1 = $('<input type="submit" id="changeItem" value="Change Item">').addClass('changeItem1');
    var linkToItem1 = $('<a>').attr('href', updatedItem.url).attr('id', "linkItem1").attr('target', '_blank').html('<i class="fas fa-external-link-alt">');
    linkDiv1.append(updatedChange1, linkToItem1);

    $('.giftResult1').append(updatedImageDiv1, updatedTitle1, updatedPrice1, linkDiv1);
});

$('.giftContainer').on('click', '.changeItem2', function (e) {
    e.preventDefault();
    var updatedItem = app.changeGenerator(app.globalList);

    $('.giftResult2').empty();

    var updatedImageDiv2 = $('<div class="giftImage2">');
    var updatedImage2 = $('<img>').attr('src', updatedItem.Images[0].url_fullxfull).addClass('image2');
    updatedImageDiv2.append(updatedImage2);
    var updatedLongTitle2 = updatedItem.title.substr(0, 70);
    var updatedTitle2 = $('<h2>').addClass('itemTitle2').html(updatedLongTitle2 + '...');
    var updatedPrice2 = $('<h3>').addClass('itemPrice2').html('$' + updatedItem.price + ' USD');
    var linkDiv2 = $('<div>').addClass('linkChange2');
    var updatedChange2 = $('<input type="submit" id="changeItem" value="Change Item">').addClass('changeItem2');
    var linkToItem2 = $('<a>').attr('href', updatedItem.url).attr('id', "linkItem2").attr('target', '_blank').html('<i class="fas fa-external-link-alt">');
    linkDiv2.append(updatedChange2, linkToItem2);

    $('.giftResult2').append(updatedImageDiv2, updatedTitle2, updatedPrice2, linkDiv2);
});

$('.giftContainer').on('click', '.changeItem3', function (e) {
    e.preventDefault();

    var updatedItem = app.changeGenerator(app.globalList);
    $('.giftResult3').empty();

    var updatedImageDiv3 = $('<div class="giftImage3">');
    var updatedImage3 = $('<img>').attr('src', updatedItem.Images[0].url_fullxfull).addClass('image3');
    updatedImageDiv3.append(updatedImage3);
    var updatedLongTitle3 = updatedItem.title.substr(0, 70);
    var updatedTitle3 = $('<h2>').addClass('itemTitle3').html(updatedLongTitle3 + '...');
    var updatedPrice3 = $('<h3>').addClass('itemPrice3').html('$' + updatedItem.price + ' USD');
    var linkDiv3 = $('<div>').addClass('linkChange3');
    var updatedChange3 = $('<input type="submit" id="changeItem" value="Change Item">').addClass('changeItem3');
    var linkToItem3 = $('<a>').attr('href', updatedItem.url).attr('id', "linkItem3").attr('target', '_blank').html('<i class="fas fa-external-link-alt">');
    linkDiv3.append(updatedChange3, linkToItem3);

    $('.giftResult3').append(updatedImageDiv3, updatedTitle3, updatedPrice3, linkDiv3);
});

// REFRSH ALL
//Bug at momement, it this button refreshes entire page, may not return down to gift items section
$('.gifts').on('click', '#submitChange', function (e) {
    e.preventDefault();

    app.getUserResult(userGender, userCategory);
});

//flickity jQuery
$(function () {
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


app.init = function () {
    console.log('it is working');
};

$(function () {
    app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQSxJQUFNLE1BQU0sRUFBWjs7QUFFQTtBQUNBLElBQUksTUFBSixHQUFhLGdEQUFiO0FBQ0EsSUFBSSxPQUFKLEdBQWMsMEJBQWQ7O0FBRUEsSUFBSSxtQkFBSjtBQUNBLElBQUkscUJBQUo7O0FBRUE7QUFDQSxJQUFJLGFBQUosR0FBb0IsVUFBQyxNQUFELEVBQVMsUUFBVCxFQUFzQjtBQUN0QyxZQUFRLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLFFBQXBCO0FBQ0EsTUFBRSxJQUFGLENBQU87QUFDSCxhQUFLLElBQUksTUFETjtBQUVILGdCQUFRLEtBRkw7QUFHSCxrQkFBVSxPQUhQO0FBSUgsY0FBTTtBQUNGLHFCQUFTLElBQUksT0FEWDtBQUVGLG9CQUFRLE9BRk47QUFHRixrQkFBTSxNQUhKO0FBSUYsc0JBQVUsUUFKUjtBQUtGLHNCQUFVO0FBTFI7QUFKSCxLQUFQLEVBWUssSUFaTCxDQVlVLFVBQUMsR0FBRCxFQUFTO0FBQ1g7QUFDQSxZQUFNLGNBQWMsSUFBSSxPQUF4Qjs7QUFFQTtBQUNBLFlBQUksZUFBSixDQUFvQixXQUFwQjtBQUNBLFlBQUksVUFBSixHQUFpQixXQUFqQjtBQUNILEtBbkJMO0FBb0JDLENBdEJMOztBQXdCSTs7QUFFSixJQUFJLFVBQUosR0FBaUIsRUFBakI7O0FBRUEsSUFBSSxlQUFKLEdBQXNCLFVBQVUsVUFBVixFQUFzQjs7QUFFeEMsUUFBTSxjQUFjLEVBQXBCOztBQUVBO0FBQ0EsUUFBTSxnQkFBZ0IsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFdBQVcsTUFBdEMsQ0FBdEI7QUFDQSxRQUFNLFFBQVEsV0FBVyxNQUFYLENBQWtCLGFBQWxCLEVBQWlDLENBQWpDLEVBQW9DLENBQXBDLENBQWQ7O0FBR0EsUUFBTSxnQkFBZ0IsS0FBSyxLQUFM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LFlBQVEsR0FBUixDQUFZLGVBQVo7QUFDRCxDQUZEOztBQUtBLEVBQUUsWUFBWTtBQUNWLFFBQUksSUFBSjtBQUNILENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcbmNvbnN0IGFwcCA9IHt9O1xuXG4vLyBhc3NpZ24gdmFyaWFibGVzIGZvciB0aGUgQVBJIFVSTCBhbmQga2V5XG5hcHAuYXBpVVJMID0gJ2h0dHBzOi8vb3BlbmFwaS5ldHN5LmNvbS92Mi9saXN0aW5ncy9hY3RpdmUuanMnO1xuYXBwLmFwaV9rZXkgPSAnOHpkcTlqOTYwajgxZHBmdW9oc2EwcG5tJztcblxubGV0IHVzZXJHZW5kZXI7XG5sZXQgdXNlckNhdGVnb3J5O1xuXG4vLyBhIGZ1bmN0aW9uIGZvciBtYWtpbmcgdGhlIGFqYXggcmVxdWVzdCB0aGF0IHRha2VzIHR3byBwYXJhbWV0ZXJzLCBnZW5kZXIgJiBjYXRlZ29yeVxuYXBwLmdldFVzZXJSZXN1bHQgPSAoZ2VuZGVyLCBjYXRlZ29yeSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGdlbmRlciwgY2F0ZWdvcnkpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYXBwLmFwaVVSTCxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFwaV9rZXk6IGFwcC5hcGlfa2V5LFxuICAgICAgICAgICAgZm9ybWF0OiAnanNvbnAnLFxuICAgICAgICAgICAgdGFnczogZ2VuZGVyLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgICAgICAgICAgaW5jbHVkZXM6ICdJbWFnZXModXJsX2Z1bGx4ZnVsbCknXG4gICAgICAgIH1cbiAgICB9KVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAvLyBhZnRlciB0aGUgcmVzdWx0cyBhcmUgcmV0dXJuZWQsIGNyZWF0ZSBhIG5ldyB2YXJpYWJsZSBmb3IgdGhlIHJlc3VsdGluZyBhcnJheVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0QXJyYXkgPSByZXMucmVzdWx0cztcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGFuIGVtcHR5IGFycmF5IGZvciB0aGUgdGhyZWUgcmFuZG9tIGl0ZW1zIGZyb20gRXRzeVxuICAgICAgICAgICAgYXBwLm51bWJlckdlbmVyYXRvcihyZXN1bHRBcnJheSk7XG4gICAgICAgICAgICBhcHAuZ2xvYmFsTGlzdCA9IHJlc3VsdEFycmF5O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gZ2VuZXJhdGUgdGhyZWUgZGlmZmVyZW50IHJhbmRvbSBudW1iZXJzIHRvIHNlbGVjdCB0aHJlZSBpdGVtcyBmcm9tIHRoZSByZXN1bHRpbmcgYXJyYXkgdGhhdCB3ZSB3aWxsIGRpc3BsYXkgb24gdGhlIHBhZ2VcblxuYXBwLmdsb2JhbExpc3QgPSBbXTsgICAgIFxuXG5hcHAubnVtYmVyR2VuZXJhdG9yID0gZnVuY3Rpb24gKGZpcnN0QXJyYXkpIHtcblxuICAgIGNvbnN0IGZpbmFsUmVzdWx0ID0gW107XG5cbiAgICAvLyB3ZSBzcGxpY2UgdGhlIGl0ZW0gc28gdGhhdCBpdCBkb2VzIG5vdCByZXBlYXQgaW4gb3VyIHJlc3VsdHM7IHdlIHVzZWQgKGl0ZW0xLCBpdGVtMSkgYmVjYXVzZSBpdCBpcyB0aGUgcmVxdWlyZWQgc3ludGF4IGFuZCBqdXN0IChpdGVtMSkgZGlkbid0IGdpdmUgdXMgdGhlIHJlc3VsdHMgd2Ugd2FudGVkXG4gICAgY29uc3QgcmFuZG9tTnVtYmVyMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZpcnN0QXJyYXkubGVuZ3RoKVxuICAgIGNvbnN0IGl0ZW0xID0gZmlyc3RBcnJheS5zcGxpY2UocmFuZG9tTnVtYmVyMSwgMSlbMF07XG4gICAgXG5cbiAgICBjb25zdCByYW5kb21OdW1iZXIyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmlyc3RBcnJheS5sZW5ndGgpXG4gICAgY29uc3QgaXRlbTIgPSBmaXJzdEFycmF5LnNwbGljZShyYW5kb21OdW1iZXIyLCAxKVswXTtcbiAgICBcbiAgICBjb25zdCByYW5kb21OdW1iZXIzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmlyc3RBcnJheS5sZW5ndGgpXG4gICAgY29uc3QgaXRlbTMgPSBmaXJzdEFycmF5LnNwbGljZShyYW5kb21OdW1iZXIzLCAxKVswXTtcbiAgICBcblxuICAgIC8vIGFmdGVyIHdlIGhhdmUgdGhyZWUgcmFuZG9tIGl0ZW1zLCB3ZSBwdXNoIHRoZW0gaW50byBvdXIgbmV3IGFycmF5IGZpbmFsUmVzdWx0XG4gICAgZmluYWxSZXN1bHQucHVzaChpdGVtMSwgaXRlbTIsIGl0ZW0zKTtcblxuICAgIGFwcC5zaG93UmVzdWx0cyhmaW5hbFJlc3VsdCk7XG59O1xuXG5hcHAuc2hvd1Jlc3VsdHMgPSBmdW5jdGlvbihhcnJheSl7XG4gICAgLy8gdXNlIHRoZSBmb3JFYWNoIG1ldGhvZCB0byBkaXNwbGF5IGl0ZW0gaW5mbyBvbiBwYWdlXG4gICAgJCgnLmdpZnRDb250YWluZXInKS5lbXB0eSgpO1xuICAgICQoJy5zdWJtaXRDaGFuZ2UnKS5lbXB0eSgpO1xuXG5cbiAgICBcbiAgICBsZXQgaSA9IDFcblxuICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcblxuICAgICAgICBjb25zdCBnaWZ0UGllY2UgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdnaWZ0UmVzdWx0JyArIGkpLmFkZENsYXNzKCdnaWZ0UmVzdWx0JylcbiAgICAgICAgY29uc3QgaW1hZ2VEaXYgPSAkKGA8ZGl2IGNsYXNzPVwiZ2lmdEltYWdlJHtpfVwiPmApO1xuICAgICAgICBjb25zdCBpbWFnZSA9ICQoJzxpbWc+JykuYXR0cignc3JjJywgaXRlbS5JbWFnZXNbMF0udXJsX2Z1bGx4ZnVsbCkuYWRkQ2xhc3MoJ2ltYWdlJyArIGkpO1xuICAgICAgICBpbWFnZURpdi5hcHBlbmQoaW1hZ2UpO1xuICAgICAgICBjb25zdCBsb25nVGl0bGUgPSAoaXRlbS50aXRsZSkuc3Vic3RyKDAsNzApO1xuICAgICAgICBjb25zdCB0aXRsZSA9ICQoJzxoMj4nKS5hZGRDbGFzcygnaXRlbVRpdGxlJyArIGkpLmh0bWwoYCR7bG9uZ1RpdGxlfS4uLmApO1xuICAgICAgICBjb25zdCBwcmljZSA9ICQoJzxoMz4nKS5hZGRDbGFzcygnaXRlbVByaWNlJyArIGkpLmh0bWwoYCQke2l0ZW0ucHJpY2V9IFVTRGApO1xuICAgICAgICBjb25zdCBsaW5rRGl2ID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnbGlua0NoYW5nZScgKyBpKTtcbiAgICAgICAgY29uc3QgY2hhbmdlID0gJCgnPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cImNoYW5nZUl0ZW1cIiB2YWx1ZT1cIkNoYW5nZSBJdGVtXCI+JykuYWRkQ2xhc3MoJ2NoYW5nZUl0ZW0nICsgaSk7XG4gICAgICAgIC8vIGxpbmsgaXRlbSBidXR0b24gaGVyZSBpbnN0ZWFkIG9mIGlucHV0XG4gICAgICAgIGNvbnN0IGxpbmtUb0l0ZW0gPSAkKCc8YT4nKS5hdHRyKCdocmVmJywgaXRlbS51cmwpLmF0dHIoJ2lkJywgXCJsaW5rSXRlbVwiICsgaSkuYXR0cigndGFyZ2V0JywgJ19ibGFuaycpLmh0bWwoJzxpIGNsYXNzPVwiZmFzIGZhLWV4dGVybmFsLWxpbmstYWx0XCI+Jyk7XG4gICAgICAgIGxpbmtEaXYuYXBwZW5kKGNoYW5nZSwgbGlua1RvSXRlbSk7XG5cbiAgICAgICAgaSsrXG5cbiAgICAgICAgZ2lmdFBpZWNlLmFwcGVuZChpbWFnZURpdiwgdGl0bGUsIHByaWNlLCBsaW5rRGl2KTtcbiAgICAgICAgJCgnLmdpZnRDb250YWluZXInKS5hcHBlbmQoZ2lmdFBpZWNlKTtcblxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IGNoYW5nZUJ1dHRvbiA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ3N1Ym1pdENoYW5nZScpLmFwcGVuZCgkKCc8aDIgY2xhc3M9XCJnaWZ0aWZ5SGVhZGluZ1wiPkhlcmUgYXJlIHRoZSBnaWZ0IGl0ZW1zIHdl4oCZdmUgY3VyYXRlZCBmb3IgeW91PC9oMj4nKSkuYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVwic3VibWl0XCIgaWQ9XCJzdWJtaXRDaGFuZ2VcIiB2YWx1ZT1cIkNoYW5nZSBBbGwgSXRlbXNcIj4nKSk7XG4gICAgJCgnLmdpZnRzJykuYXBwZW5kKGNoYW5nZUJ1dHRvbik7XG4gICAgfTtcblxuLy8gZm9ybSBzdWJtaXRcbiQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHVzZXJHZW5kZXIgPSAkKCdpbnB1dFtuYW1lPWdlbmRlcl06Y2hlY2tlZCcpLnZhbCgpO1xuICAgIHVzZXJDYXRlZ29yeSA9ICQoJ2lucHV0W25hbWU9Y2F0ZWdvcnldOmNoZWNrZWQnKS52YWwoKTtcbiAgICBhcHAuZ2V0VXNlclJlc3VsdCh1c2VyR2VuZGVyLCB1c2VyQ2F0ZWdvcnkpO1xufSk7XG5cbi8vIGdlbmVyYXRlIG9uZSByYW5kb20gbnVtYmVyIHRvIGNoYW5nZSBvbmUgaXRlbVxuYXBwLmNoYW5nZUdlbmVyYXRvciA9IGZ1bmN0aW9uIChhcnJheSl7XG4gICAgY29uc3QgbmV3SXRlbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aClcbiAgICBjb25zdCBuZXdJdGVtID0gYXJyYXlbbmV3SXRlbU51bWJlcl07XG4gICAgcmV0dXJuIG5ld0l0ZW07XG59XG5cbi8vY2hhbmdlIHNpbmdsZSBpdGVtcyBhcyBvcHBvc2VkIHRvIGFsbCB0aHJlZVxuJCgnLmdpZnRDb250YWluZXInKS5vbignY2xpY2snLCAnLmNoYW5nZUl0ZW0xJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCB1cGRhdGVkSXRlbSA9IGFwcC5jaGFuZ2VHZW5lcmF0b3IoYXBwLmdsb2JhbExpc3QpO1xuXG4gICAgJCgnLmdpZnRSZXN1bHQxJykuZW1wdHkoKTtcblxuICAgIGNvbnN0IHVwZGF0ZWRJbWFnZURpdjEgPSAkKGA8ZGl2IGNsYXNzPVwiZ2lmdEltYWdlMVwiPmApO1xuICAgIGNvbnN0IHVwZGF0ZWRJbWFnZTEgPSAkKCc8aW1nPicpLmF0dHIoJ3NyYycsIHVwZGF0ZWRJdGVtLkltYWdlc1swXS51cmxfZnVsbHhmdWxsKS5hZGRDbGFzcygnaW1hZ2UxJyk7XG4gICAgdXBkYXRlZEltYWdlRGl2MS5hcHBlbmQodXBkYXRlZEltYWdlMSk7XG4gICAgY29uc3QgdXBkYXRlZExvbmdUaXRsZTEgPSAodXBkYXRlZEl0ZW0udGl0bGUpLnN1YnN0cigwLDcwKTtcbiAgICBjb25zdCB1cGRhdGVkVGl0bGUxID0gJCgnPGgyPicpLmFkZENsYXNzKCdpdGVtVGl0bGUxJykuaHRtbChgJHt1cGRhdGVkTG9uZ1RpdGxlMX0uLi5gKTtcbiAgICBjb25zdCB1cGRhdGVkUHJpY2UxID0gJCgnPGgzPicpLmFkZENsYXNzKCdpdGVtUHJpY2UxJykuaHRtbChgJCR7dXBkYXRlZEl0ZW0ucHJpY2V9IFVTRGApO1xuICAgIGNvbnN0IGxpbmtEaXYxID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnbGlua0NoYW5nZTEnKTtcbiAgICBjb25zdCB1cGRhdGVkQ2hhbmdlMSA9ICQoJzxpbnB1dCB0eXBlPVwic3VibWl0XCIgaWQ9XCJjaGFuZ2VJdGVtXCIgdmFsdWU9XCJDaGFuZ2UgSXRlbVwiPicpLmFkZENsYXNzKCdjaGFuZ2VJdGVtMScpO1xuICAgIGNvbnN0IGxpbmtUb0l0ZW0xID0gJCgnPGE+JykuYXR0cignaHJlZicsIHVwZGF0ZWRJdGVtLnVybCkuYXR0cignaWQnLCBcImxpbmtJdGVtMVwiKS5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJykuaHRtbCgnPGkgY2xhc3M9XCJmYXMgZmEtZXh0ZXJuYWwtbGluay1hbHRcIj4nKTtcbiAgICBsaW5rRGl2MS5hcHBlbmQodXBkYXRlZENoYW5nZTEsIGxpbmtUb0l0ZW0xKTtcblxuICAgICQoJy5naWZ0UmVzdWx0MScpLmFwcGVuZCh1cGRhdGVkSW1hZ2VEaXYxLCB1cGRhdGVkVGl0bGUxLCB1cGRhdGVkUHJpY2UxLCBsaW5rRGl2MSk7XG59KVxuXG5cbiQoJy5naWZ0Q29udGFpbmVyJykub24oJ2NsaWNrJywgJy5jaGFuZ2VJdGVtMicsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHVwZGF0ZWRJdGVtID0gYXBwLmNoYW5nZUdlbmVyYXRvcihhcHAuZ2xvYmFsTGlzdCk7XG5cbiAgICAkKCcuZ2lmdFJlc3VsdDInKS5lbXB0eSgpO1xuXG4gICAgY29uc3QgdXBkYXRlZEltYWdlRGl2MiA9ICQoYDxkaXYgY2xhc3M9XCJnaWZ0SW1hZ2UyXCI+YCk7XG4gICAgY29uc3QgdXBkYXRlZEltYWdlMiA9ICQoJzxpbWc+JykuYXR0cignc3JjJywgdXBkYXRlZEl0ZW0uSW1hZ2VzWzBdLnVybF9mdWxseGZ1bGwpLmFkZENsYXNzKCdpbWFnZTInKTtcbiAgICB1cGRhdGVkSW1hZ2VEaXYyLmFwcGVuZCh1cGRhdGVkSW1hZ2UyKTtcbiAgICBjb25zdCB1cGRhdGVkTG9uZ1RpdGxlMiA9ICh1cGRhdGVkSXRlbS50aXRsZSkuc3Vic3RyKDAsNzApO1xuICAgIGNvbnN0IHVwZGF0ZWRUaXRsZTIgPSAkKCc8aDI+JykuYWRkQ2xhc3MoJ2l0ZW1UaXRsZTInKS5odG1sKGAke3VwZGF0ZWRMb25nVGl0bGUyfS4uLmApO1xuICAgIGNvbnN0IHVwZGF0ZWRQcmljZTIgPSAkKCc8aDM+JykuYWRkQ2xhc3MoJ2l0ZW1QcmljZTInKS5odG1sKGAkJHt1cGRhdGVkSXRlbS5wcmljZX0gVVNEYCk7XG4gICAgY29uc3QgbGlua0RpdjIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdsaW5rQ2hhbmdlMicpO1xuICAgIGNvbnN0IHVwZGF0ZWRDaGFuZ2UyID0gJCgnPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cImNoYW5nZUl0ZW1cIiB2YWx1ZT1cIkNoYW5nZSBJdGVtXCI+JykuYWRkQ2xhc3MoJ2NoYW5nZUl0ZW0yJyk7XG4gICAgY29uc3QgbGlua1RvSXRlbTIgPSAkKCc8YT4nKS5hdHRyKCdocmVmJywgdXBkYXRlZEl0ZW0udXJsKS5hdHRyKCdpZCcsIFwibGlua0l0ZW0yXCIpLmF0dHIoJ3RhcmdldCcsICdfYmxhbmsnKS5odG1sKCc8aSBjbGFzcz1cImZhcyBmYS1leHRlcm5hbC1saW5rLWFsdFwiPicpO1xuICAgIGxpbmtEaXYyLmFwcGVuZCh1cGRhdGVkQ2hhbmdlMiwgbGlua1RvSXRlbTIpO1xuXG4gICAgJCgnLmdpZnRSZXN1bHQyJykuYXBwZW5kKHVwZGF0ZWRJbWFnZURpdjIsIHVwZGF0ZWRUaXRsZTIsIHVwZGF0ZWRQcmljZTIsIGxpbmtEaXYyKTtcbn0pXG5cblxuJCgnLmdpZnRDb250YWluZXInKS5vbignY2xpY2snLCAnLmNoYW5nZUl0ZW0zJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCB1cGRhdGVkSXRlbSA9IGFwcC5jaGFuZ2VHZW5lcmF0b3IoYXBwLmdsb2JhbExpc3QpO1xuICAgICQoJy5naWZ0UmVzdWx0MycpLmVtcHR5KCk7XG5cbiAgICBjb25zdCB1cGRhdGVkSW1hZ2VEaXYzID0gJChgPGRpdiBjbGFzcz1cImdpZnRJbWFnZTNcIj5gKTtcbiAgICBjb25zdCB1cGRhdGVkSW1hZ2UzID0kKCc8aW1nPicpLmF0dHIoJ3NyYycsIHVwZGF0ZWRJdGVtLkltYWdlc1swXS51cmxfZnVsbHhmdWxsKS5hZGRDbGFzcygnaW1hZ2UzJyk7XG4gICAgdXBkYXRlZEltYWdlRGl2My5hcHBlbmQodXBkYXRlZEltYWdlMyk7XG4gICAgY29uc3QgdXBkYXRlZExvbmdUaXRsZTMgPSAodXBkYXRlZEl0ZW0udGl0bGUpLnN1YnN0cigwLDcwKTtcbiAgICBjb25zdCB1cGRhdGVkVGl0bGUzID0gJCgnPGgyPicpLmFkZENsYXNzKCdpdGVtVGl0bGUzJykuaHRtbChgJHt1cGRhdGVkTG9uZ1RpdGxlM30uLi5gKTtcbiAgICBjb25zdCB1cGRhdGVkUHJpY2UzID0gJCgnPGgzPicpLmFkZENsYXNzKCdpdGVtUHJpY2UzJykuaHRtbChgJCR7dXBkYXRlZEl0ZW0ucHJpY2V9IFVTRGApO1xuICAgIGNvbnN0IGxpbmtEaXYzID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnbGlua0NoYW5nZTMnKTtcbiAgICBjb25zdCB1cGRhdGVkQ2hhbmdlMyA9ICQoJzxpbnB1dCB0eXBlPVwic3VibWl0XCIgaWQ9XCJjaGFuZ2VJdGVtXCIgdmFsdWU9XCJDaGFuZ2UgSXRlbVwiPicpLmFkZENsYXNzKCdjaGFuZ2VJdGVtMycpO1xuICAgIGNvbnN0IGxpbmtUb0l0ZW0zID0gJCgnPGE+JykuYXR0cignaHJlZicsIHVwZGF0ZWRJdGVtLnVybCkuYXR0cignaWQnLCBcImxpbmtJdGVtM1wiKS5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJykuaHRtbCgnPGkgY2xhc3M9XCJmYXMgZmEtZXh0ZXJuYWwtbGluay1hbHRcIj4nKTtcbiAgICBsaW5rRGl2My5hcHBlbmQodXBkYXRlZENoYW5nZTMsIGxpbmtUb0l0ZW0zKTtcblxuICAgICQoJy5naWZ0UmVzdWx0MycpLmFwcGVuZCh1cGRhdGVkSW1hZ2VEaXYzLCB1cGRhdGVkVGl0bGUzLCB1cGRhdGVkUHJpY2UzLCBsaW5rRGl2Myk7XG59KVxuXG5cbi8vIFJFRlJTSCBBTExcbi8vQnVnIGF0IG1vbWVtZW50LCBpdCB0aGlzIGJ1dHRvbiByZWZyZXNoZXMgZW50aXJlIHBhZ2UsIG1heSBub3QgcmV0dXJuIGRvd24gdG8gZ2lmdCBpdGVtcyBzZWN0aW9uXG4gJCgnLmdpZnRzJykub24oJ2NsaWNrJywgJyNzdWJtaXRDaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgYXBwLmdldFVzZXJSZXN1bHQodXNlckdlbmRlciwgdXNlckNhdGVnb3J5KTtcbiB9KTtcblxuLy9mbGlja2l0eSBqUXVlcnlcbiQoZnVuY3Rpb24oKSB7XG4gICAgJCgnLm1haW4tY2Fyb3VzZWwnKS5mbGlja2l0eSh7XG4gICAgICAgIHdyYXBBcm91bmQ6IHRydWUsXG4gICAgICAgIHBhZ2VEb3RzOiBmYWxzZVxuICAgIH0pO1xufSk7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFwiaGVsbG9cIik7XG4gIH0pO1xuXG4gICQoJ2EnKS5zbW9vdGhTY3JvbGwoe1xuICAgIG9mZnNldDogLTEsXG4gICAgc3BlZWQ6IDcwMFxuICB9KTtcblxuXG5cbi8vVXNlciBjb21lcyB0byBzaXRlLCBzdGFydHMgb2ZmIHdpdGggb3B0aW9uIHRvIHNlbGVjdCBhIGNhdGVnb3J5ICh0aGF0IHdlIGhhdmUgcHJlZGV0ZXJtaW5lZCBhbmQgZ2l2ZW4gYXMgY2hvaWNlcylcbi8vTWVuLCBXb21lbiwgVW5pc2V4XG4vL0Nsb3RoaW5nLCBhcnQsIGpld2VsbHJ5LCB0b3lzLCBob21lXG5cbi8vc3VibWl0IGFqYXggcmVxdWVzdCBiYXNlZCBvbiB0aGUgc2VhcmNoIHBhcmFtZXRlcnNcbi8vZ2V0IGNhdGVnb3J5XG5cbi8vRXRzeSBBUEkgb25seSBhbGxvd3MgMjUgcmVzdWx0cyBiYWNrXG4vL2Zyb20gaGVyZSB3ZSB3aWxsIHVzZSBhIGZ1bmN0aW9uIHRvIGdyYWIgMyBvZiB0aGUgMjUgcmVzdWx0cyB0aGVuIGRpc3BsYXkgb24gdGhlIHBhZ2UgZm9yIHRoZSB1c2VyIHRvIHNlZS5cblxuLy90aGUgZGlzcGxheSB3aWxsIGhhdmUgYW4gaW1hZ2UsIHRoZSB0aXRsZSB3aXRoIGxpbWl0ZWQgdG8gc2hvd2luZyBvbmx5IGZpcnN0IDIwIGxldHRlcnMuIEFsc28gaGF2ZSBhIGxpbmsgdG8gdGhlIGV0c3kgaXRlbVxuXG4vL1RoZSB1c2VyIHdpbGwgaGF2ZSAyIG9wdGlvbnNcbi8vMSAgaXMgdG8gcmVmcmVzaCB0aGUgcmVzdWx0cyA+PiB3aGljaCBnZW5lcmF0ZXMgMyBtb3JlIHJhbmRvbSBmcm9tIHRoZSBzYW1lIGNhdGVnb3J5IHVzZXIgc2VsZWN0ZWQuXG5cbi8vMiBJZiB0aGUgdXNlciBpcyBoYXBweSB0aGV5IGNhbiBzZWxlY3QgR2V0IHRoZXNlIGdpZnRzLlxuXG4vLypFeHRyYS4gVGhlIHByaWNlcyB3aWxsIGJlIGFkZGVkIHRvZ2V0aGVyIHRvIHByb2R1Y2UgYSBzdW0gdG90YWwgdG8gbGV0IHRoZSB1c2VyIGtub3cgdGhlIHRvdGFsIHByaWNlIG9mIHRoZSAzIGdpZnQgY29tYm8gcGFjay5cblxuLy9XaGVuIHVzZXIgc2VsZWN0cyBHZXQgdGhlc2UgZ2lmdHMgPj4gMyBwYWdlcyB3aWxsIGJlIGdlbmVyYXRlZCwgZWFjaCBvZiB0aGUgZ2lmdCBpdGVtcyAoZnJvbSB0aGUgdXJsIGFycmF5KVxuXG5cbmFwcC5pbml0ID0gZnVuY3Rpb24oKXtcbiAgY29uc29sZS5sb2coJ2l0IGlzIHdvcmtpbmcnKTtcbn07XG5cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgYXBwLmluaXQoKTtcbn0pOyBcbiJdfQ==
