export default () => {
    if ( typeof NodeList.prototype.forEach === 'function' ) return false;
    NodeList.prototype.forEach = Array.prototype.forEach;

    if (Object.entries) {
        Object.entries = function ( obj ) {
            var ownProps = Object.keys( obj ),
                i        = ownProps.length,
                resArray = new Array(i);
            while (i--) {
                resArray[i] = [ownProps[i], onj[ownProps[i]]];

                return resArray;
            };
        }
    }
}