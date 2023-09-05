import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useAuthUser } from "react-auth-kit";
import React, { useState, useEffect } from "react";
import FullScreenLoader from "../../components/loader/FullScreenLoader";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import Datatable from "../../components/datatable/VictimList";
import { BASE_URL } from "../../config/baseUrl";
import axios from "axios";
import jsPDF from "jspdf";
import { TextField } from '@mui/material';

import "jspdf-autotable"; // Import the autoTable plugin
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {
    christianAttendedColumn
} from "../../datatablesource";

function Report() {
    const auth = useAuthUser();
    const victimsColumns = []
    const [user, setUser] = useState(null);
    const [victimOnGoing, setVictimOnGoing] = useState([]);
    const [victimFinished, setVictimFinished] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState([true]);
    const [categorySelected, setCategorySelected] = useState(0);
    const [datePicked, setDatePicked] = useState(new Date());

    const [christianAttended, setChristianAttended] = useState([]);
    const handleDateChange = (event) => {
        setDatePicked(event.target.value);

    };


    const victimOngoingHandleExportToPDF = async () => {


        const doc = new jsPDF();

        const columns = christianAttendedColumn.map((column) => column.headerName);

        // Prepare the rows for the PDF table
        const rows = christianAttended.map((item) => {
            const rowData = [];
            columns.forEach((column) => {
                let value = "";

                if (column === "ID") {
                    value = item.id || ""; // Access the nested property directly
                } else if (column === "Last Name") {
                    value = item.christian.lastName || ""; // Access the nested property directly
                } else if (column === "First Name") {

                    value = item.christian.firstName || ""; // Access the nested property directly
                } else if (column === "Email") {
                    value = item.christian.email || ""; // Access the nested property directly
                } else if (column === "Attendance Date") {
                    value = item.attendenceDate || ""; // Access the nested property directly
                } else if (column === "Attendance Status") {
                    value = item.status || "";
                } else {
                    const field = christianAttended.find(
                        (col) => col.headerName === column
                    )?.field;
                    if (field) {
                        value = item[field] || "";
                    }
                }
                rowData.push(value);
            });
            return rowData;
        });

        // Add a title
        doc.text(
            `Church members  attendance on : ${datePicked} Report` ,
            105,
            10,
            { align: "center" }
        );

        // Add the table using autoTable
        doc.autoTable({
            head: [columns],
            body: rows,
        });

        // Save the PDF
        doc.save("report_list.pdf");
    };


    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                // Fetch user information using auth()
                const userInformation = await auth();

                // Set the user object in component state
                setUser(userInformation);
                setIsLoading(false);

                //fetch christ finished
                const allChristiansAttended = await axios.post(
                    `${BASE_URL}/attendence/report/${datePicked}`
                );
                setChristianAttended(allChristiansAttended.data);


            } catch (error) {
                console.error("Failed to fetch user information:", error);
                setIsLoading(false); // Set
            }
        };
        fetchUserInformation();
    }, [datePicked]);
    // if (isLoading) {
    //     return <FullScreenLoader />;
    // }

    // const handleChange = (event) => {
    //     setCategorySelected(event.target.value);
    // };

    return (
        <div className="home">
            <AdminSidebar />
            <div className="homeContainer">


                <div style={{ marginTop: "100px", width: "300px", marginLeft: "130px" }}>
                    <h6>Please select a date for checking attendance report</h6>
                    <TextField
                        label="Select Date"
                        type="date"
                        value={datePicked}
                        onChange={handleDateChange}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {/* Now you can use the datePicked state for further processing */}
                </div>
                <div style={{ display: "flex" }}>
                    <button
                        onClick={victimOngoingHandleExportToPDF}
                        style={{
                            backgroundColor: "black",
                            border: "solid black 1px",
                            color: "white",
                            marginLeft: "120px",
                            marginTop: "80px",
                            padding: "10px",
                            fontSize: "20px",
                        }}
                        className="hide-on-print"
                    // onClick={handlePrint}
                    >
                        Generate Report Of christian per Sabbath date
                    </button>


                </div>
            </div>
        </div>
    );
}

export default Report;