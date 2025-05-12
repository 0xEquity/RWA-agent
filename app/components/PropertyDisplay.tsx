import React from 'react';
import Image from 'next/image';

interface PropertyImage {
  id: number;
  original: string;
  thumbnail: string;
}

interface PropertyData {
  title: string;
  address: string;
  riskProfile: string;
  minInvestment: number;
  symbol: string;
  totalSupply: number;
  totalCost: number;
  decimals: number;
  currency: string;
  costPerToken: number;
  addresses: {
    [chainId: number]: string;
  };
  investment: {
    originalCost: number;
    sourcingFee: number;
  };
  income: {
    yearly: {
      gross: number;
      net: number;
    };
    monthly: {
      gross: number;
      net: number;
    };
  };
  expense: {
    yearly: {
      management: number;
      insurance: number;
      propertyTax: number;
      utilities: number;
      platformFee: number;
      maintenanceReserve: number;
      monthlyAdministration: number;
    };
    monthly: {
      management: number;
      insurance: number;
      propertyTax: number;
      utilities: number;
      platformFee: number;
      maintenanceReserve: number;
      monthlyAdministration: number;
    };
  };
  titleDeed: string;
  salesContract: string;
}

interface Action {
  label: string;
  action?: string;
  url?: string;
}

interface PropertyDisplayProps {
  property: PropertyData;
  images: PropertyImage[];
  actions: Action[];
}

export const PropertyDisplay: React.FC<PropertyDisplayProps> = ({ property, images, actions }) => {
  const [activeImage, setActiveImage] = React.useState<number>(0);

  const handleImageClick = (index: number) => {
    setActiveImage(index);
  };

  const handleActionClick = (action: Action) => {
    if (action.url) {
      window.open(action.url, '_blank');
    }
    // If action has an action property, it would be handled by a parent component
  };

  return (
    <div className="property-display rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
      {/* Image Gallery */}
      <div className="relative">
        <div className="h-96 relative">
          <img 
            src={images[activeImage]?.original} 
            alt={`${property.title} - Image ${activeImage + 1}`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex overflow-x-auto p-2 bg-gray-100 dark:bg-gray-900">
          {images.map((image, index) => (
            <div 
              key={image.id} 
              className={`flex-shrink-0 mx-1 cursor-pointer ${index === activeImage ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
              onClick={() => handleImageClick(index)}
            >
              <img 
                src={image.thumbnail} 
                alt={`Thumbnail ${index + 1}`} 
                className="h-16 w-24 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Property Information */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{property.title}</h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-4">{property.address}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Property Overview</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Risk Profile</span>
                <span className="font-medium">{property.riskProfile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Token Symbol</span>
                <span className="font-medium">{property.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Supply</span>
                <span className="font-medium">{property.totalSupply.toLocaleString()} tokens</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Cost Per Token</span>
                <span className="font-medium">${property.costPerToken.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Minimum Investment</span>
                <span className="font-medium">${property.minInvestment.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Property Value</span>
                <span className="font-medium">${property.totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Income Projection</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Monthly Gross Income</span>
                <span className="font-medium">${property.income.monthly.gross.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Monthly Net Income</span>
                <span className="font-medium">${property.income.monthly.net.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Yearly Gross Income</span>
                <span className="font-medium">${property.income.yearly.gross.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Yearly Net Income</span>
                <span className="font-medium">${property.income.yearly.net.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Annual Yield</span>
                <span className="font-medium">10.00%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Expenses Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 text-gray-800 dark:text-white">Monthly Expenses</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Management</span>
                  <span>${property.expense.monthly.management.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Insurance</span>
                  <span>${property.expense.monthly.insurance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Property Tax</span>
                  <span>${property.expense.monthly.propertyTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Utilities</span>
                  <span>${property.expense.monthly.utilities.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Platform Fee</span>
                  <span>${property.expense.monthly.platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Maintenance Reserve</span>
                  <span>${property.expense.monthly.maintenanceReserve.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Administration</span>
                  <span>${property.expense.monthly.monthlyAdministration.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-800 dark:text-white">Yearly Expenses</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Management</span>
                  <span>${property.expense.yearly.management.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Insurance</span>
                  <span>${property.expense.yearly.insurance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Property Tax</span>
                  <span>${property.expense.yearly.propertyTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Utilities</span>
                  <span>${property.expense.yearly.utilities.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Platform Fee</span>
                  <span>${property.expense.yearly.platformFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Maintenance Reserve</span>
                  <span>${property.expense.yearly.maintenanceReserve.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Administration</span>
                  <span>${property.expense.yearly.monthlyAdministration.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Investment Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Original Property Cost</span>
              <span className="font-medium">${property.investment.originalCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Sourcing Fee</span>
              <span className="font-medium">${property.investment.sourcingFee.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleActionClick(action)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};