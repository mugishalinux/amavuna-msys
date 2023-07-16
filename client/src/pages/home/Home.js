import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useAuthUser } from "react-auth-kit";

import FullScreenLoader from "../../components/loader/FullScreenLoader";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import SkipperSidebar from "../../components/sidebar/SkipperSidebar";
import { BASE_URL } from "../../config/baseUrl";

const Home = () => {
  const auth = useAuthUser();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalBoats, setTotalBoats] = useState(0);
  const [todayChristiansRegistered, setTodayChristiansRegistered] = useState(0);
  const [todayIncomesPer, setTodayIncomesPer] = useState(0);
  const [datas, setDatas] = useState([]);
  const [users, setUsers] = useState([]);
  const [christians, setChristians] = useState([]);
  const [churches, setChurches] = useState([]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        // Fetch user information using auth()
        const userInformation = await auth();

        // Set the user object in component state
        setUser(userInformation);

        //fetch total users
        const totalUsers = await axios.get(`${BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${auth().jwtToken}`,
          },
        });
        setUsers(totalUsers.data);

        //fetch christians users
        const totalChristian = await axios.get(`${BASE_URL}/christian`, {
          headers: {
            Authorization: `Bearer ${auth().jwtToken}`,
          },
        });
        setChristians(totalChristian.data);

        //fetch christians users
        const totalChurches = await axios.get(`${BASE_URL}/church`, {
          headers: {
            Authorization: `Bearer ${auth().jwtToken}`,
          },
        });
        setChurches(totalChurches.data);

        //fetch christians created in last 6 months
        const totalChristianInPastSixMonths = await axios.get(
          `${BASE_URL}/report`,
          {
            headers: {
              Authorization: `Bearer ${auth().jwtToken}`,
            },
          }
        );
        setDatas(totalChristianInPastSixMonths.data);

        //fetch christians created in last 6 months
        const totalTodayChristianRegistered = await axios.get(
          `${BASE_URL}/report/christian/registered/today`,
          {
            headers: {
              Authorization: `Bearer ${auth().jwtToken}`,
            },
          }
        );
        setTodayChristiansRegistered(totalTodayChristianRegistered.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user information:", error);
        setIsLoading(false);
      }
    };

    fetchUserInformation();
  }, []);

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <div className="home">
      <AdminSidebar />
      <div className="homeContainer">
        <Navbar imageUrl={user.profile} style={{ marginBottom: "50px" }} />

        <div className="widgets">
          <Widget type="Users" amount={users.length} />

          <Widget type="Christians" amount={christians.length} />

          <Widget type="Churches" amount={churches.length} />
        </div>
        <div className="charts">
          {/* <Featured todayIncome={todayIncomes} percentage={todayIncomesPer} /> */}
          <Featured
            todayIncome={
              todayChristiansRegistered[0].total_records_created_today
            }
            percentage={300}
          />

          <Chart
            title="Last 6 Months (Christians added)"
            aspect={2 / 1}
            data={datas}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
