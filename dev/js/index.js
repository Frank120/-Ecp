const FRAMEWORK = FRAMEWORK || {};

import { tns }    from 'tiny-slider/src/tiny-slider.module';

// import helper module

// import components module
import waterFulHandle from './components/waterful';
import accordionHandler from './components/accordion';
import carouselHandler from './components/carousel';

// import handle module
import components from './app/components';
import polyfill   from './app/ployfill';
import run        from './app/run';

((window, APP) => {
    APP.helpers = {
        tns
    };

    APP.components = {
        waterFulHandle,
        accordionHandler,
        carouselHandler,
    };

    APP.start = {
        components,
        polyfill,
        run
    };

    APP.start.run( APP );

})(window, FRAMEWORK, undefined);