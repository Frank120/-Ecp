export default ( APP ) => {
    document.addEventListener('DOMContentLoaded', () => {
        APP.start.polyfill();
        APP.start.components(APP);
    });
}