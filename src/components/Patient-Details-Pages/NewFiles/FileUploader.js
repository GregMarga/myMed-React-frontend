import { useRef } from "react";
import { useDropzone } from 'react-dropzone'
import { useState } from "react";
import classes from './FileUploader.module.css';

const FileUploader = (props) => {

    const fileInput = useRef(null)
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: files => { props.setSelectedFile(files[0]) },
        accept: {
            'image/png': 'png',
            'image/jpeg': 'jpeg',
            'image/jpg': 'jpg',
            'application/pdf': 'pdf'
        },
        maxFiles: 1
    });


    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const handleFileInput = (e) => {
        console.log(e.target.files[0]);
        console.log(fileInput.current.value)
        console.log('here')
        // const file = e.target.files[0];
        // onFileSelect(e.target.files[0])
        // props.onFileSelectSuccess(file);
    }

    return (
        <section className={classes.container}>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} ref={fileInput} onChange={handleFileInput} />
                <p>Σύρετε εδώ ένα αρχείο , ή κλικάρετε για να επιλέξετε</p>
            </div>
            <aside>
                <h5>Αρχείο</h5>
                <ul>{files}</ul>
            </aside>
        </section>
        // <div className="file-uploader">
        //     <input type="file" onChange={handleFileInput} />
        //     <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"></button>
        // </div>
    )
}

export default FileUploader;