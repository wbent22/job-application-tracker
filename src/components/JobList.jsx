import {useState} from 'react'
import JobCard from './JobCard'


export default function JobList({jobs, setJobs, openEdit}){
    
    const [searchTerm, setSearchTerm] = useState('')

    function handleDeleteApp(id){
        const confirmed = window.confirm("You want to delete this application?")
        if (confirmed) {
            setJobs(prevJobs => prevJobs.filter(job => job.id !== id))
        }
    }

    function handleSearchChange(e) {
        setSearchTerm(e.target.value)
    }

    const filteredList = jobs.filter(item => {
            const term = searchTerm.toLowerCase()
            return(
                item.company.toLowerCase().includes(term) ||
                item.title.toLowerCase().includes(term) ||
                item.status.includes(term)
            )
        })

    function EmptyState() {
        if (jobs.length === 0) {
          return(
            <div>
              <h3>No Applications</h3>
              <p>Your Application will show up here</p>
            </div>
          )
        }
      }

    return(
        <>
            <div className='controls'>
                <label htmlFor="search">Search</label>
                <input type="text" id='search' name='search' value={searchTerm} onChange={handleSearchChange} />

                <label htmlFor="sort"></label>
                <select id='sort'>
                    <option value="" disabled>Sort By</option>
                    <option value="date">by date</option>
                    <option value="status">by status</option>
                </select>
            </div>
            <section className='card-header'>
                <p>Company</p>
                <p>Role</p>
                <p>Status</p>
                <p>Action</p>
                <p>Remove</p>
            </section>
            <EmptyState />
            {filteredList.map(job => (
                <JobCard handleEdit={openEdit} delete={handleDeleteApp} key={job.id} job={job} />
            ))}
        </>

    )
}