(function() {
    var requestFrame = (function() {
        return window.requestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.oRequestAnimationFrame ||
               window.msRequestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               function(callback) {
                   setTimeout(callback, 30);
               };
    })();

    window.addEventListener('load', function(e) {
        console.log('woo');
        var c = document.createElement('canvas');
        c.setAttribute('id', 'twist');
        var wid = 200;
        var hgt = 84;

        c.width = wid;
        c.height = hgt;
        var ctx = c.getContext('2d');
        document.body.appendChild(c);

        var o = wid/10;
        var w = 1.75 * o;
        var s = Math.PI * 2 / 3;
        var clor = ['#080', '#0c0', '#0a0'];
        var r = new Array(3);

        function x(a) {
            return wid/2 + o * Math.cos(a);
        }

        function z(a) {
            return wid/2 + o * Math.sin(a);
        }

        function loop(t) {
            ctx.clearRect(0,0,wid,hgt);
            rate = .01 * Math.sin(t/1020);
            for (var y=0; y<hgt; y++) {
                var a = y * rate - t/400;
                for (var i=0; i<3; i++) {
                    r[i] = [z(a+i*s),x(a+i*s),clor[i]];
                }
                r.sort(function(a,b) {
                    return b[0] - a[0];
                }).forEach(function(v) {
                    seg(v[2], v[1] + Math.cos((t-y)/500) * wid/10,y);
                });
            }
            requestFrame(loop);
        }

        function seg(c, x, y) {
            ctx.fillStyle = c;
            ctx.fillRect(x-w/2, y, w, 1);
        }

        requestFrame(loop);
    });
})();