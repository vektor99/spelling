ScrollReveal().reveal('#game_name', {
    duration: 2000, origin: "right", distance: "80px"
  });
  let delay = 400;
  var tiles = document.querySelectorAll(`[id="tiles"]`);
  for (let i = 0; i < tiles.length; i++) {
    let className = "." + tiles[i].classList[1];
    if (parseInt(tiles[i].classList[1][5] % 2) == 0) {
      ScrollReveal().reveal(className, {
        origin: "right", distance: "200px", delay: delay
      });
    } else {
      ScrollReveal().reveal(className, {
        origin: "left", distance: "200px", delay: delay
      });
    }
    delay += 300;
  }
  ScrollReveal().reveal('#footer', {
    duration: 2000, origin: "left", delay: 2600, distance: "80px"
  });