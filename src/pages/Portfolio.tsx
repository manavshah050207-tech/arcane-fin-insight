import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Eye, Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Portfolio = () => {
  // Mock portfolio data
  const holdings = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd.",
      quantity: 25,
      avgBuyPrice: 2450.00,
      currentPrice: 2580.50,
      investedAmount: 61250,
      currentValue: 64512.50,
      gainLoss: 3262.50,
      gainLossPercent: 5.33,
      sector: "Energy"
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      quantity: 15,
      avgBuyPrice: 3650.00,
      currentPrice: 3720.80,
      investedAmount: 54750,
      currentValue: 55812,
      gainLoss: 1062,
      gainLossPercent: 1.94,
      sector: "IT"
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Ltd.",
      quantity: 30,
      avgBuyPrice: 1580.25,
      currentPrice: 1645.70,
      investedAmount: 47407.50,
      currentValue: 49371,
      gainLoss: 1963.50,
      gainLossPercent: 4.14,
      sector: "Banking"
    },
    {
      symbol: "INFY",
      name: "Infosys Ltd.",
      quantity: 40,
      avgBuyPrice: 1420.00,
      currentPrice: 1385.60,
      investedAmount: 56800,
      currentValue: 55424,
      gainLoss: -1376,
      gainLossPercent: -2.42,
      sector: "IT"
    }
  ];

  const totalInvested = holdings.reduce((sum, stock) => sum + stock.investedAmount, 0);
  const totalCurrentValue = holdings.reduce((sum, stock) => sum + stock.currentValue, 0);
  const totalGainLoss = totalCurrentValue - totalInvested;
  const totalGainLossPercent = (totalGainLoss / totalInvested) * 100;

  // Portfolio performance data
  const performanceData = [
    { date: 'Jan', invested: 180000, current: 185000 },
    { date: 'Feb', invested: 190000, current: 192000 },
    { date: 'Mar', invested: 200000, current: 195000 },
    { date: 'Apr', invested: 210000, current: 218000 },
    { date: 'May', invested: 220000, current: 225000 },
    { date: 'Jun', invested: 220000, current: totalCurrentValue },
  ];

  // Sector allocation data
  const sectorData = [
    { name: 'IT', value: 35, color: 'hsl(var(--chart-1))' },
    { name: 'Banking', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'Energy', value: 20, color: 'hsl(var(--chart-3))' },
    { name: 'Healthcare', value: 12, color: 'hsl(var(--chart-4))' },
    { name: 'Others', value: 8, color: 'hsl(var(--chart-5))' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground">Track your stock investments and performance</p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card">
          <CardHeader className="pb-3">
            <CardDescription>Total Invested</CardDescription>
            <CardTitle className="text-2xl">₹{totalInvested.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardHeader className="pb-3">
            <CardDescription>Current Value</CardDescription>
            <CardTitle className="text-2xl">₹{totalCurrentValue.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardHeader className="pb-3">
            <CardDescription>Total Gain/Loss</CardDescription>
            <CardTitle className={`text-2xl flex items-center ${totalGainLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
              {totalGainLoss >= 0 ? <TrendingUp className="mr-2 h-5 w-5" /> : <TrendingDown className="mr-2 h-5 w-5" />}
              ₹{Math.abs(totalGainLoss).toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardHeader className="pb-3">
            <CardDescription>Return %</CardDescription>
            <CardTitle className={`text-2xl ${totalGainLossPercent >= 0 ? 'text-success' : 'text-destructive'}`}>
              {totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Invested vs Current Value over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                <Line type="monotone" dataKey="invested" stroke="hsl(var(--muted-foreground))" strokeWidth={2} />
                <Line type="monotone" dataKey="current" stroke="hsl(var(--primary))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sector Allocation</CardTitle>
            <CardDescription>Portfolio distribution by sectors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
          <CardDescription>Your current stock positions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 font-medium">Stock</th>
                  <th className="text-right py-3 font-medium">Qty</th>
                  <th className="text-right py-3 font-medium">Avg Price</th>
                  <th className="text-right py-3 font-medium">Current Price</th>
                  <th className="text-right py-3 font-medium">Invested</th>
                  <th className="text-right py-3 font-medium">Current Value</th>
                  <th className="text-right py-3 font-medium">P&L</th>
                  <th className="text-center py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((stock, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4">
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground">{stock.name}</div>
                      </div>
                    </td>
                    <td className="text-right py-4">{stock.quantity}</td>
                    <td className="text-right py-4">₹{stock.avgBuyPrice.toFixed(2)}</td>
                    <td className="text-right py-4">₹{stock.currentPrice.toFixed(2)}</td>
                    <td className="text-right py-4">₹{stock.investedAmount.toLocaleString()}</td>
                    <td className="text-right py-4">₹{stock.currentValue.toLocaleString()}</td>
                    <td className="text-right py-4">
                      <div className={stock.gainLoss >= 0 ? 'text-success' : 'text-destructive'}>
                        ₹{Math.abs(stock.gainLoss).toLocaleString()}
                        <div className="text-xs">
                          ({stock.gainLossPercent >= 0 ? '+' : ''}{stock.gainLossPercent.toFixed(2)}%)
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;