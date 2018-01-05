'use strict';

document.addEventListener('touchstart', function (e) {
    e.preventDefault();
});
window.onload = function () {
    var Aa = document.querySelectorAll('a');
    for (var i = 0; i < Aa.length; i++) {
        Aa[i].addEventListener('touchmove', function () {
            this.isMove = true; //给当前元素添加自定义属性isMove 让他等于true； 如果在元素上移动以后就等于true
        });
        Aa[i].addEventListener('touchend', function () {
            if (!this.isMove) {
                //这里判断 的是如果没有移动的话就是点击。根据当前元素的链接通过window.location.href跳转
                window.location.href = this.href;
            }
            this.isMove = false; //跳转完成以后恢复到false
        });
    }
};
function Goods(goods_des) {
    this.goods_des = goods_des;
    this.goodul = null;
    this.init();
}
Goods.prototype = {
    constructor: Goods,
    init: function init() {
        var content = document.querySelector('.content');
        var goods = document.createElement('div');
        goods.className = 'goods';
        goods.id = this.goods_des.idname;
        if (this.goods_des.idname == 'a') {
            goods.style.display = 'block';
        } else {
            goods.style.display = 'none';
        }

        this.goodul = document.createElement('ul');
        goods.appendChild(this.goodul);
        var len = this.goods_des.good_des.length;
        for (var i = 0; i < len; i++) {
            this.createli(this.goods_des.good_des[i]);
        }

        content.appendChild(goods);
    },
    createli: function createli(good) {
        var goodli = document.createElement('li');
        goodli.className = 'clearfix';
        goodli.id = this.goodul.parentNode.id + good.good_id;
        console.log(this.goodul.parentNode);
        var a = document.createElement('a');
        a.href = good.good_href;
        var goodimg = document.createElement('div');
        goodimg.className = 'good_img';
        var img = document.createElement('img');
        img.src = good.good_img;
        goodimg.appendChild(img);
        a.appendChild(goodimg);
        var gooddes = document.createElement('div');
        gooddes.className = 'good_des';
        var goodname = document.createElement('span');
        goodname.innerText = good.good_name;
        goodname.className = 'goodname';
        gooddes.appendChild(goodname);
        if (good.good_van) {
            var goodvan = document.createElement('span');
            goodvan.innerText = good.good_van;
            goodvan.style.color = '#ff9f00';
            gooddes.appendChild(goodvan);
        }
        var goodprice = document.createElement('span');
        goodprice.innerText = good.good_price;
        goodprice.style.color = 'red';
        goodprice.className = 'price';
        gooddes.appendChild(goodprice);
        var goodstore = document.createElement('span');
        goodstore.innerText = good.good_store;
        goodstore.style = 'color:#808080;font-size: .972222rem';
        gooddes.appendChild(goodstore);
        a.appendChild(gooddes);
        goodli.appendChild(a);

        var shopbutton = document.createElement('button');
        shopbutton.className = "cart_icon icon-cartadd";
        var cartchange = this.createchangediv();
        this.cartevent(shopbutton, cartchange);
        goodli.appendChild(shopbutton);
        goodli.appendChild(cartchange);
        //添加商品介绍
        var goodcontent = this.createintroduce(good.good_intro);
        goodli.appendChild(goodcontent);
        a.addEventListener('touchstart', function () {
            goodcontent.style = 'margin-top:0';
            goodcontent.style.display = 'block';
            // goodcontent.children[0].style.position = 'fixed';
            setTimeout(function () {
                goodcontent.children[0].style.position = 'fixed';
            }, 500);
        }, false);
        this.goodul.appendChild(goodli);
    },
    createchangediv: function createchangediv() {
        var cartchange = document.createElement('div');
        cartchange.className = 'cart_change';
        cartchange.style.display = 'none';
        var buttonreduce = document.createElement('button');
        buttonreduce.className = 'icon-reduce';
        var buttonplus = document.createElement('button');
        buttonplus.className = 'icon-plus';
        var goodcount = document.createElement('input');
        goodcount.type = 'text';
        goodcount.value = '1';
        // goodcount.addEventListener('touch')
        // goodcount.value.onchange
        // goodcount.addEventListener("onporpertychange",function(e){

        //     console.log("inputting!!");
        //    console.log('-----------haha');
        // }); 

        cartchange.appendChild(buttonreduce);
        cartchange.appendChild(goodcount);
        cartchange.appendChild(buttonplus);
        // this.cartchangeevent(cartchange);
        return cartchange;
    },
    cartevent: function cartevent(cartdom, cartchange) {
        cartdom.addEventListener('touchstart', function (e) {
            cartdom.style.display = 'none';
            cartchange.style.display = 'block';
            cartchange.children[1].value = '1';
            createListGood(cartchange.children[1]);
            goodCountAndPrice();
        }, false);
        cartchange.addEventListener('touchstart', function (e) {
            if (e.target.classList.contains("icon-plus")) {
                cartchange.children[1].value = parseInt(cartchange.children[1].value) + 1;
            } else if (e.target.classList.contains("icon-reduce")) {
                cartchange.children[1].value = parseInt(cartchange.children[1].value) - 1;

                if (cartchange.children[1].value == 0) {
                    cartchange.style.display = 'none';
                    cartchange.children[1].value = 1;
                    cartdom.style.display = 'block';
                    var goodid = 'list' + cartdom.parentNode.id;
                    removeGood(goodid);
                    goodCountAndPrice();
                    return 0;
                }
            }
            createListGood(cartchange.children[1]);
            goodCountAndPrice();
        }, false);
    },
    createintroduce: function createintroduce(goodintro) {
        var div = document.createElement('div');
        div.className = 'introduce';
        var client = document.documentElement.clientHeight + 'px';
        div.style = 'margin-top:' + client + ';display:block';
        // div.style =`margin-top:0;display:block`;
        var goodheader = document.createElement('div');
        goodheader.className = 'goodheader';
        var closebutton = document.createElement('button');
        closebutton.className = 'close';
        var closespan = document.createElement('span');
        var i = document.createElement('i');
        i.className = 'icon-plus';
        closebutton.addEventListener('touchstart', function () {
            div.style.display = 'none';
            div.style = 'margin-top:' + client;
            goodheader.style.position = 'absolute';
        }, false);
        closespan.appendChild(i);
        closebutton.appendChild(closespan);
        goodheader.appendChild(closebutton);
        div.appendChild(goodheader);

        var goodcontent = document.createElement('div');
        goodcontent.className = 'goodcontent';
        var goodslider = document.createElement('div');
        goodslider.className = 'goodslider';
        var goodimg = document.createElement('img');
        goodimg.src = goodintro.goodintro_img;
        goodslider.appendChild(goodimg);
        goodcontent.appendChild(goodslider);

        var detailintro = document.createElement('div');
        detailintro.className = 'detail-intro';
        var detailspan = document.createElement('span');
        detailspan.innerText = goodintro.goodintro_span;
        var detailfont = document.createElement('font');
        detailfont.innerText = goodintro.goodintro_font;
        detailintro.appendChild(detailspan);
        detailintro.appendChild(detailfont);
        goodcontent.appendChild(detailintro);

        var detailcontent = document.createElement('div');
        detailcontent.className = 'detail-content';
        var len = goodintro.goodintro_detailimg.length;
        for (var i = 0; i < len; i++) {
            var img = document.createElement('img');
            img.src = goodintro.goodintro_detailimg[i];
            detailcontent.appendChild(img);
        }
        goodcontent.appendChild(detailcontent);
        div.appendChild(goodcontent);
        return div;
    }
    //li 购物车监听
};var iconcarts = document.querySelectorAll('.content .goods  ');

