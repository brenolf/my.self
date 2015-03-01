/*
    my.self v 0.1  | (c) 2015 Breno Lima de Freitas - breno.io | Licensed under MIT

    my.self is a very simple library for creating
    very simple web pages.

    The object "My" has a single method that
    can be accessed: self.

    The self method takes as input a object that
    must contain at least three attributes:

    @name: the name of the user

    @bg: a colour to be applied on the background

    @color: the font color

    There are also optional attributes that can be used:

    @font: a 2-dimensional array, in which the first is
    the name of the font to be used in the title, and the
    second, the font to be used on the links. These font
    names should be taken from Google Fonts. If a different
    size is given, the array is changed to comprise the same
    font in the first and second indexes. (default sans-serif)

    @shadow: the percentage of difference between @bg and
    the shadow being applied. (default -40)

    @social: an object that should map a name to a link. The
    names will be displayed as links to the given URLs.
*/

; (function (w) {

    'use strict';

    w.My = function () {

        // The this handler
        var _ = this;


        // Function that lightens/darkens a color
        // Copied from http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
        function changeColor(color, percent) {  
            var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
            return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
        }

        // Function that tests for mandatory arguments
        function incomplete (bio) {
            var fields = ['name', 'bg', 'color'];
            var length = fields.length;

            for (var i = 0; i < length; i++)
                if (bio[fields[i]] === undefined)
                    return true;

            return false;
        }

        _.self = function (bio) {
            $(document).ready(function() {
                if (incomplete(bio))
                    return false;

                $('head').append('<title>Hi, I\'m ' + bio.name + '</title>');

                var body = $(document.body);
                var title = $('<div>Hi, I\'m ' + bio.name + '</div>');
                var marginTop = bio.margin ? bio.margin : '2em';

                var social = $('<ul></ul>');

                bio.shadow = bio.shadow ? bio.shadow : -40;
                var darker = changeColor(bio.bg.substr(1), bio.shadow);

                var fonts = ['sans-serif', 'sans-serif']

                var isArray = Object.prototype.toString.call( bio.font ) === '[object Array]';

                if (bio.font !== undefined && isArray) {

                    if (bio.font.length === 0)
                        bio.font = fonts[0];

                    if (bio.font.length === 1)
                        bio.font.push(bio.font[0]);

                    var escaped_font = [
                        bio.font[0].replace(/\s+/g, '+'),
                        bio.font[1].replace(/\s+/g, '+')
                    ];

                    body.prepend("<link href='http://fonts.googleapis.com/css?family=" + escaped_font[0] + "' rel='stylesheet' type='text/css'>");

                    if (escaped_font[0] !== escaped_font[1])
                        body.prepend("<link href='http://fonts.googleapis.com/css?family=" + escaped_font[1] + "' rel='stylesheet' type='text/css'>");

                    fonts[0] = '"' + bio.font[0] + '" ' + fonts[0];
                    fonts[1] = '"' + bio.font[1] + '" ' + fonts[1];
                }


                for (var name in bio.social) {
                    var element = $('<li></li>');
                    var link = $('<a target="_blank" href="' + bio.social[name] + '">' + name + '</a>');

                    element.append(link);
                    social.append(element);

                    link.css({
                        color: bio.color,
                        textDecoration: 'none'
                    });

                    link.mouseover(function () {
                        $(this).css({
                            textDecoration: 'underline'
                        });
                    });

                    link.mouseout(function () {
                        $(this).css({
                            textDecoration: 'none'
                        });
                    });

                    element.css({
                        display: 'inline-block',
                        margin: '0 2em 1em 0',
                        listStyle: 'circle'
                    });
                }

                social.css({
                    fontSize: '1.5em',
                    textAlign: 'center',
                    textShadow: '3px 3px 0px ' + darker,
                    fontFamily: fonts[1]
                });

                title.css ({
                    fontSize: '5em',
                    fontFamily: fonts[0],
                    color: '#fff',
                    textAlign: 'center',
                    textShadow: '4px 4px 0px ' + darker,
                    margin: marginTop + ' 0'
                });

                body.css ({
                    padding: 0,
                    margin: 0,
                    background: bio.bg
                });

                body.append(title);
                body.append(social);

            });
        };

    };

}) (window);