const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }

  });

});

const hiddenElements = document.querySelectorAll('.member-card, .card');

hiddenElements.forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});
