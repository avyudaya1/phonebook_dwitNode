const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (req, res) => {
  Person.find({}).then(persons => res.json(persons))
})

personsRouter.post('/', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date()
  })

  person.save().then(savedPerson => res.json(savedPerson.toJSON()))
    .catch(err => next(err))
})

personsRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if(person){
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
  .catch(err => next(err))
})

personsRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})

personsRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

module.exports = personsRouter