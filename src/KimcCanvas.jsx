import React, { useEffect, useState,useImperativeHandle } from "react";
import { useRef } from "react";

// ratio for pixel normalization
// 픽셀 정규화(보정)를 위한 비율 
const getPixelRatio = (context) => {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
};

const KimcCanvas = (props, kimcCanvasRef) => {
  const canvasRef = useRef();
  const contextRef = useRef();

  const [context, setContext] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSnapShotStack, setCanvasSnapShotStack] = useState([])
  const [canvasSnapShotStep, setCanvasSnapShotStep] = useState(-1)

  useEffect(() => {

    // canvas setting
    // 캔버스 세팅
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const pixelRatio = getPixelRatio(context);
    canvas.width = pixelRatio * getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    canvas.height = pixelRatio * getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);

    // brush setting
    // 브러쉬 세팅
    context.strokeStyle = props.kimcCanvasOptions.strokeStyle;
    context.lineWidth = props.kimcCanvasOptions.lineWidth;

    // todo 작업중
    // let requestId;
    // let i = 0;
    // const render = () => {
    //   context.clearRect(0, 0, canvas.width, canvas.height);

    //   context.beginPath();
    //   //context.arc(canvas.width / 4 + 2,canvas.height / 4, (canvas.width / 4) * Math.abs(Math.cos(i)),0,2*Math.PI);
    //   const w = canvas.width / 2;
    //   const h = canvas.height / 2;

    //   const d = Math.min(w, h);
    //   const k = Math.sin(i) * 10;

    //   context.strokeStyle = "#fff";
    //   context.strokeWeight = canvas.width / 100;
    //   context.shadowOffsetX = canvas.width / 100;
    //   context.shadowOffsetY = canvas.height / 100;
    //   context.lineWidth = canvas.width / 40;
    //   context.fillStyle = "rgba(254, 12, 13, 1)";

    //   //console.log(k);
    //   context.moveTo(d, d);
    //   context.quadraticCurveTo(
    //     (24 * d) / 16,
    //     (10 * d) / 16,
    //     d,
    //     (5 * d) / 4 + k
    //   );
    //   context.quadraticCurveTo((8 * d) / 16, (10 * d) / 16, d, d);
    //   context.stroke();
    //   context.fill();

    //   i += 0.05;
    //   requestId = requestAnimationFrame(render);
    //   //console.log(requestId);
    // };

    // render();

    // context setting



    // context 설정
    contextRef.current = context;
    setContext(context);

    // todo 작업중
    // return () => {
    //   cancelAnimationFrame(requestId);
    // };
  }, [props.kimcCanvasOptions.canvasWidth, props.kimcCanvasOptions.canvasHeight]);


// change brush colour
// 브러쉬 색상 조절
useEffect (()=>{
  if(context){
    context.strokeStyle = props.kimcCanvasOptions.strokeStyle;
    contextRef.current = context;
    setContext(context);
  }
}, [props.kimcCanvasOptions.strokeStyle])


// change brush line width
// 브러쉬 라인 너비 조절
useEffect (()=>{
  if(context){
    context.lineWidth = props.kimcCanvasOptions.lineWidth;
    contextRef.current = context;
    setContext(context);
  }
}, [props.kimcCanvasOptions.lineWidth])

