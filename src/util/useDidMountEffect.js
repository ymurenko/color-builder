import React, { useLayoutEffect, useRef } from 'react';

const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useLayoutEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

export default useDidMountEffect;