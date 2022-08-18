document.addEventListener('DOMContentLoaded', () => {
  document.querySelector("a[href='groups.html']").classList.add('active')

  // initialize masonry layout after all images loaded
  imagesLoaded(document.querySelector('.masonry'), function () {
    console.log('all images are loaded')
    var elem = document.querySelector('.masonry')
    var msnry = new Masonry(elem, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-sizer',
      percentPosition: true,
      gutter: 30
    })
  })
})
