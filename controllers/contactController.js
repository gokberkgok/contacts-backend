const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");

//@desc Get All contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
});

//@desc Get contact from id
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404); 
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Create new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req,res) => {
    console.log("Request body : ", req.body);
    const {name , email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are must be fill");
    }
    const contact = await Contact.create({
        name ,
         email, 
         phone, 
         user_id : req.user.id
    });
    res.status(201).json(contact);
});
//@desc Update contact from id
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404); 
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, req.body, {new: true}
    );
    res.status(200).json(updatedContact);
});

//@desc Delete contact from id
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact){
        res.status(404); 
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});
module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}
