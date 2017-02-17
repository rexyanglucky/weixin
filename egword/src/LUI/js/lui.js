var LuiDropDownList = require('../js/dropdownlist');
var LuiCheckBox = require('../js/checkbox');

function Lui() {
    //this.checkBox = null;
    // this.initWordSpeak();
};

Lui.prototype = {
    constructor: Lui,
    initTree: function (p) {
        var t = new LuiTree();
        return t.init(p);
    },
    initDropDownList: function (p) {
        var d = new LuiDropDownList();
        return d.init(p);
    },
    initCheckBox: function (p) {
        //����һ��������ȫ�ֵ�checkbox����
        if (!this.checkBox) {
            this.checkBox = new LuiCheckBox();
        }
        var c = new LuiCheckBox();
        return c.init(p);

    },
    initWordSpeak: function (p) {
        //����һ��������ȫ�ֵ�wordspeak����
        if (!this.wordspeak) {
            this.wordspeak = new LuiWordSpeak();
        }
        var c = new LuiWordSpeak();
        return c.init(p);
    }
};

module.exports = Lui;
