# SimpleQuora
### The unasked-for child of Reddit and Quora
__________________________________________________________________

### Dependencies:

*Please install the following Python packages:* Django, django-cors-headers, djangorestframework, psycopg2 (for the PostgreSQL DB used in this app - for hosting on Amazon Web Services Elastic Beanstalk (AWS EB), psycopg2-binary is advisable as well), and requests.
You can find a list of the above packages and their versioning used in this app in the ./simpleQuoraBackend/requirements.txt file.

### Backend:

The server-side of this application is built using Django, and its subdirectories/files can be found in the simpleQuoraBackend subfolder. For more information on how to get started with a Django app yourself, please [**click here.**](https://www.djangoproject.com/start/) The [**tutorial**](https://docs.djangoproject.com/en/3.1/intro/tutorial01/) is especially helpful in setting up the base/required folders/files.

As an overview, the ./simpleQuoraBackend/simpleQuora/ folder can be considered the *foundational* folder: it contains the overall project's settings module (/settings.py) which controls the base functioning of all apps within this project (./simpleQuoraBackend/), as well as information relevant to hosting on AWS EB (the ALLOWED_HOSTS setting). Its urls file is also the main/first dispatcher whenever a request is made to the project - it's from this urls "control-centre" that requests are then routed to various applications (the ./simpleQuoraBackend/quoraBase/ subfolder in this case).

The ./simpleQuoraBackend/quoraBase/ subfolder contains much of what directly supports the SimpleQuora ("Kworah") application. Of notable interest are: the **models** folder, which contains the ORM schemas for each of the database tables storing data for *questions* asked in the app, *answers* to those questions, *comments* on each answer, *user* information and *voting* information for each question/answer by every user; the **views** folder, which contains the modules that handle HTTP requests sent for each of the *questions, answers, comments, etc.* functionalities; the **urls** module, which, in here, routes requests to the appropriate view to be handled; and the **serializers** module, which help in data validation for POST requests and data formatting before responses are sent. Otherwise, the **migrations** folder is a Django-generated folder which contains ORM db schema creation/editions translated into SQL.

The ./simpleQuoraBackend/.ebextensions simply contains instructions for AWS EB on how to host this Django app. AWS documentation on this can be [**found here.**](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-python-django.html)

### Frontend:

The rest of the folders in this repo is inherited fairly directly from the React app installation. The "root" index.html folder can be found in the *./public* folder, while all the React component files can be found in the *./src* folder.

Within ./src, you'll find two *Context.js files, which contain React Context definitions (React Context helps provide certain state values/methods across many layers of components) to provide all components with the username and userID of the current-session user as well as error-handling tools.

Within ./src/bgImages, you'll find the background image files and the component responsible for the app's slideshow background. The pics are "forum"-related searches on [**Unsplash.**](https://unsplash.com/)

Within ./src/controllers, you'll find the controller modules for putting together the questions, answers, comments and login pages, as well as sub-functionalities such as posting reply comments, voting on and deleting posts.

Within ./src/enums, you'll find various fixed values that multiple other modules will use (e.g. domain name for AWS EB, server endpoint names, etc.).

Within ./src/models, you'll find functions built on the fetch API to handle all requests to the server.

./src/views handles all the various view components of the app - input boxes for searching/posting, view elements for questions, answers, comments, etc.