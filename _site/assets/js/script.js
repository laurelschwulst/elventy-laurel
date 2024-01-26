console.log('hi');

$(function () {

    // $('#menu-click').click(function(){
    //     $('#menu-itself').toggle();
    // });

    $('#menu-click').click(function(){

        var menuClick = $(this);
        var menuItself = $('#menu-itself');
        var homeLink = $('a#home');
        var regularContent = $('#regular-content');
        var containerEverything = $('#container-everything');

        if (menuClick.text() === "☰") {
            menuClick.text("×");
            menuItself.show();
            homeLink.addClass('menu-open');
            regularContent.addClass('menu-open');
            containerEverything.addClass('menu-open');
        } else {
            menuClick.text("☰");
            menuItself.hide();
            homeLink.removeClass('menu-open');
            regularContent.removeClass('menu-open');
            containerEverything.removeClass('menu-open');
        }

    });

});

document.getElementById("project-navigator").addEventListener("change", function() {
    const selectedPage = this.value; // Get the selected value
    if (selectedPage) {
        window.location.href = selectedPage; // Redirect to the selected page
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.getElementById("project-navigator");
    const currentPage = window.location.pathname;
  
    for (let i = 0; i < dropdown.options.length; i++) {
      if (dropdown.options[i].value === currentPage) {
        dropdown.selectedIndex = i;
        break; // Stop iterating once a match is found
      }
    }
  
    dropdown.addEventListener("change", function() {
      const selectedPage = this.value; // Get the selected value
      if (selectedPage) {
        window.location.href = selectedPage; // Redirect to the selected page
      }
    });
});