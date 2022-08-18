// Show navigation only when header is not visible
// Scrollspy for navigation links

const headerNav = document.querySelector('header .pages')
const nav = document.querySelector('nav')
const sections = document.querySelectorAll('section')
const links = document.querySelectorAll('nav .links a')

// hide navigation settings
let currentVisible = false

// scrollspy settings
const offset = 200
let currentActive = 4 // 4 is no section i.e. header

const hideNavigation = () => {
  let visible = headerNav.getBoundingClientRect().top <= 0
  if (visible != currentVisible) {
    nav.classList.toggle('visible')
    currentVisible = visible
  }
}

const scrollSpy = () => {
  // Based on https://medium.com/p1xts-blog/scrollspy-with-just-javascript-3131c114abdc
  // Some crazy math here because the header is not a section and the first two sections aren't in the navigation
  // subtract 3 to get the correct match to nav menu
  const current = sections.length - [...sections].reverse().findIndex(section => window.scrollY >= section.offsetTop - offset) - 3

  // Don't do anything if current section is the same
  if (current == currentActive) return
  currentActive = current

  // remove all actives if outside range
  if (current < 0 || current >= links.length) {
    links.forEach(link => link.classList.remove('active'))
    return
  }

  links.forEach(link => link.classList.remove('active'))
  links[current].classList.add('active')
}

window.addEventListener('scroll', () => {
  hideNavigation()
  scrollSpy()
})

// make sure nav is visible correctly if page is loaded below
document.addEventListener('DOMContentLoaded', () => {
  hideNavigation()
})
