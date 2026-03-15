# BlocklyAutomation Chuck Norris API Test Plan

## Application Overview

Test plan for the BlocklyAutomation Visual API application specifically focusing on the Chuck Norris API example functionality. This covers successful execution flows, error scenarios, and comprehensive validation of the block-based automation system.

## Test Scenarios

### 1. Chuck Norris API Success Flow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful Chuck Norris API Execution

**File:** `tests/chuck-norris/successful-execution.spec.ts`

**Steps:**
  1. -
    - expect: Page loads successfully
    - expect: Visual API title appears
    - expect: Toolbar elements are visible and interactive
  2. -
    - expect: Chuck Norris API blocks load correctly
    - expect: Blockly workspace displays the HTTP request blocks
    - expect: API URL 'https://api.chucknorris.io/jokes/random' is visible in blocks
  3. -
    - expect: Data loading period completes
    - expect: All block definitions are properly initialized
    - expect: No invalid block definition errors occur
  4. -
    - expect: Execute button triggers API call
    - expect: HTTP request to Chuck Norris API succeeds
    - expect: JSON response processing works correctly
    - expect: Chuck Norris joke appears in output textbox
    - expect: Output contains 'debug mode:start running code !' and 'finish running code!' messages
    - expect: No error overlays appear on screen

### 2. Error Detection and Validation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Runtime Error Detection

**File:** `tests/chuck-norris/error-detection.spec.ts`

**Steps:**
  1. -
    - expect: Page loads at chucktry error example
    - expect: Application attempts to load problematic blocks
  2. -
    - expect: Invalid block definition errors are detected
    - expect: Error overlay appears with detailed error information
    - expect: Console shows TypeError with stack trace
    - expect: Error message contains 'Invalid block definition for type: trycatchfinally'
  3. -
    - expect: Error overlay can be dismissed
    - expect: Tour dialog can be closed
    - expect: Application remains functional after error dismissal

#### 2.2. Network Error Validation

**File:** `tests/chuck-norris/network-errors.spec.ts`

**Steps:**
  1. -
    - expect: Console captures 404 errors for missing resources
    - expect: Network connection failures are logged
    - expect: parseSwagger errors are properly reported
    - expect: Failed resource loads don't crash the application

### 3. User Interface Verification

**Seed:** `tests/seed.spec.ts`

#### 3.1. Interface Element Validation

**File:** `tests/chuck-norris/ui-validation.spec.ts`

**Steps:**
  1. -
    - expect: All toolbar buttons are present and functional
    - expect: Help Tour button works
    - expect: Examples! button is available
    - expect: Save Local and Show Output Raw buttons are accessible
    - expect: Execute! button is prominently displayed
  2. -
    - expect: Blockly workspace displays correctly
    - expect: Block categories load properly
    - expect: Drag-and-drop functionality works
    - expect: Block connections are visually clear
  3. -
    - expect: Output area functions correctly
    - expect: Output textbox shows placeholder text initially
    - expect: Output textbox displays execution results
    - expect: Save output button is available

#### 3.2. Help Tour Functionality

**File:** `tests/chuck-norris/help-tour.spec.ts`

**Steps:**
  1. -
    - expect: Help tour launches automatically on page load
    - expect: Tour dialog shows 'Blockly Automation (1/12)' title
    - expect: Tour content is informative and relevant
  2. -
    - expect: Navigation buttons work correctly
    - expect: 'Back' button is disabled on first step
    - expect: 'Next' button advances tour
    - expect: 'Exit' and 'Do not show again' options function properly
  3. -
    - expect: Close tour button (×) dismisses the tour
    - expect: Interface is fully accessible after tour dismissal
    - expect: Tour doesn't interfere with normal operations

### 4. API Response Validation

**Seed:** `tests/seed.spec.ts`

#### 4.1. Chuck Norris API Response Format

**File:** `tests/chuck-norris/api-response.spec.ts`

**Steps:**
  1. -
    - expect: API request sends GET request to correct endpoint
    - expect: Response contains valid JSON structure
    - expect: Joke value is extracted from response object
  2. -
    - expect: Output displays the actual joke text
    - expect: Response processing handles various joke formats
    - expect: Special characters in jokes are displayed correctly
  3. -
    - expect: Execution timing is logged properly
    - expect: Performance metrics are captured
    - expect: Request/response cycle completes fully

### 5. Edge Cases and Boundary Testing

**Seed:** `tests/seed.spec.ts`

#### 5.1. Page Load Edge Cases

**File:** `tests/chuck-norris/edge-cases.spec.ts`

**Steps:**
  1. -
    - expect: Page handles slow network connections gracefully
    - expect: Large response payloads are processed correctly
    - expect: Concurrent requests don't conflict
  2. -
    - expect: Browser refresh maintains application state
    - expect: Navigation between examples works smoothly
    - expect: Multiple execution cycles function properly

#### 5.2. Error Recovery Testing

**File:** `tests/chuck-norris/error-recovery.spec.ts`

**Steps:**
  1. -
    - expect: Application recovers from network timeouts
    - expect: Invalid API responses are handled gracefully
    - expect: Block parsing errors don't crash the system
  2. -
    - expect: User can retry after errors
    - expect: Error states don't persist across sessions
    - expect: Clean error messages guide user actions
