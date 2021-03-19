# Wind Compass

<img src="https://i.imgur.com/TqxOxXV.png" width="700">

Pick date period & see what was the wind like during that time.

<img src="https://i.imgur.com/vfykb0b.png" width="700">

The wind compass shows wind speed, direction & date.

Also, it's arrow shows from what direction was the wind blowing.

It is possible to play the animation at 3 speeds & pause it.

<img src="https://i.imgur.com/JVw0XOa.png" width="700">

In the end it is possible to replay the animation or return to previous screen.

### Technologies used
* HTML & CSS

* Tailwind microframework for CSS

* Vue.js

### Project setup

This wind compass fetches data from the 30MHz's (30mhz.com) ZENSIE data platform.

Thus, it fetches data from a specific wind sensor.

Furthermore, for project to work an API key from the platform is required.

#### 1. Within .env file at the root folder populate "VUE_APP_30MHZ_API_KEY" with the API key

```
VUE_APP_30MHZ_API_KEY=123asd123asd123asd123asd123asd123asd123asd123asd
```

#### 2. Install dependencies
```
yarn install
```

#### 3. Run the app
```
yarn serve
```

#### 4. Access the app
```
http://localhost:8080/
```

