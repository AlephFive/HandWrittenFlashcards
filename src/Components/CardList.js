import React, { Component } from "react";
import FCDataService from "../services/flashcard.services";
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import noimg from './no_img.png';
import 'bootstrap/dist/css/bootstrap.min.css';

//https://www.bezkoder.com/react-firebase-crud/

export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    FCDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    FCDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let tutorials = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      //console.log(JSON.stringify(data))
      tutorials.push({
        key: key,
        preview: data["Preview"],
      });
    });

    this.setState({
      tutorials: tutorials,
    });
  }

  refreshList() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  removeAllTutorials() {
    FCDataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { tutorials, currentTutorial, currentIndex } = this.state;

    const rows = [];
    let rowRemainder = tutorials.length % 4;
    let newMax = tutorials.length + (4- rowRemainder);
    for(let i = 0; i<newMax; i+=4){
      rows.push(
      <Row>
        
        <Col xs={3}>
          {i<tutorials.length? 
            <Link to={"/viewCard/" + tutorials[i].key}><Image src={tutorials[i].preview} rounded fluid style={{"width": "170px", "height": "170px"}}/></Link> 
            : <div/>
          }
        </Col>
        <Col xs={3}>
        {i+1<tutorials.length? 
            <Link to={"/viewCard/" + tutorials[i+1].key}><Image src={tutorials[i+1].preview} rounded fluid style={{"width": "170px", "height": "170px"}}/> </Link>
            : <div/>
          }
        </Col>
        <Col xs={3}>
        {i+2<tutorials.length? 
            <Link to={"/viewCard/" + tutorials[i+2].key}><Image src={tutorials[i+2].preview} rounded fluid style={{"width": "170px", "height": "170px"}}/> </Link>
            : <div/>
          }
        </Col>
        <Col xs={3}>
        {i+3<tutorials.length? 
            <Link to={"/viewCard/" + tutorials[i+3].key}><Image src={tutorials[i+3].preview} rounded fluid style={{"width": "170px", "height": "170px"}}/> </Link>
            : <div/>
          }
        </Col>
      </Row>);
    }

    return (

      <Container>
        <Link to="/addCard">AddCard</Link>
        {rows}
        
      </Container>

    );
  }
}



/*
<div className="list row">
        <div className="col-md-6">
          <h4>FlashCard List</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.preview ? <img src={tutorial.preview}></img> : <div>{tutorial.key}</div>}
                    <Link to={"/viewCard/" + tutorial.key}>{tutorial.key}</Link>
                  
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
          <Link to="/addCard">AddCard</Link>
        </div>
        
      </div>
*/