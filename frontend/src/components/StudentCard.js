 

const StudentCard = ({ student, onClickRequest }) => {
  return (
    <div className="flex flex-col items-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <img
        src={student.profileUrl}
        alt={`${student.name}'s profile`}
        className="w-32 h-32 rounded-full shadow-lg mb-4"
      />
      <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
      <p className="text-sm text-gray-500 mt-1 mb-4">{student.role}</p>

      <div className="w-full space-y-4 text-left">
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Department:</span>
          <span className="text-gray-800">{student.department}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Roll No:</span>
          <span className="text-gray-800">{student.rollNo}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Phone No:</span>
          <span className="text-gray-800">{student.phoneNo}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Email:</span>
          <span className="text-gray-800">{student.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Faculty:</span>
          <span className="text-gray-800">
            {(student.faculty && student.faculty.name) || "NA"}
          </span>
        </div>
        <div className="mt-6">
          <h2 className=" hover:text-blue-700 hover:underline text-lg font-semibold text-gray-700 mb-2">
            Requests
          </h2>

          {student.requests && student.requests.length > 0 ? (
            student.requests.map((request, index) => (
              <div
                key={request._id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
              >
                <span
                  onClick={(e) => onClickRequest(e, request._id)}
                  className="text-gray-600 hover:underline hover:cursor-pointer hover:text-blue-600"
                >
                   <span className="font-semibold text-gray-800">
                    {index + 1}.{" "}
                   </span>
                   {request.title}
                </span>
              </div>
            ))
          ) : (
            <p>No requests yet</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default StudentCard;