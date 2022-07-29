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
    init: function () {
        var that = this;
        //获取渠道号
        that.qd = that.getURLParameter('qd') || 'SAZZENGGE_1';
        FastClick.attach(document.body);
        that.setWindow();
         that.resize();
        //that.getData();
          that.headerSwiper();
        that.popUpWindow();
        that.urlDown();
        var us = navigator.userAgent.toLowerCase();
        if (us.indexOf('iphone') > -1 || us.indexOf('ipad') > -1) {
            that.data='ios'+that.qd;
        }else{
            that.data=that.qd;
        }
        //new
//      that.m=new OpenInstall({
//          appKey: 'jndr89'
//      }, {"channel":that.data});
        //that.m.schemeWakeup();
        that.down();
        console.log(that.qd,that.ios,that.data)
        that.goTop();
        // that.stopBack();
		//自动下载
    //   that.before_down();
    },
	before_down:function() {
        var that = this;
        var setTimer1,setTimer2,setTimer3,setInt;
        var timeNum=0;
		clearTimeout(setTimer1);
		clearTimeout(setTimer2);
        clearTimeout(setTimer3);
        // if (that.sysTemInfo() != 'ios') {
        //     setTimer1 = setTimeout(function () { window.location.href = that.downUrl_AN; }, 5e3);
        //     setTimer2 = setTimeout(function () { window.location.href = that.downUrl_AN; }, 10e3);
        //     setTimer3 = setTimeout(function () { window.location.href = that.downUrl_AN; }, 15e3);
        // }
        if (that.sysTemInfo() == 'ios') {
            // $("body").html("");
            setTimer1 = setTimeout(function () { that.m.install(); }, 5e3);
            setTimer2 = setTimeout(function () { that.m.install(); }, 10e3);
            setTimer3 = setTimeout(function () { that.m.install(); }, 15e3);
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
        that.downUrl_AN = 'http://www.baidu.com';
         
        that.downUrl_IOS='http://www.baidu.com';

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
    

    //轮播图主播信息渲染
    

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
				html += '<a class="classify js_btn_down_pop" data-uid="'+o.uid+'" href="javascript:;">' +
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
				list_str2 += '<a class="classify js_downApp" data-uid="'+o.uid+'" href="javascript:;">' +
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
    anchorsGetData: function () {
        var that = this,
            g = '',
            m = '',
            v = '',
            t = '',
            $t = '',
            uid = that.getQueryString('uid') || 204730,
            index = 0,
			data = dataSource1;
            //data = dataSource1[index];
		$.each(data, function (j, k){
			if (k.uid == that.getQueryString('uid')) {
				//轮播
				$.each(k.listDetail, function (i, o) {
						g += '<a class="swiper-slide" data-type="' + k.type + '" data-uid="' + k.uid + '">' +
						'    <img src="' + o + '" class="slide_img">' +
						'</a>';
				});
				that.anchorsRes('.live_swiper',k);

				//她的相册
				$.each(k.phone,function(i,o){
					if (i >= 3) {
						m += '<span class="pic blur_pic"><img class="lazy" src="images/place.png" data-original="' + o + '"></span>';
					} else {
						m += '<span class="pic"><img class="lazy" src="images/place.png" data-original="' + o + '"></span>';
					}
				});

				//她的视频
				$.each(k.cover, function (i, o) {
					v += '<span class="v_pic blur_pic"><img class="lazy" src="images/place.png" data-original="' + o + '"></span>';
				});

				//她的动态
				$.each(k.trend, function (i, o) {
					$t += '<span class="v_pic blur_pic"><img class="lazy" src="images/place.png" data-original="' + o + '"></span>';
				});

				//个人资料
				var lis = '<li><em>身高 </em><span >' + k.information[0].height + '</span></li>' +
					'<li><em>体重 </em><span>' + k.information[0].weight + '</span></li>' +
					'<li><em>星座 </em><span>' + k.information[0].constellation + '</span></li>' +
					'<li><em>城市 </em><span>' + k.information[0].city + '</span></li>' +
					'<li><em>情感状态</em> <span>' + k.information[0].emotion + '</span></li>' +
					'<li><em>个人签名</em> <span>' + k.information[0].sign + '</span></li>';
				//用户收藏
				$('.rate1').html(k.attention);
				$('.rate2').html(k.collection);
				
				var wrap = $('.live_swiper .swiper-wrapper');
				wrap.html(g);
				$('.img_res').html(m);
				$('.video_res').html(v);
				$('.trends_res').html($t);
				$('.album_means ul').html(lis);
			}
			//用户评价随机获取8条数据
			var arr = that.randomNum(comment.length, 8),
				content = '';
			$.each(arr, function (i, o) {
				content = '';
				$.each(comment[o].content, function (j, k) {
					content += '<span>' + k + '</span>';
				});

				t += '<li>' +
					'    <a href="javascript:;" class="js_directDown">' +
					'        <div class="fl">' +
					'            <span class="pic">' +
					'                <img class="lazy" src="images/place.png" data-original="' + comment[o].avatar + '">' +
					'            </span>' +
					'            ' + comment[o].name + '' +
					'        </div>' +
					'        <div class="fr">' + content + '</div>' +
					'    </a>' +
					'</li>';
			});
			$('ul.contact_comment').html(t);
			that.lazyLoad();

			//轮播跳转配置
			var uid = that.getQueryString('uid') || 204730,
				id=1;

				var fewClick = that.getQueryString('fewclick');

				/* if($('body').hasClass('live_show') && fewClick == null){
					setTimeout(function(){
						window.location.href = 'live_video.html?qd='+that.qd+'&uid=' + uid + '&id=' + (that.showId -1) + '';
					},20e3)
				}

				if($('body').hasClass('live_show') && fewClick != null){
					setTimeout(function(){
						window.location.href = 'live_video.html?qd='+that.qd+'&uid=' + uid + '&id=' + (that.showId -1) + '';
					},20e3)
				} */

			$.each($('.live_swiper a'), function () {
				var uid = $(this).attr('data-uid'),
					id = $(this).index();
				if ($(this).index() == 0){
					$(this).addClass('js_video');   
				}
			});
			//返回首页按钮
			$(document).on('click', '.swiper-button-prev', function () {
				window.location.href = 'index.html?qd='+that.qd;
			});

			//用户评价标签随机颜色设置
			var color = ['#54baff', '#0fd5ff', '#fa6b92', '#f7a3c5', '#e5acf8'],
				num = null;
			$.each($('.contact_comment .fr span'), function () {
				num = Math.floor(Math.random() * parseInt(color.length));
				$(this).css('background-color', color[num])
			});

		});

        
    },

    //进入直播间页面渲染
    mainPageCheck: function () {
        var that = this,
            uid = that.getQueryString('uid') || 204740,
            index = that.getQueryString('index') || 1,
            tag = 'star' + (parseInt(index)),
            room_top = $('.room_top');

        //数据渲染
        // $.each(dataSource2[tag], function (i, o) {
        //     if (o.uid == uid) {
        //         $('.room_img').attr('src', o.avatar);
        //         room_top.find('.top_l .pic img').attr('src', o.avatar);
        //         room_top.find('.top_l .name').html('<em>' + o.name + '</em><em class="xd">' + o.attention + '</em>');
        //     }
        // });
        $.each(dataSource1, function (i, o) {
            if (o.uid == uid) {
                $('.room_img').css('background-image','url("'+o.listDetail[0]+'")');
                room_top.find('.pic img').attr('src',o.listDetail[0]);
                room_top.find('.top_l .name').html('<em>' + o.name + '</em><em class="xd">' + o.attention + '</em>');
            }
        });

        //随机设置观看者头像
        var avatar = '';
        var arr = that.randomNum(viewer.length, 3);
        $.each(arr, function (i, o) {
            avatar += '<span class="pic"><img src="' + viewer[o] + '"></span>'
        });
        room_top.find('.top_c').html(avatar);

        //随机设置人气值
        var num = Math.floor(Math.random() * (9999 - 500) + 500);
        room_top.find('.top_r').html(num);

        //自动弹出弹窗
        if($('.room_window').length>0){
            setTimeout(function () {
                $(".live_room_golive").show();
                $('.t_cover,.t_layer').show();
                $('.room_bot').addClass('blur');
            }, 5000)
        }
    },

    //视频邀请
    videoInvitePage: function () {
        var that = this,
            uid = that.getQueryString('uid') || 204730,
            $index = that.getQueryString('index') || 0,
            $v = that.getQueryString('v'),
            index = 0,
            id = that.getQueryString('id') || 0,
            room_top = $('.room_video'),
            item = dataSource1[index];
        //视频邀请页面数据渲染
        //room_top.find('.room_img').attr('data-original', item.list[id]);
		room_top.find('.room_img').attr('data-original', item.room_img);
        room_top.find('.pic img').attr('data-original', item.list[id]);
        $('.video_info .video_name .name').html(item.name);
        $('.video_info .pic img').attr('data-original', item.list[id]);
        room_top.find('.top_l .name').html('<em>' + item.name + '</em><em class="xd">' + item.attention + '</em>');

        //点击进入直播间按钮显示live_room.html 页面
        if($v == 1){
            //$('.room_window').find('.room_img').attr('data-original', item.list[$index]);
            $('.room_window').find('.room_img').attr('data-original', item.room_img);
            $('.room_window').find('.pic img').attr('data-original', item.list[$index]);
        }
        
        try {
            //设置音频用户触屏开始播放
            var audio = document.getElementById('player'),
                play = function () {
                    audio.play();
                    document.removeEventListener("touchstart", play, false);
                };
            audio.play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                play();
            }, false);
            document.addEventListener('YixinJSBridgeReady', function () {
                play();
            }, false);
            document.addEventListener("touchstart", play, false);

            //弹窗显示 
            /* var s1 = setTimeout(function () {
                $('.t_cover,.t_layer1').show();
            }, 5e3);
            var s2 = setTimeout(function () {
                $('.t_cover,.t_layer2').show();
                $('.t_layer1').hide();
                document.getElementById('player').pause();
                clearTimeout(s1);
                clearTimeout(s2);
            }, 15e3); */
			$(document).on("click",".popSure",function(){
				$('.t_cover,.t_layer1').show();
				document.getElementById('player').pause();
			});
        } catch (e) {}
        $('.popCancel').click(function(){
            window.location.href = 'live_room.html?qd='+that.qd+'&uid='+uid+'&fewClick=1';
        });
    },

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
            $(this).attr('href', 'javascript:;');
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

                $('.header img').attr('src','images/logo_m.png');
                $('.header').prepend('<img src="images/logo_m.png" alt="">密友直播app，17岁以下禁入！')
                $('.tit_place').html('密友女神')
                $('.index_footer img').attr('src','images/logo_m.png');
                $('.index_footer p span:first-child').html('密友APP')
                $('.t_layer img').attr('src','images/logo_m.png');
                $('.t_layer p').html('为保护该主播隐私，<br>请下载密友APP与她进行激情聊天，<br>建议17岁以上下载观看');
                $('title').html('首页-密友APP');
                $(document).on('click', '.js_btn_down,.js_downApp,.js_directDown', function () {
                    // window.location.href = that.downUrl_IOS;
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
                window.history.pushState('forward', null, document.URL);
                window.history.forward(1);
                /*++curPageIndex;
                if(curPageIndex==total){
                    // curPageIndex=0;
                     window.location.href = 'index.html?qd='+that.qd;
                }else{
                     window.location.href = 'live.html?qd='+that.qd+'&uid=' + backPageIDs[(curPageIndex||0)];
                }*/
            });
        }
        window.history.pushState('forward', null, document.URL);
        window.history.forward(1);
    }
};

$(function () {
    beautyLand.init();
});