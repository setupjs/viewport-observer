import {createContext} from 'react';
import ViewportObserver from 'unajs-viewport-observer';

const viewportOberserObj = new ViewportObserver();
const ViewportObserverContext = createContext(viewportOberserObj);

export default ViewportObserverContext;