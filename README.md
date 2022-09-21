# Take-home challenge instructions

### Aim of this challenge:

- Develop a simple web app using  React & TypeScript 
- You have full freedom over the styling of your app and while this is not as important to your overall score as functionality and code conventions we would expect your app to be responsive and follow best CSS practices (e.g. BEM naming conventions)
- App.tsx currently imports dummy json data - you **MUST** use data returned from an api call in your final submission, rather than this data.

### Running the app

To fire up the project run `npm install` and then `npm run start` in the root directory


  #### Senior Developer
  - Create at least two separate pages:
    - Home page with ~10 items displayed
    - Individual page to show info on each item, accessed by clicking on an item on the home page
  - Use of at least 3 separate front-end components to display data (you may edit and use the existing `Card` component but `App` does not count 😉 )
  - Integrate with one of the APIs listed below to retrieve data using an authenticated GET request (any method of implementation is allowed)
    - https://developers.themoviedb.org/3/getting-started/authentication
    - https://developer.spotify.com/documentation/web-api/
    - https://developers.gettyimages.com/docs/
  - Include a search component using queries to filter results
  - Create re-usable types and interfaces and import as appropriate
  - Apply atomic design priniciples to the app structure
  - Setup linting config and apply to your repo
  - Implement performant code and comment to show where you have made improvements or tested your output
  - Keep the size of your built repo as small as possible
  - Push to a repo on github/gitlab with properly labelled commits