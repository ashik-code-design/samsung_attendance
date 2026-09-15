require("dotenv").config();

const mongoose = require("mongoose");

const connectDatabase = require("../config/database");
const Student = require("../models/Student");

const students = [

    // ==========================================================
    // III B.Sc Computer Science - Batch 1
    // ==========================================================

    { name: "JOHN EPHRAIM C", sicId: "SIC31953", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "GANESHRATHAN P", sicId: "SIC31955", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "JOEL A", sicId: "SIC31956", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "NAGULAN R", sicId: "SIC31958", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "STEPHEN DEEPARAM M", sicId: "SIC31959", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "MICHAL JERONE M", sicId: "SIC31964", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "ARPUTHA JEROME", sicId: "SIC31968", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "IVAN ANDREW C", sicId: "SIC31975", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "MOHAMED ASHIK M", sicId: "SIC31977", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "SIVAPRAKASH K", sicId: "SIC31981", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "JEYAPRAKASH D", sicId: "SIC31982", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "EZHILARASU E M", sicId: "SIC31987", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "SUSAI BILCASE R", sicId: "SIC31988", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "RISHIKESH S", sicId: "SIC32012", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "JOE DICSON S", sicId: "SIC32018", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "SANJAI KUMAR", sicId: "SIC32019", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "SANTHOSH KUMAR", sicId: "SIC32027", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "JAMES FRANKLIN S", sicId: "SIC32045", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "PRAVEEN ANTONY", sicId: "SIC32046", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "SIRIL SANTHOSH RAJ J", sicId: "SIC32048", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "ROSHAN J", sicId: "SIC32054", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "ROHITH V", sicId: "SIC32061", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "AJAY J", sicId: "SIC32064", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "JERFIN SEBASTIAN S", sicId: "SIC32068", course: "III B.Sc Computer Science", batch: "Batch 1" },
    { name: "JEFRIN ARO J", sicId: "SIC32088", course: "III B.Sc Computer Science", batch: "Batch 1" },


    // ==========================================================
    // MCA - Batch 1
    // ==========================================================

    { name: "VISHAL K", sicId: "SIC31893", course: "MCA", batch: "Batch 1" },
    { name: "B ABIRAMI", sicId: "SIC31894", course: "MCA", batch: "Batch 1" },
    { name: "ARUN SIRO K", sicId: "SIC31895", course: "MCA", batch: "Batch 1" },
    { name: "RAJARAJESWARI S", sicId: "SIC31897", course: "MCA", batch: "Batch 1" },
    { name: "VANITHA M", sicId: "SIC31900", course: "MCA", batch: "Batch 1" },
    { name: "GOPINATH R", sicId: "SIC31904", course: "MCA", batch: "Batch 1" },
    { name: "ARISTATIL A", sicId: "SIC31913", course: "MCA", batch: "Batch 1" },
    { name: "A ALWIN JOSEPH", sicId: "SIC31915", course: "MCA", batch: "Batch 1" },
    { name: "BOSE PETER J", sicId: "SIC31918", course: "MCA", batch: "Batch 1" },
    { name: "MONISHA A", sicId: "SIC31919", course: "MCA", batch: "Batch 1" },
    { name: "JERRY RUFUS M", sicId: "SIC31924", course: "MCA", batch: "Batch 1" },
    { name: "SRIJA A", sicId: "SIC31925", course: "MCA", batch: "Batch 1" },
    { name: "DHIVYA DHARSHINI S", sicId: "SIC31926", course: "MCA", batch: "Batch 1" },
    { name: "KAMILLA SYNTHIA A", sicId: "SIC31933", course: "MCA", batch: "Batch 1" },
    { name: "K SAMKUMAR", sicId: "SIC31934", course: "MCA", batch: "Batch 1" },
    { name: "EPZIBA J", sicId: "SIC31935", course: "MCA", batch: "Batch 1" },
    { name: "ANDREWS M", sicId: "SIC31942", course: "MCA", batch: "Batch 1" },
    { name: "ANTO BERNATSHA G", sicId: "SIC31943", course: "MCA", batch: "Batch 1" },
    { name: "YOVAN J", sicId: "SIC31944", course: "MCA", batch: "Batch 1" },
    { name: "AADHITHIAN M", sicId: "SIC31946", course: "MCA", batch: "Batch 1" },
    { name: "JOEAL ANTO S", sicId: "SIC31949", course: "MCA", batch: "Batch 1" },
    { name: "JOAN PRINCE J", sicId: "SIC31950", course: "MCA", batch: "Batch 1" },
    { name: "PRINCY L", sicId: "SIC31951", course: "MCA", batch: "Batch 1" },
    { name: "RENALD JAISON A", sicId: "SIC32028", course: "MCA", batch: "Batch 1" },
    { name: "LINCY A", sicId: "SIC32051", course: "MCA", batch: "Batch 1" },


    // ==========================================================
    // III B.Sc Computer Science - Batch 2
    // ==========================================================

    { name: "ASHWIN MARIA ROGITH", sicId: "SIC31969", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "VISHAL PANDI S", sicId: "SIC31960", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "ALBAN A", sicId: "SIC31993", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "KEVIN MATHEW", sicId: "SIC31976", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "DANIAL RAJ A", sicId: "SIC31966", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "VIJAYAKUMAR S", sicId: "SIC32006", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "SHEIK ABDULLA M", sicId: "SIC32008", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "PRAKASH", sicId: "SIC31984", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "WELVIN GEORGE", sicId: "SIC31990", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "STEPHEN RAJ S", sicId: "SIC31991", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "EDWIN RAJ R", sicId: "SIC31962", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "VINCENT A", sicId: "SIC32023", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "THIRUPPATHI RAJA", sicId: "SIC32025", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "SUSAI KEVIN GOLPING P", sicId: "SIC32042", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "JAMES AROCKIA AUSTIN", sicId: "SIC32044", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "KARUNAHARAN V", sicId: "SIC32049", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "DIVESH P", sicId: "SIC32057", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "JEFFIN JEBA D", sicId: "SIC32062", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "SHELTAN MARIAN R", sicId: "SIC32086", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "JOE MOZART IGNATIUS", sicId: "SIC32093", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "REGAN ANTONY S", sicId: "SIC34274", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "PRAVEEN S", sicId: "SIC34263", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "ARO CYRIL IDHAYAN", sicId: "SIC34257", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "DHILIP JEROME S", sicId: "SIC34332", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "ANBU J", sicId: "SIC34341", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "VISHNU SHANKAR G", sicId: "SIC34333", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "SUBIN BENADICT S", sicId: "SIC34271", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "BENJAMIN JOSEPH S", sicId: "SIC34423", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "ARAVINTHAN K", sicId: "SIC34379", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "RAJA VIGNESH", sicId: "SIC34393", course: "III B.Sc Computer Science", batch: "Batch 2" },
    { name: "ARISTO J", sicId: "SIC31980", course: "III B.Sc Computer Science", batch: "Batch 2" },


    // ==========================================================
    // MCA - Batch 2
    // ==========================================================

    { name: "JOHN HARSHAL J", sicId: "SIC31892", course: "MCA", batch: "Batch 2" },
    { name: "KILLASPI J", sicId: "SIC31906", course: "MCA", batch: "Batch 2" },
    { name: "BENEDICT INIYAN", sicId: "SIC31911", course: "MCA", batch: "Batch 2" },
    { name: "KIRUTHIKA", sicId: "SIC31954", course: "MCA", batch: "Batch 2" },
    { name: "HEIRAM S", sicId: "SIC31921", course: "MCA", batch: "Batch 2" },
    { name: "JANANI T", sicId: "SIC31927", course: "MCA", batch: "Batch 2" },
    { name: "ANGEL SAHANA J", sicId: "SIC31928", course: "MCA", batch: "Batch 2" },
    { name: "PETCHIYAMMAL", sicId: "SIC31930", course: "MCA", batch: "Batch 2" },
    { name: "CHANDRU JAYARAJ", sicId: "SIC31923", course: "MCA", batch: "Batch 2" },
    { name: "SIVARANJANI N", sicId: "SIC31932", course: "MCA", batch: "Batch 2" },
    { name: "ABINAYA M", sicId: "SIC31936", course: "MCA", batch: "Batch 2" },
    { name: "AKILANDESHWARI M", sicId: "SIC31948", course: "MCA", batch: "Batch 2" },
    { name: "DANIYA A", sicId: "SIC31941", course: "MCA", batch: "Batch 2" },
    { name: "SAM JASHUVA", sicId: "SIC31971", course: "MCA", batch: "Batch 2" },
    { name: "DHARANIKUMAR N", sicId: "SIC31957", course: "MCA", batch: "Batch 2" },
    { name: "SEBASTEEN INIGO A", sicId: "SIC31963", course: "MCA", batch: "Batch 2" },
    { name: "JENIX IMMANUAL J", sicId: "SIC32002", course: "MCA", batch: "Batch 2" },
    { name: "SABARIVASAN S", sicId: "SIC32043", course: "MCA", batch: "Batch 2" },
    { name: "JOHN HARSHAL", sicId: "SIC32177", course: "MCA", batch: "Batch 2" },
];


// ==========================================================
// SEED STUDENTS
// ==========================================================

const seedStudents = async () => {

    try {

        await connectDatabase();

        // Remove existing students
        await Student.deleteMany({});

        // Insert all students
        await Student.insertMany(students);

        console.log("--------------------------------------");
        console.log("Students seeded successfully");
        console.log(`Total students: ${students.length}`);
        console.log("--------------------------------------");

        await mongoose.connection.close();

        process.exit(0);

    } catch (error) {

        console.error(
            "Student seeding failed:",
            error.message
        );

        await mongoose.connection.close();

        process.exit(1);
    }
};


seedStudents();