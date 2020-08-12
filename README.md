

# Internet_and_Applications



COVID-01: Εύρεση των Συγγραφέων με τα περισσότερα Άρθρα που αφορούν μία συγκεκριμένη Ασθένεια

Στα πλαίσια της εργάσιας θα δημιουργηθεί ένα web application που θα παρουσιάζει τους 10  συγγραφείς με τα περισσότερα άρθρα γύρω από μια συγκεκριμένη Ασθένεια καθώς και ένα δοσμένο φάρμακο(εκτός του COVID 19) καθώς και ποια είναι αυτά. To input θα είναι το όνομα της ασθένειας και το drug name και το output θα είναι οι 10 συγγραφείς με τα περισσότερα άρθρα και ποια είναι αυτά. Ταυτόχνρονα για τους συγγραφείς θα παρουσιάζονται τα περιοδικά στα οποία έχουν γίνει σχετικές δημοσιεύσεις. Για την αναζήτηση της ασθένειας θα προσπελάυνουμε τα δεδομένα που υπάρχουν στον τίτλο και το abstract. 
## Requirements

For development, you will only need npm and MongoDB.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.16.1

    $ npm --version
    6.13.4

If you need to update `npm`, you can make it using `npm`! After running the following command, just open again the command line and be happy.

## MongoDB
  Download and install MongoDB from the official MongoDB website, during installation check the option to install as a service.  
  After installation add the /bin of MongoDB to the PATH.


---

## Backend Setup
    Edit the base variable in the .env file to show to the directory  
    that contains the documents_parses folder and the metadata.csv file.
    
    Create MongoDB indexes
    $ node ./createTextIndexes.js
    Import Dataset
    $ node ./importData.js
    Import Metadata
    $ node ./importMetadataCSV.js
    Install all the packages
    $ npm install


## Running the backend

    $ npm start


## Frontend Setup
 
    Install all the packages
    $ npm install


## Running the frontend

    $ npm start


    


