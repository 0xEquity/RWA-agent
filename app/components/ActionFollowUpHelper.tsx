import React, { useEffect } from 'react';

interface ActionFollowUpHelperProps {
  followUpMessage?: string;
  componentName: string;
}

/**
 * This component handles follow-up messages from action components
 * It should be used as a wrapper around components that have followUpMessage props
 * When rendered, it will automatically send the followUpMessage to the chat
 */
export const ActionFollowUpHelper: React.FC<ActionFollowUpHelperProps> = ({ 
  followUpMessage,
  componentName
}) => {
  useEffect(() => {
    // Only send the follow-up message if one is provided
    if (followUpMessage) {
      // Small delay to ensure the message appears after the component renders
      const timer = setTimeout(() => {
        // Send the follow-up message to the chat
        const messageEvent = new CustomEvent('action-followup-message', {
          detail: {
            message: followUpMessage,
            source: componentName
          }
        });
        window.dispatchEvent(messageEvent);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [followUpMessage, componentName]);

  // This component doesn't render anything visible
  return null;
};