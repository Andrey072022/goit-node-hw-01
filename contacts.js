import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve ("dp", "contacts.json");

const updateContacts = contact => fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

export const listContacts = async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
}

export const getContactById = async (contactId) => {
    const contact = await listContacts();
    const result = contact.find(item => item.id === contactId);
    return result || null;
}

export const removeContact = async (contactId) => {
    const contact = await listContacts();
    const index = contact.findIndex(item => item.id === contactId);
    if (index === -1) {
    return null;
    }
    const [result] = contact.splice(index, 1);
    await updateContacts(contact);
    return result;
}

export const addContact = async ({ name, email, phone }) => {
    const contact = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contact.push(newContact);
    await updateContacts(contact);
    return newContact;
  
}

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}