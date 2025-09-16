const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Custom token for logging POST request bodies
morgan.token('body', (req) => JSON.stringify(req.body))

// Use morgan middleware with tiny format + custom body token
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// Data
let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

app.use(express.static('dist'))

// Routes

// GET all persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// GET single person by ID
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// DELETE single person by ID
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

// POST new person with error handling
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const nameExists = persons.some(p => p.name === body.name)
  if (nameExists) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const newPerson = {
    id: String(Math.floor(Math.random() * 1000000)),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  res.json(newPerson)
})

// Info page
app.get('/info', (req, res) => {
  const currentTime = new Date()
  const count = persons.length
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${currentTime}</p>
  `)
})

// Middleware for unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
