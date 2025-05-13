import React from "react";
import Link from "next/link";

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
    <div className="flex flex-col property-display rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex gap-4">
        <div className="relative w-1/2 p-2 py-2.5 pr-0">
          <div className="h-44 w-full relative rounded overflow-hidden">
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
                className={`flex-shrink-0 mx-1 cursor-pointer ${index === activeImage ? "border-2 border-blue-500" : "border border-gray-300"}`}
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
        <div className="p-2 text-xs">
          <h1 className="text-2xl mt-1 mb-2 font-bold text-gray-800 dark:text-white">
            {property.title}
          </h1>
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-4 justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Token Symbol
              </span>
              <span className="font-medium">{property.symbol}</span>
            </div>
            <div className="flex gap-4 justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Total Supply
              </span>
              <span className="font-medium">
                {property.totalSupply.toLocaleString()} tokens
              </span>
            </div>
            <div className="flex gap-4 justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Cost Per Token
              </span>
              <span className="font-medium">
                ${property.costPerToken.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-4 justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Monthly Gross Income
              </span>
              <span className="font-medium">
                ${property.income.monthly.gross.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-4 justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Monthly Net Income
              </span>
              <span className="font-medium">
                ${property.income.monthly.net.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-4 justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Yearly Gross Income
              </span>
              <span className="font-medium">
                ${property.income.yearly.gross.toLocaleString()}
              </span>
            </div>
            <div className="flex gap-4 justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Yearly Net Income
              </span>
              <span className="font-medium">
                ${property.income.yearly.net.toLocaleString()}
              </span>
            </div>
            <div className="flex gap-4 justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Annual Yield
              </span>
              <span className="font-medium">10.00%</span>
            </div>
            {actions.map((action, index) => (
              <div className="flex gap-4 justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  {action.label}
                </span>
                <div className="flex gap-1 items-center">
                  <Link
                    href={action.url!}
                    onClick={() => handleActionClick(action)}
                    className="text-white font-medium"
                  >
                    View
                  </Link>
                  <div>
                    <img src="/open-external.png" width={16} height={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
