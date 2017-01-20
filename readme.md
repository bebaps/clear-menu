# Clear Menu
A simple mobile menu that is easy in integrate into an existing project. Clear Menu is actually two separate components acting as one; a panel that gets revealed into the viewport, and a mobile menu. Although these two components are packaged together by default, you can use them on their own as needed.

## Getting Started
Include `clearmenu.css` into the `<head>` of your project.

***Example:***

`<link rel="stylesheet" href="path/to/clearmenu.css">`

Next, include `clearmenu.js` before the closing `</body>` tag of your project, after jQuery.

***Example:***

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
<script src="path/to/clearmenu.js"></script>
```
You can now call the `clearmenu()` function on any element that you want to act as a panel.

***Example:***

`$('#panel').clearmenu();`

## Usage
The markup for Clear Menu is minimal, and composed of three primary components:

### The Panel
The panel is just a container for whatever content you want to be revealed. This will most commonly be a `<div>`, `<section>`, or `<nav>` tag. ***The only mandatory attribute is a class of `cm-panel`.***
```
<div class="cm-panel">
  <!-- Whatever you want -->
</div>
```

### The Menu
The menu is just a standard `<ul>`. ***It is mandatory for the menu to be a direct child of `.cm-panel`.***
```
<nav id="panel" class="cm-panel">
  <ul>
    <li><a href="#">Link</a></li>
    <li>
      <a href="#">Link</a>
      <ul>
        <li><a href="#">Sub Link</a></li>
        <li><a href="#">Sub Link</a></li>
        <li><a href="#">Sub Link</a></li>
      </ul>
    </li>
    <li><a href="#">Link</a></li>
  </ul>
</nav>
```

### The Trigger
The trigger is whatever element you want to trigger the revealing of the panel when clicked. Anything can be a trigger, but most commonly this will be an `<a>` or a `<button>`.

If using a trigger as a navigational button, you have a few options:
```
<!-- Standard hamburger icon -->
<button class="cm-button">
  <span class="cm-button_icon"></span>
</button>

<!-- Text only -->
<button class="cm-button">
  <span class="cm-button_text">Menu</span>
</button>

<!-- Both -->
<a class="cm-button" href="#">
  <span class="cm-button_text">Menu</span>
  <span class="cm-button_icon"></span>
</a>
```

### Calling with jQuery
Call Clear Menu in a stand alone script or within an external JS file:
```
<script>
  $(function() {
    $('#panel').clearmenu();
  });
</script>
```

## Options
Clear Menu has a few options to alter its behavior. Below are the available options and their default settings:
```
<script>
  $(function() {
    $('#panel').clearmenu({
      panel: this, // Define a panel that the trigger will target
      trigger: '.cm-button', // Define the trigger
      subMenu: '.cm-submenu', // Class that gets added to sub-menus if not in a WordPress install
      hasSubMenu: true, // Allow sub-menus to be revealed
      reveal: 'fade', // Define the reveal animation. Can be 'fade', 'top', 'bottom', 'left', or 'right'
      speed: 200, // Define the speed of the animation
      mask: false, // Should the body be masked to help focus on the panel
      close: false, // Should the panel show a close icon
      wordpress: false // If the menu is a WordPress menu
    });
  });
</script>
```

## Using with WordPress
You can use Clear Menu with WordPress in two steps. First by building your menu:
```
<?php
wp_nav_menu( array(
  'theme_location'  => 'your-menu',
  'container'       => 'nav',
  'container_id'    => 'panel',
  'container_class' => 'cm-panel'
) );
?>
```
and second by setting the `{wordpress: true}` option. This tells Clear Menu that it is functioning within WordPress, and thus targets the proper WordPress menu classes.
