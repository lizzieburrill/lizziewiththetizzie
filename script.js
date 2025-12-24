$(document).ready(function () {
  // Save For Later Functionality

  // Create array to hold saved items and load from localStorage if it exists
  let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

  //Save Button Functionality
  $('.save-btn').click(function () {
    // Identify the parent container of the clicked button
    let parent = $(this).closest('.resource-item');

    // Get the title
    let title = parent.find('.item-title').text();

    //Check if the item is a table (to make sure my table can show in saved items)
    let hasTable = parent.find('table').length > 0;
    //Create an empty object
    let item = {};
    //If it is a table, create an item with a table tag
    if (hasTable) {
      let tableContent = parent.find('table').prop('outerHTML');
      item = {
        type: 'table',
        title: title,
        content: tableContent,
      };
      //If it is not a table, create an item with a regular tag
    } else {
      let image = parent.find('.item-image').attr('src');
      let descText = parent.find('.item-desc').text();
      let desc = '';
      if (descText) {
        desc = descText.substring(0, 100) + '...';
      } else {
        desc = 'No Description available';
      }

      item = {
        type: 'regular',
        title: title,
        image: image,
        desc: desc,
      };
    }

    // Add to array and save to local storage
    savedItems.push(item);
    localStorage.setItem('savedItems', JSON.stringify(savedItems));

    // Show an alert telling user how many items are in folder
    alert(
      'Item saved! You now have ' +
        savedItems.length +
        ' items in your collection.'
    );

    // Chained effect for change button text to fade out and in after a short wait
    $(this)
      .text('Saved!')
      .css('background-color', '#88cc88')
      .delay(500)
      .fadeOut(300)
      .fadeIn(300);
  });

  // Display saved items in My Saved Items page
  // Check if the container exists on the current page
  if ($('#saved-items-container').length) {
    // Check if the savedItems array is empty
    if (savedItems.length === 0) {
      $('#saved-items-container').html('<p>No items saved yet.</p>');
    } else {
      // For loop to go through each item
      for (let i = 0; i < savedItems.length; i++) {
        let item = savedItems[i]; // Get the current item from the array

        let cardContent = ''; // Variable to hold the HTML for this specific item

        // Check if the item is a table or a regular item
        if (item.type === 'table') {
          // If it is a table, use the saved table HTML directly
          cardContent = item.content;
        } else {
          // If it is a regular item, build the image and description HTML
          let imgSrc = '';
          if (item.image) {
            imgSrc = item.image;
          } else {
            imgSrc = '';
          }

          // Build the HTML string for image and text
          cardContent =
            '<img src="' +
            imgSrc +
            '" style="width:100px; height:auto; display:block; margin-bottom:10px;">' +
            '<p>' +
            item.desc +
            '</p>';
        }

        // Append the final HTML card to the container
        $('#saved-items-container').append(
          '<div class="saved-card" style="border:1px solid #ffaac8; padding:20px; margin:20px; background: white;">' +
            '<h3>' +
            item.title +
            '</h3>' +
            cardContent +
            '</div>'
        );
      }
    }
  }

  // Hiding and showing comments
  $('.toggle-comments').click(function () {
    $(this).next('.comments-section').slideToggle();
  });

  // Forms Functionality

  // Like Button
  $('.like-form').submit(function (e) {
    e.preventDefault();
    let countSpan = $(this).find('.like-count');
    let currentLikes = parseInt(countSpan.text());
    if (isNaN(currentLikes)) {
      currentLikes = 0;
    }

    // Animation effects
    countSpan
      .text(currentLikes + 1 + ' likes')
      .hide()
      .fadeIn('slow');
    alert('You liked this!');
  });

  // Comment Form
  $('.comment-form').submit(function (e) {
    e.preventDefault();
    let text = $(this).find('input').val();
    $(this).next('.comment-list').append(`<li>${text}</li>`);
    $(this).find('input').val(''); // Clear input
  });

  // Contact Form
  $('#contact-form').submit(function (e) {
    e.preventDefault();
    alert('Thank you for contacting Lizzie! We will get back to you soon.');
  });

  // Dropdown menu added to the header for navigation
  let $nav = $(
    '<div class="dropdown-nav">' +
      '<button class="dropbtn">Menu</button>' +
      '<div class="dropdown-content">' +
      '<a href="index.html">Home</a>' +
      '<a href="aboutme.html">About Me</a>' +
      '<a href="helpfulresources.html">Helpful Resources</a>' +
      '<a href="savedforlater.html">My Saved Items</a>' +
      '</div>' +
      '</div>'
  );

  // Prepend to body
  $('body').prepend($nav);

  // Hover functionalisty
  $('.dropdown-nav').hover(
    function () {
      // Slide down when mouse enters
      $(this).find('.dropdown-content').stop(true, true).slideDown(300);
    },
    function () {
      // Slide up when mouse leaves
      $(this).find('.dropdown-content').slideUp(300);
    }
  );
});
