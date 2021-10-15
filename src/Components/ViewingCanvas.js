import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Stage, Layer, Line, Text } from 'react-konva';
import FCDataService from "../services/flashcard.services";
import { Link } from 'react-router-dom'

function ViewingCanvas () {
   const [lines, setLines] = React.useState([]);
   const [isAnnotating, setIsAnnotating] = React.useState(false);
   const [annotations, setAnnotations] = React.useState([]);
   const { handle } = useParams()


  React.useEffect(() => {
    FCDataService.getAll().child(`/${handle}`).get()
    .then((value) => {
      if (value.exists()) {
        console.log(value.val());
        setLines(!value.val()["Layer1"] ? []: value.val()["Layer1"]);
        setAnnotations(!value.val()["Layer2"] ? []: value.val()["Layer2"]);
      } else {
        console.log("No data available");
      }
    })
    .catch((e) => {
      console.log(e);
    });
   }, handle)
   
   
   const handleAnnotation = () => {
    if(isAnnotating){
      setIsAnnotating(false);
    }
    else{
      setIsAnnotating(true);
    }
}
   

   return (
    <div>
        <button onClick={handleAnnotation}>
        {!isAnnotating ? "Annotation On":"Annotation Off"}
      </button>
      <Link to="/home">Home</Link>
      <Stage
        width={window.innerWidth * 0.8}
        height={window.innerHeight * 0.8}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
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
}

export default ViewingCanvas;