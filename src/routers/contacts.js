import { Router } from "express";
import { getContactsController, getContactByIdController, createStudentController, deleteContactController, upsertContactController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema } from "../validation/contacts.js";
import { updateContactsSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get("/contacts", ctrlWrapper(getContactsController));

router.get("/contacts/:contactId", isValidId, ctrlWrapper(getContactByIdController));

router.post("/contacts", validateBody(createContactSchema), ctrlWrapper(createStudentController));

router.delete("/contacts/:contactId", isValidId, ctrlWrapper(deleteContactController));

router.put("/contacts/:contactId", isValidId, validateBody(updateContactsSchema), ctrlWrapper(upsertContactController));

router.patch("/contacts/:contactId", isValidId, validateBody(updateContactsSchema), ctrlWrapper(patchContactController));

export default router;