//nav滑动------------------------------------------
var nav = document.querySelector('.content nav');
var navtop = nav.offsetTop;
var navheight = nav.offsetHeight;
var clientheight = document.documentElement.clientHeight;
var header = document.querySelector('header');
var footer = document.querySelector('footer');
var headerhei = parseInt(getComputedStyle(header).height);
var footerhei = parseInt(getComputedStyle(footer).height);
var nstart, nnow, noffsettop, ndis, target;
nav.addEventListener('touchstart', function (e) {
    nstart = e.touches[0].clientY;
    noffsettop = nav.offsetTop;
}, false);
nav.addEventListener('touchmove', function (e) {
    nnow = e.touches[0].clientY;
    ndis = nnow - nstart;
    target = noffsettop + ndis;
    var mintarget = navheight - (clientheight - headerhei);
    if (target > navtop) {
        target = navtop;
    } else if (target < -mintarget) {
        target = -mintarget;
    }
    nav.style.top = target + 'px';
}, false);
//-------------------------------------------
//nav 监听
var content = document.querySelector('.content');
nav.addEventListener('touchstart', function (e) {
    if (e.target.classList.contains('icon-sort')) {
        return 0;
    }
    var alist = document.querySelectorAll('nav a');
    var goodid = document.getElementById('a');
    goodid.style.display = 'block';
    var len = alist.length;
    for (var i = 1; i < 3; i++) {
        var gooddom = getgooddom(alist[i]);
        if (gooddom.style.display == 'block') {
            gooddom.style.display = 'none';
        }

        if (alist[i].style.background == 'white' || alist[i].style.color == '#ff9f00') {
            alist[i].style.background = '#ebebeb';

            alist[i].style.color = '#464646';
        }
    }
    if (e.target.href) {
        e.target.style.background = 'white';
        e.target.style.color = '#ff9f00';
        getgooddom(e.target).style.display = 'block';
    }
}, false);
//获得当前的导航所指向的 good id
function getgooddom(nava) {
    var goodidname = nava.getAttribute('goodid');
    var gooddom = document.getElementById(goodidname);
    return gooddom;
}
//--------------------------------------------


