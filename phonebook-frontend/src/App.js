import React, {useState, useEffect} from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import phonebookService from './services/phonebook'

import {Box, Grid } from '@material-ui/core'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filteredPersons, setFilteredPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterText, setFilterText] = useState('')

    const [notificationMessage, setNotificationMessage] = useState({
        message: null,
        status: null,
        val: null,
        handleNotification: null
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
            let pos = message.charAt(message.length -3)
            if(pos === '8') {
                setNotificationMessage({message: 'Number too short. Required at least 8 character long.', status:'error'})
            }
            else if (pos === '3') {
                setNotificationMessage({message:'Name too short. Required at least 3 character long.', status:'error'})
            }
            else{
                setNotificationMessage({message: message, status: 'error',})
            }
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
        <Grid item xs={12} >
            <Grid container justify="center" spacing={2}>
                <Grid style={{display:'flex', alignItems:'start', justifyContent:'center', marginTop:30}} item >
                    <img height="70%" src="https://media.giphy.com/media/l4FAUfcxoAWOzSkko/giphy.gif" alt="phonebook"/>
                </Grid>
                <Grid item  >
                    <h1>Phonebook 📱</h1>
                    <Notification notification={notificationMessage}/>
                    <Filter filterText={filterText} handleFilterChange={handleFilterChange}/>
                    <h1>Add 😎</h1>
                    <PersonForm
                        eventHandlers = {{handleSubmit, handleNameChange, handleNumberChange}}
                        value = {{newName, newNumber}}
                    />
                </Grid>
            </Grid>
            <Grid container justify="center" alignContent="flex-start" spacing={2}>
                <h1 style={{display:'flex', alignItems:'start', justifyContent:'center', }}  >Numbers 🙎</h1>
                <Grid container justify="center">
                    {
                        filterText.trim() === '' ? <Persons persons={persons} handleDelete={(id, text)=> deletePerson(id, text)} />
                            : <Persons persons={filteredPersons} handleDelete={(id, text) => deletePerson(id, text)}/>
                    } 
                </Grid>
            </Grid>
        </Grid>
    )
}

export default App;