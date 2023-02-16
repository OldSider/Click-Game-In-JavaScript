let log = new Log(document.querySelector(".log"));

var char = new Knight("OldSider");
let monster = new BigMonster();

const stage = new Stage(
  char,
  monster,
  document.querySelector("#char"),
  document.querySelector("#monster"),
  log
);

stage.start();

