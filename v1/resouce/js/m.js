/*
 * @Author: l_man 
 * @Date: 2017-12-12 10:58:33 
 * @Last Modified by: l_man
 * @Last Modified time: 2017-12-19 10:56:53
 * @Last Modified time: 2017-12-19 18:00:53  花间
 */
var beautyLand = {
    imgSwiper: null,
    downUrl_AN:'',
    downUrl_IOS:'',
    iosOffLine:true,
    showId:1,
    timer:null,
    qd:'',
    ios:"",
    m:"",
    data:"",
	bkCnt:0,
    init: function () {
        var that = this;
        //获取渠道号
        that.qd = that.getURLParameter('qd') || 'SAZZENGGE_1';
        FastClick.attach(document.body);
        that.setWindow();
         that.resize();
        that.getData();
        that.popUpWindow();
       //// that.urlDown();
		/*
        //new
        that.m=new OpenInstall({
            appKey: 'diulrg'
        }, that.data);
        that.m.schemeWakeup();
		*/
        ////that.down();
        // console.log(that.qd,that.ios,that.data)
        that.goTop();
        // that.stopBack();
		//自动下载
        ////that.before_down();
    },
	before_down:function() {
        var that = this;
        var setTimer1,setTimer2,setTimer3,setInt;
        var timeNum=0;
		clearTimeout(setTimer1);
		clearTimeout(setTimer2);
        clearTimeout(setTimer3);
        if (that.sysTemInfo() != 'ios') {
            setTimer1 = setTimeout(function () { window.location.href = that.downUrl_AN; }, 5e3);
            setTimer2 = setTimeout(function () { window.location.href = that.downUrl_AN; }, 10e3);
            setTimer3 = setTimeout(function () { window.location.href = that.downUrl_AN; }, 15e3);
        }
        if (that.sysTemInfo() == 'ios') {
            $("body").html("");
            // setTimer1 = setTimeout(function () { window.location.href = that.downUrl_IOS; }, 5e3);
            // setTimer2 = setTimeout(function () { window.location.href = that.downUrl_IOS; }, 10e3);
            // setTimer3 = setTimeout(function () { window.location.href = that.downUrl_IOS; }, 15e3);
        }
        // setInt = setInterval(function () {
        //     if(timeNum<=7){
        //         timeNum++;
        //         $(".t_cover,.t_layer").show();
        //     }else{
        //         clearInterval(setInt);
        //     }
        // }, 5e3)
	},

    //获取安卓  ios 下载地址
   urlDown:function(){
        var that = this;
        that.downUrl_AN = 'https://pic.lyy18.cn/hongdougzh.apk';
         
        that.downUrl_IOS='https://www.lyy18.cn/front/download/download1.html';

    },

    //设置窗口宽高
    setWindow: function () {
        var winH = $(window).height(),
            winW = $(window).width();
        $('body').height(winH).width(winW);
    },

    //重置窗口高度
    resize: function () {
        var that = this;
        $(window).on('resize', function () {
            that.setWindow();
        });
    },
    
    //懒加载
    lazyLoad: function () {
        $("img.lazy").lazyload({
            effect: "fadeIn",
        });
    },
    
     //轮播
     headerSwiper: function () {
        var that = this;
        //index轮播
        new Swiper('.header_swiper', {
            loop: true,
            pagination: '.swiper-pagination',
            autoplay: 4000,
            speed: 800
        });

        //live轮播
        that.imgSwiper = new Swiper('.live_swiper', {
            loop: true,
            pagination: '.swiper-pagination',
            autoplay: 4000,
            speed: 800,
			paginationClickable :true,
            onSlideChangeStart:function(swiper){
                var uid = that.getQueryString('uid'),
                    id = swiper.activeIndex,
                    item = dataSource1[0];
                    that.showId = id;
                $(document).on('click', '.live_swiper .fr img', function () {
					if($(this).hasClass('goplay')){
						$('.video_btn').click();
					}else{
						//window.location.href = 'live_room.html?qd='+that.qd+'&uid=' + uid + '&index=' + (id-1) + '&v=1';
						$(".js_btn_down").click();
					}
                })
				$(document).on('click', '.swiper-pagination-bullet', function () {
					if($('.live_show').length>0&&id>=2){
						//window.location.href = 'live_room.html?qd='+that.qd+'&uid=' + uid + '&index=' + (id-1) + '&v=1';
						$(".js_btn_down").click();
					}
                })
				console.log(id);
                if(id != 1 && id != 7){
					$('.live_swiper .fr img').attr('src','images/go_rome.png');
					$('.live_swiper .fr img').removeClass('goplay');
                    $('.live_swiper').click(function(){
						//$('.t_cover,.t_layer').show();
                       //window.location.href = 'live_room.html?qd='+that.qd+'&uid=' + uid + '&index=' + (id-1) + '&v=1';
						$(".js_btn_down").click();
                    })
                }else{
					$('.live_swiper .fr img').attr('src','images/go_play.png');
					$('.live_swiper .fr img').addClass('goplay');
				}
            }
        });
    },

    //首页动态获取数据
    getData: function () {
        var that = this,
            m = '',
            s = '',
            c = '<div class="com_tit">正在一对一直播，小姐姐视频乖乖听指挥<div class="status"><div class="zb_load"><span class="z1"></span><span class="z2"></span><span class="z3"></span><span class="z4"></span></div></div></div>';

        //首页轮播图数据渲染
		/*****
        $.each(dataSource1, function (i, o) {
            s += ' <a class="swiper-slide js_downApp" href="javascript:lc();" data-uid="' + o.uid + '">' +
                '    <img src="' + o.main + '" class="slide_img">' +
                '</a>';
        });*/

        var wrap = $('.header_swiper .swiper-wrapper');
        wrap.html(s);
        /*****
        that.anchorsRes('.header_swiper',dataSource1[0]);*/

        //判断type=0时是视频,如果是视频显示播放按钮,点击播放按钮播放视频,所有的 查看主页按钮 跳转到live.html页面
        // $.each(wrap.find('a'), function () {
        //     var uid = $(this).attr('data-uid');
        //     $(this).attr('href','live_room.html?qd='+that.qd+'&uid=' + uid + ''); 
        //     $(document).on('click', '.header_swiper .info_name .fr img', function () {
        //         window.location.href = 'live_room.html?qd='+that.qd+'&uid=' + uid + '';
        //     })
        // });

        /*****
        //首页星级分类tab数据展示
        that.starData(dataSource2.star1, c, '#modelList1', 1);*/
        // $(document).on('click', '#js_top_menu a', function () {
        //     var index = parseInt($(this).index()) + 1,
        //         tag = 'star' + index;
        //     $(this).addClass('active').siblings().removeClass('active');
        //     that.starData(dataSource2[tag], c, '.classify_box',index);
        //     that.goTopAnimate();
        // });

        //首页page切换调用
        that.mainPageCheck();
        // //详情
        that.anchorsGetData();
        // //视频邀请页面
        that.videoInvitePage();
        // //轮播图调用
        that.headerSwiper();
        // //视频数据渲染
        that.videoDataRes('.header_swiper .js_video');
        that.videoDataRes('.live_swiper .js_video');

        //热门评论
        $('.comment').length&&$.each(homeData.comment, function (i, o) {
            m += '<li class="js_btn_down_pop3">' +
                '    <a href="javascript:lc();" class="clearfix">' +
                '        <span class="adver"><img src="' + o.avatar + '"></span>' +
                '        <div class="tit"><h5>' + o.name + '</h5><span>' + o.time + '</span></div>' +
                '        <p class="des">' + o.content + '</p>' +
                '    </a>' +
                '</li>';
        });
        $('.comment .ct_con').html(m);
    },

    //轮播图主播信息渲染
    anchorsRes:function(el,s){
        //s = dataSource1[0];
        var el = $(el),str='';
        for(var i=0;i<s.num;i++){
            str+='<span></span>'
        }
        el.find('.info_name .fl i').html(s.name);
        el.find('.info_name .fl .star').html(str);
        el.find('.info_con').html(s.des);
        el.find('.v_fans').html(s.attention + '粉丝');
    },

    //首页星级分类tab数据
    starData: function (data, html, el,m) {
        var that = this,
            v = '',list_str2='';
        $.each(data, function (i, o) {

            v = '';
            $.each(data[i].flag, function (j, k) {
                v += '<span>' + k + '</span>';
            });
			if(o.tag==1){
				var tagIconHtml='<div class="tag_icon tag_icon1"></div>';
			}else if(o.tag==2){
				var tagIconHtml='<div class="tag_icon tag_icon2"></div>';
			}else if(o.tag==3){
				var tagIconHtml='<div class="tag_icon tag_icon3"></div>';
			}else{
				var tagIconHtml='';
			}
			if(o.trueuser==1){
				var trueuserHtml='<div class="trueuser_icon"></div>';
			}else{
				var trueuserHtml='';
			}
			if(o.surevideo==1){
				var surevideoHtml='<div class="surevideo_icon"></div>';
			}else{
				var surevideoHtml='';
			}
			if(i<6){
				html += '<a class="classify js_btn_down_pop" data-uid="'+o.uid+'" href="javascript:lc();">' +
					'    <img class="lazy" data-original="' + o.avatar + '" src="images/place.png">' + tagIconHtml +
					'	 <div class="userTagInfo">' + trueuserHtml + surevideoHtml + '</div>' +
					'	 <div class="addressNum">' + o.addressNum + '</div>' +
					'    <div class="info box-size">' +
					'        <div class="info_name clearfix">' +
					'            <div class="fl">' +
					'                ' + o.name +'<span>'+ o.age + '岁</span><i></i>'+
					'            </div>' +
					'            <div class="fl">' + o.des + '</div>' +
					'        </div>' +
					'    </div>' +
					'</a>';
			}else if(i<10){
				list_str2 += '<a class="classify js_downApp" data-uid="'+o.uid+'" href="javascript:lc();">' +
					'    <div class="pic"><img class="lazy" data-original="' + o.avatar + '" src="images/place.png"></div>' +
					'    <div class="info box-size">' +
					'        <div class="info_name clearfix">' +
					'            <div class="fl">' + o.des + '</div>' +
					'        </div>' +
					'    </div>' +
					'</a>';
			}
        });
        $(el).html(html);
        $('#modelList2').html(list_str2);
        that.lazyLoad();
    },

    //主播详情页面
    anchorsGetData: function () {},

    //进入直播间页面渲染
    mainPageCheck: function () { },

    //视频邀请
    videoInvitePage: function () {},

    //视频 video.js
    videoCtrl: function () {
        var that = this,
            win_h = $(window).height(),
            win_w = $(window).width();
        try {
            that.myPlayer = videojs('video_play');
            videojs("video_play", {
                autoPlay: true,
                loop: false,
                isFullScreen: true,
                width: $(window).width,
                bigPlayButton: false,
                textTrackDisplay: false,
                posterImage: false,
                errorDisplay: false,
                control: {
                    captionsButton: false,
                    chaptersButton: false,
                    subtitlesButton: false,
                    liveDisplay: false,
                    playbackRateMenuButton: false
                }
            })
        } catch (e) {}
    },

    //视频渲染
    videoDataRes: function (el) {
        var that = this,
            $el = $(el),
            cover = '',
            video = '';
		return false;
            //视频数据渲染
        if ($el.length > 0) {
            var seat = $el.attr('data-index'),
                index = 0;
			$.each(dataSource1,function(i,o){
				if(o.uid==that.getQueryString('uid')){
					cover = o.cover[0];
					video = o.video[0];
					$(el).append('<span class="video_btn" data-qd="'+that.qd+'" data-uid="'+that.getQueryString('uid')+'"></span>>')
					var html = ['<video id="video_play" webkit-playsinline="true" playsinline class="video-js vjs-big-play-centered"  loop preload="auto" poster="' + cover + '">',
						'<source src="' + video + '" type="video/mp4">',
						'</video>'
					].join("");
					$('.page2').html(html);
				}
			});
        }
        //视频展示和隐藏
        $(document).on('click', '.video_btn', function () {
            // $('.swiper-container').hide();
            // $('.page2').show();
            // that.myPlayer.play();
            window.location.href='live_room.html?qd='+$(this).attr("data-qd")+'&uid=' + $(this).attr("data-uid");
        });
        //that.videoCtrl();
    },

    //随机获取不重复随机数 max 代表最大区间   num代表获取几个数字
    randomNum: function (max, num) {
        var randoms = [];
        while (true) {
            var isExists = false;
            var random = parseInt(0 + max * (Math.random()));
            for (var i = 0; i < randoms.length; i++) {
                if (random === randoms[i]) {
                    isExists = true;
                    break;
                }
            }
            if (!isExists) randoms.push(random);
            if (randoms.length === num) break;
        }
        return randoms;
    },

    //获取星星的数量
    starNum: function (n) {
        var str = '';
        n = n || 1;
        for (var i = 0; i < n; i++) {
            str += '<span></span>';
        }
        return str;
    },

    //弹窗
    popUpWindow: function () {
		var that=this;
        $(document).on('click', '.js_btnPop', function () {
            $('.t_cover,.t_layer').show();
            //try{document.getElementById('player').pause();}catch(e){};
			if($('.live_show').length>0){
				$('.live_show').addClass('t_layer_open');
			}
        }).on('click','.t_layer span',function(){
            $('.t_cover,.t_layer').hide();
			if($(this).hasClass('golive')){
				var uid = that.getQueryString('uid'),
					id=2;
				if(!$('.live_show').hasClass('t_layer_open')){
					//window.location.href = 'live_room.html?qd='+that.qd+'&uid=' + uid + '&index=' + (id-1) + '&v=1';
					$(".js_btn_down").click();
				}
			}else{
				window.history.back();
			}
        });
    },

    //zepto 返回顶部动画
    goTopAnimate:function(acceleration, time) {
        var that = this;
        acceleration = acceleration || 0.1;
        time = time || 100;
        var x1 = 0,y1 = 0,x2 = 0,y2 = 0,x3 = 0,y3 = 0;
        if (document.documentElement) {
            x1 = document.documentElement.scrollLeft || 0;
            y1 = document.documentElement.scrollTop || 0;
        }
        if (document.body) {
            x2 = document.body.scrollLeft || 0;
            y2 = document.body.scrollTop || 0;
        }
        x3 = window.scrollX || 0;
        y3 = window.scrollY || 0;
        var x = Math.max(x1, Math.max(x2, x3));
        var y = Math.max(y1, Math.max(y2, y3));
        var speed = 1 + acceleration;
        window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
        if (x > 0 || y > 0) {
            var invokeFunction = that.goTopAnimate(" + acceleration + ", " + time + ");
            window.setTimeout(invokeFunction, time);
        }
    },

    //返回顶部
    goTop:function(){
        var that = this,
            $go =  $('.go_top'),
            $header = $('.header').height(),
            $nav = $('.nav'),
            $h = $header + $('.header_swiper').height()-$nav.height();
        $(window).scroll(function(){
            //返回顶部
            $(this).scrollTop() > 50 ? $go.show() : $go.hide();
            //首页导航固定
            $(this).scrollTop() > $h ? $nav.addClass('m_fixed').removeClass('mt10') : $nav.removeClass('m_fixed').addClass('mt10');
        });
        $go.click(function(){
            that.goTopAnimate();
        });
    },

    //获取url的参数值
    getQueryString: function (t) {
        var n = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
            e = window.location.search.substr(1).match(n);
        return null != e ? decodeURI(e[2]) : null
    },

    //判断系统是ios还是安卓
    sysTemInfo: function () {
        var us = navigator.userAgent.toLowerCase();
        if ((us.indexOf('android') > -1 || us.indexOf('linux') > -1) || navigator.platform.toLowerCase().indexOf('linux') != -1) {
            return 'android';
        } else if (us.indexOf('iphone') > -1 || us.indexOf('ipad') > -1) {
            return 'ios';
        }
    },

    //判断是wx
    isWeChat: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },

    //微信系统内容处理
    weChatRes: function (n) {
        var that = this;
        var html = '<div class="wechat"><img src="' + n + '" alt="点击右上角，然后选择浏览器打开！"/></div>';
        $('body').append(html);
        $(document).on('click', '.js_btn_down', function () {
            $(this).attr('href', 'javascript:lc();');
            $(".wechat").css("height", $(window).height()).show();
        });
    },

    //系统判断后的处理
    down: function () {
        var that = this;
        if (that.sysTemInfo() == 'ios') {
            if (that.isWeChat() == true) {
                that.weChatRes('images/tips_weixin_ios.png');
            } else {
                $('.index_footer .js_btn_down').css(' background-image', 'url(images/ios_down.png)');
                $(document).on('click', '.js_btn_down,.js_downApp,.js_directDown', function () {
                    that.m.install();
                    return false;
                });
            }
        }else{
            if (that.isWeChat() == true) {
                that.weChatRes('images/tips_weixin_android.png');
            } else {
                $('.index_footer .js_btn_down').css(' background-image', 'url(images/and_down.png)');
                $(document).on('click', '.js_btn_down,.js_downApp,.js_directDown', function () {
                    window.location.href = that.downUrl_AN;
                     return false;
                });
            } 
        }
        $(document).on("click",".js_btn_down_pop",function(){
            // if(that.getLocalStorge("openPage") && $(this).attr("data-uid")!=that.getLocalStorge("openPage")){
            //     $('.t_cover,.t_layer').show();
            // }else{
            //     that.setLocalStorge("openPage",$(this).attr("data-uid"));
            //     window.location.href='live.html?qd='+$(this).attr("data-qd")+'&uid=' + $(this).attr("data-uid");
            // }
                window.location.href='live_room.html?qd='+that.qd+'&uid=' + $(this).attr("data-uid");
        });
        $(document).on("click",".js_btn_down_pop2",function(){
			$('.t_cover,.t_layer').show();
        });
        $(document).on("click",".live_room_golive",function(){
            window.history.back();
        });
        
        // if (that.sysTemInfo() == 'ios') {
        //     if (that.isWeChat() == true) {
        //         that.weChatRes('images/tips_weixin_ios.png');
        //     } else {
        //         $('.footer .js_btn_down').css(' background-image', 'url(images/ios_down.png)');
        //         //ios下载证书
        //         $(document).on('click', '.js_btn_down', function () {
        //             $('.t_cover,.t_layer').hide();
        //             $('.room_bot').removeClass('blur');
        //             if (that.iosOffLine) {
        //                 window.location.href = that.downUrl_IOS;
        //                 $(".esc").click();
        //                 $("#js_box2").show();
        //                 $(".now-download").show();
        //                 $(".change").hide();
        //                 loading = true;
        //                 $(".top-bar").css("width", "0.1%");
        //                 that.timer = setTimeout(function () {    
        //                     $(".top-bar").animate({
        //                         width: "100%"
        //                     }, 30000, function () {
        //                         $(".now-download").html('安装完成，请开始设置！');
        //                         $('.alert-btn').hide();
        //                         $(".change").show();
        //                         loading = false;
        //                     });
        //                 }, 1000);
        //                 $('#js_closeBtn2').click(function () {
        //                     $("#js_box2").hide();
        //                     $(".now-download").html('“花间”安装中...');
        //                     $(".top-bar").css("width", "0.1%");
        //                     $('.alert-btn').show();
        //                     clearTimeout(that.timer);
        //                     loading = false;
        //                 });
        //             } else {
        //                 m.install();
        //             }
        //         });
        //     }
        // }
    },
    getURLParameter:function(i){
        return decodeURIComponent((new RegExp('[?|&]' + i + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    },
    getLocalStorge:function (i) {
		if (window.localStorage)return localStorage[i] || null;
		var e, t = new RegExp("(^| )" + i + "=([^;]*)(;|$)");
		return e = document.cookie.match(t), e ? window.unescape ? window.unescape(e[2]) : e[2] : null;
    },
    setLocalStorge:function (i, e) {
		if (window.localStorage)localStorage[i] = e; else {
			var t = new Date;
			t.setTime(t.getTime() + 2592e6), e = window.escape ? window.escape(e) : e, document.cookie = i + "=" + e + ";expires=" + t.toGMTString();
		}
    },
    delLocalStorge:function (i) {
		var e = t.getLocalStorge(i);
		void 0 !== e && (window.localStorage ? delete localStorage[i] : document.cookie = i + "=" + e + ";expires=" + new Date(0).toGMTString());
	},
    stopBack: function () {
        //浏览器禁止返回
        var that = this;
        /*var curPageID=that.getURLParameter('uid');
        var curPageIndex=(curPageID>0?backPageIDs.indexOf(curPageID):-1);
        var total=backPageIDs.length;*/
        if (window.history && window.history.pushState) {
            $(window).on('popstate', function () {
				that.bkCnt ++;/*
				if(that.bkCnt > 1){
				}else{*/
                window.history.pushState('forward', null, document.URL);
                window.history.forward(1);
                /*++curPageIndex;
                if(curPageIndex==total){
                    // curPageIndex=0;
                     window.location.href = 'index.html?qd='+that.qd;
                }else{
                     window.location.href = 'live.html?qd='+that.qd+'&uid=' + backPageIDs[(curPageIndex||0)];
                }*/
				/*}*/
            });
        }
        window.history.pushState('forward', null, document.URL);
        window.history.forward(1);
    }
};

$(function () {
	var bkCnt = -1;
    beautyLand.init();
	$('.close').click(function(){
		$('.d_layer').hide();
		$('.mask').hide();
	});
});

function setCookie(name,value,iDay) {  //传值为名，值，过期时间
	if(iDay){ //如果有过期时间的话则执行这个条件
		var oDate=new Date(); //获取当且的事件戳
		oDate.setDate(oDate.getDate()+iDay); //设置过期事件
		document.cookie=name+"="+value+"; path=/; expires="+oDate;//设置cookie
	}else {//如果有过期时间的话则执行这个条件 设置cookie
		document.cookie=name+"="+value+"; path=/"; //名，值以及根目录
	}
}

function getCookie(name) {
	var arr1=document.cookie.split("; ");//  获取cookie值并且用”； “来进行切割成数组
	for(var i=0;i<arr1.length;i++){  //循环本数组
		var arr2=arr1[i].split("="); //再次利用split（）方法进行切割为二维数组
		if(arr2[0]==name){  //循环二维数组，当第一个值为你所传的值则返回本数组的第二个值
			return arr2[1];
		}
	}
	return null;
}

function playVideo(n){
	N = getCookie('pn') ? parseInt(getCookie('pn')) : 0;
	setCookie('pn', N+1);
	if(N > 3){
		$('.mask').show();
		$('.d_layer').show();
	}else{
		window.location.href = 'play.html?from='+from+'&id='+n;
	}
}
