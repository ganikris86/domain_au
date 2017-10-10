# Sample Project for domain.au

### Pre-requisite
1. Install Node.js 	(Version 8.1.3)


### Steps to extract the source
1. Clone the repo from https://github.com/ganikris86/domain_au.git
2. Get to the src directory within the extracted code

### To start the server
1. Get to the src directory within the extracted code
2. Ensure that the node version is 8.1.3 (Use node -v to confirm)
3. Run npm install (All the required node modules will get installed)
4. Run npm start (This will start the server and run in the port mentioned in conifg/config.json which is 8000).
I usually use the forever module to manage the service but have not used here as it is a sample proj.

### Launch the application
1. Go to http://localhost:8000
2. The hCard application should be launched
3. The last saved record is displayed in the screen
4. You can key in new values and hit 'Create hCard' which will save the record and relaunch the application with the latest record

### To run unit test
1. Get to the src directory within the extracted code
2. Run npm run uniTest
3. Linting and unit tests will be run and you can see their results in the console.


### Notes:
1. I tried to follow your steps to import React but i didn't succeed. So used the submit method to save the details.
2. I have created a free mongodb in mLab.com to which i connect to store and retrieve the data.<br>
You can access it via,<br>
`mongodb://<dbuser>:<dbpassword>@ds113435.mlab.com:13435/domain_au`<br>
`<dbuser> is admin`<br>
`<dbpassword> is Protect$1`<br>
3. The counters (sequences) in mongodb didn't work for some reason, so i couldn't manage to do update functionality
4. The unit tests i have written are only to give an idea. I agree more cases should be written.
5. I have used kraken on top of express in this sample project
