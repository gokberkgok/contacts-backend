const asyncHandler = require('express-async-handler');

//@desc Get All contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req,res) => {
    res.status(200).json({message : "Get all contacts"});
});

//@desc Get contact from id
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req,res) => {
    res.status(200).json({message : `Get contact for ${req.params.id}`});
});

//@desc Create new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req,res) => {
    console.log("Request body : ", req.body);
    const {name , email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are must be fill");
    }
    res.status(201).json({message : "Create contact"});
});
//@desc Update contact from id
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req,res) => {
    res.status(200).json({message : `Update contact for ${req.params.id}`});
});

//@desc Delete contact from id
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req,res) => {
    res.status(200).json({message : `Delete contact for ${req.params.id}`});
});
module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}
