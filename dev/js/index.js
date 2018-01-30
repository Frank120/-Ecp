const FRAMEWORK = FRAMEWORK || {};

import { tns }    from 'tiny-slider/src/tiny-slider.module';

// import helper module

// import components module
import waterFulHandle from './components/waterful';

// import handle module
import components from './app/components';
import polyfill   from './app/ployfill';
import run        from './app/run';

((window, APP) => {
    APP.helpers = {
        tns
    };

    APP.components = {
        waterFulHandle
    };

    APP.start = {
        components,
        polyfill,
        run
    };

    APP.start.run( APP );

})(window, FRAMEWORK, undefined);