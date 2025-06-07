import React, { useState } from "react";
import { useParams } from "react-router-dom";

const MailForm = () => {
  const { eventId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleclick = async (e) => {
    console.log("clicked");
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const text = e.target.text.value;
    const subject = e.target.subject.value;

    console.log(eventId);
    console.log(text);
    console.log(subject);
    
    try {
      const response = await fetch("http://localhost:9000/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text, subject, eventId }),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        alert("Mail sent successfully");
        console.log("Mail sent successfully");
        e.target.reset(); // Clear form
      } else {
        setSubmitStatus('error');
        console.error("Failed to send mail");
      }
    } catch (err) {
      setSubmitStatus('error');
      console.error("Error sending mail:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4">
      {/* CSS for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }
          
          .animate-success {
            animation: pulse 0.5s ease-out;
          }
          
          .animate-error {
            animation: shake 0.5s ease-in-out;
          }
          
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          
          .form-input-focus {
            transition: all 0.3s ease;
            border: 2px solid transparent;
          }
          
          .form-input-focus:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
            outline: none;
          }
          
          .button-effect {
            transition: all 0.3s ease;
            overflow: hidden;
            position: relative;
          }
          
          .button-effect:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          
          .button-effect:hover:before {
            transform: translateX(0);
          }
        `}
      </style>

      <div className="w-full max-w-md animate-fadeIn">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
            <h2 className="text-2xl font-bold">Send Email Notification</h2>
            <p className="text-indigo-100 mt-1">Communicate with your event attendees</p>
          </div>
          
          <form 
            className="p-8" 
            onSubmit={handleclick}
          >
            <div className="mb-6">
              <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">
                Subject Line
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Email subject"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg form-input-focus"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="text" className="block mb-2 font-medium text-gray-700">
                Message Content
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <textarea
                  id="text"
                  name="text"
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg form-input-focus"
                  required
                ></textarea>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-4 rounded-lg font-bold text-white button-effect
                ${submitStatus === 'error' ? 'animate-error bg-red-500 hover:bg-red-600' : 
                  submitStatus === 'success' ? 'animate-success bg-green-500 hover:bg-green-600' : 
                  'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Notification
                </span>
              )}
            </button>
            
            {submitStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Email sent successfully!
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Failed to send email. Please try again.
              </div>
            )}
          </form>
          
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Your email will be sent to all registered attendees for this event.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailForm;