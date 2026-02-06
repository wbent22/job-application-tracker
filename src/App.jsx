import { useState } from 'react'
import Modal from 'react-modal'
import AddApp from './components/AddApp.jsx'
import JobList from './components/JobList.jsx'
import NewAppForm from './components/NewAppForm.jsx'
import './App.css'
import { ESModulesEvaluator } from 'vite/module-runner'

Modal.setAppElement('#root')

function App() {
  const [jobList, setJobList] = useState([
        {id: generateId(), company: 'google',
        title: 'manager',
        status: 'applied'},
        {id: generateId(), company: 'apple',
        title: 'developer',
        status: 'rejected'
        },
        {id: generateId(), company: 'amazon',
        title: 'worker',
        status: 'rejected'
        },
        {id: generateId(), company: 'spotify',
        title: 'artist',
        status: 'offer'
        },
        {id: generateId(), company: 'Youtube',
        title: 'Ad Producer',
        status: 'rejected'
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
      <h1>Job Application Tracker</h1>
      <AddApp openCreate={openCreate}/>

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
