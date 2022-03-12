<div align="center">
<h1>Kimc React Canvas Draw</h1>
</div>

> Simply lets Draw something on canvas


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Why

I made this project
because I could not find any open souce library that fits my need of
simple drawing tool for react that could easily be used for other projects

가벼운 오픈 라이프러리를 사용해서 캔버스 그림판을 만들고자 했는데
그러한 오픈 소스 라이브러리를 찾을수 없어서 직접 만듬

### Demo

<br />
<br />

<p align="center">
  <img src="./show/ver01.gif" alt="screenshot">
</p>

<br />
<br />

### Development Log

2022-03-12
made simple raster graphics based app with simple functions 
then realised that I should remake the entire thing using vector graphics

래스터 기반으로 간단하게 만들다가 벡터 그래픽 기반으로 바꿔야 된다는 생각이 들었음

Pending
보류중


<br />
<br />

### Functions

done   

done   

TODO   
Save
Load
Export
Clear
paint
Erase
eraseAll
undo
redo
moving objects
text
sticker   
TODO   

## Getting Started

Pull Repo and use it   
or use KimcCanvas component and use index.js as reference

```bash
# made using next
yarn create next-app

# run
npm run dev
yarn dev
```

### Props

``` javascript
  const kimcCanvasOptions = {
    // canvas setting
    width: "1920px",
    height: "1080px",
    backgroundColor: "rgba(0,0,0,0.1)",

    // ctx setting
    strokeStyle: "rgba(255,0,255,0.1)",
    lineWidth: 10,

    isDrawing: false,
  };
```

## reference

https://reactjs.org/
https://www.youtube.com/watch?v=FLESHMJ-bI0

https://github.com/excalidraw/excalidraw
https://github.com/konvajs/konva
https://github.com/embiem/react-canvas-draw
https://github.com/tldraw/tldraw

https://github.com/Desousak/svg-pen-sketch
https://editor.method.ac/
https://github.com/svgdotjs/svg.draw.js/

## reference02
https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save

https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
