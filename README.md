## Color Builder

A color palette builder app built using react and redux. Allows for a multitude of settings, but most importantly it allows you to create color palettes up to 15 colors (a reasonable limit).

Most palette builders allow for a very small palette (usually 6 colors). There are a lot of use cases where that's not enough colors, such as data visualizations.

### Features

- Set a palette size from 1 to 15 colors
- Set saturation, lightness of the color wheel
- Toggle for a dark mode to better visualize colors on a darker background
- Move color selectors individually, or link them all together 
- Colors are stored as hex color codes
- Click each color block to copy its color
- Press "copy all" to copy the entire list of colors in the palette, with values separated by commas

### Design

 - This color builder manually creates a color wheel with all colors by drawing svg lines around a circle, increasing in hue values.
 - The color selectors are created as SVGs over the canvas, a canvas pixel color query is used to get their color
 - Color selector motion can be either singular or linked
     - In linked motion, the first color selector is used to drag the entire array of color selectors
     - The positions of the selectors are updated according to the new position of the first selector
