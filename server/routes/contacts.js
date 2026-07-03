var express = require('express');
var router = express.Router();
module.exports = router; 

const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

//get all of the contacts from the database
router.get('/', (req, res, next) => {
    Contact.find()
        .then(docs => res.status(200).json({ documents: docs }))
        .catch(err => res.status(500).json({ error: err }));
});


//Create a new contact and send it to the database
    
router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");
    
    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });
    
    contact.save()
        .then(createdContact => {
            res.status(201).json({
            message: 'Contact added successfully',
            contact: createdContact
            });
        })
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred',
            error: error
            });
        });
});

//update a contact

router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.phone = req.body.phone;

            Contact.updateOne({ id: req.params.id }, contact)
                .then(result => {
                    res.status(204).json({
                        message: 'Contact updated successfully'
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Contact not found.',
                error: { contact: 'Contact not found'}
            });
        });
})

//delete a contact

router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            Contact.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: "Contact deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Contact not found.',
                error: { contact: 'Contact not found'}
            });
        });
})
