# 2022 Yearbook

http://www.bjuvintage.com/2022/

I led a team of five college students to design and develop a companion website based on our school's yearbook.

## Features

- Custom design based on yearbook created using Figma
- Parallax background sections
- EJS and Sass preprocessors
- CSS Grid
- Built mobile navigation menu
- Pre-rendered pages using custom vanilla JavaScript render pipeline
- AWS Lambda API for search functionality

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

**Note:** Some functionality will not work on a local server as it does not have access to AWS backend.