pipeline {
    agent {
        docker {
            image 'node:14.15.4-alpine'
            args '-p 3000:3000'
        }
    }
     environment {
            CI = 'true'
        }
    stages {
        stage('Build') {
            steps {
                dir('./ui') {
                    echo '***IN UI FOLDER***'
                    sh 'npm install'
                } 
            }
        }
        stage('Test') {
            steps {
                sh './api/scripts/test.sh'
            }
        }
        stage('Deliver') {
            steps {
                sh './api/scripts/deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './api/scripts/kill.sh'
            }
        }
    }
}