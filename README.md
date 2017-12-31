# RoboLog
A dashboard for FRC programming.

RoboLog provides three functions to help you code your robot: [graphing](#graphing) and [logging](#logging) help you understand what your robot is doing, and [constants](#constants) let you tune robot code quickly and robustly.

## Installation
1. Download the latest RoboLog dashboard from the [releases page](releases).
2. Unzip the file and open `index.html` to open the dashboard.
3. (Recommended) Make a shortcut to `index.html` on your desktop for easy access.

## Graphing
![Graphs screenshot](images/graphs.png)

RoboLog receives live data from the robot every 50ms and graphs it. The robot also sends time information with each point, so the graph reflects the real timing of events.

When you first open RoboLog, you will see a blank graph with the text, "Click to configure a graph." Clicking it will open a menu where you can set the graph's title, its x and y ranges, and the specific data you want to show in the graph. Once you click "Done," the graph will be created. You can change its settings at any time by clicking the gear icon in the lower right corner of the graph. To add another graph, click the + button in the top right corner. To remove a graph, click the - icon and click the graph you want to remove.

## Logging

Along with numerical graph data, RoboLog allows you to capture text-based data with logs. Logs are sent with a timestamp and a user-specified subject, which you can use to filter logs on the dashboard. Like graphs, you can add or remove logs with the + and - icons in the upper right corner. Each log has its own filter, which is accessible from the gear icon. Clicking the up arrow will free the log's scrolling (it will no longer scroll down automatically as new logs come in). Clicking it again will return the log to the bottom.

## Constants
![Constants screenshot](images/constants.png)

Finally, RoboLog's constants are a best-of-both-worlds solution to robot constants files. Like other web-based constants utilities, changes are sent to the robot immediately so you don't have to re-deploy your code, but they are also stored in a properties file on the robot, which means that the constants will remain even if the dashboard is not connected.

All constants are stored in key-value pairs. After editing constants, click "Send to Robot" to send the constants to the robot. Clicking "Set as Defaults" will also store the constants in the robot's file, so it will load them by itself next time it boots. If you want to recall the constants from the file, click "Recall Defaults." This will the constants to the last time you clicked "Set as Defaults."

You can add new constants by clicking the + icon in the upper right and remove them by clicking the - icon.
