# Webpack Static Application Example

The whole purpose of this example is to get working Basic Primitives diagram control inside regular web application in the shortest number of steps. See [How to Bundle a Simple Static Site Using Webpack posted by James Hibbard](https://www.sitepoint.com/bundle-static-site-webpack/), it contains detailed explanation about Webpack configuration used here:


### Create new empty folder first

```shell
mkdir test1

cd test1
```

### Create [npm](https://www.npmjs.com/get-npm) package.json having following configuration

```javaScript
{
  "name": "javascript",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "basicprimitives": "^6.1.0"
  },
  "devDependencies": {
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "babel-loader": "^8.2.2",
    "css-loader": "^5.0.1",
    "html-webpack-plugin": "^4.5.0",
    "mini-css-extract-plugin": "^1.3.3",
    "style-loader": "^2.0.0",
    "url-loader": "^4.1.1",
    "webpack": "^5.11.0",
    "webpack-cli": "^4.2.0",
    "webpack-dev-server": "^3.11.0"
  },
  "description": ""
}
```

Download packages

```shell
npm update
```

You should see `package-lock.json` and `node_modules` folder created

```shell
  node_modules
  package.json
  package-lock.json
```

### Add javascript sources

``` shell
mkdir src
```

Add following `index.js` into `src` folder

```JavaScript
import { OrgConfig, OrgItemConfig, Enabled, OrgDiagram } from 'basicprimitives';
import('basicprimitives/css/primitives.css');

var photos = {
  a: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA8CAIAAACrV36WAAAAAXNSR0IArs4c6QAAAARn' + 
  'QU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGnSURBVGhD7dnBbQJBDAVQk1o2QjlQwKYGzpSwKQfq4IxIC' + 
  'RTB9jLZHCJFwWv7/7EiDt6zmX2yPYMHNq01eb7n5flI36JiIXWpbFW2kAwgsdVblS0kA0hs9db/ZWs+vW/Wno9PxPE3dh' + 
  'ls6Od+HI1XT1d64Sb8R5utEulwdbA8VY+LZ/kqkfF456pBHxDz5Xxze/p2vsxukBbAshTVOE0PO4B2cUlWKrgUTKsrV0e' + 
  'ut3RVU/cm5aKKqPXVbjuIDPtDUh2JImq1+jmjkupIFNFStXadHncWXkecpb3393me4oJZnionXyjLV6W4QFZEleHCWNG+' + 
  '0eKggQJiRVV6vhAXwoqrul0AC1H1uuIsTLUyukYH1jBL7WJ8lgq6oqwkVXSQDrLSVEFXjJWoirlCrFRVyBVhJasirgCr6' + 
  '5tEv7a5A5jL0tcN7vNl9OVcHqtXRbocVr+Kc9k3H/3qPL69Ise7dh0SsS+2JmtFddgvdy/gGbY7Jdp2GRcyrlu1BfUjxt' + 
  'iPRm/lqVbGHOMHnU39zQm0I/UbBLA+GVosJHGVrcoWkgEktnoLydYXkF/LiXG21MwAAAAASUVORK5CYII='
};

var control;
var timer = null;

document.addEventListener('DOMContentLoaded', function () {
    var options = new OrgConfig();

    var items = [
        new OrgItemConfig({
            id: 0,
            parent: null,
            title: "James Smith",
            description: "VP, Public Sector",
            image: photos.a
        }),
        new OrgItemConfig({
            id: 1,
            parent: 0,
            title: "Ted Lucas",
            description: "VP, Human Resources",
            image: photos.a
        }),
        new OrgItemConfig({
            id: 2,
            parent: 0,
            title: "Fritz Stuger",
            description: "Business Solutions, US",
            image: photos.a
        })
    ];

    options.items = items;
    options.cursorItem = 0;
    options.hasSelectorCheckbox = Enabled.True;

    control = OrgDiagram(document.getElementById("basicdiagram"), options);
});
```

### Add `webpack` configuration

Create `webpack.config.js`

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
	path: `${__dirname}/dist`,
	filename: 'bundle.js',
  },
  devServer: {
    port: 8080
  },
  plugins: [
	 new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
      },
      {
        test: /\.(svg|gif|png|eot|woff|ttf)$/,
        use: [
          'url-loader',
        ],
      },
    ]
  },
};
```

You should have tte following folders structure

```shell
  node_modules
    ...
  src
    index.js
  package.json
  package-lock.json
  webpack.config.js
```

### Now we build 

```shell
webpack
```

You should get packed files in `dist` folder:
``` shell
  dist
    bundle.js
    344.css
    344.bundle.js
```

### Add index.html

As a matter of fact, it does not matter whether you add index.html before build or after, 
but the main point is that `index.html` has reference to packed `bundle.js`

```JavaScript
<!DOCTYPE html> 
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<title>First organization diagram</title>
	<script type="text/javascript" src="/dist/bundle.js"></script>
</head>
<body>
	<div id="basicdiagram" style="width: 640px; height: 480px; border-style: dotted; border-width: 1px;"></div>
</body>
</html>
```

### Serve the project

```shell
test1>webpack serve
... Project is running at http://localhost:8080/
...
```

### Open browser at `http://localhost:8080/` and you should see your first diagram.
For more details see above mentioned blog post.
