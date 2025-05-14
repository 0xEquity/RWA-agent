import React from 'react';
import { ActionFollowUpHelper } from './ActionFollowUpHelper';

interface CalculationResults {
  tokensReceived: string;
  percentageOwnership: string;
  monthlyIncome: string;
  yearlyIncome: string;
  totalReturn: string;
  roi: string;
  projectedValue: string;
}

interface PropertyInfo {
  title: string;
  address: string;
  costPerToken: number;
}

interface InvestmentCalculatorProps {
  input: {
    investmentAmount: number;
    timePeriodYears: number;
  };
  results: CalculationResults;
  property: PropertyInfo;
  onRecalculate?: () => void;
  onBuyNow?: () => void;
  followUpMessage?: string;
}

export const InvestmentCalculator: React.FC<InvestmentCalculatorProps> = ({
  input,
  results,
  property,
  onRecalculate,
  onBuyNow,
  followUpMessage
}) => {
  return (
    <div className="investment-calculator rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
      {/* Include the ActionFollowUpHelper to handle follow-up messages */}
      <ActionFollowUpHelper 
        followUpMessage={followUpMessage} 
        componentName="InvestmentCalculator" 
      />
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Investment Projection</h2>
        <h3 className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {property.title} - {property.address}
        </h3>

        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">Your Investment Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Investment Amount</span>
              <span className="font-medium">${input.investmentAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Time Period</span>
              <span className="font-medium">{input.timePeriodYears} years</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">Ownership</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tokens You'll Receive</span>
                <span className="font-medium">{results.tokensReceived}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Percentage Ownership</span>
                <span className="font-medium">{results.percentageOwnership}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Cost Per Token</span>
                <span className="font-medium">${property.costPerToken.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">Income</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Monthly Rental Income</span>
                <span className="font-medium">${results.monthlyIncome}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Yearly Rental Income</span>
                <span className="font-medium">${results.yearlyIncome}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Annual Yield</span>
                <span className="font-medium">10.00%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">Projected Returns</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Return After {input.timePeriodYears} Years</span>
              <span className="font-medium">${results.totalReturn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">ROI Percentage</span>
              <span className="font-medium">{results.roi}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Projected Value</span>
              <span className="font-medium">${results.projectedValue}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          {onRecalculate && (
            <button
              onClick={onRecalculate}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-200"
            >
              Recalculate
            </button>
          )}
          {onBuyNow && (
            <button
              onClick={onBuyNow}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};