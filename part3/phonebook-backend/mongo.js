// mongo.js
const mongoose = require('mongoose')

// Check command-line arguments
if (process.argv.length < 3) {
  console.log('Please provide the password as the first argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

// MongoDB connection string
const url = `mongodb+srv://phonebook_user:${password}@hfs04.giw99f7.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => {
    // Define schema and model
    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    if (!name || !number) {
      // If only password is provided, list all entries
      Person.find({})
        .then(persons => {
          console.log('phonebook:')
          persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
          })
        })
        .catch(err => console.error(err))
        .finally(() => mongoose.connection.close())
    } else {
      // Add a new person
      const newPerson = new Person({ name, number })
      newPerson.save()
        .then(() => {
          console.log(`added ${name} number ${number} to phonebook`)
        })
        .catch(err => console.error('Error saving person:', err))
        .finally(() => mongoose.connection.close())
    }
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err)
    mongoose.connection.close()
  })