var goods = {
    idname: 'a',
    good_des: [{
        good_id: 1,
        good_img: './imgs/img2.jpg',
        good_name: '家乐都有机里脊肉500g',
        good_van: '瘦肉多??????????',
        good_price: '￥150',
        good_store: '乐果派旗舰店',
        good_href: '#',
        good_intro: {
            goodintro_img: './imgs/pro01.jpg',
            goodintro_span: '天然牧草养殖冷鲜 内蒙古呼伦贝尔优质牛后腿肉1000g',
            goodintro_font: '365天纯生态放养 肉质细腻紧实 品质高',
            goodintro_detailimg: ['./imgs/Pic02.jpg', './imgs/Pic03.jpg', "./imgs/Pic04.jpg", "./imgs/Pic05.jpg", "./imgs/Pic06.jpg", "./imgs/Pic07.jpg", "./imgs/Pic08.jpg", "./imgs/Pic05.jpg"]
        }
    }, {
        good_id: 2,
        good_img: './imgs/img2.jpg',
        good_name: '家乐都有机里脊肉500g',
        good_van: '瘦肉多',
        good_price: '￥150',
        good_store: '乐果派旗舰店',
        good_href: '#',
        good_intro: {
            goodintro_img: './imgs/pro01.jpg',
            goodintro_span: '天然牧草养殖冷鲜 内蒙古呼伦贝尔优质牛后腿肉1000g',
            goodintro_font: '365天纯生态放养 肉质细腻紧实 品质高',
            goodintro_detailimg: ['./imgs/Pic02.jpg', './imgs/Pic03.jpg', "./imgs/Pic04.jpg", "./imgs/Pic05.jpg", "./imgs/Pic06.jpg", "./imgs/Pic07.jpg", "./imgs/Pic08.jpg", "./imgs/Pic05.jpg"]
        }
    }]
};
var goods2 = {
    idname: 'b',
    good_des: [{
        good_id: 1,
        good_img: './imgs/img2.jpg',
        good_name: '家乐都有机里脊肉500g',
        good_van: '瘦肉多.....',
        good_price: '￥150',
        good_store: '乐果派旗舰店',
        good_href: '#',
        good_intro: {
            goodintro_img: './imgs/pro01.jpg',
            goodintro_span: '天然牧草养殖冷鲜 内蒙古呼伦贝尔优质牛后腿肉1000g',
            goodintro_font: '365天纯生态放养 肉质细腻紧实 品质高',
            goodintro_detailimg: ['./imgs/Pic02.jpg', './imgs/Pic03.jpg', "./imgs/Pic04.jpg", "./imgs/Pic05.jpg", "./imgs/Pic06.jpg", "./imgs/Pic07.jpg", "./imgs/Pic08.jpg", "./imgs/Pic05.jpg"]
        }
    }]
};
new Goods(goods);
new Goods(goods2);

