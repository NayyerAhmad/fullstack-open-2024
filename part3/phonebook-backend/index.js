// index.js
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Custom morgan token to log POST/PUT request bodies
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('dist'))

// Routes

// GET all persons
app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(err => res.status(500).json({ error: 'Failed to fetch persons' }))
})

// GET single person by ID
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => res.status(400).json({ error: 'malformatted id' }))
})

// DELETE single person by ID
app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(400).json({ error: 'malformatted id' }))
})

// POST new person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  Person.findOne({ name })
    .then(existingPerson => {
      if (existingPerson) {
        return res.status(400).json({ error: 'name must be unique' })
      }

      const person = new Person({ name, number })
      person.save()
        .then(savedPerson => res.json(savedPerson))
        .catch(err => res.status(500).json({ error: 'Failed to save person' }))
    })
})

// PUT update person's number
app.put('/api/persons/:id', (req, res) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => res.json(updatedPerson))
    .catch(err => res.status(400).json({ error: 'malformatted id or validation error' }))
})

// Info page
app.get('/info', (req, res) => {
  Person.countDocuments({})
    .then(count => {
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `)
    })
})

// Unknown endpoint middleware
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
