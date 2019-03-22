(function(global, factory) { //匿名函数立即执行
    "use strict";
    if(typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document ? factory(global, true) : function(w){
            if(!w.document) {
                throw new Error('Query requires a window with a document')
            }
            return factory(w);
        }
    }else {
        factory(window);
    }

})(typeof window !== "undefined" ? window : this, function(window, noGlobal)  {

});