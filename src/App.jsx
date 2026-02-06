import { useState } from 'react'
import Modal from 'react-modal'
import AddApp from './components/AddApp.jsx'
import JobList from './components/JobList.jsx'
import NewAppForm from './components/NewAppForm.jsx'
import './App.css'

Modal.setAppElement('#root')

function App() {
  const [jobList, setJobList] = useState([
        {id: generateId(), company: 'google',
        title: 'manager',
        status: 'applied',
        date: "2023-06-19"},
        {id: generateId(), company: 'apple',
        title: 'developer',
        status: 'rejected',
        date: "2026-10-19"
        },
        {id: generateId(), company: 'amazon',
        title: 'worker',
        status: 'rejected',
        date: "2024-10-19"
        },
        {id: generateId(), company: 'spotify',
        title: 'artist',
        status: 'offer',
        date: "2023-10-19"
        },
        {id: generateId(), company: 'Youtube',
        title: 'Ad Producer',
        status: 'rejected',
        date: "2021-10-20"
        },
      ])


  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalMode, setModalMode] = useState("create")
  const [jobToEdit, setJobToEdit] = useState(null)

  function generateId() {
	  return crypto.randomUUID()
  }

  function openCreate() {
    setModalMode("create")
    setJobToEdit(null)
    setIsOpen(true)
  }

  function openEdit(job) {
    setModalMode("edit")
    setJobToEdit(job)
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setJobToEdit(null)
  }

  function handleJobListChange(jobData) {
    if (modalMode === "create") {
      setJobList(prev => [...prev, { ...jobData, id: crypto.randomUUID() }])
      } else {
        setJobList(prev =>
          prev.map(job =>
            job.id === jobData.id ? jobData : job
          )
        )
      }
  }

  

  return (
    <>
      <div className='header-section'>
        <h1>Job Application Tracker</h1>
        <AddApp openCreate={openCreate}/>
      </div>

      <JobList jobs={jobList} setJobs={setJobList} openEdit={openEdit}/>  

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <NewAppForm 
          onSubmit={handleJobListChange} 
          mode={modalMode} 
          closeModal={closeModal} 
          job={jobToEdit} />

      </Modal>




    </>
  )
}

export default App
