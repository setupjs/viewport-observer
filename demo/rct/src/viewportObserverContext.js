import {createContext} from 'react';
import ViewportObserver from 'un5-viewport-observer';

const viewportOberserObj = new ViewportObserver();
const ViewportObserverContext = createContext(viewportOberserObj);

export default ViewportObserverContext;