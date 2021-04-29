//contains materialize css initialization
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    var instance = M.Collapsible.init(items);

    var elems = document.querySelectorAll('.pushpin');
    var instances = M.Pushpin.init(elems);
  
  });