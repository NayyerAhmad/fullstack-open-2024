const express = require('express');
const app = express();

app.use(express.json());

const phonebook = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

app.get('/api/persons', (req, res) => {
  res.json(phonebook);
});

app.get('/info', (req, res) => {
  const currentTime = new Date();
  res.send(`
    <p>Phonebook has info for ${phonebook.length} people</p>
    <p>${currentTime}</p>
  `);
});

app.get('/api/persons/:id', (req, res) => {
  const person = phonebook.find(p => p.id === req.params.id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const index = phonebook.findIndex(p => p.id === id);
  if (index !== -1) {
    phonebook.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).send({ error: 'name or number is missing' });
  }

  const newId = Math.random().toString(36).substr(2, 9);
  const newPerson = { id: newId, name, number };
  phonebook.push(newPerson);
  res.status(201).json(newPerson);
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
