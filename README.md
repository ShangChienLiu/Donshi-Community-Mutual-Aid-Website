# Donshi Community Mutual Aid Website

## Key Features of the Website

1. **Login and Registration Page**  
   ![Login and Registration Page Image Placeholder](#)

2. **Personal Profile Page**  
   ![Personal Profile Page Image Placeholder](#)

3. **Map Display**  
   ![Map Display Image Placeholder](#)

4. **Comments and Replies**  
   ![Comments and Replies Image Placeholder](#)

5. **Post Publication**  
   ![Post Publication Image Placeholder](#)

6. **Complete Post View**  
   ![Complete Post View Image Placeholder](#)

7. **Navigation Bar**  
   ![Navigation Bar Image Placeholder](#)

### Universal Version for Android and IOS:
1. **Information**  
   ![Information Section Image Placeholder](#)

2. **Needs**  
   ![Needs Section Image Placeholder](#)

3. **Navigation Bar**  
   ![Navigation Bar Image Placeholder](#)

4. **Personal Interface**  
   ![Personal Interface Image Placeholder](#)

5. **Map**  
   ![Map Image Placeholder](#)

---

## Step 1: Create GitHub Repository

### Using GitKraken
Initialize GitHub repository

### Using GitHub
Create a new repository

---

## Step 2: Create Project

### Create the Folder
Web: Front-end Web Design
Purpose: Pages accessible by browsers, for mobile or desktop
Preparatory Steps:
- npx create-react-app {project-name}
- npm install -save react-router react-router-dom sass sass-loader
- Create folder 'assets' and under 'assets' create:
  - image
  - scss
- Create 'components', 'pages'

---

## Step 3: Upload to GitHub

### Build the Project
- Add "homepage": "./" to package.json
- Run 'npm run build' for the page to be uploaded
- Place the built files into the newly created repository
- Execute:
git add .
git commit -m "first commit"
git remote add origin https://github.com/john87413/{project-name}.git
git push -u origin master


### Set Up GitHub Pages

---

## Step 4: Front-end Tool Styles

### Using sass-loader
- Create a SCSS folder with style.scss and _variables.scss
- To use any variable:
@import '../../assets/scss/variables.scss';
- In main.js, import style.scss:
import "./assets/scss/style.scss"
- Remember to add dots for each style!

### Style Reset
- @import "./variables";
- All elements (*):
- Add 'border-box'
- Remove highlight (outline)
- HTML definition:
- Determine the most frequently used font size
- Body definition:
- Set margin to 0
- Set line height
- Set common fonts
- Optionally set background (as per design)
- a definition:
- Change default color
- Set text-decoration to none (optional)
- li definition:
- Remove default list-style-type
- Optionally set float: left
- Optionally set cursor: pointer
- button definition:
- Remove default box
- Optionally set border-radius: 0.5rem;

### Define Common flex Tools
- Define display
- Define direction
- Define flex-grow
- Define variables jc & ai
- Use each to process variables

### Define Common margin & padding
- Define variables type, direction, size, base-size
- Define size as 0.5 increments or larger
- Use each to define .m-1, .mx-1, .mt-1

### Define Common Color
- Define common colors
- Use each to process variables

### Define Common font size & text align
- Define common font sizes
- Use each to process variables
- Process text alignment (left, right, center)

### Define Additional Common Styles
- Width and height 100%
- Flex wrap option
- Font boldness

---

## Step 5: Distribute Router

### Create Pages
1. In the 'pages' directory, create pages and write basic HTML:
 - map.js
 - login.js
 - home.js
 - info.js
 - need.js
 - setting.js
 - profile.js

2. In App.js, distribute the main routes:
 ```javascript
 import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
 } from "react-router-dom";

 <Router>
   <div className="app">
     <Switch>
       <Route path="/home" component={Home}></Route>
       <Route path="/login" component={Login}></Route>
       <Route path="/map" component={Map}></Route>
       <Route path="/" render={() => <Redirect to="/home" />}></Route>
       <Route component={() => 404} />
     </Switch>
   </div>
 </Router>;
In home.js, distribute nested routes:
import { Switch, Route, Redirect } from "react-router-dom";

<div className="home">
  <h1>Home Page</h1>
  <Switch>
    <Route path="/home/info" component={Info}></Route>
    <Route path="/home/Need" component={Need}></Route>
    <Route path="/home/profile" component={Profile}></Route>
    <Route path="/home/setting" component={Setting}></Route>
    <Route path="/home" render={() => <Redirect to="/home/info" />}></Route>
  </Switch>
</div>;