// image file loading
// 이미지 파일 로딩
// https://stackoverflow.com/questions/10209227/open-local-image-in-canvas
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
useEffect (()=>{
  if(context){
    var img = new Image();
        var f = props.kimcCanvasOptions.imageFile;
        var url = window.URL || window.webkitURL;
        var src = url.createObjectURL(f);
    img.src = src;
    img.onload = function() {
        const dwidth = (canvasRef.current.width) /2;
        const dHeight = dwidth * (img.naturalHeight / img.naturalWidth);
        const dx = (canvasRef.current.width) /4;
        const dy = (canvasRef.current.height) /8;
        context.drawImage(img, dx, dy, dwidth, dHeight);
        url.revokeObjectURL(src);
    }
    contextRef.current = context;
    setContext(context);
  }
}, [props.kimcCanvasOptions.imageFile])



  const startDrawing = (nativeEvent) => {
    setIsDrawing(true);
  }

  const stopDrawing = () => {
    setIsDrawing(false);
  }

  const stopDrawingAndSave = () => {
    if(isDrawing){
      snapShotStackPush();
    }
    setIsDrawing(false);
  }

  const drawing = ({nativeEvent})=>{
    const{offsetX, offsetY} = nativeEvent;

    if(context){
      if(!isDrawing){
        console.log("is not drawing");
        context.beginPath();
        context.moveTo(offsetX,offsetY);
      }
      else{
        console.log("is drawing");
        context.lineTo(offsetX,offsetY);
        context.stroke();
      }
    }


  }


// redo undo handling
const snapShotStackPush = () =>{

  if(canvasRef.current.toDataURL().length == canvasSnapShotStack[stepIdx]){
    return;
  }

  let stepIdx = canvasSnapShotStep;
  let StepArr = canvasSnapShotStack;

  stepIdx = stepIdx + 1;
  if(stepIdx < StepArr.length){
    if(stepIdx < 0){
      stepIdx = 1;
    }
    StepArr.splice(stepIdx);
  }
  StepArr.push(canvasRef.current.toDataURL());

  setCanvasSnapShotStep(stepIdx);
  setCanvasSnapShotStack(StepArr);
}

const snapShotStackUndo = () => {
  let stepIdx = canvasSnapShotStep;
  if (stepIdx > 0) {
    stepIdx--;
      const canvasImg = new Image();
      canvasImg.src = canvasSnapShotStack[stepIdx];
      canvasImg.onload = function () { 
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(canvasImg, 0, 0); 
        contextRef.current = context;
        setContext(context);
      }
  }
  setCanvasSnapShotStep(stepIdx);
}


const snapShotStackRedo = () =>{
  let stepIdx = canvasSnapShotStep;
  if (canvasSnapShotStep < canvasSnapShotStack.length-1) {
    stepIdx++;
    const canvasImg = new Image();
      canvasImg.src = canvasSnapShotStack[canvasSnapShotStep];
      canvasImg.onload = function () { 
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(canvasImg, 0, 0); 
        contextRef.current = context;
        setContext(context);
      }
  }
  setCanvasSnapShotStep(stepIdx);
}


  // external call functions
  // 외부에서 불러오는 함수들
  useImperativeHandle(kimcCanvasRef, () => ({
    saveCanvas: () => {
      // todo
      // 작업중인 기능
      if(context){
        context.save();
      }
    },

    // https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
    // https://stackoverflow.com/questions/51945711/unable-to-download-react-canvas-drawing
    exportCanvas: () => {
      var link = document.createElement('a');
      link.setAttribute('download', 'canvas.png');
      link.setAttribute('href', canvasRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream"));
      link.click();
    },
    loadCanvas: () => {
      // todo
      // 작업중인 기능
      context.restore();
      contextRef.current = context.restore();
      setContext(context);
      snapShotStackPush();
    },
    undo: () => {
      snapShotStackUndo();
    },
    redo: () => {
      snapShotStackRedo();
    },
    eraserMode: () => {
      console.log("hello333333333");
    },
    selectorMode: () => {
      console.log("hello333333333");
    },
    penMode: () => {
      console.log("hello333333333");
    },
    addShape: () => {
      console.log("hello333333333");
    }
  }));

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawingAndSave}
      onMouseLeave={stopDrawing}
      onMouseMove={drawing}

      style={{
        position: "relative",
        width: props.kimcCanvasOptions.canvasWidth,
        height: props.kimcCanvasOptions.canvasHeight,
        backgroundColor: props.kimcCanvasOptions.backgroundColor,
      }}
    />
  );
};

export default React.forwardRef(KimcCanvas);

// ref
// https://codemasterkimc.tistory.com
