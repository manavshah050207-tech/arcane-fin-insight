import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  Building,
  Banknote,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', income: 85000, expenses: 45000 },
  { month: 'Feb', income: 85000, expenses: 52000 },
  { month: 'Mar', income: 90000, expenses: 48000 },
  { month: 'Apr', income: 88000, expenses: 55000 },
  { month: 'May', income: 92000, expenses: 47000 },
  { month: 'Jun', income: 95000, expenses: 49000 },
];

const portfolioData = [
  { name: 'Stocks', value: 850000, color: 'hsl(var(--chart-1))' },
  { name: 'Real Estate', value: 1200000, color: 'hsl(var(--chart-2))' },
  { name: 'Gold', value: 150000, color: 'hsl(var(--chart-3))' },
  { name: 'FD/SIP', value: 300000, color: 'hsl(var(--chart-4))' },
];

const StatCard = ({ title, value, change, changeType, icon, description }: {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  description: string;
}) => (
  <Card className="shadow-finance-md hover:shadow-finance-lg transition-all duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
      <div className={`flex items-center text-sm ${
        changeType === 'positive' ? 'text-success' : 'text-destructive'
      }`}>
        {changeType === 'positive' ? (
          <ArrowUpRight className="h-4 w-4 mr-1" />
        ) : (
          <ArrowDownRight className="h-4 w-4 mr-1" />
        )}
        {change}
      </div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Financial Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Net Worth"
          value="₹25.8L"
          change="+12.5%"
          changeType="positive"
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          description="Total assets minus liabilities"
        />
        <StatCard
          title="Monthly Income"
          value="₹95,000"
          change="+3.2%"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5 text-success" />}
          description="This month's earnings"
        />
        <StatCard
          title="Monthly Expenses"
          value="₹49,000"
          change="-8.1%"
          changeType="positive"
          icon={<CreditCard className="h-5 w-5 text-warning" />}
          description="This month's spending"
        />
        <StatCard
          title="Investment Returns"
          value="₹1.2L"
          change="+15.7%"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5 text-success" />}
          description="Portfolio growth this year"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Income vs Expenses Chart */}
        <Card className="shadow-finance-md">
          <CardHeader>
            <CardTitle className="text-foreground">Income vs Expenses</CardTitle>
            <CardDescription>Monthly comparison over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `₹${value/1000}K`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="hsl(var(--warning))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Allocation */}
        <Card className="shadow-finance-md">
          <CardHeader>
            <CardTitle className="text-foreground">Portfolio Allocation</CardTitle>
            <CardDescription>Current asset distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {portfolioData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ₹{(item.value / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-finance-md">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activity</CardTitle>
          <CardDescription>Your latest financial transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: 'credit', description: 'Salary Credit', amount: '+₹95,000', date: 'Today' },
              { type: 'debit', description: 'Rent Payment', amount: '-₹25,000', date: 'Yesterday' },
              { type: 'investment', description: 'SIP Investment', amount: '-₹15,000', date: '2 days ago' },
              { type: 'credit', description: 'Dividend Received', amount: '+₹2,500', date: '3 days ago' },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'credit' ? 'bg-success/20' : 
                    transaction.type === 'investment' ? 'bg-primary/20' : 'bg-warning/20'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : transaction.type === 'investment' ? (
                      <Banknote className="h-4 w-4 text-primary" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-warning" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${
                  transaction.amount.startsWith('+') ? 'text-success' : 'text-foreground'
                }`}>
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;