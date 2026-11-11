# Employee Management Portal — Angular 14 baseline

A medium-sized Angular sample application intended as a baseline for testing an
Angular 14 → Angular 18 version-upgrade pipeline.

## Technology baseline
- Angular 14.2
- Angular CLI 14.2
- TypeScript 4.7
- Angular Material 14.2
- RxJS 7.5
- Reactive Forms, feature modules, lazy-loaded routing, guards and HTTP interceptor

## Requirements
Use Node.js 16.10–16.x and npm 8 for the most predictable Angular 14 setup.
Newer Node/npm versions may work, but are not the baseline used for this legacy project.

## Run locally
1. Extract the ZIP.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm start`.
5. Open `http://localhost:4200`.

The app uses browser localStorage as a mock data store. It does not require a Java
backend, database, API server or ORM. Use the demo login credentials:
- Email: `admin@example.com`
- Password: `password123`

## Included functionality
- Login/logout with a route guard
- Dashboard with summary cards
- Employee directory with search and department filter
- Employee create/edit form with reactive validation
- Department list
- Leave requests with approve/reject actions
- Shared data service, RxJS observables and HTTP interceptor
- Lazy-loaded feature modules
- Unit-test examples

## Upgrade test recommendation
Keep this source folder unchanged as your baseline. Point your tool at this project
and configure:
- Intent: Version Upgrade
- Source: Angular 14
- Target: Angular 18

Prefer a sequential major-version path (14 → 15 → 16 → 17 → 18), following the
official Angular update guidance and compatibility requirements at each step.
Do not merely change package version strings. Review migration steps, peer dependency
changes, TypeScript compatibility, Material migrations and deprecated API changes.

After the tool generates the upgraded project:
1. Install dependencies using the Node version required by the target Angular version.
2. Run the production build (`npm run build`).
3. Run unit tests (`npm test -- --watch=false`).
4. Start the app and test login, navigation, search, employee CRUD and leave approvals.
5. Compare behavior with this original Angular 14 baseline.

## Notes
This is a deliberately self-contained frontend sample. Data changes are stored in
localStorage in the browser and reset by clearing site storage. It is suitable for
framework-upgrade pipeline testing, but it is not a production HR system.
