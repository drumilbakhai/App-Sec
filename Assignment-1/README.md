# Application-Security
The repository for the course of Application Security. The course dives deep into developing the web-application keeping in mind about the security measures.

Assignment 1
The Assignment 1 involves developing a NodeJs web-app that allows the user to upload and view photo.

It has the following features
1. Allow users to upload a PNG, JPG, or GIF image with a caption (user can be permitted to leave caption blank)
2. Visitors to the site can view uploaded images, 10 per page (use next/ back links or buttons to bring them to the next 10 pictures), 	sorted by most recent.

Following are the softwares required to run the application
Prerequistes: 
1. NodeJS
2. MongoDB
3. Robomongo(optional)
4. A simple text editor (Sublime Text)
5. Linux Bash (git bash)
6. Git
7. Browser
8. Postman (Optional). Gives a better UI to hit different API endpoints
9. NPM

In order to run this application please follow the instructions:

1. Downloading the NodeJS.
	a. For install NodeJS based on your operating system please look https://nodejs.org/en/download/
	b. Better option is to install nodejs using the package manager such as npm https://nodejs.org/en/download/package-manager/
	c. Check if the node is working properly by typing $node --version

2. Downloading MongoDB.
	a. For installing Mongodb based on your operating system please look https://docs.mongodb.com/manual/installation/
	b. Instanciate the mongo server process by executing $mongod.
	c. The mongod process will start listening to the incoming connection to the mongo servers.
	d. For a better GUI software please look at robomongo. https://robomongo.org/

3. Next part is to clone the repository into the local machine. (Assuming that Git is already installed.)
	a. Type the command to clone the repo. $ git clone https://github.com/drumilbakhai/Application-Security.git
	b. The clone command copies the entire directory to the local machine. 

4. Create a sampleData db in the mongodb using the robomongo. Type $mongo. After interactive shell type the command "use sampleData"

5. Important step. Navigate to the package.json file. Type the command $npm install. This command will install all the dependencies using the package manager. Usually takes 5 mins to install. Coffee break anyone?

6. After the instlling the various dependencies, next part is to run the application. Navigate to the file where server.js is installed. Type the command $ node server.js. If everything is installed properly you will be greeted with warm message of "Connection Successfull". Otherwise try to read the error.

7. Once everything is in place next part is to hit the APIs. Open browser or postman. In the URL bar type http://localhost:3000/

8. A simple web-app for uploading the photos will pop up.

9. As and when you start uploading the photos, the photos are uploaded in the directory public/uploads.

10. The mongodb simply stores the metadata (path,name,user,caption) of each photos. The photo content are never stored in db.
This approach saves the db from getting overloaded. Additionally the photos can be securely stored on any cloud services. 

11. If you are struck up somewhere in installing or need explaination on any code feel free to reach out to me at dkb300@nyu.edu

