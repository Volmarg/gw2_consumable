Utils = {
    escapeRegExp: function (text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    },
};