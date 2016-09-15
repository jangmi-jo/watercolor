# WaterColor

[WaterColor live][https://evdel720.github.io/watercolor]

  WaterColor is a front-end web application. It is implemented with vanilla JavaScript and HTML Canvas and CSS, JavaScript Color Picker library for getting user's color input.

## Instruction
  User can draw picture on canvas with custom color and size. User can clear the canvas and change background texture.

### Water Color mode
  In water color mode, the mouse click/drag causes gradation effect on the mouse pointed spots.

### Brush mode
  In brush mode, the mouse click/drag makes a dot/line on the spot it pointed.

## Features & Implementation

### Custom Splash Effect
  ![alt tag](http://res.cloudinary.com/wkdal720/image/upload/v1473897637/splash_cifrdc.jpg)

  To demonstrate how to use the app, I implemented preloaded example splash page which shows the water color effect in real time.
  For getting the mouse move input, make temporary recorded points array property and kept it in separate file.

### Custom Color Gradation
  To develop color gradation effect, I get the RGB from the selected color and the size desired. Then calculate the each r, g, b number's gap that has to be added each distance. The last color of any gradation will be white which is [255, 255, 255].
  ```JavaScript
    this.colorGap = this.color.map(c => this.colorGapGenerator(c));

    colorGapGenerator(c) {
      return (255 - c) / this.size;
    }
  ```
  Then each one pixel process, I added the gap gradually to the current color.
  ```JavaScript
    this.color = this.color.map((c, i) => c + this.colorGap[i]);
  ```
  It does the opposite when it's night background. (The color gap goes toward the black[0, 0, 0] and instead of adding gap, subtracting the gap.)

### Breadth-First algorithm
  To generate water color effect, I used Breadth-First algorithm. When user click/drag a certain pixel, it starts from that pixel and stores its neighbors in its next possible pixel segments. It picks next pixel randomly in that segments to make natural water color effect, colors the spot with gradient color and stores its neighbors in segments.
  To optimize this process, I kept one object for the pixels in canvas, index as a key and boolean as value.

### Mode changing
  Changing the mode of the app, I kept a mode property. To prevent redundant event listeners, I made three main event listeners on canvas and gave them different behaviors depends on the mode.

## Future Directions for the Project

### Backing feature
  User can undo what they did last with back button.

### Color merging
  When user put another color on top of other water color effect, it merges the original color and the new color like real color.

### Save feature
  User can save the canvas in their hard drive.
