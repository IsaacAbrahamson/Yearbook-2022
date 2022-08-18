document.addEventListener('DOMContentLoaded', () => {
  document.querySelector("a[href='search.html']").classList.add('active')

  // Display empty search results on page load
  displayPeople([])
})

// Handle Form Submit
const form = document.getElementById('form')
form.onsubmit = e => {
  let query = form.elements['search'].value
  search(query)
  form.elements['search'].value = ''
  e.preventDefault()
}

// Takes a parent and kills all the kids
function genocide(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

// URL returned in API is wrong. Remove first part of link and extension then rebuild url to image
function getImgURL(image) {
  let newImg = image.replace('/portraits/', '').replace('.tif', '.jpg')
  let newUrl = `http://www.bjuvintage.com/portraits/2022/${newImg}`
  return newUrl
}

// Outputs search results
// Accepts an array of results
function displayPeople(results) {
  // DOM node to put elements in
  output = document.getElementById('people')

  // Clear previous results
  genocide(output)

  // Map each result object into an HTML node
  // results can be undefined (invalid api call) or empty (no search results)
  // In those cases output an error string
  if (!results || results.length < 1) {
    let p = document.createElement('p')
    p.innerText = 'No results...'
    output.append(p)
  }

  /*  For every object in results map it to a DOM node
   *  HTML Structure:
   *
   *  <div class="person">
   *    <img src="https://image.source.com" />
   *    <h4>Name</h4>
   *    <p>Major</p>
   *    <p>Classification</p>
   *  </div>
   */
  let nodes = results.map(result => {
    // Create .person
    let person = document.createElement('div')
    person.classList.add('person')

    // Create image
    // Use blank image if none exist
    let img = document.createElement('img')
    if (result.image) {
      img.src = getImgURL(result.image)
      img.className = 'img-full'
    } else {
      img.src = 'http://www.bjuvintage.com/2020/static/img/notPictured_portrait.png'
    }
    person.appendChild(img)

    // Create name
    let name = document.createElement('h4')
    name.textContent += result.name
    person.appendChild(name)

    // Create major
    let major = document.createElement('p')
    major.textContent += result.major
    person.appendChild(major)

    // Create classification
    let classification = document.createElement('p')
    classification.textContent += result.classification
    person.appendChild(classification)

    // Add person to results output
    return person
  })
  output.append(...nodes)
}

async function search(query) {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({year: 2022, query})
  }

  try {
    let response = await fetch('https://5tlzzz9460.execute-api.us-east-2.amazonaws.com/default/search-v2', options)
    let results = await response.json()
    displayPeople(results.people)
  } catch (e) {
    console.log(e.message)
  }
}
