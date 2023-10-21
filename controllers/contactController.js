const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
//@description Get all contacts
//@Route GET /api/contacts
//@Access Private

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})
//@description Get Contact by ID
//@Route GET /api/contacts/:id
//@Access Private

const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.finById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }

    res.status(200).json(contact)
})
//@description Create New Contact
//@Route POST /api/contacts/
//@Access Private

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {name, email, location, phone} = req.body
    if(!name || !email || !location || !phone) {
        res.status(400)
        throw new Error('All Fields are mandatory')
    }
    const contact = await Contact.create({
        name, email, location, phone, user_id: req.user.id
    })
    res.status(201).json(contact)
})
//@description Update Contact
//@Route PUT /api/contacts
//@Access Private

const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.finById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !==req.user.id) {
        res.status(403)
        throw new Error("You are not Authorized to update this contact")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.json(updatedContact)
})
//@description Delete Contact
//@Route PUT /api/contacts/:id
//@Access Private

const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.finById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !==req.user.id) {
        res.status(403)
        throw new Error("You are not Authorized to update this contact")
    }
    await Contact.remove()

    res.json(contact)
})

module.exports = { getContact, getContacts, createContact, updateContact, deleteContact}