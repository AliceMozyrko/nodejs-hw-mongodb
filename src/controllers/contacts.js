import createHttpError from "http-errors";
import { getAllContacts, getContactById, createContact, deleteContact, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getContactsController = async (req, res) => {
  const userId = req.user._id;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  filter.userId = userId;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, "Contact not found");
  };

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const userId = req.user._id;
  const contact = await createContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: contact,
  });
};

export const upsertContactController = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  const result = await updateContact(contactId, { ...req.body, userId }, {
    upsert: true,
    userId,
  });

  if (!result) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  const result = await updateContact(contactId, { ...req.body, userId });

  if (!result) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, "Contact not found"));
    return;
  }
  res.status(204).send();
};
