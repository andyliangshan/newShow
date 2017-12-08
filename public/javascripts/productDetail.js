/**
 * Created by andy on 17/11/17.
 */
$(function () {
    // hover效果
    function hoverClass(classname, claassname1, classname2) {
        var $cell = $('' + classname);
        var $height = $('.other').height();
        $cell.hover(function () {
            var that = $(this);
            that.find('' + claassname1).stop().animate({top: '50%'}, 300);
            that.find('' + classname2).stop().animate({height: '100%'}, 200);
        }, function () {
            var that = $(this);
            that.find('' + claassname1).stop().animate({top: '-1000%'}, 100);
            that.find('' + classname2).stop().animate({height: '0%'}, 200);
        });
    }
    hoverClass('.listcont li .other', '.showtext', '.showbg');
    // 向上滚动箭头
    var $con = $('.casedetaillist-cont .container');
    var topValue = $con.offset().top + 1;
    var $top = $('.backlistTop');
    $top.css({
        'display': 'none',
        'margin-left': $con.width()/2 + 15 + 'px'
    });
    $top.click(function (e) {
        e.preventDefault();
        $('body, html').animate({
            scrollTop: topValue
        }, 1000);
    });
    var e = $top,
      t = $(".contact"),
      n = document;
    $(window).scroll(function() {
      var a = $(n).scrollTop(),
        i = $(n).height(),
        o = $(window).height();
      if(a >= topValue){
        if(!e.is(':visible')){
          $top.fadeIn(500);
          t.css("margin-top", "20px");
        }
      }else{
        $top.fadeOut(500);
        t.css("margin-top", "0");
      }
      if(880 >= i - a - o){
        t.css("margin-top", "0");
        $top.fadeOut(500);
      }
    });

    // 案例切换
    var _li = $('.ullidetail li');
    _li.click(function (e) {
        e.preventDefault();
        $(this).find('a').css('text-decoration', 'none');
        $(this).find('a').addClass('active').end().siblings().find('a').removeClass('active');
        var idx = _li.index(this);
        var $cell = $('.casedetaillist-cont .caselist');
        $cell.eq(idx).addClass('active').siblings().removeClass('active');
        var allData = $cell.eq(idx).find('.row');
        if (allData.length <= 5) {
            $('#loadMore' + idx).hide();
        } else {
            $('#loadMore' + idx).show();
        }
    });

    // 加载更多
    var showMoreNChildren = function ($children, n) {
        //显示某jquery元素下的前n个隐藏的子元素
        var $hiddenChildren = $children.filter(":hidden");
        var cnt = $hiddenChildren.length;
        for (var i = 0; i < n && i < cnt ; i++) {
            $hiddenChildren.eq(i).show();
        }
        return cnt - n; // 返回还剩余的隐藏子元素的数量
    };

    jQuery.showMore = function (selector) {
        if (selector == 'undefined') { selector = ".caselist0" }
        $(selector).each(function () {
            var pagesize = 5;
            var $children = $(this).children();
            function exchangeLoadMoreBtn(targetName, loadId) {
                $('#' + targetName).click(function () {
                    $('#' + loadId).animate({'opacity': '1'}, 200, function () {
                        $('#' + loadId).css('opacity', 0);
                    });
                    if (showMoreNChildren($children, pagesize) <= 0) {
                        $(this).hide();
                    }
                });
            }
            if ($children.length > pagesize) {
                for (var i = pagesize; i < $children.length; i++) {
                    $children.eq(i).hide();
                }
                exchangeLoadMoreBtn('loadMore0', 'loader0');
                exchangeLoadMoreBtn('loadMore1', 'loader1');
                exchangeLoadMoreBtn('loadMore2', 'loader2');
                exchangeLoadMoreBtn('loadMore3', 'loader3');
                exchangeLoadMoreBtn('loadMore4', 'loader4');
                exchangeLoadMoreBtn('loadMore5', 'loader5');
                exchangeLoadMoreBtn('loadMore6', 'loader6');
            }
        });
    };
    $.showMore('.caselist0, .caselist1, .caselist2, .caselist3, .caselist4, .caselist5, .caselist6');

});