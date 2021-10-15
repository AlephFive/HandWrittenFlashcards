import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Line, Text } from 'react-konva';
import FCDataService from "../services/flashcard.services";
import { Link } from 'react-router-dom'

/*
Code from:
https://konvajs.org/docs/react/Free_Drawing.html
*/

const DrawingCanvas = () => {
  const [tool, setTool] = React.useState('pen');
  const [isAnnotating, setIsAnnotating] = React.useState(false);
  const [lines, setLines] = React.useState([]);
  const [annotations, setAnnotations] = React.useState([]);
  const isDrawing = React.useRef(false);
  const stageRef = React.useRef("TopLayer");

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    if(isAnnotating){
      setAnnotations([...annotations, { tool, points: [pos.x, pos.y] }]);
    }
    else{
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    }
    
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if(isAnnotating){
      let lastAnnotation = annotations[annotations.length - 1];
      // add point
      lastAnnotation.points = lastAnnotation.points.concat([point.x, point.y]);

      // replace last
      annotations.splice(annotations.length - 1, 1, lastAnnotation);
      setAnnotations(annotations.concat());
    }
    else{
      let lastLine = lines[lines.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    }
    
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleAnnotation = () => {
    if(isAnnotating){
      setIsAnnotating(false);
    }
    else{
      setIsAnnotating(true);
    }
  }


  const handleSave = () => {
    const uri = stageRef.current.toDataURL({
      pixelRatio: 0.2
    });
    console.log(uri);
    let data = {"Layer1":lines, "Layer2":annotations, "Preview":uri};

    FCDataService.create(data)
      .then((ref) => {
        console.log("Created new item successfully!");
      })
      .catch((e) => {
        console.log(e);
      });

  };







  return (
    <div>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <button onClick={handleSave}>
        Save
      </button>
      <button onClick={handleAnnotation}>
        {!isAnnotating ? "Annotation On":"Annotation Off"}
      </button>
      <Link to="/home">Home</Link>

      <Stage
        width={window.innerWidth * 0.8}
        height={window.innerHeight * 0.8}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onPointerDown={handleMouseDown}
        onPointerMove={handleMouseMove}
        onPointerUp={handleMouseUp}
        style={{"touch-action":"none", "border": "1px solid black"}}
      >
        <Layer ref={stageRef}>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
        {isAnnotating ?
          <Layer>
          {annotations.map((anno, i) => (
            <Line
              key={i}
              points={anno.points}
              stroke="#003186"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                anno.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
          </Layer> : null
        }
      </Stage>
      
    </div>
  );
};

export default DrawingCanvas;

//render(<App />, document.getElementById('root'));