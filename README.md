# Vintage 2022

## 1. Getting Started

### A. Installing Dependencies

Install Node.js and NPM https://nodejs.org/en/

Clone repository to local computer

```
git clone https://github.com/BJUVintage/vintage2022.git
```

Enter repository and install dependencies

```
cd ./vintage2022
npm install
```

### B. Configuring Environment

Download [VSCode](https://code.visualstudio.com/).

Install [EJS extension](https://marketplace.visualstudio.com/items?itemName=DigitalBrainstem.javascript-ejs-support).

Install [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

## 2. Building Website

Build website everytime you make changes and want to test. This will compile the EJS and Sass files to HTML and CSS.

```
npm run build
```

Launch the local web server. I recommend doing this in a separate terminal so it runs in background.

```
npm run server
```

Now you just need to rebuild and refresh your browser everytime you make changes.

## 3. Contributing

Please make a separate branch for all of your individual work. Make a pull request when you are satisfied to merge your changes into main.