var goodlist = document.querySelectorAll('.goods input');

var listgooddom = document.getElementById(goodlist[1].parentNode.parentNode.id);
var goodcount = document.querySelector('footer .good-count');
var listtotalprice = document.querySelector('.listfooter span');
var listul = document.querySelector('.listcontent ul');
var listclose = document.querySelector('.listheader button');
var shopcartlist = document.querySelector('.shopcartlist');
var listheader = document.querySelector('.listheader');
var listfooter = document.querySelector('.listfooter');
var footer = document.querySelector('footer');
var footershopcart = footer.children[2];
var listlen = document.querySelectorAll('.listcontent ul li').length;
var clearlist = document.querySelector('.listheader .clearlist');
var inputslist = document.querySelectorAll('.goods input');
var inputslen = inputslist.length;
var goodslist = [];
for (var i = 0; i < inputslen; i++) {
    if (inputslist[i].value > 0) {
        goodslist.push(inputslist[i]);
    }
}
console.log(clearlist);
//购物车清空绑定
clearlist.addEventListener('touchstart', function (e) {
    var listlis = listul.children;
    var listlislen = listul.children.length;
    for (var i = 0; i < listlislen; i++) {
        document.getElementById(listlis[i].id.slice(4)).children[2].style.display = 'none';
        document.getElementById(listlis[i].id.slice(4)).children[1].style.display = 'block';
    }
    console.log(listlis[0]);
    listul.innerHTML = '';
    shopcartlist.style.display = 'none';
}, false);
//list 的 close 绑定
listclose.addEventListener('touchstart', function (e) {
    shopcartlist.style.display = 'none';
}, false);
//购物车绑定
footershopcart.addEventListener('touchstart', function () {
    var listlis = listul.children;
    var listlislen = listul.children.length;
    if (listlislen > 0) {
        shopcartlist.style.display = 'block';
        var listlen = document.querySelectorAll('.listcontent ul li').length;
        if (listlen < 7) {
            var padding = clientheight - (getStyle(listheader, 'height') + getStyle(listfooter, 'height') + getStyle(footer, 'height') + getStyle(listul, 'height')) + 'px';
            shopcartlist.style = 'padding-top:' + padding + ';display:block';
            listheader.style = 'top:' + padding;
        } else {
            shopcartlist.style = 'padding-top: 16.111111rem;display:block';
        }
    }
}, false);

