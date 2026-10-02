class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        this.drawBezierCurve({x: 0, y: 300}, {x: 200, y: 600}, {x: 100, y: 0}, {x: 350, y: 300}, this.num_curve_sections, [0, 0, 0, 255], framebuffer);
        this.drawBezierCurve({x: 350, y: 300}, {x: 600, y: 600}, {x: 200, y: 600}, {x: 450, y: 300}, this.num_curve_sections, [0, 0, 0, 255], framebuffer);
        this.drawBezierCurve({x: 450, y: 300}, {x: 650, y: 0}, {x: 700, y: 600}, {x: 800, y: 300}, this.num_curve_sections, [0, 0, 0, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        const colors = [
            [255,0,0,255],
            [255,127.5,0,255],
            [255,255,0,255],
            [127.5,255,0,255],
            [0,255,0,255],
            [0,255,127.5,255],
            [0,255,255,255],
            [0,127.5,255,255],
            [0,0,255,255],
            [127.5,0,255,255],
            [255,0,255,255],
            [255,0,127.5,255],
        ]
        for(let i = 1; i<=12; i++) {
            this.drawCircle({x: 400, y: 325}, i*20, this.num_curve_sections, colors[i-1], framebuffer)
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        const green = [44,163,79,255];
        const blue = [160,229,249,255];
        const yellow = [246, 172, 0, 255];
        const orange = [237, 76, 0, 255];
        const brown = [174, 75, 18, 255];

        //Background
        let point_list = [{x: 0, y: 48}, {x: 800, y: 48}, {x: 800, y: 150}, {x: 0, y: 150}];
        this.drawConvexPolygon(point_list, green, framebuffer);
        point_list = [{x: 0, y: 150}, {x: 800, y: 150}, {x: 800, y: 600}, {x: 0, y: 600}]
        this.drawConvexPolygon(point_list, blue, framebuffer);

        //Sun
        point_list = [{x: 140, y: 500}, {x: 125, y: 535}, {x: 90, y: 550}, {x: 55, y: 535}, {x: 40, y: 500}, {x: 55, y: 465}, {x: 90, y: 450}, {x: 125, y: 465}];
        this.drawConvexPolygon(point_list, yellow, framebuffer);
        point_list = [{x: 140, y: 500}, {x: 125, y: 535}, {x: 163, y: 530}];
        this.drawConvexPolygon(point_list, yellow, framebuffer);
        point_list = [{x: 90, y: 550}, {x: 125, y: 535}, {x: 120, y: 573}];
        this.drawConvexPolygon(point_list, yellow, framebuffer);
        point_list = [{x: 90, y: 550}, {x: 55, y: 535}, {x: 60, y: 573}];
        this.drawConvexPolygon(point_list, yellow, framebuffer);
        point_list = [{x: 40, y: 500}, {x: 55, y: 535}, {x: 17, y: 530}];
        this.drawConvexPolygon(point_list, yellow, framebuffer);
        point_list = [{x: 40, y: 500}, {x: 55, y: 465}, {x: 17, y: 470}];
        this.drawConvexPolygon(point_list, yellow, framebuffer);
        point_list = [{x: 90, y: 450}, {x: 55, y: 465}, {x: 59, y: 427}];
        this.drawConvexPolygon(point_list, yellow, framebuffer);
        point_list = [{x: 90, y: 450}, {x: 125, y: 465}, {x: 120, y: 427}];
        this.drawConvexPolygon(point_list, yellow, framebuffer);
        point_list = [{x: 140, y: 500}, {x: 125, y: 465}, {x: 163, y: 470}];
        this.drawConvexPolygon(point_list, yellow, framebuffer);

        //Duck
        point_list = [{x: 225, y: 150}, {x: 275, y: 150}, {x: 250, y: 195}];
        this.drawConvexPolygon(point_list, orange, framebuffer);
        point_list = [{x: 275, y: 150}, {x: 325, y: 150}, {x: 300, y: 195}];
        this.drawConvexPolygon(point_list, orange, framebuffer);
        point_list = [{x: 300, y: 195}, {x: 250, y: 195}, {x: 225, y: 250}, {x:275, y: 250}, {x: 330, y: 280}];
        this.drawConvexPolygon(point_list, yellow, framebuffer);
        point_list = [{x: 330, y: 280}, {x: 375, y: 300}, {x: 415, y: 300}, {x: 370, y: 280}];
        this.drawConvexPolygon(point_list, orange, framebuffer);

        //Stand
        point_list = [{x: 525, y: 150}, {x: 775, y: 150}, {x: 775, y: 250}, {x: 525, y: 250}];
        this.drawConvexPolygon(point_list, brown, framebuffer);
        point_list = [{x: 525, y: 350}, {x: 775, y: 350}, {x: 775, y: 425}, {x: 525, y: 425}];
        this.drawConvexPolygon(point_list, brown, framebuffer);
        point_list = [{x: 525, y: 350}, {x: 535, y: 350}, {x: 535, y: 250}, {x: 525, y: 250}];
        this.drawConvexPolygon(point_list, brown, framebuffer);
        point_list = [{x: 765, y: 350}, {x: 775, y: 350}, {x: 775, y: 250}, {x: 765, y: 250}];
        this.drawConvexPolygon(point_list, brown, framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        const main_color = [75,75,75,255];
        const secondary_color = [0,0,0,255];
        
        // E
        let point_list = [{x: 10, y:500}, {x: 110, y:500}, {x: 110, y: 465}, {x: 10, y:465}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x: 10, y:300}, {x: 110, y:300}, {x: 110, y: 265}, {x: 10, y:265}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x: 10, y:465}, {x: 10, y:300}, {x: 45, y: 300}, {x: 45, y:465}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x: 45, y:397}, {x: 80, y:397}, {x: 80, y: 366}, {x: 45, y:366}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);

        point_list = [{x:110, y:265}, {x: 90, y: 245}, {x:10, y: 245}, {x:10, y:265}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:0, y:490}, {x: 10, y: 500}, {x:10, y: 245}, {x:0, y:245}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:80, y:366}, {x: 60, y: 346}, {x:45, y: 346}, {x:45, y:366}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:110, y:465}, {x: 90, y: 445}, {x:45, y: 445}, {x:45, y:465}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);

        // L
        point_list = [{x: 150, y:500}, {x: 150, y:300}, {x: 185, y: 300}, {x: 185, y:500}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x: 150, y:300}, {x: 250, y:300}, {x: 250, y: 265}, {x: 150, y:265}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);

        point_list = [{x:250, y:265}, {x: 230, y: 245}, {x:150, y: 245}, {x:150, y:265}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:150, y:245}, {x: 130, y: 245}, {x:130, y: 480}, {x:150, y:500}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        
        // I
        point_list = [{x: 280, y:300}, {x: 380, y:300}, {x: 380, y: 265}, {x: 280, y:265}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x: 280, y:500}, {x: 380, y:500}, {x: 380, y: 465}, {x: 280, y:465}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x: 315, y:465}, {x: 315, y:300}, {x: 345, y: 300}, {x: 345, y:465}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);

        point_list = [{x:380, y:265}, {x: 360, y: 245}, {x: 280, y: 245}, {x:280, y:265}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:280, y:300}, {x: 260, y: 280}, {x:260, y: 245}, {x:280, y:245}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:280, y:500}, {x: 260, y: 480}, {x:260, y: 445}, {x:280, y:445}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:280, y:465}, {x: 295, y: 465}, {x:295, y: 445}, {x:280, y:445}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:295, y:465}, {x: 315, y: 465}, {x:315, y: 300}, {x:295, y:300}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:380, y:465}, {x: 360, y: 445}, {x:345, y: 445}, {x:345, y:465}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);

        // J
        point_list = [{x:410, y:500}, {x: 390, y: 480}, {x:390, y: 445}, {x:410, y:445}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:510, y:465}, {x: 490, y: 445}, {x:410, y: 445}, {x:410, y:465}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:430, y:445}, {x: 445, y: 370}, {x:465, y: 370}, {x:465, y:445}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:445, y:370}, {x: 435, y: 300}, {x:480, y: 370}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:390, y:280}, {x: 390, y: 245}, {x:410, y: 245}, {x:410, y:300}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:410, y:245}, {x: 410, y: 265}, {x: 490, y:355}, {x:475, y: 285}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);

        point_list = [{x: 410, y:500}, {x: 510, y:500}, {x: 510, y: 465}, {x: 410, y:465}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x: 445, y:465}, {x: 465, y:370}, {x: 495, y: 370}, {x: 475, y:465}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x: 465, y:370}, {x: 495, y: 370}, {x: 470, y:300}, {x: 445, y: 325}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x:410, y:300}, {x: 445, y:325}, {x: 470, y: 300}, {x: 410, y:265}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        
        

        // A
        point_list = [{x:550, y:500}, {x: 530, y: 480}, {x: 490, y:245}, {x:510, y: 245}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:545, y:265}, {x: 525, y: 245}, {x: 510, y:245}, {x:510, y: 265}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:600, y:480}, {x: 600, y: 346}, {x: 550, y:346}, {x:550, y: 480}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:615, y:265}, {x: 595, y: 245}, {x: 630, y:245}, {x:650, y: 265}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:595, y:245}, {x: 580, y: 346}, {x: 625, y:346}, {x:625, y: 265}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);

        point_list = [{x: 550, y:500}, {x: 510, y:265}, {x: 545, y: 265}, {x:580, y:465}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x: 610, y:500}, {x: 650, y:265}, {x: 615, y: 265}, {x:580, y:465}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x: 550, y:500}, {x: 610, y:500}, {x: 580, y: 465}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x: 550, y:397}, {x: 620, y:397}, {x: 620, y: 366}, {x: 550, y:366}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        

        // H
        point_list = [{x:670, y:500}, {x: 650, y: 480}, {x: 650, y:245}, {x:670, y: 245}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:670, y:245}, {x: 670, y: 265}, {x: 705, y:265}, {x:685, y: 245}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:670, y:500}, {x: 650, y: 480}, {x: 650, y:245}, {x:670, y: 245}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:755, y:500}, {x: 735, y: 480}, {x: 735, y:245}, {x:755, y: 245}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:755, y:245}, {x: 755, y: 265}, {x: 790, y:265}, {x:770, y: 245}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);
        point_list = [{x:755, y:366}, {x: 705, y: 366}, {x: 705, y:346}, {x:755, y: 346}];
        this.drawConvexPolygon(point_list, secondary_color, framebuffer);

        point_list = [{x: 670, y:500}, {x: 670, y:265}, {x: 705, y: 265}, {x: 705, y:500}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x: 755, y:500}, {x: 755, y:265}, {x: 790, y: 265}, {x: 790, y:500}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);
        point_list = [{x: 705, y:397}, {x: 755, y:397}, {x: 755, y: 366}, {x: 705, y:366}];
        this.drawConvexPolygon(point_list, main_color, framebuffer);

        
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        let oldPoint;
        let newPoint = p0;
        for(let i = 1; i<=num_edges; i++) {
            let t = (i/(num_edges));
            oldPoint = newPoint;
            newPoint = {x: Math.round(this.findParametricPoint(p0.x,p1.x,p2.x,p3.x, t)), y: Math.round(this.findParametricPoint(p0.y,p1.y,p2.y,p3.y,t))};
            this.drawLine(oldPoint, newPoint, color, framebuffer);
            if(this.show_points) this.drawVertex(newPoint, color, framebuffer);
        }
        
        if(this.show_points) {
            this.drawControlVertex(p1, color, framebuffer);
            this.drawControlVertex(p2, color, framebuffer);
        }
    }

    // value0:  int, represting the first point's x or y value
    // value1:  int, represting the second point's x or y value
    // value2:  int, represting the third point's x or y value
    // value3:  int, represting the fourth point's x or y value
    // t:       float, representing the t value in a parametric equation
    findParametricPoint(value0, value1, value2, value3, t) {
        const tC = 1-t;
        return tC**3*value0 + tC**2*3*t*value1 + t**2*3*tC*value2 + t**3*value3;
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        const theta = (2*Math.PI)/num_edges;
        let oldPoint;
        let newPoint = {x: center.x+radius, y: center.y};
        for(let i = 1; i<=num_edges; i++) {
            console.log(newPoint);
            oldPoint = newPoint;
            newPoint = {x: Math.round(center.x + radius*Math.cos(theta*i)), y: Math.round(center.y + radius*Math.sin(theta*i))}
            this.drawLine(oldPoint, newPoint, color, framebuffer);
            if(this.show_points) this.drawVertex(newPoint, color, framebuffer);
        }
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        if(vertex_list.length < 3) return;
        const point1 = vertex_list[0];
        for(let i=0; i<vertex_list.length-2; i++) {
            const point2 = vertex_list[i+1];
            const point3 = vertex_list[i+2];
            this.drawTriangle(point1, point2, point3, color, framebuffer);
        }

        if(this.show_points) {
            for(const v of vertex_list) {
                this.drawVertex(v, color, framebuffer);
            }
        }
        
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        this.drawLine({x: v.x+5, y: v.y+5},{x: v.x-5, y:v.y-5}, color, framebuffer);
        this.drawLine({x: v.x+5, y: v.y-5},{x: v.x-5, y:v.y+5}, color, framebuffer);
    }

    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawControlVertex(v, color, framebuffer) {
        this.drawTriangle({x: v.x, y: v.y+5},{x: v.x-5, y: v.y-5},{x: v.x+5, y: v.y-5}, color, framebuffer);
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
