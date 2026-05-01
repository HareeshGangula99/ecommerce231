pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Code Checkout ???????????...'
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Docker Image Build ???????????...'
                sh 'docker build -t ecommerce231 .'
            }
        }
        
        stage('Stop Old Container') {
            steps {
                echo 'Old Container ?????????????...'
                sh 'docker stop ecommerce-app || true'
                sh 'docker rm ecommerce-app || true'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'New Container Deploy ???????????...'
                sh 'docker run -d --name ecommerce-app -p 3000:80 ecommerce231'
            }
        }
        
        stage('Done') {
            steps {
                echo 'Deployment Complete! App Ready at port 3000 ?'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline Successfully Complete ??????! ??'
        }
        failure {
            echo 'Pipeline Failed ??????! Logs ??????.'
        }
    }
}
