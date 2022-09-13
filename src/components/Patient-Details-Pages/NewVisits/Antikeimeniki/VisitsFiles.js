import { Container } from "react-bootstrap";



const VisitsFiles = (props) => {
    return (
        <Container>
            {props.filesList.map(file => {
                return (
                    <a href={`http://localhost:5000/uploads/exams/${file.file.split('\\')[2]}`} target="_blank" key={file._id} >
                        {file.name}
                    </a>)
            })}
        </Container>
    )
}

export default VisitsFiles;