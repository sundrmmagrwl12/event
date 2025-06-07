// import Event from "../../../model/eventModel.js";
import jwt from "jsonwebtoken";
import User from "../../../model/userModel.js";
import Event from "../../../model/eventModel.js";

// Mock database

const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, category, banner } = req.body;
        const organizerId = req.user.id;
        if (!title || !description || !date || !location || !category || !banner) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newEvent = new Event({ title, description, date, location, category, banner, organizerId });
        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }
};
const getAllEvents = async (req,res)=>{
    try{
    await new Promise(resolve => setTimeout(resolve, 1000));

    const query = req.params.query;
    if (query) {
        const events = await Event.find({ title: { $regex: query, $options: "i" } });
        return res.status(200).json(events);
    }

    const events = await Event.find({});
    res.status(200).json(events);}
    catch(error){
        res.status(500).json({message:"Error fetching events", error});
    }
}
const getEventById = async (req, res) => {
    const { id } = req.params;
    const event = await Event.find({ _id: id });
    res.status(200).json({ event });
}

const updateEvent = async (req, res) => {

    const { id } = req.params;
    const { title, description, date, location, category, banner } = req.body;
    const event = await Event.findByIdAndUpdate(id, { title, description, date, location, category, banner }, { new: true });
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event updated successfully", event });
}

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
}

const getEventsByOrganizer = async (req, res) => {
    // const { organizerId } = req.params;
    const organizerId = req.user.id; // Assuming you have the organizerId in the request body or params
    const events = await Event.find({
        organizerId: organizerId
    });
    if (events.length === 0) {
        return res.status(404).json({ message: "No events found for this organizer" });
    }
    res.status(200).json({ events });
}

const applyEvent = async (req, res) => {
    console.log("ApplyEvent function triggered");
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    const userId = req.user.id;
    if (event.organizerId.toString() === userId) {
        return res.status(202).json({ message: "You cannot apply to your own event" });
    }
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is already an attendee
    if (event.attendees.includes(userId)) {
        return res.status(400).json({ message: "You are already attending this event" });
    }

    // Add the user to the attendees list
    event.attendees.push(userId);
    await event.save();

    res.status(200).json({ message: "Successfully applied for the event", event });
}

const CheckIfApplied = async (req, res) => {
    try{
    const { eventId } = req.params;
    const userId = req.user.id; // Assuming you have the userId in the request body or params


    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }
    const isApplied = event.attendees.includes(userId);

    res.status(200).json({ isApplied });
    }
    catch(error){
        console.error("Error in CheckIfApplied:", error);
        res.status(500).json({ message: "Error checking application status", error });
    }
}


export { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent, getEventsByOrganizer , applyEvent , CheckIfApplied }