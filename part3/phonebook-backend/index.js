const express = require('express');
const app = express();

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

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
