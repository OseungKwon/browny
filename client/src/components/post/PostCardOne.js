import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMouse } from "@fortawesome/free-solid-svg-icons";


import brownieImg from '../../img/brownie_img.jpeg';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function PostCardOne() {
  const classes = useStyles();
  
  /** 샘플데이터용 */
  const arr = () => {
    const result = [];
    for (let i = 0; i < 200; i++) {
      result.push(i);
    }
    return result;
  };

  return (
    <>
      {
        arr().map(() => {
          return (
            <Link to="" className="col-md-4 mt-5 text-decoration-none">
              <Card>
                <CardImg top width="100%" src={ brownieImg} alt="Card image cap" />
                <CardBody>
                  <CardTitle tag="h5">Card title</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  <Button>Button</Button>
                </CardBody>
                </Card>
            </Link>
          )
        })
      }
      
    </>  
  );
}