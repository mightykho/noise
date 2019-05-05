var page = parseInt(document.body.getAttribute('data-page'));

document.addEventListener('keypress', keyPress);

function keyPress(e) {
  console.log(e.keyCode);
  if (e.keyCode === 110) {
    window.location.replace('/p/' + (page + 1));
  } else if (e.keyCode === 112) {
    window.location.replace('/p/' + (page - 1));
  } else if (e.keyCode === 114 && window.terrain) {
    terrain.regenerate(Math.floor(Math.random() * 10000));
  }
}
