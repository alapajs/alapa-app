const { exec } = require("child_process");
const { promisify } = require("util");

// Promisify the exec function to use with async/await
const execAsync = promisify(exec);

/**
 * Runs a shell command and returns the output as a string.
 * Handles PowerShell-specific quirks like `&&` vs `;` chaining.
 *
 * @param {string} command - The shell command to execute.
 * @returns {Promise<string>} - The standard output from the command.
 */
async function runCommand(command) {
  try {
    // Check if the shell is PowerShell
    const isPowerShell =
      process.env.ComSpec &&
      process.env.ComSpec.toLowerCase().includes("powershell");

    // If running in PowerShell, replace && with ; for proper chaining
    if (isPowerShell) {
      command = command.replace(/&&/g, ";");
      command = command.replace(/&/g, ";");
    }

    // Execute the command
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      throw new Error(stderr);
    }

    return stdout;
  } catch (error) {
    throw error;
  }
}

// Export the function if using as a module
module.exports = { runCommand };
