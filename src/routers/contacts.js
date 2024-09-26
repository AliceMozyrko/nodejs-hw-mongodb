import { Router } from "express";
import { getContactsController, getContactByIdController, createContactController, deleteContactController, upsertContactController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactsSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get("/contacts", ctrlWrapper(getContactsController));

router.get("/contacts/:contactId", isValidId, ctrlWrapper(getContactByIdController));

router.post("/register", validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete("/contacts/:contactId", isValidId, ctrlWrapper(deleteContactController));

router.put("/contacts/:contactId", isValidId, validateBody(updateContactsSchema), ctrlWrapper(upsertContactController));

router.patch("/contacts/:contactId", isValidId, validateBody(updateContactsSchema), ctrlWrapper(patchContactController));

export default router;
