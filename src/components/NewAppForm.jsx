import { useEffect, useState } from "react";
import './NewAppForm.css'

export default function NewAppForm({ onSubmit, closeModal, mode = "edit", job }){


    const [jobData, setJobData] = useState({id: '', company: '', title: '', status: '', date: '', url: '', notes: ''})


    useEffect(() => {
        if (job) {
            setJobData(job);
        }
        console.log(job)
    }, [job])   


    function handleChange(e) {
        const {name, value} = e.target;
        setJobData(prev => ({...prev, [name]: value,}))
    }

    function handleSubmit(e){
        onSubmit(jobData)
        closeModal()
    }


    return(
        <div className="modal-backdrop">
            <h2>{mode == "edit" ? "Edit Application" : "New Application"}</h2>
            <button className="xButton" onClick={closeModal}>&times;</button>
            <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-q">
                    <label htmlFor='company'>Company Name</label>
                    <input 
                        type="text" 
                        id="company" 
                        name="company" 
                        value={jobData.company} 
                        onChange={handleChange}
                        placeholder="Enter company name"
                    />
                </div>
                <div className="form-q">
                    <label htmlFor='title'>Job Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={jobData.title} 
                        onChange={handleChange}
                        placeholder="Enter job title"
                    />
                </div>
                <div className="form-q">
                    <label htmlFor='status'>Status</label>
                    <select 
                        value={jobData.status} 
                        onChange={handleChange} 
                        id="status" 
                        name="status"
                    >
                        <option value="" disabled>Select status</option>
                        <option value="interview">Interview</option>
                        <option value="applied">Applied</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <div className="form-q">
                    <label htmlFor='date'>Date Applied</label>
                    <input 
                        type="date" 
                        id="date" 
                        name="date"  
                        value={jobData.date} 
                        onChange={handleChange}
                    />
                </div>
                <div className="form-q">
                    <label htmlFor='url'>Job URL</label>
                    <input 
                        type="url" 
                        id="url" 
                        name="url" 
                        value={jobData.url} 
                        onChange={handleChange}
                        placeholder="https://"
                    />
                </div>
                <div className="form-q">
                    <label htmlFor='notes'>Notes</label>
                    <textarea 
                        id="notes" 
                        name="notes" 
                        value={jobData.notes} 
                        onChange={handleChange}
                        placeholder="Add any additional notes..."
                        rows="4"
                    />
                </div>
                <button className="submitButton" type="submit">
                    {mode === "edit" ? "Save Changes" : "Create Job"}
                </button>
            </form>
        </div>
    )
}