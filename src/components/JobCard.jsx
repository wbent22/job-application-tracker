export default function JobCard(props) {

    return(
        <section className="card">
            <p>{props.job.company}</p>
            <p>{props.job.title}</p>
            <p>{props.job.status}</p>
            <button className="edit-button" onClick={() => {props.handleEdit(props.job)}}>Edit</button>
            <button className="delete-button" onClick={() => {props.delete(props.job.id)}}>Delete</button>
        </section>
    )
}