module.exports = {
    "parserOptions": {
        "parser": "babel-eslint"
    },
    "env": {
        browser: true,
        commonjs: true,
        node: true,
        "jest/globals": true
    },
    "plugins": ["jest"],
    "extends": [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    rules: {
        "vue/prop-name-casing" : false,
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
        "indent": ["error", 4],
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "key-spacing": ["error", {
            "beforeColon": true,
            "afterColon": true,
            "mode": "strict"
        }],
        "vue/html-self-closing" : [0]
    },
    globals: {
        "env" : false
    }
};