const Utils = {
    validateEmail: (email) => {
        // eslint-disable-next-line
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    parseDateTime: (date, time) => {
        return date.toISOString().split('T')[0] + 'T' + time.toISOString().split('T')[1];
    }
};

export default Utils;