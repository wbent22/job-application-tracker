import {useState} from 'react'
import JobCard from './JobCard'


export default function JobList({jobs, setJobs, openEdit}){
    
    const [searchTerm, setSearchTerm] = useState('')
    const [sortedBy, setSortedBy] = useState('')

    function handleDeleteApp(id){
        const confirmed = window.confirm("You want to delete this application?")
        if (confirmed) {
            setJobs(prevJobs => prevJobs.filter(job => job.id !== id))
        }
    }

    function handleSearchChange(e) {
        setSearchTerm(e.target.value)
    }

    function handleSortChange(e) {
        setSortedBy(e.target.value)
    }

    const filteredList = jobs.filter(item => {
            const term = searchTerm.toLowerCase()
            return(
                item.company.toLowerCase().includes(term) ||
                item.title.toLowerCase().includes(term) ||
                item.status.includes(term)
            )
        })

        const sortByDate = [...filteredList].sort((a, b) => new Date(b.date) - new Date(a.date))
        const sortByStatus =  [...filteredList].sort((a, b) => a.status.localeCompare(b.status))
        
        let sortedList = filteredList
        if (sortedBy === 'date') sortedList = sortByDate
        if (sortedBy === 'status') sortedList = sortByStatus
        
    

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
        <div className="applications-container">
            <div className='controls'>
                <div>
                    <label htmlFor="search">Search</label>
                    <input 
                        type="text" 
                        id='search' 
                        name='search' 
                        value={searchTerm} 
                        onChange={handleSearchChange}
                        placeholder="Search applications..."
                    />
                </div>

                <div>
                    <label htmlFor="sort">Sort</label>
                    <select id='sort' value={sortedBy} onChange={handleSortChange}>
                        <option value="" disabled>Sort By</option>
                        <option value="date">By Date (Most Recent)</option>
                        <option value="status">By Status</option>
                    </select>
                </div>
            </div>
            
            <div className="applications-list">
                <section className='card-header'>
                    <p>Company</p>
                    <p>Role</p>
                    <p>Status</p>
                    <p>Action</p>
                    <p>Remove</p>
                </section>
                <EmptyState />
                {sortedList.map(job => (    
                    <JobCard handleEdit={openEdit} delete={handleDeleteApp} key={job.id} job={job} />
                ))}
            </div>
        </div>

    )
}