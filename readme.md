# my_burgers-ui-my-burgers

## Init

- `npx lerna bootstrap`
- Copy `.env` into new directory. Functionally, this achieves the same result as `npx sinc init`, with the caveat that `npx sinc init` pulls down the entire namespace from ServiceNow into `src`. We just need the credentials for setting up the proxy dev server.
- Open `src/index.tsx` file and input your `translation_key` into the `defaultTitleKey: ''` for React. If you do not take this step, the app will throw an error and not render.

## Run

To run the app in dev and start the dev server -

```
npx webpack-dev-server
```
