export default ( APP ) => {
    let components = document.querySelectorAll('[data-js]');

    components.forEach((component) => {
        Object.entries( APP.components ).forEach(( entry ) => {
            let [key, value] = entry;

            if ( key == component.dataset.js ) {
                let directive = new value( component, APP );
                directive.init();
            }
        })
    });
}