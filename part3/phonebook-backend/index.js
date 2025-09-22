// index.js
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const errorHandler = require('./middleware/errorHandler')

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
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error)) // passes malformed id errors to errorHandler
})

// DELETE single person by ID
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
        res.status(204).end()
      } else {
        res.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => next(error))
})
// POST new person
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(error => next(error))
})


// PUT update person's number
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then(updatedPerson => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

// Info page
app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      const date = new Date()
      response.send(
        `<p>Phonebook has info for ${count} people</p><p>${date}</p>`
      )
    })
    .catch(error => next(error))
})

// Unknown endpoint middleware
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
