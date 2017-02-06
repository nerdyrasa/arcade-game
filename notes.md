frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

1. Implement Player class using OO Javascript

2. Implement Enemy class using OO JS.


**** Enemy ******
Enemy function, (the constructor?) initiates the Enemy by
1. Load image.
2. Set the enemy initial location.
3. Set enemy speed

Enemy update method
1. Update the location
2. Handle collisions with player.

Other methods as needed...

***** Player *******


Review the engine.

Engine creates the canvas. This is done after app.js. So how do I get the graphic of on to the canvas since the canvas 
is being created after I instantiate my enemies and my player.

When do I call render?

*********

window.onload = function() {
    animate(canvas, ctx);
}

// one function call is one frame

function animate(canvas, ctx) {
// Set my center.
// Change the angle per frame.
// Create x, y coord on the cirum of circle with _radiums.
// Clear context.
// ctx.clearRect(0,0,canvas.width, canvas.height);
// Set line color and alpha level.
// Draw line.
// Request new frame
window.requestAnimationFrame(function() {
    animate(canvase, ctx); 
});
}


***** Webcast summaries ******
https://discussions.udacity.com/t/webcasts-summaries/22538/15

[OO JS Notes](https://docs.google.com/document/d/1F9DY2TtWbI29KSEIot1WXRqqao7OCd7OOC2W3oubSmc/pub?embedded=true)