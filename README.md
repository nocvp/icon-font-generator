# Icon Font Generator

Generate icon font from SVG files.

## Usage

```
$ npm install gulp gulp-util -g // only if you don't already have gulp installed
$ npm install
$ gulp
```

## Making changes to the font

To make changes to the font, simply edit the `icons.json` file.

```json
{
  "font-name": "icon-font",
  "class-name": "icon",
  "icons": [{
    "name": "home",
    "svg": "node_modules/material-design-icons/action/svg/production/ic_home_24px.svg"
  }]
}
```

Once you're done, simply run `gulp` again to regenerate the fonts and css.
