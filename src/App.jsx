import { Card, Container, Button, Icon } from "semantic-ui-react";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import "semantic-ui-css/semantic.min.css";

function App() {
  const videoCard = useRef();
  const photoCard = useRef();
  const [picture, setPicture] = useState(false);
  const openCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let myVideo = videoCard.current;

        myVideo.srcObject = stream;
        myVideo.onloadedmetadata = () => {
          myVideo.play();
        };
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const shotAPic = () => {
    const w = 430;
    const h = w / (16 / 9);
    let video = videoCard.current;
    let photo = photoCard.current;

    photo.width = w;
    photo.height = h;
    let contextPhoto = photo.getContext("2d");
    contextPhoto.drawImage(video, 0, 0, w, h);
    setPicture(true);
  };

  const closePic = () => {
    let pic = photoCard.current;
    let contextPhoto = pic.getContext("2d");
    contextPhoto.clearRect(0, 0, pic.width, pic.height);
    setPicture(false);
  };
  useEffect(() => {
    openCamera();
  }, [videoCard]);
  return (
    <>
      <Container className="my-app" fluid textAlign="center">
        <Card.Group centered>
          
          <Card>
            <video ref={videoCard}></video>
            <Card.Content>
              <Button color="green" onClick={shotAPic}>
                <Icon name="camera" />
                Take a Picture
              </Button>
            </Card.Content>
          </Card>

          <Card>
            <canvas ref={photoCard}></canvas>
            <Card.Content>
              <Button color="red" onClick={closePic}>
                <Icon name="close" />
                Close this Picture
              </Button>
            </Card.Content>
          </Card>
          
        </Card.Group>
      </Container>
    </>
  );
}

export default App;
