"use client";

import { useState, useEffect, useRef } from "react";
import { 
  X, Send, Calendar as CalendarIcon, Clock, Clipboard, 
  DollarSign, User, MapPin, Wrench, FileText 
} from "lucide-react";
import api from "../../../../lib/protectedapi";

const ServiceHistoryChat = ({ 
  onClose, 
  maintenanceItem, 
  vehicleId,
  onSuccess 
}) => {
  // Chat state
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    vehicle_id: vehicleId,
    type: maintenanceItem.type,
    schedule_type: maintenanceItem.schedule_type || "routine",
    date: new Date().toISOString(),
    odometer: maintenanceItem.interval_kilometers || 0,
    notes: "",
    service_location: "",
    technician_name: "",
    total_cost: 0,
    parts_cost: 0,
    labor_cost: 0,
    labor_hours: 0,
    fuel_quantity: 0,
    fuel_unit_price: 0,
    risk_level: maintenanceItem.risk_level || "negligible",
    next_service_date: "",
    next_service_odometer: 0,
    custom_next_service_date: "",
    custom_next_service_odometer: 0
  });
  
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerField, setDatePickerField] = useState("");
  const messagesEndRef = useRef(null);

  // Format date for display
  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.toLocaleString('default', { month: 'long' });
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Questions to guide the user through the form
  const questions = [
    {
      id: "intro",
      content: `Let's record the service history for "${maintenanceItem.description}". When was this service performed?`,
      field: "date",
      type: "date",
      required: true
    },
    {
      id: "odometer",
      content: "What was the odometer reading at the time of service?",
      field: "odometer",
      type: "number",
      required: true
    },
    {
      id: "location",
      content: "Where was the service performed? (shop name or location)",
      field: "service_location",
      type: "text",
      required: false
    },
    {
      id: "technician",
      content: "Who performed the service? (technician or mechanic name)",
      field: "technician_name",
      type: "text",
      required: false
    },
    {
      id: "total_cost",
      content: "What was the total cost of the service?",
      field: "total_cost",
      type: "number",
      required: false
    },
    {
      id: "next_service",
      content: "When is the next recommended service date?",
      field: "next_service_date",
      type: "date",
      required: false
    },
    {
      id: "notes",
      content: "Any additional notes about this service?",
      field: "notes",
      type: "textarea",
      required: false
    },
    {
      id: "confirm",
      content: "Thanks! Please review the information and confirm to save this service record.",
      type: "confirm",
      required: true
    }
  ];

  // Initialize chat with welcome message
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I'll help you record the service history for "${maintenanceItem.description}". Let's get started with a few questions.`,
        timestamp: new Date()
      },
      {
        role: "assistant",
        content: questions[0].content,
        timestamp: new Date()
      }
    ]);
  }, [maintenanceItem]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle date selection
  const handleDateSelect = (e, field) => {
    // Don't prevent default here to allow the date input to work normally
    const dateValue = e.target.value;
    if (!dateValue) return;
    
    // Set the selected date but don't advance yet
    const date = new Date(dateValue);
    setSelectedDate(date);
    
    // Format the date for the form data
    const formattedDate = date.toISOString();
    setFormData({
      ...formData,
      [field]: formattedDate
    });
  };
  const confirmDateSelection = (field) => {
    // Hide the date picker
    setShowDatePicker(false);
    
    // Add user's response to chat
    setMessages([
      ...messages,
      {
        role: "user",
        content: formatDate(selectedDate),
        timestamp: new Date()
      }
    ]);
    
    // Advance to next question
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: questions[currentQuestion + 1].content,
          timestamp: new Date()
        }
      ]);
    }, 500);
  };
  // Handle form input submissions
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (inputValue.trim() === "" && questions[currentQuestion].type !== "confirm") {
      return;
    }
    
    // Add user's message to chat
    setMessages([
      ...messages,
      {
        role: "user",
        content: inputValue || "Confirm",
        timestamp: new Date()
      }
    ]);
    
    // Update form data based on current question
    if (questions[currentQuestion].type !== "confirm") {
      const field = questions[currentQuestion].field;
      const value = questions[currentQuestion].type === "number" ? 
        parseFloat(inputValue) : inputValue;
      
      setFormData({
        ...formData,
        [field]: value
      });
    }
    
    // Clear input
    setInputValue("");
    
    // If this is the confirmation step, submit the form
    if (questions[currentQuestion].type === "confirm") {
      // Show processing message
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Processing your service record...",
          timestamp: new Date()
        }
      ]);
      
      try {
        // Submit to API
        console.log("formData");
        console.log(formData);
        const response = await api.post(`/vehicle/api/v1/vehicles/${vehicleId}/service-history`, formData);
        
        if (response.status === "success") {
          setMessages(prev => [
            ...prev,
            {
              role: "assistant",
              content: "Service record saved successfully! You can close this window now.",
              timestamp: new Date()
            }
          ]);
          
          // Notify parent component of success
          if (onSuccess) {
            onSuccess(response.data);
          }
        } else {
          throw new Error("Failed to save service record");
        }
      } catch (error) {
        console.error("Error saving service record:", error);
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, there was an error saving the service record. Please try again.",
            timestamp: new Date()
          }
        ]);
      }
      
      return;
    }
    
    // Advance to next question
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: questions[currentQuestion + 1].content,
          timestamp: new Date()
        }
      ]);
    }, 500);
  };
  
  // Open date picker for a specific field
  const openDatePicker = (field) => {
    setDatePickerField(field);
    setShowDatePicker(true);
  };
  
  // Render a summary of the collected information
  const renderSummary = () => {
    if (currentQuestion !== questions.length - 1) return null;
    
    return (
      <div className="bg-gray-50 p-4 rounded-lg mt-4 text-sm">
        <h3 className="font-bold mb-2">Service Summary:</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-medium">Service Type:</p>
            <p>{maintenanceItem.description}</p>
          </div>
          <div>
            <p className="font-medium">Date:</p>
            <p>{formData.date ? formatDate(formData.date) : "Not specified"}</p>
          </div>
          <div>
            <p className="font-medium">Odometer:</p>
            <p>{formData.odometer ? `${formData.odometer.toLocaleString()} km` : "Not specified"}</p>
          </div>
          <div>
            <p className="font-medium">Location:</p>
            <p>{formData.service_location || "Not specified"}</p>
          </div>
          <div>
            <p className="font-medium">Technician:</p>
            <p>{formData.technician_name || "Not specified"}</p>
          </div>
          <div>
            <p className="font-medium">Total Cost:</p>
            <p>{formData.total_cost ? `$${formData.total_cost.toFixed(2)}` : "Not specified"}</p>
          </div>
          <div>
            <p className="font-medium">Next Service:</p>
            <p>{formData.next_service_date ? formatDate(formData.next_service_date) : "Not specified"}</p>
          </div>
        </div>
        {formData.notes && (
          <div className="mt-2">
            <p className="font-medium">Notes:</p>
            <p>{formData.notes}</p>
          </div>
        )}
      </div>
    );
  };

  // Render the appropriate input based on question type
  const renderInput = () => {
    const currentQ = questions[currentQuestion];
    
    if (currentQ.type === "date") {
      return (
        <div className="flex items-center">
        <button 
          onClick={() => openDatePicker(currentQ.field)}
          className="flex items-center justify-between w-full px-4 py-2 border rounded-md bg-white"
        >
          {selectedDate ? formatDate(selectedDate) : "Select date"}
          <CalendarIcon className="ml-2 h-4 w-4" />
        </button>
        
        {showDatePicker && datePickerField === currentQ.field && (
          <div className="absolute bottom-16 left-0 right-0 bg-white p-4 border rounded-md shadow-lg">
            <input
              type="date"
              className="w-full p-2 border rounded-md mb-2"
              onChange={(e) => handleDateSelect(e, currentQ.field)}
            />
            <button 
              className="w-full bg-blue-500 text-white p-2 rounded-md mt-2"
              onClick={() => confirmDateSelection(currentQ.field)}
            >
              Confirm Date
            </button>
          </div>
        )}
      </div>
      );
    }
    
    if (currentQ.type === "textarea") {
      return (
        <div className="flex items-center space-x-2 w-full">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your notes here..."
            className="w-full p-2 border rounded-md"
            rows={3}
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-full"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      );
    }
    
    if (currentQ.type === "confirm") {
      return (
        <button 
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
        >
          Confirm and Save
        </button>
      );
    }
    
    return (
      <div className="flex w-full items-center space-x-2">
        <input
          type={currentQ.type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Enter ${currentQ.field.replace('_', ' ')}...`}
          className="flex-1 p-2 border rounded-md"
          min={0}
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    );
  };

  // Determine appropriate icon for message
  const getMessageIcon = (message) => {
    if (message.role === "user") return null;
    
    // If it's a specific question, return appropriate icon
    const questionText = message.content.toLowerCase();
    if (questionText.includes("odometer")) return <Clipboard className="h-5 w-5" />;
    if (questionText.includes("where")) return <MapPin className="h-5 w-5" />;
    if (questionText.includes("who performed")) return <User className="h-5 w-5" />;
    if (questionText.includes("cost")) return <DollarSign className="h-5 w-5" />;
    if (questionText.includes("when is the next")) return <Clock className="h-5 w-5" />;
    if (questionText.includes("notes")) return <FileText className="h-5 w-5" />;
    if (questionText.includes("when was")) return <CalendarIcon className="h-5 w-5" />;
    
    // Default icon
    return <Wrench className="h-5 w-5" />;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">Service Record</h2>
          <button onClick={onClose} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex items-start mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                  {getMessageIcon(message)}
                </div>
              )}
              
              <div 
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.role === "user" 
                    ? "bg-blue-100 rounded-tr-none" 
                    : "bg-gray-100 rounded-tl-none"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2">
                  <div className="font-bold text-xs">YOU</div>
                </div>
              )}
            </div>
          ))}
          
          {currentQuestion === questions.length - 1 && renderSummary()}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit}>
            {renderInput()}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceHistoryChat;