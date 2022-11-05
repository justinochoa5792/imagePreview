import { useState } from "react";
import ImgPreview from "./ImgPreview";
import "./App.css";

function App() {
  const [imgSrc, setImgSrc] = useState("");

  const handleChange = (e) => {
    var reader = new FileReader();

    reader.onload = function (e) {
      setImgSrc(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleClose = () => {
    setImgSrc(undefined);
  };

  return (
    <div className="App">
      <h1>Upload Image Here</h1>
      <input type="file" onChange={handleChange} accept="image" />
      {imgSrc && <ImgPreview imageSrc={imgSrc} onClose={handleClose} />}
    </div>
  );
}

export default App;
