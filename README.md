# 2022 Yearbook

http://www.bjuvintage.com/2022/

I led a team of five college students to design and develop a companion website based on our school's yearbook.

## Features

- Custom design based on yearbook created using Figma
- Parallax background sections
- EJS and Sass preprocessors
- CSS Grid
- Custom mobile navigation menu
- Pre-rendered pages using custom vanilla JavaScript render pipeline
- AWS Lambda API for search functionality

## Design Process

Our university's yearbook team is comprised of subteams for designing the print book, creating the copy (written text), taking photos, and building the website and portrait pages. At the start of the fall semester, the printed yearbook was designed, and all the photos and text were made. We used the InDesign files that the print designers made as the basis for the web design.

![indesign](https://user-images.githubusercontent.com/17521691/185524202-36c5c93a-0ea8-419a-8c26-02454ba30cb6.png)

Once the book was made, our team set to work designing a website that captured the theme and feel of the book while still being accessible and user friendly in an online setting.

![image](https://user-images.githubusercontent.com/17521691/185521160-b3b388a8-e0ea-4aa0-99e8-73f793c546c7.png)

## Development Process

I started the development based on the last year's website, but made some substantial changes. I realized after creating the 2021 yearbook website that it was challenging for most students to build a website using Pug.js when they were still learning HTMl and CSS. One of the goals of the yearbook team is to allow students to explore passions and creativity, and having a difficult tech stack made it harder for new people to join and contribute to the team.

So at the start of the fall semester, I rebuilt the entire Gulp.js render pipeline that rendered Pug files with JSON to a vanilla ES6 JavaScript pipeline that used EJS.

```javascript
// Located at /scripts/BuildTools.js

renderList(template, json, key, keyname) {
  let data = JSON.parse(fs.readFileSync(json, 'utf8'))
  for (let item of data[key]) {
    ejs.renderFile(template, item, (err, html) => {
      if (err) throw err
      fs.writeFile(`${this.buildDir}/${item[keyname]}.html`, html, err => {
        if (err) throw err
        console.log(`Rendered: ${item[keyname]}`)
      })
    })
  }
}

// Located at /scripts/build.js

function renderGroupDetails() {
  const subgroupDir = `${dataDir}/subgroups`
  const template = `${subgroupsDir}/group-detail.ejs`
  const key = 'subgroups'
  const keyname = 'name'
  fs.readdir(subgroupDir, (err, files) => {
    if (err) throw err
    for (let file of files) {
      let filepath = `${subgroupDir}/${file}`
      builder.renderList(template, filepath, key, keyname)
    }
  })
}
```

With this change, anyone on the team could write normal HTML in EJS and not worry about learning templating preprocessors and a whole new syntax while still being new to HTMl.

Once the design was complete, I started creating the main content and assigning sections to other people on the team.

Once all the main pages were done, I updated our search API on AWS from the last several years to work with this years website, and built some simple JavaScript using `fetch()` and the DOM to pull in the data on the website.

```javascript
// Located at /src/js/search.js

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

function displayPeople(results) {
  // ...
  let nodes = results.map(result => {
    let person = document.createElement('div')
    person.classList.add('person')
    let img = document.createElement('img')
    person.appendChild(img)
    // ...
    return person
  })
  output.append(...nodes)
}
```

Once most of the code was working, I added some extra media queries and javascript to make sure everything looked just as good on mobile as on desktop.

## Things I Learned

- My biggest takeaway from this project was time management. I had to complete this entire project during my senior year in addition to all of my senior projects and papers. Because I was the leader of the team, I didn't have anyone telling me when to get something done, so I had to set deadlines for myself and the entire team to make sure we got everything done before the end of the year when the book went live.
- The second big takeaway from this project was more experience using Sass. I had been using CSS for several years by this time, but I knew that for large projects like this that are worked on by several people it is essential to have a well organized system for all of the styles.
- A final takeaway from this project was the importance of teamwork and good leadership. I had the most web development experience of anyone on the team, and had recently been working on my web design skills. It was extremely tempting to try to build and design everything myself, because I knew that it would be done exactly how I wanted it to be. As mentioned in the first takeaway though, I was very limited on time during this senior year. I learned that an effective leader doesn't do all of the work. Even though I could build the site better and faster than other people on the team, it was important that I delegeated tasks to others to lighten my workload and give others on the team an opportunity to learn and improve their skills.

## Installing

You will need Node.js installed to build the project. After cloning the project, install dependencies:

```
npm install
```

Run the render pipeline using:

```
npm run build
```

Run a local server:

```
npm run server
```

**Note:** Search functionality will not work on a local server as it does not have access to the AWS backend.
