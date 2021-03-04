# React HomePage

> About a half year ago I made a homepage for myself into my browser when I used jquery to make it. But since then I learned a lot and now I am mainly using react so I decided to remake it. And now I learned about browser extension a lot so I am gonna use it as well.

## Samples, description and usage:

https://ducktor-homepage.vercel.app

## To Do:

* I moved my 'To Do' to trello.com

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

* textfield:
   * https://material-ui.com/components/text-fields/#textfield

* button:
   * https://material-ui.com/components/buttons/#button

* slider component:
   * https://material-ui.com/components/slider/

* store locally the favorites and settings:
   * https://www.code-boost.com/react-local-storage/

* React Notifications Component:
   * https://teodosii.github.io/react-notifications-component/
   * https://www.digitalocean.com/community/tutorials/react-react-notifications-component

* override homepage:
   * https://forums.opera.com/topic/20490/using-chrome_url_overrides-for-extension/4

* Used icons:
   * Close icon 1: https://iconmonstr.com/x-mark-8-svg/
   * Close icon 2: https://iconmonstr.com/x-mark-11-svg/
   * Edit icon: https://iconmonstr.com/pencil-15-svg/

* For later:
   * For scrollDrag in favorites: https://medium.com/@eymaslive/scrolling-by-dragging-react-js-reusable-component-2b79e936b41c
   * For Calendar events it might need: https://www.npmjs.com/package/react-calendar

## Local Storage Structure:

### Datas

JSON:
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
   "favoritesArray": [
      {
         "name": "Youtube",
         "url": "https://youtube.com",
      },
      {
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

JavaScript Object:
```js
const data = {
   showElements: {
      calendar: true,
      favorites: true,
      greeting: true,
   },
   greeting: {
      pronouns: 'friend',
      emoji: '🦆',
   },
   favoritesArray: [
      {
         name: 'Youtube',
         url: 'https://youtube.com',
      },
      {
         name: 'Facebook',
         url: 'https://facebook.com'
      },
   ],
   backgroundColor: {
      R: 7,
      G: 55,
      B: 89,
   }
}
```

### Events

JSON:
```json
{
   "27/02/2021": [
      {
         "title": "Something",
         "content": "It is a content for something..."
      },
      {
         "title": "Something1",
         "content": "It is a content for something1..."
      },
      {
         "title": "Something2",
         "content": "It is a content for something2..."
      }
   ],
   "26/02/2021": [
      {
         "title": "Nothing",
         "content": "It is a content for nothing..."
      },
      {
         "title": "Nothing1",
         "content": "It is a content for nothing1..."
      },
      {
         "title": "Nothing2",
         "content": "It is a content for nothing2..."
      }
   ]
}
```

JavaScript Object:
```js
const events = [
   '27/02/2021': [
      {
         title: 'Something',
         content: 'It is a content for something...',
      },
      {
         title: 'Something1',
         content: 'It is a content for something1...',
      },
      {
         title: 'Something2',
         content: 'It is a content for something2...',
      },
   ],
   '26/02/2021': [
      {
         title: 'Nothing',
         content: 'It is a content for nothing...',
      },
      {
         content: 'It is a content for nothing1...',
         title: 'Nothing1',
      },
      {
         title: 'Nothing2',
         content: 'It is a content for nothing2...',
      },
   ]
]
```