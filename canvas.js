




jQuery(document).ready(function(e) {
  function  linewidth(){
    var e = document.getElementById("linewidth");
var strUser = e.options[e.selectedIndex].text;
switch(strUser){
    case 1:
            console.log("hi"+strUser);
                break;
        case 2:
                console.log("hi"+strUser);
           
            case 3:
                    console.log("hi"+strUser);
              

}
return strUser;

}

    jQuery.fn.sign = function(options) {
        var params = jQuery.fn.extend({
            reset: options.resetButton ? options.resetButton : null,
            width: options.width ? options.width : 500,
            height: options.height ? options.height : 300,
        }, options);
        var canvas = jQuery(this);
      
        var context = canvas.get(0).getContext('2d');
        context.lineJoin = context.lineCap = 'round';
        var fixFingerPosition = 15;  
        canvas.attr("width",params.width);
            canvas.attr("height", params.height); 
            var points = [];
            var last = {x:null,y:null};
            var holdClick = false;

            var touch = function(e)
            {
                var touch = null;
                if (e.type !== 'click' && e.type !== 'mousedown' && e.type !== 'mousemove') {
                    touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                } else {
                    touch = e;
                }

                return ({x: touch.pageX, y: touch.pageY});
            }

            var getMousePosition = function(canvas, evt)
            {
                var rect = canvas.get(0).getBoundingClientRect();
                var pos = touch(evt);
                return {
                    x: pos.x + rect.left - fixFingerPosition,
                    y: pos.y - rect.top - fixFingerPosition
                };
            }

            var draw = function(ctx, x, y)
            {
                points.push({x: x, y: y, break: false});
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                var p1 = points[0];
                var p2 = points[1];

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y); 
                //taking the selected width
               var liiin= linewidth();
    
               if(liiin==1){  ctx.lineWidth=1;}
               else if(liiin==2){  ctx.lineWidth=2;}
               else if(liiin==3){  ctx.lineWidth=3;}
               else if(liiin==4){  ctx.lineWidth=4;}
               else if(liiin==5){  ctx.lineWidth=5;}
               else if(liiin==6){  ctx.lineWidth=6;}
               else if(liiin==7){  ctx.lineWidth=7;}
               else if(liiin==8){  ctx.lineWidth=8;}
               else if(liiin==9){  ctx.lineWidth=9;}
               else if(liiin==10){  ctx.lineWidth=10;}

               
               
  
                for (var i = 1; i < points.length; i++) {
                    var midPoint = calculateMiddlePoint(p1, p2);
                    if (p1.break) {
                        ctx.moveTo(p2.x, p2.y); 
                    } else {
                        ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
                    }
                    p1 = points[i];
                    p2 = points[i+1];
                }
                
              
                ctx.lineTo(p1.x, p1.y);
                ctx.stroke();
            }

            var calculateMiddlePoint = function(pointStart, pointEnd)
            {
                return {
                    x: pointStart.x + (pointEnd.x - pointStart.x) / 2 ,
                    y: pointStart.y + (pointEnd.y - pointStart.y) / 2
                }
            }

            // Mouse & touch events
            canvas.on('touchstart mousedown', function(e) {
                holdClick = true;
                var mousePosition = getMousePosition(canvas, e);                    
                points.push({x: mousePosition.x, y: mousePosition.y, break: false});
                return false;
            }).on('touchmove mousemove', function(e)
            {
                if (holdClick) {
                    var mousePosition = getMousePosition(canvas, e);                    
                    draw(context, mousePosition.x, mousePosition.y);
                }
                return false;
            }).on('touchend mouseup', function(e) {
                e.preventDefault();
                holdClick = false;
                points[points.length - 1].break = true;

                return false;
            });

            // Reset canvas
            var reset = function()
            {
                context.clearRect(0, 0, canvas.width(), canvas.height());
                points.length = 0;
                
            }

            if (params.reset !== null) {
                params.reset.on('click touchend', function()
                {
                    reset();
                });
            }
      };



           
                $('#myCanvas').sign({
                    resetButton: $('#resetSign'),
                    height:2000,
                    width:2000
                });
                
         
        
       
});
   
   
  