import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons' // Import the service

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response)
    }).catch(error => {
      console.error('There was an error fetching the persons:', error)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    
    if (existingPerson) {
      if (window.confirm(`${newName} is already in the phonebook. Do you want to update the number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService.update(existingPerson.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
        }).catch(error => {
          console.error('Error updating person:', error)
        })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      }).catch(error => {
        console.error('Error adding person:', error)
      })
    }
    setNewName('')
    setNewNumber('')
  }  

  const deletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      }).catch(error => {
        console.error('Error deleting person:', error)
      })
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App
