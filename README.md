# React HomePage

> About a half year ago I made a homepage for myself into my browser when I used jquery to make it. But since then I learned a lot and now I am mainly using react so I decided to remake it.

## Some sample photos about it:

### First Sample

![sample1](./client/sample_photos/sample1.png)

### Second Sample

![sample1](./client/sample_photos/sample2.png)

### Third Sample

![sample1](./client/sample_photos/sample3.png)

## To Do:

* [x] Change the favorites order by drag-and-drop
* [x] Fix Safari style issuescd 
* [x] Background color changing ( changing the top of linear graditent  RGB with sliders )
* [x] Settings open always at the top of the form
* [ ] Set up local storage
* [ ] Background Image change?
* [ ] Editable favorites?

## Links:

* burger:
   * https://www.npmjs.com/package/@animated-burgers/burger-squeeze
   * https://march08.github.io/animated-burgers/

* calendar component:
   * https://www.npmjs.com/package/react-calendar

* checkbox component:
   * https://www.npmjs.com/package/react-checkbox-component

* favorite order changing by drag-and-drop:
   * https://www.npmjs.com/package/react-dropzone
   * https://blog.logrocket.com/react-drag-and-drop/
   * https://www.youtube.com/watch?v=Vqa9NMzF3wc&ab_channel=LogRocket
   * https://codesandbox.io/s/k260nyxq9v?file=/index.js
   * https://github.com/atlassian/react-beautiful-dnd/issues/128
   * https://github.com/DucktorDanny/react-beautiful-dnd-example

* slider component:
   * https://material-ui.com/components/slider/

* store locally the favorites and settings:
   * https://www.code-boost.com/react-local-storage/

## Local Storage Structure:

```json
{
   "showElements": {
      "calendar": true,
      "favorites": true,
      "greeting": true,
   },
   "greeting": {
      "pronouns": "friend",
      "emoji": "🦆",
   },
   "favorites": [
      0: {
         "name": "Youtube",
         "url": "https://youtube.com",
      },
      1: {
         "name": "Facebook",
         "url": "https://facebook.com",
      },
   ],
   "backgroundColor": {
      "R": 7,
      "G": 55,
      "B": 89,
   }
}
```