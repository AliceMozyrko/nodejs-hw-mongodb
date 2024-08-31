import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts } from './services/contacts.js';
import { getContactById } from './services/contacts.js';


const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  ),

  app.use(express.json());
  app.use(cors());

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      message: "Successfully found contacts!",
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json({
      message: 'Contact not found'
    });
    return;
  }

    res.status(200).json({
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
});


  app.get('/contacts', async (req, res) => {
  });

  app.get('/contacts/:contactId', async (req, res) => {
  });

    app.use('*', (req, res) => {
      res.status(404).json({
        message: 'Not found',
      });
    }),

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });



};
