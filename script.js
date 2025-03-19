$(document).ready(function(){
    $(window).scroll(function(){
        
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
    

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: [ " Frontend Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Frontend Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    
    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });

    // Ensure the "hire me" button is not affected by animations
    $('.hire-me-btn').css({
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    });

    // Change cursor when hovering over images
    $('img').hover(
        function() {
            $(this).css('cursor', 'pointer');
        }, 
        function() {
            $(this).css('cursor', 'default');
        }
    );

    // Change cursor when within 1 inch of the image
    $(document).mousemove(function(e) {
        $('img').each(function() {
            var imgOffset = $(this).offset();
            var imgWidth = $(this).width();
            var imgHeight = $(this).height();
            var inch = 96; // 1 inch in pixels

            if (e.pageX > imgOffset.left - inch && e.pageX < imgOffset.left + imgWidth + inch &&
                e.pageY > imgOffset.top - inch && e.pageY < imgOffset.top + imgHeight + inch) {
                $(this).css('cursor', 'pointer');
            } else {
                $(this).css('cursor', 'default');
            }
        });
    });
});

// Function to send a message to the Chrome extension's background script
function sendMessageToBackground(message) {
    chrome.runtime.sendMessage(message, (response) => {
        // Check for errors
        if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError);
            // Handle the error: try reconnecting, retrying, etc.
            // For example, reload the extension or send a new message.
            if (chrome.runtime.lastError.message.includes('Receiving end does not exist')) {
                console.warn("Background service worker is not active. Restarting listener...");
                // Try to reconnect or send the message again.
                //sendMessageToBackground(message); // Uncomment if retry logic is needed
            }
        } else {
            console.log("Message sent successfully. Response received: ", response);
        }
    });
}

var moveForce = 30; // max popup movement in pixels
var rotateForce = 20; // max popup rotation in deg

$(document).mousemove(function(e) {
    var docX = $(document).width();
    var docY = $(document).height();
    
    var moveX = (e.pageX - docX/2) / (docX/2) * -moveForce;
    var moveY = (e.pageY - docY/2) / (docY/2) * -moveForce;
    
    var rotateY = (e.pageX / docX * rotateForce*2) - rotateForce;
    var rotateX = -((e.pageY / docY * rotateForce*2) - rotateForce);
    
    $('.popup')
        .css('left', moveX+'px')
        .css('top', moveY+'px')
        .css('transform', 'rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)');
});