import { createStore } from "redux";

import reducers from "./reducers/index";

const store = createStore(
    reducers,
    {},
    typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
);

export default store;