(function() {

    var defaults = {
            path: '/',
            secure: false
        };

    /**
     * 配置默认值
     */
    function config(key, value) {
        if (typeof key === 'object') {
            var options = key, k;
            for (k in options) {
                defaults[k] = options[k];
            }
        } else if (key) {
            defaults[key] = value;
        }
    }

    /**
     * 设置 cookie 值
     * set(name, value, expires, path, domain, secure)
     * set(name, value, options)
     * set(options)
     */
    function set(key, value, expires, path, domain, secure) {
        var options,
            keyType = typeof key,
            expiresType = typeof expires;
        if (keyType === 'object') {
            options = key;
            key = options.key;
            value = options.value;
        } else if (expiresType === 'object') {
            options = expires;
        }
        if (!key) {
            return;
        }
        if (options) {
            expires = options.expires;
            path = options.path;
            domain = options.domain;
            secure = options.secure;
        }
        if (!expires) {
            expires = defaults.expires;
        }
        if (!path) {
            path = defaults.path;
        }
        if (!domain) {
            domain = defaults.domain;
        }
        if (!secure) {
            secure = defaults.secure;
        }

        expiresType = typeof expires;
        if (expiresType === 'object' ||
            expiresType === 'number') {
            expires = new Date(expires);
        }

        document.cookie = [
            key, '=', encodeURIComponent(value),
            expires ? '; expires=' + expires.toUTCString() : '',
            path ? '; path=' + path : '',
            domain ? '; domain=' + domain : '',
            secure ? '; secure=' + secure : ''
        ].join('');
    }

    function get(key) {
        var exp = '(^|)' + key + '=([^;]*)(;|$)',
            data = document.cookie.match(new RegExp(exp));
        if (data) {
            return decodeURIComponent(data[2]);
        }
    }

    function remove(key) {
        set(key, '', 1);
    }

    window.cookie = {
        config: config,
        get: get,
        set: set,
        remove: remove
    };
})();