import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Bot, 
  User, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Lightbulb,
  DollarSign
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI Finance Assistant. I can help you analyze your spending, suggest investments, and answer questions about your financial data. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "How much did I spend last month?",
        "Which stocks should I consider?",
        "Can I afford a vacation?",
        "Show my expense trends"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('spend') || lowerMessage.includes('expense')) {
      return {
        content: "Based on your transaction data, you spent ₹57,800 last month. Here's the breakdown:\n\n• Rent: ₹25,000 (43%)\n• Investment: ₹15,000 (26%)\n• Food: ₹5,300 (9%)\n• Transportation: ₹4,500 (8%)\n• Others: ₹8,000 (14%)\n\nYour spending is 15% lower than the previous month, which is great! Consider increasing your investment allocation since you're saving more.",
        suggestions: [
          "How can I reduce expenses further?",
          "What's my biggest spending category?",
          "Compare with previous months"
        ]
      };
    }
    
    if (lowerMessage.includes('stock') || lowerMessage.includes('invest')) {
      return {
        content: "Based on your risk profile and current portfolio, here are some investment suggestions:\n\n**High Growth Potential:**\n• HDFC Bank - Strong fundamentals, banking sector leader\n• Infosys - Tech sector growth, dividend yield 2.1%\n• Asian Paints - Consumer goods, consistent performer\n\n**Diversification:**\n• Add some pharma exposure (Dr. Reddy's)\n• Consider FMCG (Hindustan Unilever)\n\n**Key Metrics:**\n• Your current portfolio has 65% large-cap exposure\n• Consider adding 15% mid-cap for higher returns\n• Current allocation: 85% equity, 15% debt (good for your age)",
        suggestions: [
          "What's my current portfolio allocation?",
          "Should I invest more in SIPs?",
          "Tell me about sector diversification"
        ]
      };
    }
    
    if (lowerMessage.includes('vacation') || lowerMessage.includes('afford')) {
      return {
        content: "Let me analyze your financial capacity for a vacation:\n\n**Current Status:**\n• Monthly surplus: ₹46,000\n• Emergency fund: ₹2.8L (5.7 months expenses)\n• Upcoming commitments: Investment SIPs\n\n**Vacation Budget Analysis:**\n• Domestic vacation (₹50K): ✅ Easily affordable\n• International vacation (₹1.5L): ⚠️ Possible but plan for 3-4 months\n• Luxury international (₹3L+): ❌ Would impact your financial goals\n\n**Recommendation:** Plan a domestic vacation now, and save ₹25K monthly for 6 months for an international trip without affecting your investment goals.",
        suggestions: [
          "How to save for international vacation?",
          "What's my emergency fund status?",
          "Impact on my investment goals?"
        ]
      };
    }
    
    if (lowerMessage.includes('trend') || lowerMessage.includes('pattern')) {
      return {
        content: "Here are your key financial trends:\n\n**Positive Trends:**\n• Expenses decreased by 15% over last 3 months\n• Investment allocation increased from 12% to 16%\n• No credit card debt accumulation\n\n**Areas to Watch:**\n• Food expenses up 8% (₹5,300 vs ₹4,900)\n• Entertainment spending volatile (₹800-₹2,200)\n\n**Predictions:**\n• At current savings rate, you'll reach ₹50L net worth in 4.2 years\n• Your investment portfolio is likely to grow 12-15% annually\n• Consider increasing SIP by ₹5,000 to reach goals 8 months earlier",
        suggestions: [
          "How to optimize my food budget?",
          "Investment growth projections",
          "When will I reach financial independence?"
        ]
      };
    }
    
    // Default response
    return {
      content: "I understand you're asking about your finances. I have access to your transaction data, investment portfolio, and can provide insights on:\n\n• Spending analysis and budgeting\n• Investment recommendations\n• Financial goal planning\n• Expense optimization\n• Market predictions and opportunities\n\nCould you be more specific about what you'd like to know?",
      suggestions: [
        "Analyze my spending patterns",
        "Suggest investment opportunities",
        "Help me plan my budget",
        "Check my financial health"
      ]
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">AI Finance Assistant</h1>
        <p className="text-muted-foreground">Get personalized insights and recommendations for your finances</p>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 shadow-finance-md flex flex-col">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Smart Financial Advisor
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className={message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}>
                      {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`space-y-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-3 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-accent text-accent-foreground'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    
                    {message.suggestions && message.sender === 'ai' && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-accent text-accent-foreground p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your finances, investments, or get personalized advice..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim()} className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInput("What are my top expenses this month?")}
          className="justify-start"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Expense Analysis
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInput("Suggest some good stocks to invest in")}
          className="justify-start"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Investment Ideas
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInput("How is my financial health?")}
          className="justify-start"
        >
          <Target className="h-4 w-4 mr-2" />
          Financial Health
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInput("What opportunities should I look for?")}
          className="justify-start"
        >
          <Lightbulb className="h-4 w-4 mr-2" />
          Opportunities
        </Button>
      </div>
    </div>
  );
};

export default AIChat;