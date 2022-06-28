#  Appeon 服务监控项目
 
### Getting Started
To get started, clone this repository from GitHub and install the dependencies with npm or yarn.
                
```
npm install
```

or

```
yarn
```

Next step is running the application using the serve script and navigate to **http://localhost:8080/** to view the application.

```
npm run serve
```

### Vue CLI Scripts
Following commands are derived from create-app-app.
```
"npm run serve": Starts the development server
"npm run build": Builds the application for deployment.
"npm run lint": Executes the lint checks.
"npm run test:unit": Runs the tests.
```

### Structure

### Layout Components
Main layout is the template of the **App.vue**, it is divided into a couple of child components such as topbar, menu and footer. Here is template of the
**App.vue** component that implements the logic such as menu state, layout modes and so on.

### Menu
Menu is a separate component defined in **AppMenu.vue** file based on PrimeVue MenuModel API. In order to define the menuitems,
navigate to data section of **App.vue** file and define your own model as a nested structure using the **menu** property.



