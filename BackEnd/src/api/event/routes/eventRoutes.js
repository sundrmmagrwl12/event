import express from 'express';
// import { createEvent } from '../controllers/eventController.js';
import authEvent from '../middlewares/authEvent.js';


import { getAllEvents, getEventById, updateEvent, deleteEvent, getEventsByOrganizer, createEvent, applyEvent, CheckIfApplied } from '../controllers/eventController.js';
const EventRouter = express.Router();

EventRouter.post('/',authEvent,createEvent);
EventRouter.get('/',authEvent,getAllEvents);
EventRouter.get('/:id',authEvent,getEventById);
EventRouter.put('/:id',authEvent,updateEvent);
EventRouter.delete('/:id',authEvent,deleteEvent);
EventRouter.get('/organizer/events',authEvent,getEventsByOrganizer);
EventRouter.post("/:eventId/apply",authEvent , applyEvent); // Apply for an event
EventRouter.get("/:eventId/checkIfApplied",authEvent ,CheckIfApplied); // Check if user applied for an event





export default EventRouter;
