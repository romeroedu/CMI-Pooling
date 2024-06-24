import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const AvailabilityPage = () => {
  const [carAvailable, setCarAvailable] = useState(false);
  const [schedule, setSchedule] = useState(
    Array(7).fill({ location: "", go: "", return: "" })
  );
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = Array.from({ length: 17 }, (_, i) => {
    const hour = i + 5; // 5am to 9pm
    const label = `${hour % 12 || 12}${hour >= 12 ? "pm" : "am"}`;
    return { value: hour, label };
  });
  const locations = ["Location A", "Location B", "Location C"];

  const handleSave = (e) => {
    e.preventDefault();
    let validationErrors = [];
    schedule.forEach((time, index) => {
      if (time.location && (!time.go || !time.return)) {
        validationErrors.push(
          `Please select both go and return times for ${days[index]}.`
        );
      }
    });
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle saving the availability
      console.log("Saving availability", schedule);
      setErrors([]);
    }
  };

  const handleTimeChange = (dayIndex, type, value) => {
    const updatedSchedule = schedule.map((time, index) =>
      index === dayIndex ? { ...time, [type]: value } : time
    );
    setSchedule(updatedSchedule);
  };

  const handleLocationChange = (dayIndex, value) => {
    const updatedSchedule = schedule.map((time, index) =>
      index === dayIndex
        ? { ...time, location: value, go: "", return: "" }
        : time
    );
    setSchedule(updatedSchedule);
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto m-64">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-gray-200 rounded-lg shadow-md">
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
                    {days.map((day, index) => (
                      <tr key={day}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {day}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={schedule[index].location}
                            onChange={(e) =>
                              handleLocationChange(index, e.target.value)
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
                            value={schedule[index].go}
                            onChange={(e) =>
                              handleTimeChange(index, "go", e.target.value)
                            }
                            className="form-select mt-1 block w-full"
                            disabled={!schedule[index].location}
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
                            value={schedule[index].return}
                            onChange={(e) =>
                              handleTimeChange(index, "return", e.target.value)
                            }
                            className="form-select mt-1 block w-full"
                            disabled={
                              !schedule[index].location || !schedule[index].go
                            }
                          >
                            <option value="">Select Time</option>
                            {times
                              .filter(
                                (time) =>
                                  parseInt(time.value) >
                                  parseInt(schedule[index].go)
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
