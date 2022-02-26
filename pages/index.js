import Head from "next/head";
import Image from "next/image";
import React, { useState, useRef } from "react";
import KimcCanvas from "../src/KimcCanvas";

export default function Home() {

  // canvas component ref
  const kimcCanvasRef = useRef();

  // canvas setting
  const [canvasWidth, setCanvasWidth] = useState('1920px');
  const [canvasHeight, setCanvasHeight] = useState('1080px');
  const [backgroundColor, setBackgroundColor] = useState('rgba(0,0,0,0.1)');
  const [strokeStyle, setStrokeStyle] = useState('rgba(255,0,255,0.1)');
  const [lineWidth, setLineWidth] = useState(10);
  const [isDrawing, setIsDrawing] = useState(false);
  const [eraser, setEraser] = useState(false);
  const [imageFile, setImageFile] = useState([]);

  // lookup the options in the docs for more options
  const kimcCanvasOptions = {
    
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    backgroundColor: backgroundColor,

    // ctx setting
    strokeStyle: strokeStyle,
    lineWidth: lineWidth,

    isDrawing: isDrawing,


    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
    imageFile: imageFile,

  };

  return (
    <div className="kimc-main">
      <KimcCanvas kimcCanvasOptions={kimcCanvasOptions} ref={kimcCanvasRef}/>
      
      {/* <button className="kimc-main-ui-btn">
        This button will be modified
      </button> */}

      <div className="kimc-main-ui-control">
      <div><span>canvasWidth</span><input type="text" placeholder={canvasWidth} onChange={e=> setCanvasWidth(e.target.value)} /></div>
      <div><span>canvasHeight</span><input type="text" placeholder={canvasHeight} onChange={e=> setCanvasHeight(e.target.value)} /></div>
      <div><span>backgroundColor</span><input type="text" placeholder={backgroundColor} onChange={e=> setBackgroundColor(e.target.value)} /></div>
      <div><span>strokeStyle</span><input type="text" placeholder={strokeStyle} onChange={e=> setStrokeStyle(e.target.value)} /></div>
      <div><span>lineWidth</span><input type="text" placeholder={lineWidth} onChange={e=> setLineWidth(e.target.value)} /></div>

      <div><input type="file" placeholder={imageFile.name} onChange={e=> setImageFile(e.target.files[0])} /></div>

      {/* <div><button onClick={()=>kimcCanvasRef.current.saveCanvas()}>save</button></div>
      <div><button onClick={()=>kimcCanvasRef.current.loadCanvas()}>load</button></div> */}
      <div><button onClick={()=>kimcCanvasRef.current.exportCanvas()}>export</button></div>
      <div><button onClick={()=>kimcCanvasRef.current.undo()}>undo</button></div>
      <div><button onClick={()=>kimcCanvasRef.current.redo()}>redo</button></div>
      <div><button onClick={()=>kimcCanvasRef.current.addShape()}>add shape</button></div>
      <div><button onClick={()=>kimcCanvasRef.current.eraserMode()}>eraser mode</button></div>
      <div><button onClick={()=>kimcCanvasRef.current.penMode()}>pen mode</button></div>
      <div><button onClick={()=>kimcCanvasRef.current.selectorMode()}>selector mode</button></div>
      </div>

    </div>
  );
}
