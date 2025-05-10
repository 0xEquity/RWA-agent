# Test Cases for MetaMask Integration and HITL Features

This document contains test cases to verify that the Human-in-the-Loop (HITL) pattern is properly implemented in the chat UI, along with wallet connection flows and other general features.

## 1. Wallet Connection Tests

### Test Case 1.1: Initial Connection Flow
1. **Prerequisites**: No wallet connected, MetaMask browser extension installed
2. **Steps**:
   - Open the application
   - Click the "Connect Wallet" button
   - Approve connection in MetaMask popup
3. **Expected Result**: 
   - Wallet connects successfully
   - Address and chain ID display correctly in the UI
   - Wallet session is created on the backend

### Test Case 1.2: Auto-Detection of Disconnection
1. **Prerequisites**: Wallet initially connected
2. **Steps**:
   - Disconnect wallet from MetaMask extension directly
   - Observe application behavior
3. **Expected Result**:
   - Application detects the disconnection
   - UI updates to show disconnected state
   - Server session is terminated

### Test Case 1.3: Manual Disconnection
1. **Prerequisites**: Wallet connected
2. **Steps**:
   - Click "Disconnect" or similar button in the app
3. **Expected Result**:
   - Wallet disconnects
   - UI updates to show disconnected state
   - Server session is terminated

### Test Case 1.4: Chain Switching
1. **Prerequisites**: Wallet connected to one chain (e.g., Ethereum Mainnet)
2. **Steps**:
   - Switch networks in MetaMask (e.g., to Base, Polygon, etc.)
3. **Expected Result**:
   - Application detects chain change
   - UI updates with new chain information
   - Server session updates with new chain ID

## 2. Non-Wallet Agent Interactions

### Test Case 2.1: General Information Query
1. **Prerequisites**: None (wallet may be connected or disconnected)
2. **Steps**:
   - Type a general question like "What is a Real World Asset (RWA)?"
3. **Expected Result**: 
   - Agent responds with informational answer
   - No wallet connection prompt appears

### Test Case 2.2: Complex Non-Wallet Query
1. **Prerequisites**: None
2. **Steps**:
   - Ask about "How does tokenization of real estate work?"
3. **Expected Result**:
   - Agent provides detailed explanation
   - No wallet-related components appear

## 3. Wallet-Required Read Operations

### Test Case 3.1: Wallet Required but Not Connected
1. **Prerequisites**: No wallet connected
2. **Steps**:
   - Ask "What properties have I invested in?" or similar wallet-dependent query
3. **Expected Result**:
   - Agent responds that wallet connection is needed
   - `WalletRequiredPrompt` component appears in chat
   - Original message from agent explains why wallet is needed

### Test Case 3.2: Connect Wallet After Prompt
1. **Prerequisites**: Continuation of Test Case 3.1
2. **Steps**:
   - Click "Connect Wallet" in the `WalletRequiredPrompt`
   - Approve connection in MetaMask
3. **Expected Result**:
   - Wallet connects
   - System automatically sends "I've connected my wallet, please continue" message
   - Agent retrieves wallet-specific data and responds appropriately

### Test Case 3.3: Wallet Already Connected for Read Operation
1. **Prerequisites**: Wallet already connected
2. **Steps**:
   - Ask "What's my token balance?" or similar
3. **Expected Result**:
   - Agent directly uses the connected wallet address
   - Shows relevant wallet-specific information without prompting for connection

## 4. Transaction Signing Tests

### Test Case 4.1: Transaction Request - Not Connected
1. **Prerequisites**: No wallet connected
2. **Steps**:
   - Ask the agent to perform an action requiring a transaction, e.g., "List my property for sale"
3. **Expected Result**:
   - Agent requests wallet connection
   - `WalletRequiredPrompt` component appears

### Test Case 4.2: Transaction Request - Connected
1. **Prerequisites**: Wallet connected
2. **Steps**:
   - Ask the agent to perform an action requiring a transaction
3. **Expected Result**:
   - Agent prepares transaction
   - `TransactionRequest` component appears showing transaction details
   - Original message explains the transaction purpose

### Test Case 4.3: Approve Transaction
1. **Prerequisites**: Continuation of Test Case 4.2
2. **Steps**:
   - Click "Approve & Send" in the `TransactionRequest` component
   - Confirm transaction in MetaMask
3. **Expected Result**:
   - MetaMask popup appears
   - Upon confirmation, transaction status updates to "mining"
   - Once mined, status updates to "success" with transaction hash
   - Agent receives success notification and continues conversation appropriately

### Test Case 4.4: Reject Transaction in UI
1. **Prerequisites**: `TransactionRequest` component visible
2. **Steps**:
   - Click "Reject" in the component
3. **Expected Result**:
   - Component updates to show rejected state
   - Agent is notified of rejection
   - Conversation continues appropriately

### Test Case 4.5: Reject Transaction in MetaMask
1. **Prerequisites**: `TransactionRequest` component visible, clicked "Approve & Send"
2. **Steps**:
   - When MetaMask popup appears, click "Reject"
3. **Expected Result**:
   - Component updates to show rejected state
   - Agent is notified of rejection
   - Conversation continues appropriately

