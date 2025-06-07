import User from "../../../model/userModel.js";
import Event from "../../../model/eventModel.js";
import { sendEmailToattendees } from "../../../utils/email-Helper.js";

const mailController = async (req, res) => {
  try {
    const { eventId, text, subject } = req.body;
    const id = req.user.id;
    const UserData = await User.findById(id);
    const email = UserData.email;
    const EventData = await Event.findById(eventId);
    const attendees = EventData.attendees;
    const emails = await Promise.all(
      attendees.map(
        async (attendee) =>
          await User.findById(attendee).then((user) => user.email)
      )
    );
    console.log(emails);
    await sendEmailToattendees({ emails, subject, text, email });
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send email",
        error: error.message,
      });
  }
};

export default mailController;
