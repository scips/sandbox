'use strict'

export class Application {
    constructor() {
        // gl context
        this.gl = null;
        // exceptions queue
        this.exceptions = [];
        this.mvMatrix = mat4.create();
        this.pMatrix = mat4.create();
        this.shaderProgram = null;
        this.triangleVertexPositionBuffer = null;
        this.squareVertexPositionBuffer = null;
        console.log('contructor called');
    }
    logException(ex){
        push(this.exceptions,ex);
        console.log(ex)
    }
    setCanvas(element) {
        try {
            console.log("canvas set");
            this.gl = element.getContext('webgl') || element.getContext('experimental-webgl');
            console.log("canvas set");
            this.gl.viewportWidth = element.width;
            console.log("canvas set");
            this.gl.viewportHeight = element.height;
            console.log("canvas set");
        } catch(e) {
            this.logException(e);
        }
        console.log("canvas set");
        return this;
    }
    initShaders() {
      var fragmentShader = this.getShader(this.gl, "shader-fs");
      var vertexShader = this.getShader(this.gl, "shader-vs");
      // Create the shader program
      this.shaderProgram = this.gl.createProgram();
      this.gl.attachShader(this.shaderProgram, vertexShader);
      this.gl.attachShader(this.shaderProgram, fragmentShader);
      this.gl.linkProgram(this.shaderProgram);
      // If creating the shader program failed, alert
      if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
        this.logException("Unable to initialize the shader program.");
      }
      this.gl.useProgram(this.shaderProgram);
      this.shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
      this.gl.enableVertexAttribArray(vertexPositionAttribute);
      this.shaderProgram.pMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uPMatrix");
      this.shaderProgram.mvMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
    }
    getShader(gl, id) {
        var shaderScript, theSource, currentChild, shader;
        shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }
        theSource = "";
        currentChild = shaderScript.firstChild;
        while(currentChild) {
            if (currentChild.nodeType == currentChild.TEXT_NODE) {
                theSource += currentChild.textContent;
            }
            currentChild = currentChild.nextSibling;
        }
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            // Unknown shader type
            return null;
        }
        gl.shaderSource(shader, theSource);
        // Compile the shader program
        gl.compileShader(shader);  
        // See if it compiled successfully
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
            this.logException("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }
    initBuffers() {
        this.triangleVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexPositionBuffer);
        var vertices = [
             0.0,  1.0,  0.0,
            -1.0, -1.0,  0.0,
             1.0, -1.0,  0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.triangleVertexPositionBuffer.itemSize = 3;
        this.triangleVertexPositionBuffer.numItems = 3;

        this.squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
        vertices = [
             1.0,  1.0,  0.0,
            -1.0,  1.0,  0.0,
             1.0, -1.0,  0.0,
            -1.0, -1.0,  0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.squareVertexPositionBuffer.itemSize = 3;
        this.squareVertexPositionBuffer.numItems = 4;
    }
    drawScene() {
        this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        mat4.perspective(45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0, pMatrix);

        mat4.identity(mvMatrix);

        mat4.translate(mvMatrix, [-1.5, 0.0, -7.0]);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
        this.gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
        this.setMatrixUniforms();
        this.gl.drawArrays(this.gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);


        mat4.translate(mvMatrix, [3.0, 0.0, 0.0]);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        this.gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
        this.setMatrixUniforms();
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
    }
    setMatrixUniforms() {
        this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, pMatrix);
        this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, mvMatrix);
    }
    webGLStart() {
        this.initShaders();
        this.initBuffers();

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(gl.DEPTH_TEST);

        this.drawScene();
        console.log("webGLStart called");
    }
}