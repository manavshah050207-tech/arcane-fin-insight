import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Calculator, MapPin, Home, TrendingUp, AlertCircle } from "lucide-react";

const RealEstate = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    location: '',
    bhk: '',
    area: '',
    age: '',
    paperwork: true,
    penthouse: false,
    terrace: false,
    parking: '0'
  });

  const [estimation, setEstimation] = useState(null);

  const handleEstimate = () => {
    // Mock estimation logic
    const basePrice = parseFloat(propertyDetails.area) * 8000; // Base price per sqft
    let adjustedPrice = basePrice;
    
    // Location adjustments
    const locationMultiplier = {
      'mumbai': 1.8,
      'delhi': 1.5,
      'bangalore': 1.3,
      'pune': 1.1,
      'chennai': 1.0,
      'hyderabad': 0.9,
      'other': 0.7
    };
    
    adjustedPrice *= locationMultiplier[propertyDetails.location] || 1;
    
    // Age adjustments
    const ageAdjustment = Math.max(0.7, 1 - (parseInt(propertyDetails.age) * 0.02));
    adjustedPrice *= ageAdjustment;
    
    // Additional adjustments
    if (!propertyDetails.paperwork) adjustedPrice *= 0.9;
    if (propertyDetails.penthouse) adjustedPrice *= 1.2;
    if (propertyDetails.terrace) adjustedPrice *= 1.1;
    if (parseInt(propertyDetails.parking) > 1) adjustedPrice *= 1.05;
    
    const minPrice = adjustedPrice * 0.85;
    const maxPrice = adjustedPrice * 1.15;
    
    setEstimation({
      minPrice: Math.round(minPrice),
      maxPrice: Math.round(maxPrice),
      avgPrice: Math.round(adjustedPrice),
      factors: [
        { factor: 'Location Premium', impact: `+${((locationMultiplier[propertyDetails.location] - 1) * 100).toFixed(0)}%`, positive: true },
        { factor: 'Property Age', impact: `-${((1 - ageAdjustment) * 100).toFixed(0)}%`, positive: false },
        { factor: 'Paperwork Status', impact: propertyDetails.paperwork ? 'Complete' : '-10%', positive: propertyDetails.paperwork },
        { factor: 'Premium Features', impact: `+${(propertyDetails.penthouse ? 20 : 0) + (propertyDetails.terrace ? 10 : 0)}%`, positive: true }
      ]
    });
  };

  const myProperties = [
    {
      address: "3BHK Apartment, Bandra West, Mumbai",
      area: 1200,
      currentValue: 2800000,
      purchasePrice: 2200000,
      purchaseYear: 2019,
      appreciation: 27.27
    },
    {
      address: "2BHK Flat, Koramangala, Bangalore",
      area: 900,
      currentValue: 1850000,
      purchasePrice: 1600000,
      purchaseYear: 2020,
      appreciation: 15.63
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Real Estate</h1>
        <p className="text-muted-foreground">Estimate property values and track your real estate portfolio</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Estimation Tool */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="mr-2 h-5 w-5" />
              Property Value Estimator
            </CardTitle>
            <CardDescription>Get an estimated value for your property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={propertyDetails.location} onValueChange={(value) => setPropertyDetails({...propertyDetails, location: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bhk">BHK</Label>
                <Select value={propertyDetails.bhk} onValueChange={(value) => setPropertyDetails({...propertyDetails, bhk: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="BHK" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 BHK</SelectItem>
                    <SelectItem value="2">2 BHK</SelectItem>
                    <SelectItem value="3">3 BHK</SelectItem>
                    <SelectItem value="4">4 BHK</SelectItem>
                    <SelectItem value="5">5+ BHK</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Area (sqft)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="1200"
                  value={propertyDetails.area}
                  onChange={(e) => setPropertyDetails({...propertyDetails, area: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Property Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="5"
                value={propertyDetails.age}
                onChange={(e) => setPropertyDetails({...propertyDetails, age: e.target.value})}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="paperwork">Complete Paperwork</Label>
                <Switch
                  id="paperwork"
                  checked={propertyDetails.paperwork}
                  onCheckedChange={(checked) => setPropertyDetails({...propertyDetails, paperwork: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="penthouse">Penthouse Rights</Label>
                <Switch
                  id="penthouse"
                  checked={propertyDetails.penthouse}
                  onCheckedChange={(checked) => setPropertyDetails({...propertyDetails, penthouse: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="terrace">Terrace Rights</Label>
                <Switch
                  id="terrace"
                  checked={propertyDetails.terrace}
                  onCheckedChange={(checked) => setPropertyDetails({...propertyDetails, terrace: checked})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parking">Parking Slots</Label>
                <Select value={propertyDetails.parking} onValueChange={(value) => setPropertyDetails({...propertyDetails, parking: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Parking</SelectItem>
                    <SelectItem value="1">1 Slot</SelectItem>
                    <SelectItem value="2">2 Slots</SelectItem>
                    <SelectItem value="3">3+ Slots</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleEstimate} className="w-full bg-gradient-primary">
              Calculate Estimate
            </Button>
          </CardContent>
        </Card>

        {/* Estimation Results */}
        {estimation && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Estimated Value
              </CardTitle>
              <CardDescription>Based on current market conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-gradient-card rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  ₹{((estimation.minPrice + estimation.maxPrice) / 2 / 100000).toFixed(1)}L
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Range: ₹{(estimation.minPrice / 100000).toFixed(1)}L - ₹{(estimation.maxPrice / 100000).toFixed(1)}L
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Price Factors</h4>
                {estimation.factors.map((factor, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">{factor.factor}</span>
                    <Badge variant={factor.positive ? "default" : "destructive"}>
                      {factor.impact}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="flex items-start space-x-2 p-3 bg-warning-light rounded-lg">
                <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                <div className="text-xs text-warning-foreground">
                  This is an estimated value based on market trends and property features. 
                  Actual market value may vary. Consult a certified property valuator for accurate assessment.
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* My Properties */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Home className="mr-2 h-5 w-5" />
            My Properties
          </CardTitle>
          <CardDescription>Your real estate portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myProperties.map((property, index) => (
              <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="font-medium flex items-center">
                      <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                      {property.address}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {property.area} sqft • Purchased in {property.purchaseYear}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-semibold">₹{(property.currentValue / 100000).toFixed(1)}L</div>
                    <div className="text-sm text-success flex items-center">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +{property.appreciation.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealEstate;