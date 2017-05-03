/*global requirejs, define, window, document*/
requirejs.config({
    baseUrl: "js/vendor",
    "paths": {
        "jquery": "jquery-3.2.1.min",
        "imagesLoaded": "imagesloaded-4.1.1.min",
        "wookmark": "wookmark-2.1.2.min",
        "magnificPopup": "jquery.magnific-popup-1.1.0.min"
    },
    "shim": {
        "magnificPopup": ["jquery"],
        "imagesLoaded": ["jquery"]
    }
});

// Define the window and document modules so they are available for the Wookmark plugin
define('window', function () {
    return window;
});

define('document', function () {
    return document;
});

requirejs(['jquery', 'imagesLoaded', 'wookmark', 'magnificPopup'], function ($, imagesLoaded, Wookmark) {
    /*
    imagesLoaded('#container', function () {
        var wookmark = new Wookmark('#container');

        // Init lightbox
        $('#container').magnificPopup({
            delegate: 'li:not(.inactive) a',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    });
    */
    (function ($) {
        var loadedImages = 0, // Counter for loaded images
            $progressBar = $('.progress-bar'),
            container = '#container',
            $container = $(container),
            tileCount = 30,
            wookmark;

        for (var i = 0; i < tileCount; i++) {
            var mediaFileName='"img/image_' + (1 + i % 10)+ '.jpg"';
            var newItemHtml = '<li class="tile-loading"><a href='+mediaFileName+'><img src=' +mediaFileName+'></a><p>' + (1 + i) + '</p></li>';
            $container.append(newItemHtml);
        }

        // Initialize Wookmark
        wookmark = new Wookmark(container, {
            offset: 5, // Optional, the distance between grid items
            outerOffset: 10, // Optional, the distance to the containers border
            itemWidth: 210 // Optional, the width of a grid item
        });

        $container.imagesLoaded()
            .always(function () {
                $progressBar.hide();
            })
            .progress(function (instance, image) {
                // Update progress bar after each image has loaded and remove loading state
                $(image.img).closest('li').removeClass('tile-loading');
                $progressBar.css('width', (++loadedImages / tileCount * 100) + '%');
                wookmark.updateOptions();
            });
        // Init lightbox
        $container.magnificPopup({
            delegate: 'li:not(.inactive) a',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    })(jQuery);
});
