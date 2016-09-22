/**
 * Created by Udi-BRIX on 9/20/2016.
 */

window.onload = function() {

    var
        main_content = $("#center-content");

    // Update the page content.
    var updateContent = function(url) {
        // Check to make sure that this state object is not null.
        if (url) {

            var content_address = (url + '.html');

            main_content.load(content_address);

            //set active item in menu
            $('.menu, .item').removeClass('active');

            $("#"+ url).addClass('active');

        }

    };

    var get_hashtag_url = function(url) {
        // Check to make sure that this state object is not null.

            var ladder_address;

            var n = url.indexOf('#');

            if(n >= 0) {

                ladder_address = url.split('#').pop();

            } else {

                ladder_address = null
            }

        return ladder_address;

    };

    var get_hashtag_from_link = function(url) {

        // Check to make sure that this state object is not null.

        var n = url.indexOf('.html');

        if(n >= 0) {

            url = url.split('/').pop();
            url = url.split('.html')[0];

        } else {

            url = null
        }

        return url;

    };

    var get_base_url = function() {

        return window.location.href.split('#')[0]

    };

    // Attach click listeners for each of the nav links.
    $('a[href]').click(function(e) {

        e.preventDefault();

        // Fetch the page data using the URL in the link.
        var link_url = this.attributes['href'].value;

        var url = get_hashtag_from_link(link_url);

        // Update the title and content.
        updateContent(url);

        // update history
        history.pushState(url, 'moshe', get_base_url() + '#' + url);

    });


    window.onpopstate = function(event) {

        updateContent(event.state);

    };


    var hashtag_url = get_hashtag_url(window.location.href);

    // if there is no local address, load the default "about" page
    if (hashtag_url == null) {

        hashtag_url = 'about'

    }


    history.pushState(hashtag_url, '', get_base_url() + '#' + hashtag_url);
    updateContent(hashtag_url);

};