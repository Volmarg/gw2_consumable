Utils = {
    escapeRegExp: function (text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    },
    onlyUniqueArrayValues: function (value, index, self) {
        let self_lowercase = [];

        for (let x = 0; x <= self.length - 1; x++) {
            self_lowercase.push(self[x].toLowerCase());
        }

        return self_lowercase.indexOf(value.toLowerCase()) === index;
    },
};