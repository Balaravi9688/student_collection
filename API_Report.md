API Documentation - Student Collection


# GET /api/students

Description:
Fetch all students along with their marks.

Response:
Status: 200 OK

Body: An array of student objects.

Example Response Body:
[ { "id": 1, "name": "John Doe", "dob": "2000-01-01", "email": "john@example.com", "tamil": 85, "english": 90 }, ... ]

****************************************************************************************************************************************

# GET /api/students/{id}

Description:
Fetch a specific student and their marks by student ID.

Parameters:
id (required): The unique ID of the student to retrieve.

Response:
Status: 200 OK

Body: A student object.

# Example Response Body:
{ "id": 1, "name": "John Doe", "dob": "2000-01-01", "email": "john@example.com", "tamil": 85, "english": 90 }

Status: 404 Not Found (if the student with the provided ID does not exist)

****************************************************************************************************************************************

# POST /api/students

Description:
Create a new student with their marks.

Request Body:
name (required): The student's name.
dob (required): The student's date of birth in YYYY-MM-DD format.
email (required): The student's email address.
tamil (required): The student's Tamil marks (integer).
english (required): The student's English marks (integer).

# Example Request Body:
{ "name": "Jane Doe", "dob": "2001-02-15", "email": "jane@example.com", "tamil": 75, "english": 80 }

Response:
Status: 201 Created

Body: The created student object.

Example Response Body:
{ "id": 2, "name": "Jane Doe", "dob": "2001-02-15", "email": "jane@example.com", "tamil": 75, "english": 80 }

****************************************************************************************************************************************

# PUT /api/students/{id}

Description:
Update an existing student's details and marks.

Parameters:
id (required): The ID of the student to update.

Request Body:
name : The student's name.
dob : The student's date of birth in YYYY-MM-DD format.
email : The student's email address.
tamil : The student's Tamil marks (integer).
english : The student's English marks (integer).

# Example Request Body:
{ "name": "Jane Smith", "dob": "2001-02-15", "email": "jane.smith@example.com", "tamil": 80, "english": 85 }

Response:
Status: 200 OK

Body: The updated student object.

Example Response Body:
{ "id": 2, "name": "Jane Smith", "dob": "2001-02-15", "email": "jane.smith@example.com", "tamil": 80, "english": 85 }

****************************************************************************************************************************************


# DELETE /api/students/{id}

Description:
Delete a student by their ID.

Parameters:
id (required): The ID of the student to delete.

Response:
Status: 200 OK

Body: A confirmation message.

Example Response Body:
{ "message": "Student deleted successfully" }

This is the plain text documentation for all the API endpoints you requested. Let me know if you need further details!
