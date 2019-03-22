(function($,window){
    var currPage, perNum, last, records;
    var Pagination = function(opt) {
        this.setting = $.extend({},Pagination.defaults, opt);
        currPage = this.setting.initPage;
        last = this.setting.last;
        perNum = this.setting.perNum;
        records = this.setting.records;
        this.init(currPage);

    };
    Pagination.defaults = {
        container: '.rxl-pagination',
        initPage: 1,
        last: null,
        perNum: 10,
        records: null,

        activeCls: '.active',
        activeSty: 'active',
        prevCls: '.prev',
        nextCls: '.next',
        prevSty: 'prev',
        nextSty: 'next',
        currName: 'current',
        perNumName: 'perNum',
        paginationTxtSty: 'pagination-text',
        paginationTxtCls: '.pagination-text',
        callBack: null
    };
    Pagination.prototype = {
        init: function(currP) {
            this.create(currP);
            this.eventBind(currP);
            this.callBack(currP);
        },
        create: function(currP) {
            var paginationHtml = [' <ul class="pagination">'];
            if(currP === 1) {
                paginationHtml.push('<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a> </li>');
            }else {
                paginationHtml.push('<li class="'+Pagination.defaults.prevSty+'"> <a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a> </li>')
            }
            if(last <= 5) { //简单
                if(currP === 1){
                    paginationHtml.push('<li class="'+ Pagination.defaults.activeSty+'"><a href="#">1</a></li>');
                }else {
                    paginationHtml.push('<li><a href="#">1</a></li>');
                }
                for(var i= 1;i<last-1;i++){
                    if(currP === i) {
                        paginationHtml.push('<li class="'+ Pagination.defaults.activeSty+'"><a href="#">'+(i+1)+'</a></li>');
                    }else {
                        paginationHtml.push('<li><a href="#">'+(i+1)+'</a></li>');
                    }

                }
                if(currP === last) {
                    paginationHtml.push('<li class="'+ Pagination.defaults.activeSty+'"><a href="#">'+last+'</a></li>');
                    paginationHtml.push('<li class="disabled"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');
                }else {
                    paginationHtml.push('<li><a href="#">'+last+'</a></li>');
                    paginationHtml.push('<li class="'+Pagination.defaults.nextSty+'"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');
                }

            }else { //复杂
                if(currP === 1){
                    paginationHtml.push('<li class="'+ Pagination.defaults.activeSty+'"><a href="#">1</a></li>');
                }else {
                    paginationHtml.push('<li><a href="#">1</a></li>');
                }

                if(currP <=5) {//小于5
                    for(var i= 2;i<=5;i++){
                        if(currP === i) {
                            paginationHtml.push('<li class="'+ Pagination.defaults.activeSty+'"><a href="#">'+i+'</a></li>');
                            continue;
                        }
                        paginationHtml.push('<li><a href="#">'+i+'</a></li>');
                    }
                    paginationHtml.push('<li><span>...</span></li>');
                }else if (currP >=6 && currP < last-3) { //大于等于6 小于last-3

                    paginationHtml.push('<li><span>...</span></li>');
                    for(var c=currP-2;c<=currP+2;c++) {
                        if(currP === c) {
                            paginationHtml.push('<li class="'+ Pagination.defaults.activeSty+'"><a href="#">'+c+'</a></li>');
                            continue;
                        }
                        paginationHtml.push('<li><a href="#">'+c+'</a></li>');
                    }
                    paginationHtml.push('<li><span>...</span></li>');
                }else {
                    paginationHtml.push('<li><span>...</span></li>');
                    for(var l=last-5;l<=last-1;l++) {
                        if(currP === l) {
                            paginationHtml.push('<li class="'+ Pagination.defaults.activeSty+'"><a href="#">'+l+'</a></li>');
                            continue;
                        }
                        paginationHtml.push('<li><a href="#">'+l+'</a></li>');
                    }
                }
                if(currP === last) {
                    paginationHtml.push('<li class="'+ Pagination.defaults.activeSty+'"><a href="#">'+last+'</a></li>');
                    paginationHtml.push('<li class="disabled"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');
                }else {
                    paginationHtml.push('<li><a href="#">'+last+'</a></li>');
                    paginationHtml.push('<li class="'+Pagination.defaults.nextSty+'"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');
                }
            }
            paginationHtml.push('</ul>');
            paginationHtml.push(' <ul class="pagination '+this.setting.paginationTxtSty+'">');
            paginationHtml.push('<li><span>第<input type="text" name="'+this.setting.currName+'" value="'+currP+'"/>页</span></li>');
            paginationHtml.push('<li><span>每页<input type="text" name="'+this.setting.perNumName+'" value="'+perNum+'"/>条</span></li>');
            paginationHtml.push('<li><span>共<span>'+records+'</span>条</span></li>');
            $(this.setting.container).html(paginationHtml.join(''));
        },
        eventBind: function(currP) {
            var _this = this;
            $(_this.setting.prevCls).off().on('click',function(){
                var prevP = currP-1;
                if(prevP < 1) {
                    return;
                }
                _this.init(prevP);
            });
            $(_this.setting.nextCls).off().on('click',function(){
                var nextP = currP + 1;
                if(nextP > last) {
                    return;
                }
                _this.init(currP + 1);
            });
            var curPageInput = this.setting.paginationTxtCls + ' input[name="'+this.setting.currName+'"]';
            $(curPageInput).off().on('keydown',function(event){
                var e = event ? event : (window.event ? window.event : null);
                if(e.keyCode === 13) {
                    var page = $(curPageInput).val();
                    var intPage = parseInt(page);
                    if(!intPage) {
                        return;
                    }
                    _this.init(intPage);
                }
            });
            var perNumInput = this.setting.paginationTxtCls + ' input[name="'+this.setting.perNumName+'"]';
            $(perNumInput).off().on('keydown',function(event) {
                var e = event ? event : (window.event ? window.event : null);
                if(e.keyCode === 13) {
                    var perNum = $(perNumInput).val();
                    var intPerNum = parseInt(perNum);
                    if(!intPerNum) {
                        return;
                    }
                    _this.setting.perNum = intPerNum;
                    _this.setting.last = Math.ceil(records/intPerNum);
                    return new Pagination({
                        initPage: 1,
                        perNum: intPerNum,
                        last: Math.ceil(records/intPerNum),
                        records: records
                    });
                    //_this.init(1, intPerNum, last);
                }
            })
        },
        callBack: function(page) {
            if(typeof this.setting.callBack == 'function') {
                this.setting.callBack(page);
            }
        }
    };
    var pageInit=function(opts){
        return new Pagination(opts);
    };
    window.pageInit= $.pageInit=pageInit;
}(jQuery,window));