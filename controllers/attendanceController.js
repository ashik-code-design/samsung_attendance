const Attendance = require("../models/Attendance");
const Student = require("../models/Student");


// ==========================================================
// HELPER - NORMALIZE ATTENDANCE DATE
// ==========================================================

const normalizeDate = (date) => {

    if (!date) {
        return null;
    }

    // Convert to string and take YYYY-MM-DD
    const dateOnly = date.toString().substring(0, 10);

    const normalizedDate = new Date(
        `${dateOnly}T00:00:00.000Z`
    );

    if (isNaN(normalizedDate.getTime())) {
        return null;
    }

    return normalizedDate;
};


// ==========================================================
// SAVE ATTENDANCE
// ==========================================================

const saveAttendance = async (req, res) => {

    try {

        const {
            course,
            batch,
            date,
            attendance
        } = req.body;


        // --------------------------------------------------
        // VALIDATION
        // --------------------------------------------------

        if (
            !course ||
            !batch ||
            !date ||
            attendance === undefined ||
            attendance === null
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Course, batch, date and attendance are required",
            });

        }


        if (!Array.isArray(attendance)) {

            return res.status(400).json({
                success: false,
                message:
                    "Attendance must be an array",
            });

        }


        if (attendance.length === 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Attendance list cannot be empty",
            });

        }


        // --------------------------------------------------
        // FIND STUDENTS
        // --------------------------------------------------

        const students = await Student.find({

            course: course.trim(),

            batch: batch.trim(),

            active: true,

        });


        if (students.length === 0) {

            return res.status(404).json({
                success: false,
                message:
                    "No students found for this course and batch",
            });

        }


        // --------------------------------------------------
        // NORMALIZE DATE
        // --------------------------------------------------

        const attendanceDate =
            normalizeDate(date);


        if (!attendanceDate) {

            return res.status(400).json({
                success: false,
                message: "Invalid date",
            });

        }


        console.log(
            "Saving attendance date:",
            attendanceDate.toISOString()
        );


        // --------------------------------------------------
        // CREATE RECORDS
        // --------------------------------------------------

        const records = [];


        for (const item of attendance) {

            if (!item || !item.sicId) {
                continue;
            }


            const student = students.find(
                (s) =>
                    s.sicId ===
                    item.sicId.toString().trim()
            );


            if (!student) {
                continue;
            }


            records.push({

                student: student._id,

                studentName: student.name,

                sicId: student.sicId,

                course: student.course,

                batch: student.batch,

                date: attendanceDate,

                present: Boolean(item.present),

                markedBy:
                    req.user?.id ||
                    req.user?._id,

                staffId:
                    req.user?.staffId || "",

            });

        }


        // --------------------------------------------------
        // VALID RECORD CHECK
        // --------------------------------------------------

        if (records.length === 0) {

            return res.status(400).json({
                success: false,
                message:
                    "No valid student attendance records found",
            });

        }


        // --------------------------------------------------
        // SAVE / UPDATE
        // --------------------------------------------------

        for (const record of records) {

            await Attendance.findOneAndUpdate(

                {
                    student: record.student,

                    // Date is normalized to midnight UTC
                    date: record.date,
                },

                record,

                {
                    upsert: true,

                    new: true,

                    setDefaultsOnInsert: true,
                }

            );

        }


        // --------------------------------------------------
        // RESPONSE
        // --------------------------------------------------

        return res.status(200).json({

            success: true,

            message:
                "Attendance saved successfully",

            count: records.length,

            date:
                attendanceDate.toISOString(),

        });

    } catch (error) {

        console.error(
            "Save attendance error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: "Server error",

            error: error.message,

        });

    }

};


// ==========================================================
// GET ATTENDANCE
// ==========================================================
//
// COURSE IS OPTIONAL
//
// Example:
//
// ?batch=Batch 1
//
// Returns:
// - III B.Sc Computer Science Batch 1
// - MCA Batch 1
//
// Example:
//
// ?batch=Batch 1&course=MCA
//
// Returns only MCA Batch 1.
//
// DATE IS OPTIONAL.
//
// Example:
//
// ?batch=Batch 1&date=2026-08-20
//
// Returns attendance for that complete day.
// ==========================================================

