import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { WalletIcon, UsersIcon, EyeIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import moment from 'moment'; // Ensure this is imported

// Register Chart.js components
Chart.register(...registerables);

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Top Categories',
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  });

  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Page Views',
        data: [],
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  });

  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userChange, setUserChange] = useState('');
  const [percentageChange, setPercentageChange] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('https://gbr.clarodigi.com/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const users = response.data.users;
        const total = users.length;

        // Calculate new users this week
        const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
        const endOfWeek = moment().endOf('week').format('YYYY-MM-DD');
        const newUsersThisWeek = users.filter(user =>
          moment(user.created_at).isBetween(startOfWeek, endOfWeek, null, '[]')
        ).length;

        // Example previous week data (replace these with actual values)
        const previousWeekNewUsers = 150; // Replace with actual previous new users count

        // Calculate change and percentage
        const userChangeText = `${newUsersThisWeek - previousWeekNewUsers} new users this week`;
        const percentageChangeValue = ((newUsersThisWeek - previousWeekNewUsers) / previousWeekNewUsers * 100).toFixed(2);
        const percentageChangeText = `${percentageChangeValue}% ${newUsersThisWeek > previousWeekNewUsers ? 'more' : 'less'} than last week`;

        setTotalUsers(total);
        setUserChange(userChangeText);
        setPercentageChange(percentageChangeText);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  // Fetch data from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.clarodigi.com/api/products');
        const products = response.data;

        // Process the data to get category counts
        const categoryCounts = products.reduce((acc, product) => {
          const category = product.category;
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] += 1;
          return acc;
        }, {});

        // Update pieChartData state
        setPieChartData({
          labels: Object.keys(categoryCounts),
          datasets: [
            {
              label: 'Top Categories',
              data: Object.values(categoryCounts),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Adjust colors if needed
            },
          ],
        });

        // Example data for lineChartData (replace with your actual data)
        const pageViews = [0, 0, 0, 0, 0, 0, 0]; // Example data
        const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']; // Example labels

        setLineChartData({
          labels: dates,
          datasets: [
            {
              label: 'Page Views',
              data: pageViews,
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategories();

    return () => {
      if (pieChartRef.current && pieChartRef.current.chartInstance) {
        pieChartRef.current.chartInstance.destroy();
      }
      if (lineChartRef.current && lineChartRef.current.chartInstance) {
        lineChartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen mt-16 md:mt-1 text-white">
      {/* Top Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <Card title="Revenue" value="$0k" change="$0 from last week" icon={<WalletIcon className="h-6 w-6" />} bg="bg-gray-800" />
        <Card
          title="Total Users"
          value={`${totalUsers}`}
          change={percentageChange}
          icon={<UsersIcon className="h-6 w-6" />}
          bg="bg-gray-800"
        />
        <Card title="Store Visitors" value="0K" change="0K from last week" icon={<EyeIcon className="h-6 w-6" />} bg="bg-gray-800" />
        <Card title="Bounce Rate" value="0%" change="0% from last week" icon={<ArrowTrendingDownIcon className="h-6 w-6" />} bg="bg-gray-800" />
      </div>

      {/* Performance Section */}
      <div className="grid grid-cols-1 md:grid-cols-8  gap-4 mb-4">
        <div className="col-span-1 md:col-span-5 ">
          <div className="bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-xl">Performance</h5>
              <Dropdown isOpen={isDropdownOpen} toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)} />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4 p-4 border border-gray-700 rounded-lg">
              <Metric title="Page Views" value="0" change="0%" icon={<ArrowTrendingUpIcon className="h-6 w-6" />} />
              <Metric title="Total Sales" value="0" change="0%" icon={<ArrowTrendingDownIcon className="h-6 w-6" />} />
              <Metric title="Conversion Rate" value="0%" change="0%" icon={<ArrowTrendingUpIcon className="h-6 w-6" />} />
            </div>
            <div>
              {/* Line chart */}
              <Line ref={lineChartRef} data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 ">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6"> {/* Increased padding */}
            <div className="flex items-center justify-between mb-4"> {/* Adjusted margin-bottom */}
              <h5 className="text-xl font-semibold">Top Categories</h5> {/* Increased font weight */}
            </div>
            <div className="flex items-center justify-center mb-6"> {/* Added margin-bottom */}
              {/* Pie chart */}
              <Pie ref={pieChartRef} data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <ul className="list-group mt-4 space-y-3"> {/* Adjusted space between items */}
              {pieChartData.labels.map((label, index) => (
                <CategoryItem key={label} name={label} value={pieChartData.datasets[0].data[index]} />
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Weekly Visits Section */}
      <div className="bg-gray-800 rounded-lg mb-[72px] md:mb-1 shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h5 className="text-xl">Weekly Visits</h5>
          <Dropdown isOpen={isDropdownOpen} toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)} />
        </div>
        <div>
          {/* Line chart or another chart */}
          <Line ref={lineChartRef} data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

// Card Component
const Card = ({ title, value, change, icon, bg }) => (
  <div className={`rounded-lg shadow-lg p-4 ${bg}`}>
    <div className="flex items-center">
      <div>
        <p className="text-gray-400">{title}</p>
        <h4 className="text-white text-2xl font-semibold">{value}</h4>
        <p className="text-gray-500 text-sm">{change}</p>
      </div>
      <div className="ml-auto bg-gray-600 p-3 rounded-full text-white">
        {icon}
      </div>
    </div>
  </div>
);

// Metric Component
const Metric = ({ title, value, change, icon }) => (
  <div className="text-center">
    <h5 className="text-2xl font-semibold">
      {value}{' '}
      <span className="text-green-500 text-sm">
        {change} {icon}
      </span>
    </h5>
    <p className="text-gray-400">{title}</p>
  </div>
);

// Category Item Component
const CategoryItem = ({ name, value }) => (
  <li className="flex justify-between items-center py-2 border-t border-gray-700">
    <span>{name}</span>
    <span className="bg-gray-700 text-white px-3 py-1 rounded">{value}</span>
  </li>
);

// Dropdown Component
const Dropdown = ({ isOpen, toggleDropdown }) => (
  <div className="relative">
    <button
      className="bg-gray-700 p-2 rounded-md text-white focus:outline-none"
      onClick={toggleDropdown}
    >
      <EllipsisVerticalIcon className="h-5 w-5" />
    </button>
    {isOpen && (
      <div className="absolute right-0 mt-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow-lg w-48">
        <a href="#" className="block px-4 py-2 hover:bg-gray-200">Something else here</a>
      </div>
    )}
  </div>
);

export default Dashboard;
