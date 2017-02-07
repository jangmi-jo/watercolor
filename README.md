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
  ![watercolor_gif](https://res.cloudinary.com/wkdal720/image/upload/v1479779953/imageedit_6_4672038611_shbvrs.gif)

  To demonstrate how to use the app, I implemented a preloaded example splash page which shows the water color effect in real time. I recorded my mouse moves and triggered mouse drag event on the points. To setup the example, I utilized a JavaScript Generator function to get the points for the interval.

### Custom Color Gradation
  To develop the color gradation effect, I got the RGB from the selected color and the size desired, then calculated the gap that has to be added to each of the r, g, b values. The last color of any gradation will be white which is [255, 255, 255]. (When it is night mode, it goes toward [0, 0, 0])

  ```JavaScript
    this.colorGap = this.color.map(c => (255 - c) / this.size);
  ```

  For each pixel, I added the gap gradually to the current color.

  ```JavaScript
    this.color = this.color.map((c, i) => c + this.colorGap[i]);
  ```

### Breadth-First algorithm
  To generate a water color effect, I used a Breadth-First algorithm. When users click/drag a certain pixel, it starts from that pixel and stores its neighbors in its next possible (in bounds, not colored, not in segments already) pixel segments. It picks the next pixel randomly from those segments.
  I implemented a new data structure, Store, for the random segments to make this algorithm faster. I used two Maps to keep the index and value (to resemble the Array) and when I want to pop a random segment from it, it chooses a random index, pops it, and updates the two maps to make all the index and value map to each other as it was before. With this store, insert/popRandom/has functions all run in O(1) time so the total process gets significantly faster. (Before this, it had to check if this segment is already in candidates or not so it took for each time, O(n))
  To make a natural water color effect, it colors the spot with gradient color and insert its neighbors in segments.
  To optimize this process, I kept one array of booleans for all the pixels in the canvas.

### Mode changing
  Changing the mode of the app, I kept a mode property. To prevent redundant event listeners, I made three main event listeners on canvas and gave them different behaviors depending on the mode.

### Download picture
  To save the file in local computer, I converted the canvas to png data and set the data url as a href to the download link at the client side.

## Future Directions for the Project

### Undo feature
  User can undo what they did last with undo button.

### Color merging
  When user put another color on top of other water color effect, it merges the original color and the new color like real colors.
