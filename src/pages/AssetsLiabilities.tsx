import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Plus, Car, Home, Coins, CreditCard, Building, Smartphone } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AssetsLiabilities = () => {
  // Mock Assets Data
  const assets = [
    {
      category: "Real Estate",
      items: [
        { name: "Primary Residence - Mumbai", value: 2800000, icon: Home, growth: 8.5 },
        { name: "Rental Property - Pune", value: 1850000, icon: Building, growth: 12.2 }
      ]
    },
    {
      category: "Investments",
      items: [
        { name: "Stock Portfolio", value: 650000, icon: TrendingUp, growth: 15.8 },
        { name: "Mutual Funds", value: 380000, icon: TrendingUp, growth: 12.4 },
        { name: "Fixed Deposits", value: 250000, icon: TrendingUp, growth: 6.5 }
      ]
    },
    {
      category: "Physical Assets",
      items: [
        { name: "Gold Jewelry & Coins", value: 180000, icon: Coins, growth: 10.2 },
        { name: "Car - Honda City", value: 850000, icon: Car, growth: -15.5 },
        { name: "Electronics & Gadgets", value: 120000, icon: Smartphone, growth: -25.0 }
      ]
    },
    {
      category: "Cash & Bank",
      items: [
        { name: "Savings Account", value: 150000, icon: TrendingUp, growth: 3.5 },
        { name: "Emergency Fund", value: 200000, icon: TrendingUp, growth: 4.0 }
      ]
    }
  ];

  // Mock Liabilities Data
  const liabilities = [
    {
      category: "Loans",
      items: [
        { 
          name: "Home Loan", 
          amount: 2200000, 
          emi: 28500, 
          tenure: 180, 
          remaining: 165, 
          interestRate: 8.5,
          icon: Home 
        },
        { 
          name: "Car Loan", 
          amount: 450000, 
          emi: 12800, 
          tenure: 60, 
          remaining: 32, 
          interestRate: 9.2,
          icon: Car 
        }
      ]
    },
    {
      category: "Credit Cards",
      items: [
        { 
          name: "HDFC Regalia", 
          amount: 45000, 
          limit: 200000, 
          minPayment: 2250, 
          dueDate: "2024-01-25",
          icon: CreditCard 
        },
        { 
          name: "SBI Prime", 
          amount: 18000, 
          limit: 150000, 
          minPayment: 900, 
          dueDate: "2024-01-28",
          icon: CreditCard 
        }
      ]
    }
  ];

  // Calculate totals
  const totalAssets = assets.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => catSum + item.value, 0), 0
  );
  
  const totalLiabilities = liabilities.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => catSum + (Number(item.amount) || 0), 0), 0
  );

  const netWorth = totalAssets - totalLiabilities;

  // Pie chart data for assets
  const assetChartData = assets.map(category => ({
    name: category.category,
    value: category.items.reduce((sum, item) => sum + item.value, 0),
    color: `hsl(var(--chart-${assets.indexOf(category) + 1}))`
  }));

  // Pie chart data for liabilities
  const liabilityChartData = liabilities.map(category => ({
    name: category.category,
    value: category.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
    color: `hsl(var(--chart-${liabilities.indexOf(category) + 3}))`
  }));

  // Net worth trend data
  const netWorthTrend = [
    { month: 'Jan', netWorth: 2850000 },
    { month: 'Feb', netWorth: 2920000 },
    { month: 'Mar', netWorth: 2880000 },
    { month: 'Apr', netWorth: 3050000 },
    { month: 'May', netWorth: 3180000 },
    { month: 'Jun', netWorth: netWorth },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assets & Liabilities</h1>
          <p className="text-muted-foreground">Track your financial position and net worth</p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add Asset/Liability
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-success">
          <CardHeader className="pb-3">
            <CardDescription className="text-success-foreground/80">Total Assets</CardDescription>
            <CardTitle className="text-2xl text-success-foreground">₹{(totalAssets / 100000).toFixed(1)}L</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gradient-card border-destructive/20">
          <CardHeader className="pb-3">
            <CardDescription>Total Liabilities</CardDescription>
            <CardTitle className="text-2xl text-destructive">₹{(totalLiabilities / 100000).toFixed(1)}L</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gradient-primary">
          <CardHeader className="pb-3">
            <CardDescription className="text-primary-foreground/80">Net Worth</CardDescription>
            <CardTitle className="text-2xl text-primary-foreground flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              ₹{(netWorth / 100000).toFixed(1)}L
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardHeader className="pb-3">
            <CardDescription>Debt-to-Asset Ratio</CardDescription>
            <CardTitle className="text-2xl">{((totalLiabilities / totalAssets) * 100).toFixed(1)}%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Asset Distribution</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={assetChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ₹${(value / 100000).toFixed(1)}L`}
                  labelLine={false}
                  fontSize={10}
                >
                  {assetChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liability Distribution</CardTitle>
            <CardDescription>Outstanding debts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={liabilityChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ₹${(value / 100000).toFixed(1)}L`}
                  labelLine={false}
                  fontSize={10}
                >
                  {liabilityChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Net Worth Trend</CardTitle>
            <CardDescription>6-month progression</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={netWorthTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, 'Net Worth']} />
                <Bar dataKey="netWorth" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Assets and Liabilities Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-success">
              <TrendingUp className="mr-2 h-5 w-5" />
              Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {assets.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  {category.category}
                </h4>
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.growth >= 0 ? '+' : ''}{item.growth.toFixed(1)}% this year
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{(item.value / 100000).toFixed(1)}L</div>
                      <Badge variant={item.growth >= 0 ? "default" : "destructive"} className="text-xs">
                        {item.growth >= 0 ? '+' : ''}{item.growth.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Liabilities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <TrendingDown className="mr-2 h-5 w-5" />
              Liabilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {liabilities.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  {category.category}
                </h4>
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                        <div className="font-medium">{item.name}</div>
                      </div>
                      <div className="font-semibold text-destructive">
                        ₹{((Number(item.amount) || 0) / 100000).toFixed(1)}L
                      </div>
                    </div>
                    
                    {/* Loan Details */}
                    {item.emi && (
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>EMI: ₹{item.emi.toLocaleString()}</span>
                          <span>Rate: {item.interestRate}%</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Remaining tenure</span>
                            <span>{item.remaining} months</span>
                          </div>
                          <Progress 
                            value={((item.tenure - item.remaining) / item.tenure) * 100} 
                            className="h-1.5"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Credit Card Details */}
                    {item.limit && (
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Utilization: {((Number(item.amount) / Number(item.limit)) * 100).toFixed(1)}%</span>
                          <span>Limit: ₹{Number(item.limit).toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={(Number(item.amount) / Number(item.limit)) * 100} 
                          className="h-1.5"
                        />
                        <div className="flex justify-between">
                          <span>Min Payment: ₹{item.minPayment}</span>
                          <span>Due: {item.dueDate}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssetsLiabilities;