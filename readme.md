# Clear Menu
A simple mobile menu that is easy to integrate into a new or existing project. Clear Menu is actually two separate components acting as one; a panel that is revealed into the viewport, and a mobile menu.

This is a developer focused plug-in. It is not meant to solve all navigation patterns but instead provide a base for you to build upon. The `scss` is just enough to make all the components work properly, but it is expected that you will hack it to fit the design of your specific project.

## Getting Started
Include `clearmenu.scss` and `clearmenu.js` into your build process and compile. These files are left unprocessed/unoptimized on purpose. ***NOTE: jQuery 2.x or higher is a required dependency***

## Usage
The markup for Clear Menu is minimal, and composed of three primary components:

### The Panel
The panel is just a container for whatever content you want to be revealed. This will most commonly be a `<div>`, `<section>`, or `<nav>`. ***The only mandatory attribute is a class of `cm-panel`.***
```
<div class="cm-panel">
  <!-- code -->
</div>
```

### The Menu
The menu is just a standard `<ul>`. ***It is mandatory for the menu to have a class of `.cm-menu`.***
```
<nav id="panel" class="cm-panel">
  <ul class="cm-menu">
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
The trigger is whatever element you want to trigger the panel to be revealed when clicked. Anything can be a trigger, but most commonly this will be an `<a>` or `<button>`.

If using the trigger as a navigational button, you have a few options:
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
<a class="cm-button">
  <span class="cm-button_text">Menu</span>
  <span class="cm-button_icon"></span>
</a>
```

### Calling with jQuery
Call Clear Menu inline or within an external JS file:
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
      panel: this, // the element to act as the panel
      trigger: '.cm-button', // the element that will trigger the selected panel when clicked
      reveal: 'top', // the reveal animation. Can be fade, top, bottom, left, or right.
      hasSubMenu: true, // if the menu should provide functionality for sub-menus or not
      subMenu: '.cm-submenu', // the class or ID of the sub-menu
      speed: 200, // panel animation speed
      close: false, // show a close button in the panel
      wordpress: false // if this panel is being used in a WordPress theme. When true, the default WordPress menu classes will automatically be used
    });
  });
</script>
```

## Using with WordPress
You can use Clear Menu with WordPress in two steps.

First build your menu:
```
<?php
wp_nav_menu([
  'theme_location'  => 'your-menu',
  'container_class' => 'cm-panel',
  'menu_class'      => 'cm-menu menu'
]);
?>
```
Then set the `{wordpress: true}` option. This tells Clear Menu that it is functioning within WordPress, and thus targets the proper WordPress menu classes for functionality.
```
<script>
  $(function() {
    $('.cm-panel').clearmenu({
      wordpress: true
    });
  });
</script>
```
