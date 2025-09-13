import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PiggyBank, CreditCard, TrendingUp, Target, Info, ExternalLink } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const EPFCredit = () => {
  // Mock EPF data
  const epfData = {
    currentBalance: 650000,
    monthlyContribution: 8500,
    employerContribution: 8500,
    yearlyContribution: 204000,
    projectedRetirement: 2850000,
    yearsToRetirement: 18,
    interestRate: 8.15
  };

  // Mock Credit Score data
  const creditScore = {
    score: 750,
    rating: "Excellent",
    lastUpdated: "2024-01-15",
    factors: [
      { factor: "Payment History", score: 95, impact: "Positive" },
      { factor: "Credit Utilization", score: 78, impact: "Good" },
      { factor: "Length of Credit History", score: 85, impact: "Good" },
      { factor: "Credit Mix", score: 72, impact: "Fair" },
      { factor: "New Credit", score: 88, impact: "Good" }
    ]
  };

  // EPF growth projection data
  const epfGrowthData = [
    { year: 2024, balance: 650000 },
    { year: 2025, balance: 854000 },
    { year: 2026, balance: 1074000 },
    { year: 2027, balance: 1312000 },
    { year: 2028, balance: 1569000 },
    { year: 2029, balance: 1847000 },
    { year: 2030, balance: 2147000 },
  ];

  // Credit utilization data
  const creditUtilizationData = [
    { month: 'Jan', utilization: 25 },
    { month: 'Feb', utilization: 30 },
    { month: 'Mar', utilization: 22 },
    { month: 'Apr', utilization: 28 },
    { month: 'May', utilization: 35 },
    { month: 'Jun', utilization: 20 },
  ];

  const getScoreColor = (score) => {
    if (score >= 750) return "text-success";
    if (score >= 650) return "text-warning";
    return "text-destructive";
  };

  const getScoreRating = (score) => {
    if (score >= 750) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 650) return "Fair";
    return "Poor";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">EPF & Credit Score</h1>
        <p className="text-muted-foreground">Track your retirement savings and credit health</p>
      </div>

      {/* EPF Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <PiggyBank className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Employee Provident Fund (EPF)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card">
            <CardHeader className="pb-3">
              <CardDescription>Current EPF Balance</CardDescription>
              <CardTitle className="text-3xl text-primary">₹{epfData.currentBalance.toLocaleString()}</CardTitle>
              <div className="flex items-center text-sm text-success">
                <TrendingUp className="mr-1 h-4 w-4" />
                +{epfData.interestRate}% annual interest
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Monthly Contributions</CardDescription>
              <CardTitle className="text-2xl">₹{(epfData.monthlyContribution * 2).toLocaleString()}</CardTitle>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Your: ₹{epfData.monthlyContribution.toLocaleString()}</div>
                <div>Employer: ₹{epfData.employerContribution.toLocaleString()}</div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Projected at Retirement</CardDescription>
              <CardTitle className="text-2xl">₹{(epfData.projectedRetirement / 100000).toFixed(1)}L</CardTitle>
              <div className="text-sm text-muted-foreground">
                In {epfData.yearsToRetirement} years
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* EPF Progress and Growth Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Retirement Goal Progress</CardTitle>
              <CardDescription>Target: ₹{(epfData.projectedRetirement / 100000).toFixed(0)}L by retirement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Progress</span>
                  <span>{((Number(epfData.currentBalance) / Number(epfData.projectedRetirement)) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(Number(epfData.currentBalance) / Number(epfData.projectedRetirement)) * 100} className="h-3" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">₹{epfData.currentBalance.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Current Balance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">₹{(epfData.projectedRetirement / 100000).toFixed(1)}L</div>
                  <div className="text-xs text-muted-foreground">Target Amount</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>EPF Growth Projection</CardTitle>
              <CardDescription>Expected balance growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={epfGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, 'Balance']} />
                  <Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Credit Score Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Credit Score</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <CardDescription>Your Credit Score</CardDescription>
              <div className="relative mx-auto w-32 h-32">
                <div className={`text-5xl font-bold ${getScoreColor(creditScore.score)} flex items-center justify-center h-full`}>
                  {creditScore.score}
                </div>
              </div>
              <Badge variant={creditScore.score >= 750 ? "default" : creditScore.score >= 650 ? "secondary" : "destructive"}>
                {creditScore.rating}
              </Badge>
              <div className="text-xs text-muted-foreground">
                Last updated: {new Date(creditScore.lastUpdated).toLocaleDateString()}
              </div>
            </CardHeader>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Credit Factors</CardTitle>
              <CardDescription>Factors affecting your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditScore.factors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{factor.factor}</div>
                      <div className="w-full bg-secondary rounded-full h-2 mt-1">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${factor.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <Badge 
                      variant={factor.impact === "Positive" ? "default" : factor.impact === "Good" ? "secondary" : "outline"}
                      className="ml-4"
                    >
                      {factor.impact}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Credit Utilization Trend</CardTitle>
            <CardDescription>Keep utilization below 30% for optimal score</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={creditUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                <Bar dataKey="utilization" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Improvement Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                EPF Optimization Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <Info className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Maximize VPF Contributions</div>
                  <div className="text-muted-foreground">Consider Voluntary Provident Fund for additional tax benefits</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Info className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Track Interest Rates</div>
                  <div className="text-muted-foreground">EPF interest rate is declared annually by EPFO</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Info className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Plan Partial Withdrawals</div>
                  <div className="text-muted-foreground">Use for home purchase or emergencies wisely</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Credit Score Improvement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <Info className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Pay Bills on Time</div>
                  <div className="text-muted-foreground">Payment history is 35% of your credit score</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Info className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Keep Utilization Low</div>
                  <div className="text-muted-foreground">Maintain credit card usage below 30%</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Info className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Monitor Credit Report</div>
                  <div className="text-muted-foreground">Check for errors and dispute inaccuracies</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EPFCredit;