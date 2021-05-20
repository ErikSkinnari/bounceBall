var s = document.createElement('script');
// s.src = "script.js";
s.innerHTML = "document.addEventListener('keydown', function(event) {" +
    "if (event.keyCode == 81) {  /* Q */" +
        "z.vv = z.vv == 0 ? 5 : 0; " +
    "}" +
    "else if (event.keyCode == 69) { /* E */" +
        "z.sv = z.sv == 0 ? 5 : 0;" +
    "}" +
    "else if (event.keyCode == 32) { /* Space */" +
        "z.sv = 0;" +
        "z.vv = 0;" +
    "}" +
    "else if (event.keyCode == 87) { /* W */" +
        "Score += 10;" +
        "ph = Score / 10;" +
    "}" +
    "else if (event.keyCode == 72) { /* H */ " +
        "localStorage.HighScore = 0;" +
    "}" +
    "else if (event.keyCode == 83) { /* S */" +
        "z.y += 1;" +
    "}" +
    "else if (event.keyCode == 80) { /* P */" +
        "f = Score;" +
        "h();" +
    "}" +
"});";
// window.alert(1);
(document.head || document.documentElement).appendChild(s);

// function f() {
//     document.addEventListener("keydown", function(event) {
//         if (event.keyCode == 87) {
//             ball.velY = ball.velY == 0 ? 5 : 0; 
//         }
//         else if (event.keyCode == 83) {
//             ball.velX = ball.velX == 0 ? 5 : 0; 
//         }
//         else if (event.keyCode == 32) {
//             ball.velX = 0;
//             ball.velY = 0;
//         }
//     });
// }