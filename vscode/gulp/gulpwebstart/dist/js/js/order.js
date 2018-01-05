'use strict';

function getStyle(ele, pro) {
    var style = parseInt(getComputedStyle(ele)[pro]);
    return style;
}
//头部横条
var orderselect = document.querySelector('.orderselect');
var ordernav = document.querySelector('nav');
var ordermargin = (getStyle(document.querySelectorAll('nav a')[0], 'width') - getStyle(orderselect, 'width')) / 2;
console.log(ordermargin);
orderselect.style.marginLeft = ordermargin + 'px';
ordernav.addEventListener('touchstart', function (e) {
    var offset = e.target.offsetLeft;
    orderselect.style.left = offset + 'px';
    var uls = document.querySelectorAll('section ul');
    var ulslen = uls.length;
    for (var i = 0; i < ulslen; i++) {
        if (uls[i].style.display == 'block') {
            uls[i].style.display = 'none';
        }
    }
    var orderul = document.getElementById(e.target.getAttribute("orderid"));
    orderul.style.display = 'block';
}, false);