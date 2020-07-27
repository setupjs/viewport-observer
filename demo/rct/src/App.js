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
        if (messageElementRef.current) {
          messageElementRef.current.innerHTML = 'Target is not visible';
        }
        // viewportObserver.unobserve('target1');
      },
      lessThanHalf: function() {
        if (messageElementRef.current) {
          messageElementRef.current.innerHTML = 'Target is less than half visible';
        }
        // viewportObserver.unobserve('target1');
      },
      moreThanHalf: function() {
        if (messageElementRef.current) {
          messageElementRef.current.innerHTML = 'Target is more than half visible';
        }
        // viewportObserver.unobserve('target1');
      },
      fullyVisible: function() {
        if (messageElementRef.current) {
          messageElementRef.current.innerHTML = 'Target is fully visible';
        }
        // viewportObserver.unobserve('target1');
      },
    };
    viewportObserver.observe(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <h1 id="heading">Viewport Observer React Demo</h1>
      <div id="message">Message</div>
      <div id="target1" />
    </div>
  );
}