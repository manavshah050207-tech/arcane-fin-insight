import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Shield, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.endsWith('@gmail.com')) {
      toast.error('Please use a Gmail address');
      return;
    }
    
    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      toast.success('OTP sent to your email!');
    }, 1500);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    
    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('financeUser', JSON.stringify({ email, authenticated: true }));
      toast.success('Login successful!');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold">FinanceAI</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Your AI-Powered
              <br />
              Finance Assistant
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Manage all your finances in one place with intelligent insights and predictions
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Smart Transaction Tracking</h3>
                <p className="text-white/80">Automatically categorize and analyze your spending</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <PieChart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Portfolio Management</h3>
                <p className="text-white/80">Real-time tracking of your investments and assets</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI-Powered Insights</h3>
                <p className="text-white/80">Get personalized investment advice and predictions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-finance-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              {step === 'email' ? 'Welcome Back' : 'Verify Your Email'}
            </CardTitle>
            <CardDescription>
              {step === 'email' 
                ? 'Sign in with your Gmail account to continue'
                : `Enter the 6-digit code sent to ${email}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'email' ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Gmail Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary border-0 hover:opacity-90 text-primary-foreground font-medium py-3"
                  disabled={loading}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-sm font-medium text-foreground">
                    Verification Code
                  </label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('email')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-primary border-0 hover:opacity-90 text-primary-foreground font-medium"
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Verify & Login'}
                  </Button>
                </div>
              </form>
            )}
            
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">
                By continuing, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">Terms</a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;