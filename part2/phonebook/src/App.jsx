// App.jsx
import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('')

useEffect(() => {
  personService.getAll()
    .then(response => {
      console.log('Fetched persons:', response)
      setPersons(response)
    })
    .catch(error => console.error(error))
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
        personService.update(existingPerson.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
        setNotification(`Updated ${newName}'s number`)
        setNotificationType('success')
        setTimeout(() => setNotification(null), 5000)
      })
      .catch(error => {
        console.error('Error updating person:', error.response.data.error)
        setNotification(error.response.data.error)
        setNotificationType('error')
        setTimeout(() => setNotification(null), 5000)
      })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotification(`Added ${newName}`)
        setNotificationType('success')
        setTimeout(() => setNotification(null), 5000)
      })
      .catch(error => {
        console.error('Error adding person:', error.response.data.error)
        setNotification(error.response.data.error) // show mongoose validation error
        setNotificationType('error')
        setTimeout(() => setNotification(null), 5000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotification('Person deleted')
        setNotificationType('success')
        setTimeout(() => setNotification(null), 5000)
      }).catch(error => {
        console.error('Error deleting person:', error)
        setNotification('Error deleting person')
        setNotificationType('error')
        setTimeout(() => setNotification(null), 5000)
      })
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
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
