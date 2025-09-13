import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  TrendingDown,
  ArrowUpDown,
  Download
} from 'lucide-react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockTransactions = [
  { id: 1, date: '2024-01-15', type: 'credit', category: 'Salary', description: 'Monthly Salary', amount: 95000, balance: 285000 },
  { id: 2, date: '2024-01-14', type: 'debit', category: 'Rent', description: 'House Rent', amount: -25000, balance: 190000 },
  { id: 3, date: '2024-01-13', type: 'debit', category: 'Food', description: 'Grocery Shopping', amount: -3500, balance: 215000 },
  { id: 4, date: '2024-01-12', type: 'debit', category: 'Investment', description: 'Mutual Fund SIP', amount: -15000, balance: 218500 },
  { id: 5, date: '2024-01-11', type: 'credit', category: 'Investment', description: 'Dividend Received', amount: 2500, balance: 233500 },
  { id: 6, date: '2024-01-10', type: 'debit', category: 'Utilities', description: 'Electricity Bill', amount: -2800, balance: 231000 },
  { id: 7, date: '2024-01-09', type: 'debit', category: 'Transportation', description: 'Fuel', amount: -4500, balance: 233800 },
  { id: 8, date: '2024-01-08', type: 'debit', category: 'Entertainment', description: 'Movie & Dinner', amount: -2200, balance: 238300 },
  { id: 9, date: '2024-01-07', type: 'debit', category: 'Food', description: 'Restaurant', amount: -1800, balance: 240500 },
  { id: 10, date: '2024-01-06', type: 'credit', category: 'Freelance', description: 'Project Payment', amount: 25000, balance: 242300 },
];

const expenseData = [
  { category: 'Rent', amount: 25000, color: 'hsl(var(--chart-1))' },
  { category: 'Investment', amount: 15000, color: 'hsl(var(--chart-2))' },
  { category: 'Food', amount: 5300, color: 'hsl(var(--chart-3))' },
  { category: 'Transportation', amount: 4500, color: 'hsl(var(--chart-4))' },
  { category: 'Utilities', amount: 2800, color: 'hsl(var(--chart-5))' },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
  
  const totalCredits = mockTransactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
  const totalDebits = Math.abs(mockTransactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0));
  const netBalance = totalCredits - totalDebits;

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    const matchesType = filterType === 'all' || transaction.type === filterType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bank Transactions</h1>
        <p className="text-muted-foreground">Track and analyze your financial transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-finance-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Credits</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">₹{totalCredits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Income this month</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-finance-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Debits</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">₹{totalDebits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Expenses this month</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-finance-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Balance</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netBalance >= 0 ? 'text-success' : 'text-destructive'}`}>
              ₹{netBalance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Current month difference</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-finance-md">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Top spending categories this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="category" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `₹${value/1000}K`}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-finance-md">
          <CardHeader>
            <CardTitle>Transaction Trend</CardTitle>
            <CardDescription>Daily balance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockTransactions.slice().reverse()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => format(new Date(value), 'MM/dd')}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `₹${value/1000}K`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-finance-md">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Filter and search through your transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-[250px]"
                />
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Investment">Investment</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[120px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Transactions Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-accent/50 transition-colors">
                      <td className="px-4 py-3 text-sm text-foreground">
                        {format(new Date(transaction.date), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-foreground">{transaction.description}</div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="text-xs">
                          {transaction.category}
                        </Badge>
                      </td>
                      <td className={`px-4 py-3 text-right text-sm font-semibold ${
                        transaction.type === 'credit' ? 'text-success' : 'text-destructive'
                      }`}>
                        {transaction.type === 'credit' ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-foreground">
                        ₹{transaction.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;