//创建购物车物品
function createListGood(listgoodinput) {
    console.log('hahahahhahaha');
    var listgoodid = listgoodinput.parentNode.parentNode.id;
    var listlis = document.querySelectorAll('.listcontent ul li');
    var lislen = listlis.length;
    for (var i = 0; i < lislen; i++) {
        if ('list' + listgoodid == listlis[i].id) {
            // listlis[i].children[2].children[1].value = parseInt(listlis[i].children[2].children[1].value)+1;
            listlis[i].children[2].children[1].value = listgoodinput.value;
            return 0;
        }
    }
    var goodli = document.createElement('li');
    goodli.id = 'list' + listgoodid;
    var listgood = document.createElement('div');
    listgood.className = 'listgood';
    var listimg = document.createElement('img');
    listimg.src = document.querySelector('#' + listgoodid + ' img').src;
    listgood.appendChild(listimg);
    goodli.appendChild(listgood);

    var listgooddes = document.createElement('div');
    listgooddes.className = 'listgood_des';
    var listgoodspan = document.createElement('span');
    listgoodspan.style.color = '#515151';
    listgoodspan.innerText = document.querySelector('#' + listgoodid + ' .good_des .goodname').innerText;
    var listgoodprice = document.createElement('span');
    listgoodprice.innerText = document.querySelector('#' + listgoodid + ' .good_des .price').innerText;
    listgoodprice.style.color = 'red';
    listgooddes.appendChild(listgoodspan);
    listgooddes.appendChild(listgoodprice);
    goodli.appendChild(listgooddes);

    var cartchange = document.createElement('div');
    cartchange.className = 'cart_change';
    var buttonreduce = document.createElement('button');
    buttonreduce.className = 'icon-reduce';
    var buttonplus = document.createElement('button');
    buttonplus.className = 'icon-plus';
    var goodcount = document.createElement('input');
    goodcount.type = 'text';
    goodcount.value = document.querySelector('#' + listgoodid + ' .cart_change input').value;
    cartchange.appendChild(buttonreduce);
    cartchange.appendChild(goodcount);
    cartchange.appendChild(buttonplus);
    //购物车内加减商品
    cartchange.addEventListener('touchstart', function (e) {
        if (e.target.classList.contains("icon-plus")) {
            cartchange.children[1].value = parseInt(cartchange.children[1].value) + 1;
            document.getElementById(cartchange.parentNode.id.slice(4)).children[2].children[1].value = cartchange.children[1].value;
        } else if (e.target.classList.contains("icon-reduce")) {
            cartchange.children[1].value = parseInt(cartchange.children[1].value) - 1;
            document.getElementById(cartchange.parentNode.id.slice(4)).children[2].children[1].value = cartchange.children[1].value;
            if (cartchange.children[1].value == 0) {
                var liheight = getStyle(document.getElementById(cartchange.parentNode.id), 'height');
                shopcartlist.style.paddingTop = parseInt(shopcartlist.style.paddingTop) + liheight + 'px';
                listheader.style.top = shopcartlist.style.paddingTop;
                removeGood(cartchange.parentNode.id);
                document.getElementById(cartchange.parentNode.id.slice(4)).children[2].style.display = 'none';
                document.getElementById(cartchange.parentNode.id.slice(4)).children[1].style.display = 'block';
            }
        }
        goodCountAndPrice();
    }, false);
    goodli.appendChild(cartchange);
    listul.appendChild(goodli);
}
//------------------------------------------------
//移除购物车物品
function removeGood(goodid) {
    var goodli = document.getElementById(goodid);
    goodli.parentNode.removeChild(goodli);
}
function getStyle(ele, pro) {
    var style = parseInt(getComputedStyle(ele)[pro]);
    return style;
}
//购物车总数量
function goodCountAndPrice() {
    goodcount.style.display = 'block';
    var totalcount = 0,
        totalprice = 0;
    // totalcount = parseInt(goodcount.innerText);
    var listlis = listul.children;
    var listlislen = listul.children.length;
    if (listlislen == 0) {
        goodcount.style.display = 'none';
    }
    for (var i = 0; i < listlislen; i++) {
        totalcount = totalcount + parseInt(listlis[i].children[2].children[1].value);
        totalprice = totalprice + parseInt(listlis[i].children[2].children[1].value) * parseInt(listlis[i].children[1].children[1].innerText.slice(1));
        console.log(totalprice);
    }
    goodcount.innerText = totalcount;
    listtotalprice.innerText = totalprice;
    // console.log(totalprice);
}
// console.log(parseInt(('￥150').slice(1)));