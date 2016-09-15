# WaterColor

[WaterColor live][https://evdel720.github.io/watercolor]

  WaterColor is a front-end web application. It is implemented with vanilla JavaScript, HTML Canvas, CSS, and the JavaScript Color Picker library for getting the user's color input.

## Instructions
  Users can draw pictures on the canvas with custom colors and sizes. Users can clear the canvas and change the background texture.

### Water Color mode
  In water color mode, the mouse click/drag causes a gradation effect.

### Brush mode
  In brush mode, the mouse click/drag makes a dot/line.

## Features & Implementation

### Custom Splash Effect
  ![alt tag](https://res.cloudinary.com/wkdal720/image/upload/v1473966294/watercolor1_ylosue.gif)

  To demonstrate how to use the app, I implemented a preloaded example splash page which shows the water color effect in real time.

### Custom Color Gradation
  To develop color gradation effect, I get the RGB from the selected color and the size desired, then calculate the gap that has to be added to each of the r, g, b values. The last color of any gradation will be white which is [255, 255, 255].
  ```JavaScript
    this.colorGap = this.color.map(c => this.colorGapGenerator(c));

    colorGapGenerator(c) {
      return (255 - c) / this.size;
    }
  ```
  For each pixel, I add the gap gradually to the current color.
  ```JavaScript
    this.color = this.color.map((c, i) => c + this.colorGap[i]);
  ```
  It does the opposite for the night background. (The color gap goes toward black[0, 0, 0] and instead of adding the gap, it subtracts the gap.)

### Breadth-First algorithm
  To generate a water color effect, I used a Breadth-First algorithm. When users click/drag a certain pixel, it starts from that pixel and stores its neighbors in its next possible pixel segments. It picks the next pixel randomly from those segments. To make a natural water color effect, it colors the spot with gradient color and stores its neighbors in segments.
  To optimize this process, I kept one object for all the pixels in canvas, with integer index as a key and boolean as value.

### Mode changing
  Changing the mode of the app, I kept a mode property. To prevent redundant event listeners, I made three main event listeners on canvas and gave them different behaviors depending on the mode.

## Future Directions for the Project

### Undo feature
  User can undo what they did last with undo button.

### Color merging
  When user put another color on top of other water color effect, it merges the original color and the new color like real colors.

### Save feature
  User can save the canvas to their hard drive.
