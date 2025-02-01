'use client';

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Users, 
  FileText, 
  DollarSign, 
  Activity 
} from 'lucide-react';

const statsData = [
  { name: 'Total Users', value: 1245, icon: Users, color: 'text-blue-500' },
  { name: 'Total Blogs', value: 87, icon: FileText, color: 'text-green-500' },
  { name: 'Revenue', value: '$45,230', icon: DollarSign, color: 'text-purple-500' },
  { name: 'Active Users', value: 532, icon: Activity, color: 'text-red-500' }
];

const chartData = [
  { month: 'Jan', users: 400, blogs: 240 },
  { month: 'Feb', users: 300, blogs: 139 },
  { month: 'Mar', users: 200, blogs: 980 },
  { month: 'Apr', users: 278, blogs: 390 },
  { month: 'May', users: 189, blogs: 480 },
  { month: 'Jun', users: 239, blogs: 380 }
];

export default function DashboardStats() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly User and Blog Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#8884d8" name="Users" />
              <Bar dataKey="blogs" fill="#82ca9d" name="Blogs" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}