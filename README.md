# My.self
A very tiny JavaScript library to build very simple personal pages.

# Usage
Simply add a link to jQuery and my.self into your page and nothing more! It is indeed not a very good standard, however is the tiniest possible. So your whole HTML document should look like:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="js/my.self.min.js"></script>
<script type="text/javascript">
    var my = new My();
    
    my.self({
    	// (...)
    });
</script>
```

# Attributes
The object `My` has a single method that can be accessed which is `self`.

The `self` method takes as input a object that must contain at least three attributes:

- `@name` The name of the user

- `@bg` A colour to be applied on the background

- `@color` The font color

There are also optional attributes that can be used:

- `@font` A 2-dimensional array, in which the first is the name of the font to be used in the title, and the second, the font to be used on the links. These font names should be taken from Google Fonts. If a different size is given, the array is changed to comprise the same font in the first and second indexes. (default sans-serif).

- `@shadow` The percentage of difference between @bg and the shadow being applied. (default -40).

- `@social` An object that should map a name to a link. The names will be displayed as links to the given URLs.

# Example

The following code:

```javascript
var my = new My();

my.self({
    name: 'Breno',
    font: ['Montserrat'],
    bg: '#6a7ee0',
    shadow: -30,
    color: '#fff',
    social: {
        'Facebook': 'http://facebook.com',
        'LinkedIn':  'http://linkedin.com',            
        'Google+':  'http://plus.google.com'
    }
});
```

Is going to result into the following page:

![Result](https://cloud.githubusercontent.com/assets/1520534/6429536/61a49034-bfb7-11e4-927d-8a3fc71631ec.png)

# Known issues
- Firefox does not render the dynamically added font

# License
MIT
