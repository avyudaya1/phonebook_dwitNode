import React, {useState, useEffect} from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import phonebookService from './services/phonebook'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filteredPersons, setFilteredPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterText, setFilterText] = useState('')

    const [notificationMessage, setNotificationMessage] = useState({
        message: null,
        status: null
    })

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    
    const handleFilterChange = (event) => {
        setFilterText(event.target.value)

        if(event.target.value.toString().trim() === ''){
            setFilteredPersons(persons.splice())
        } else {
            const newPersons = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()) === true)
            setFilteredPersons(newPersons)
        }
    }

    const handleNotificationMessage = (message, status) => {
        if(status === 'added'){
            setNotificationMessage({message: `${message} added`, status: 'success'})
        }
        else if(status==='modified'){
            setNotificationMessage({message: `${message} modified`, status: 'success'})
        }
        else if(status === 'validation error'){
            setNotificationMessage({message: message, status: 'error'})
        }
        else {
            setNotificationMessage({message: `Information of ${message} has already been removed from server.`, status:'error'})
        }

        setTimeout(()=>{
            setNotificationMessage({message: null, status: null})
        }, 5000)
    }

    useEffect(() => {
        phonebookService
            .getAll()
            .then(initialPhonebook => {
                setPersons(initialPhonebook)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        if(newName.trim().length < 1){
            alert('Name can not be empty')
            return 
        }
        if(newNumber.trim().length < 1){
            alert('Number can not be empty')
            return 
        }
        
        if(persons.filter(person => person.name === newName).length > 0){
            var x = window.confirm(`${newName} already added to phonebook, replace the old number with a new one?`)
            if(x) {
                const person = persons.find(p => p.name === newName)
                const newPerson = {...person, number: newNumber}

                phonebookService
                    .update(person.id, newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.name !== newName? person: returnedPerson))
                        handleNotificationMessage(returnedPerson.name, 'modified')
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        handleNotificationMessage(person.name, 'not found')
                    })
            }
            return
        } 
        
        else {
            const newObject = {
                name: newName.trim(),
                number: newNumber.trim(),
            }

            phonebookService
                .create(newObject)
                .then(
                    returnedPerson => {
                        setPersons(persons.concat(returnedPerson))
                        handleNotificationMessage(returnedPerson.name, 'added')
                        setNewName('')
                        setNewNumber('')  
                    }
                )
                .catch(error => {
                    handleNotificationMessage(error.response.data.error, 'validation error')
                })
        }
               
    }

    const deletePerson = (id, text) => {
        var result = window.confirm(`Delete ${text}?`)
        if(result){
           phonebookService
            .deleteData(id)
            .then(response => {
                if(response.status === 204){
                    setPersons(persons.filter(person => person.id !== id))
                }
            })
            .catch(error=> {
                alert(`the person of ${id} was already deleted from server.`)
                setPersons(persons.filter(person => person.id !== id))
            }) 
        }
        return
    }

    return (
        <div>
            <h1>Phonebook 📱</h1>
            <Notification notification={notificationMessage}/>
            <Filter filterText={filterText} handleFilterChange={handleFilterChange}/>
            <h1>Add 😎</h1>
            <PersonForm
                eventHandlers = {{handleSubmit, handleNameChange, handleNumberChange}}
                value = {{newName, newNumber}}
            />
            <h1>Numbers 🙎</h1>
            {
                filterText.trim() === '' ? <Persons persons={persons} handleDelete={(id, text)=> deletePerson(id, text)} />
                    : <Persons persons={filteredPersons} handleDelete={(id, text) => deletePerson(id, text)}/>
            }
        </div>
    )
}

export default App;