import JobCard from './JobCard'

export default function JobList({jobs, setJobs, openEdit}){
    
    function handleDeleteApp(id){
        const confirmed = window.confirm("You want to delete this application?")
        if (confirmed) {
            setJobs(prevJobs => prevJobs.filter(job => job.id !== id))
        }
    }

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
            <section className='card-header'>
                <p>Company</p>
                <p>Role</p>
                <p>Status</p>
                <p>Action</p>
                <p>Remove</p>
            </section>
            <EmptyState />
            {jobs.map(job => (
                <JobCard handleEdit={openEdit} delete={handleDeleteApp} key={job.id} job={job} />
            ))}
        </>

    )
}