const getAttendance = async (req, res) => {

    try {

        const {
            course,
            batch,
            date
        } = req.query;


        // --------------------------------------------------
        // BATCH REQUIRED
        // --------------------------------------------------

        if (!batch || batch.trim() === "") {

            return res.status(400).json({

                success: false,

                message: "Batch is required",

            });

        }


        // --------------------------------------------------
        // BUILD FILTER
        // --------------------------------------------------

        const filter = {

            batch: batch.trim(),

        };


        // --------------------------------------------------
        // COURSE OPTIONAL
        // --------------------------------------------------

        if (
            course &&
            course.trim() !== ""
        ) {

            filter.course =
                course.trim();

        }


        // --------------------------------------------------
        // DATE FILTER
        // --------------------------------------------------

        if (date) {

            const dateOnly =
                date.toString().substring(0, 10);


            const startDate = new Date(
                `${dateOnly}T00:00:00.000Z`
            );


            const endDate = new Date(
                `${dateOnly}T23:59:59.999Z`
            );


            if (
                isNaN(startDate.getTime()) ||
                isNaN(endDate.getTime())
            ) {

                return res.status(400).json({

                    success: false,

                    message: "Invalid date",

                });

            }


            // Search the complete day.
            filter.date = {

                $gte: startDate,

                $lte: endDate,

            };

        }


        // --------------------------------------------------
        // GET RECORDS
        // --------------------------------------------------

        const records =
            await Attendance.find(filter)

                .select(
                    "student studentName sicId course batch date present staffId"
                )

                .sort({

                    date: 1,

                    course: 1,

                    sicId: 1,

                });


        // --------------------------------------------------
        // RESPONSE
        // --------------------------------------------------

        return res.status(200).json({

            success: true,

            count: records.length,

            attendance: records,

        });

    } catch (error) {

        console.error(
            "Get attendance error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: "Server error",

            error: error.message,

        });

    }

};


// ==========================================================
// GET ALL STUDENTS FOR A BATCH
// ==========================================================
//
// Returns BOTH courses:
//
// Batch 1
//   -> III B.Sc Computer Science
//   -> MCA
//
// Batch 2
//   -> III B.Sc Computer Science
//   -> MCA
//
// This returns students even when attendance is not marked.
// ==========================================================

const getBatchStudents = async (req, res) => {

    try {

        const {
            batch
        } = req.query;


        // --------------------------------------------------
        // VALIDATION
        // --------------------------------------------------

        if (
            !batch ||
            batch.trim() === ""
        ) {

            return res.status(400).json({

                success: false,

                message: "Batch is required",

            });

        }


        // --------------------------------------------------
        // FIND STUDENTS
        // --------------------------------------------------

        const students =
            await Student.find({

                batch: batch.trim(),

                active: true,

            })

                .select(
                    "name sicId course batch"
                )

                .sort({

                    course: 1,

                    sicId: 1,

                });


        // --------------------------------------------------
        // RESPONSE
        // --------------------------------------------------

        return res.status(200).json({

            success: true,

            count: students.length,

            students: students,

        });

    } catch (error) {

        console.error(
            "Get batch students error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: "Server error",

            error: error.message,

        });

    }

};


// ==========================================================
// GET ONE STUDENT ATTENDANCE
// ==========================================================
//
// Example:
//
// ?sicId=SIC31953
//
// Returns complete attendance history.
// ==========================================================

const getStudentAttendance = async (req, res) => {

    try {

        const {
            sicId
        } = req.query;


        // --------------------------------------------------
        // VALIDATION
        // --------------------------------------------------

        if (
            !sicId ||
            sicId.trim() === ""
        ) {

            return res.status(400).json({

                success: false,

                message: "SIC ID is required",

            });

        }


        // --------------------------------------------------
        // FIND RECORDS
        // --------------------------------------------------

        const records =
            await Attendance.find({

                sicId: sicId.trim(),

            })

                .select(
                    "studentName sicId course batch date present staffId"
                )

                .sort({

                    date: 1,

                });


        // --------------------------------------------------
        // RESPONSE
        // --------------------------------------------------

        return res.status(200).json({

            success: true,

            count: records.length,

            attendance: records,

        });

    } catch (error) {

        console.error(
            "Get student attendance error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: "Server error",

            error: error.message,

        });

    }

};


// ==========================================================
// DELETE ATTENDANCE
// ==========================================================
//
// Deletes attendance for one student on one date.
// ==========================================================

const deleteAttendance = async (req, res) => {

    try {

        const {
            sicId,
            date
        } = req.body;


        // --------------------------------------------------
        // VALIDATION
        // --------------------------------------------------

        if (
            !sicId ||
            !date
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "SIC ID and date are required",

            });

        }


        // --------------------------------------------------
        // NORMALIZE DATE
        // --------------------------------------------------

        const attendanceDate =
            normalizeDate(date);


        if (!attendanceDate) {

            return res.status(400).json({

                success: false,

                message: "Invalid date",

            });

        }


        // --------------------------------------------------
        // DELETE
        // --------------------------------------------------

        const deleted =
            await Attendance.findOneAndDelete({

                sicId: sicId.trim(),

                date: attendanceDate,

            });


        if (!deleted) {

            return res.status(404).json({

                success: false,

                message:
                    "Attendance record not found",

            });

        }


        // --------------------------------------------------
        // RESPONSE
        // --------------------------------------------------

        return res.status(200).json({

            success: true,

            message:
                "Attendance deleted successfully",

        });

    } catch (error) {

        console.error(
            "Delete attendance error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: "Server error",

            error: error.message,

        });

    }

};


// ==========================================================
// EXPORT
// ==========================================================

module.exports = {

    saveAttendance,

    getAttendance,

    getBatchStudents,

    getStudentAttendance,

    deleteAttendance,

};