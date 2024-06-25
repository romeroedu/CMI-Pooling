import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from '../config/firebase';
import { updateDoc, doc } from 'firebase/firestore';

const Header = () => (
  <div className="mb-10">
    <div className="flex justify-center">
      <img alt="Cummins Logo" className="h-14 w-14" src="./cummins_logo.png" />
    </div>
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Schedule Availability
    </h2>
  </div>
);

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = Array.from({ length: 17 }, (_, i) => {
  const hour = i + 5; // 5am to 9pm
  const label = `${hour % 12 || 12}${hour >= 12 ? "pm" : "am"}`;
  return { value: hour, label };
});
const locations = ["Location A", "Location B", "Location C"];

const AvailabilityPage = () => {
  const [carAvailable, setCarAvailable] = useState(false);
  const [schedule, setSchedule] = useState(
    days.reduce((acc, day) => {
      acc[day] = { location: "", go: "", return: "", timeSlots: Array(17).fill(false) };
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    let validationErrors = [];
    Object.keys(schedule).forEach(day => {
      if (schedule[day].location && (!schedule[day].go || !schedule[day].return)) {
        validationErrors.push(`Please select both go and return times for ${day}.`);
      }
    });
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      const user = auth.currentUser;
      const userRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userRef, {
          haveCar: carAvailable,
          schedule: carAvailable ? schedule : null,
        });
        console.log("Availability saved");
        setErrors([]);
        navigate('/dashboard');
      } catch (error) {
        console.error("Error saving availability: ", error);
        setErrors([error.message]);
      }
    }
  };

  const handleTimeChange = (day, type, value) => {
    const updatedSchedule = { ...schedule };
    const goTime = type === "go" ? parseInt(value) : parseInt(updatedSchedule[day].go);
    const returnTime = type === "return" ? parseInt(value) : parseInt(updatedSchedule[day].return);
    
    const newTimeSlots = Array(17).fill(false).map((_, i) => {
      return i >= goTime && i <= returnTime;
    });

    updatedSchedule[day] = { ...updatedSchedule[day], [type]: value, timeSlots: newTimeSlots };
    setSchedule(updatedSchedule);
  };

  const handleLocationChange = (day, value) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day] = { location: value, go: "", return: "", timeSlots: Array(17).fill(false) };
    setSchedule(updatedSchedule);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-24 bg-gray-100 sm:px-6 lg:px-8"> {/* Adjusted py-24 to add more space at the top */}
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <Header />
        <form onSubmit={handleSave} className="mt-8 space-y-6">
          <div>
            <label className="flex flex-col">
              <span className="mb-2 text-md font-medium text-gray-700">
                Do you have a car available?
              </span>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={carAvailable}
                  onChange={(e) => setCarAvailable(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-red-600"
                />
                <span className="ml-2 text-md font-medium text-gray-700">
                  I have a car!! 🚗
                </span>
              </div>
            </label>
          </div>
          {carAvailable && (
            <>
              {errors.length > 0 && (
                <div className="text-red-600 mb-4">
                  {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Day
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Work Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Go Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Return Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {days.map((day) => (
                      <tr key={day}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {day}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={schedule[day].location}
                            onChange={(e) =>
                              handleLocationChange(day, e.target.value)
                            }
                            className="form-select mt-1 block w-full"
                          >
                            <option value="">Select Location</option>
                            {locations.map((location, i) => (
                              <option key={i} value={location}>
                                {location}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={schedule[day].go}
                            onChange={(e) =>
                              handleTimeChange(day, "go", e.target.value)
                            }
                            className="form-select mt-1 block w-full"
                            disabled={!schedule[day].location}
                          >
                            <option value="">Select Time</option>
                            {times.map((time) => (
                              <option key={time.value} value={time.value}>
                                {time.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={schedule[day].return}
                            onChange={(e) =>
                              handleTimeChange(day, "return", e.target.value)
                            }
                            className="form-select mt-1 block w-full"
                            disabled={
                              !schedule[day].location || !schedule[day].go
                            }
                          >
                            <option value="">Select Time</option>
                            {times
                              .filter(
                                (time) =>
                                  parseInt(time.value) >
                                  parseInt(schedule[day].go)
                              )
                              .map((time) => (
                                <option key={time.value} value={time.value}>
                                  {time.label}
                                </option>
                              ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function AvailabilitySchedulePage() {
  return (
    <>
      <AvailabilityPage />
    </>
  );
}