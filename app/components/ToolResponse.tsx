import React from 'react';

interface ToolResponseProps {
  data: unknown;
}

export const ToolResponse: React.FC<ToolResponseProps> = ({ data }) => {
  return (
    <div className="tool-response">
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};