## 5. Message Signing Tests

### Test Case 5.1: Signature Request - Not Connected
1. **Prerequisites**: No wallet connected
2. **Steps**:
   - Trigger an action requiring a message signature (e.g., "Verify I own this wallet")
3. **Expected Result**:
   - Agent requests wallet connection
   - `WalletRequiredPrompt` component appears

### Test Case 5.2: Signature Request - Connected
1. **Prerequisites**: Wallet connected
2. **Steps**:
   - Trigger an action requiring a message signature
3. **Expected Result**:
   - `SignatureRequest` component appears showing message to sign
   - Original message explains the signature purpose

### Test Case 5.3: Approve Signature
1. **Prerequisites**: Continuation of Test Case 5.2
2. **Steps**:
   - Click "Sign Message" in the `SignatureRequest` component
   - Confirm signature in MetaMask
3. **Expected Result**:
   - MetaMask popup appears
   - Upon signing, component updates to show success with signature
   - Agent receives signature and continues conversation appropriately

### Test Case 5.4: Reject Signature in UI
1. **Prerequisites**: `SignatureRequest` component visible
2. **Steps**:
   - Click "Cancel" in the component
3. **Expected Result**:
   - Component updates to show rejected state
   - Agent is notified of rejection
   - Conversation continues appropriately

### Test Case 5.5: EIP-712 Typed Data Signature
1. **Prerequisites**: Wallet connected
2. **Steps**:
   - Trigger an action requiring an EIP-712 structured data signature
3. **Expected Result**:
   - `SignatureRequest` component appears with structured data
   - Component indicates this is an EIP-712 signature
   - Upon signing, typed data is correctly processed

## 6. Error Handling

### Test Case 6.1: Transaction Error
1. **Prerequisites**: Wallet connected
2. **Steps**:
   - Trigger a transaction that will fail (e.g., insufficient funds)
   - Approve it in the UI and MetaMask
3. **Expected Result**:
   - Error is captured and displayed in the `TransactionRequest` component
   - Agent is notified of the failure
   - Conversation continues with error handling

### Test Case 6.2: Network Disconnection
1. **Prerequisites**: Wallet connected
2. **Steps**:
   - Disconnect from internet
   - Try to send a message or approve a transaction
3. **Expected Result**:
   - Appropriate error message shown
   - System handles reconnection gracefully when internet returns

### Test Case 6.3: Invalid Transaction Parameters
1. **Prerequisites**: Wallet connected
2. **Steps**:
   - Trigger a transaction with invalid parameters
3. **Expected Result**:
   - Error is captured during estimation/preparation
   - Appropriate error message shown in UI

## 7. Multi-action Conversation Flow

### Test Case 7.1: Complex Interaction Sequence
1. **Prerequisites**: Wallet not initially connected
2. **Steps**:
   - Ask about general info (no wallet needed)
   - Ask about wallet-specific info (requires connection)
   - Connect wallet when prompted
   - Request an action requiring a transaction
   - Approve transaction
   - Ask follow-up questions about the transaction
3. **Expected Result**:
   - All steps work in sequence
   - Context is maintained throughout the conversation
   - Agent responds appropriately at each stage

### Test Case 7.2: Wallet Switch During Conversation
1. **Prerequisites**: Wallet initially connected
2. **Steps**:
   - Start a conversation
   - Switch accounts in MetaMask
   - Continue the conversation
3. **Expected Result**:
   - Application detects account change
   - Session updates with new address
   - Conversation continues with new wallet context

## 8. Edge Cases

### Test Case 8.1: Multiple Action Requests
1. **Prerequisites**: Wallet connected
2. **Steps**:
   - Ask for multiple actions in one message, e.g., "Check my balance and then list property X for sale"
3. **Expected Result**:
   - Agent handles request in logical sequence
   - First performs read operation (balance check)
   - Then presents transaction for property listing
   - Conversation flows naturally

### Test Case 8.2: Expired Session
1. **Prerequisites**: Wallet connected but session expired on backend
2. **Steps**:
   - Leave application idle until session expires
   - Try to use wallet-dependent feature
3. **Expected Result**:
   - System detects expired session
   - Prompts for reconnection
   - Handles reconnection gracefully

### Test Case 8.3: MetaMask Not Installed
1. **Prerequisites**: Using a browser without MetaMask installed
2. **Steps**:
   - Try to connect wallet
3. **Expected Result**:
   - System detects MetaMask is missing
   - Shows appropriate guidance to install it

## 9. Performance Tests

### Test Case 9.1: Rapid Interactions
1. **Prerequisites**: Wallet connected
2. **Steps**:
   - Send multiple messages in quick succession
   - Try to trigger multiple transactions in quick succession
3. **Expected Result**:
   - System handles message queue properly
   - Transactions are processed in order or appropriate throttling is applied
   - UI remains responsive

### Test Case 9.2: Long Conversation History
1. **Prerequisites**: Any
2. **Steps**:
   - Have an extended conversation with many messages
   - Continue to use wallet features
3. **Expected Result**:
   - Chat remains performant even with large history
   - Scrolling works smoothly
   - Wallet operations continue to function correctly