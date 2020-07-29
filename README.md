# viewport-observer


## Installation
**Yarn**
 ```
  yarn add unajs-viewport-observer
 ```
**NPM**
 ```
  npm install --save unajs-viewport-observer
 ```


## Todo
- Add guide to use with vanilla JavaScript
- Add guide to used with other JavaScript framework/libraries
- Add Type file for TypeScript projects / Migrate to TypeScript
- Add pollyfill for older browsers



## Api

- observe(target)
  - Observe takes an object as parameter. Object must contain the `id` of the element which needs to be watched.
  - Other properties of object are optional. But if those properties are present, `those must be functions`.
  - target interface could be defines as following
  ```javascript
    interface Target {
      id: string;
      notVisible?: () => void; // called when element is not visible on the screen
      lessThanHalf?: () => void; // called when less than 50% of the element is on viewport
      moreThanHalf?: () => void; // called when more than 50% of the element is on viewport
      fullyVisible?: () => void; // called when element is completely visible on the screen
    }
  ```
 
- unobserve(id: string)
  - It takes the `id` of the element which needs to be removed from watch list.
  - Item is immediately removed from watchlist, so if called from any method, rest will not be executed


## How to use with react

> App.js
```javascript
import React, {useContext, useEffect, useRef} from 'react';
import ViewportObserverContext from './viewportObserverContext';

export default function App() {
  const viewportObserver = useContext(ViewportObserverContext);
  const messageElementRef = useRef(null);

  useEffect(() => {
    messageElementRef.current = document.getElementById('message');
    const target = {
      id: 'target1',
      notVisible: function() {
      
        //////////////////////////////////////////////////////////////////////////////
        //          you can perform any action possible from these methods.        //
        //          Following lines of code are just for understanding purposes.   //
        /////////////////////////////////////////////////////////////////////////////
        
        if (messageElementRef.current) {
          messageElementRef.current.innerHTML = 'Target is not visible';
        }
      },
      lessThanHalf: function() {
        if (messageElementRef.current) {
          messageElementRef.current.innerHTML = 'Target is less than half visible';
        }
      },
      moreThanHalf: function() {
        if (messageElementRef.current) {
          messageElementRef.current.innerHTML = 'Target is more than half visible';
        }
      },
      fullyVisible: function() {
        if (messageElementRef.current) {
          messageElementRef.current.innerHTML = 'Target is fully visible';
        }
        // viewportObserver.unobserve('target1');
        /////////////////////////////////////////////////////////////////////////////////////////////////////
        //          viewportObserver.unobserve('target1') can be called from anywhere in your code.        //
        //         it is **NOT** restricted to these methods.                                              //
        //         But after this method is called, element will not be watched anymore.                   //
        /////////////////////////////////////////////////////////////////////////////////////////////////////
      },
    };
    viewportObserver.observe(target);
  }, []);

  return (
    <div className="app">
      <h1 id="heading">Viewport Observer React Demo</h1>
      <div id="message">Message</div>
      <div id="target1" />
    </div>
  );
}
```
>ViewportObserverContext.js

```javascript

import {createContext} from 'react';
import ViewportObserver from 'unajs-viewport-observer';

const viewportOberserObj = new ViewportObserver();
const ViewportObserverContext = createContext(viewportOberserObj);

export default ViewportObserverContext;

```

### Using in a component other than App.js
  - Any number of elements can be watched in the same fashion from anywhere in the components tree
 
 >SomeComponent.js
 ```javascript
import React, {useContext, useEffect} from 'react';
import ViewportObserverContext from '../viewportObserverContext';

export default function App() {
  const viewportObserver = useContext(ViewportObserverContext);

  useEffect(() => {
    const target = {
      id: 'target2',
      notVisible: function() {
        console.log('Target is not visible');
      },
      lessThanHalf: function() {
        console.log('Target is less than half visible');
      },
      moreThanHalf: function() {
        console.log('Target is more than half visible');
      },
      fullyVisible: function() {
        console.log('Target is fully visible');
      },
    };
    viewportObserver.observe(target);
    
    setTimeout(() => {
      viewportObserver.unobserve('target2');
    }, 10000);
    // Above code will remove the element (with id target2) from watchlist after 10 seconds. Irrespective of how many visibility methods are called.
  }, []);

  return (
    <div className="some-component">
      <div id="target2" />
    </div>
  );
}
```
