import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch pending student applications
    try {
      const pendingApplications = await prisma.studentApplication.findMany({
        where: {
          status: 'pending',
        },
        include: {
          student: true, // Include student data for each application
          program: true, // Include program information
        },
      });
      res.status(200).json(pendingApplications);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching student applications' });
    }
  }

  if (req.method === 'POST') {
    // Create a new student application with a unique student number
    try {
      const { firstName, middleName, lastName, dob, gender, age, nationality, placeOfBirth, email, phoneNumber, homeAddress, emergencyContactName, emergencyContactPhoneNumber, emergencyContactRelationship, previousSchools, yearOfGraduation, gpa, programId } = req.body;

      // Get the last student number
      const lastStudent = await prisma.student.findFirst({
        orderBy: { id: 'desc' },
        select: { studentNumber: true },
      });

      // Generate the next student number
      const nextStudentNumber = lastStudent ? `SN-${parseInt(lastStudent.studentNumber.replace('SN-', '')) + 1}` : 'SN-1000000001';

      // Create the student record
      const newStudent = await prisma.student.create({
        data: {
          studentNumber: nextStudentNumber,
          firstName,
          middleName,
          lastName,
          dob,
          gender,
          age,
          nationality,
          placeOfBirth,
          email,
          phoneNumber,
          homeAddress,
          emergencyContactName,
          emergencyContactPhoneNumber,
          emergencyContactRelationship,
          previousSchools,
          yearOfGraduation,
          gpa,
        },
      });

      // Create the student application record
      const newApplication = await prisma.studentApplication.create({
        data: {
          studentId: newStudent.id,
          programId,
          status: 'pending',
        },
      });

      res.status(201).json({ student: newStudent, application: newApplication });
    } catch (error) {
      res.status(500).json({ error: 'Error creating student application' });
    }
  }

  if (req.method === 'PUT') {
    // Update the status of a student application (approve or reject)
    try {
      const { id, status, rejectionReason } = req.body;

      const updatedApplication = await prisma.studentApplication.update({
        where: { id },
        data: {
          status,
          rejectionReason,
          approvalDate: status === 'approved' ? new Date() : null,
        },
      });

      res.status(200).json(updatedApplication);
    } catch (error) {
      res.status(500).json({ error: 'Error updating application status' });
    }
  }
}
