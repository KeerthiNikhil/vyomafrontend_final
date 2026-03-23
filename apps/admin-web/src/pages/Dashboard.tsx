import StatCard from '../components/cards/StatCard'
import { DollarSign, Package, Star, Users, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from "react";
import API from "@/services/api";

const Dashboard = () => {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await API.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.data;

      // ✅ Transform backend → UI format
      const formattedStats = [
        {
          title: "Total Revenue",
          value: `$${data.totalRevenue}`,
          change: "+12%",
          icon: DollarSign,
        },
        {
          title: "Active Products",
          value: data.activeProducts,
          change: "+8%",
          icon: Package,
        },
        {
          title: "Total Reviews",
          value: data.totalReviews,
          change: "+23%",
          icon: Star,
        },
        {
          title: "Active Vendors",
          value: data.activeVendors,
          change: "+5%",
          icon: Users,
        },
      ];

      setStats(formattedStats);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Welcome back, Admin! Here's what's happening.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button>
            <TrendingUp className="w-4 h-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Rest same */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No recent activity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Overview</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Coming soon...</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;