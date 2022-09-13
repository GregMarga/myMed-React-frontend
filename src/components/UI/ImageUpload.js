
import React, { useRef, useState, useEffect, Fragment } from 'react';

import Button from '../../authentication/Button';
import Card from './Card';
import './ImageUpload.css';

const ImageUpload = props => {
  console.log(props.imageSource)
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(props.imageSource);
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {  //mporw na dialexw mono ena arxeio!
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      {/* <Fragment>
       <Card className='imageUploadCard'> */}
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"  //acceptable file types
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Παρακαλώ διαλέξτε μια φωτογραφία του ασθενή.</p>}
        </div>
        {!props.editBasics && <Button type="button" onClick={pickImageHandler}>
          {(!!props.imageSource) ? "Αλλάξτε Φωτογραφία" : "Επιλέξτε Φωτογραφία"}
        </Button>}
      </div>
      {!isValid && <p>{props.errorText}</p>}
      {/* </Card>
     </Fragment> */}
    </div>
  );
};

export default ImageUpload;
