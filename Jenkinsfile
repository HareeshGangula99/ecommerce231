// // pipeline {
// //     agent any
    
// //     stages {
// //         stage('Checkout') {
// //             steps {
// //                 echo 'Code Checkout ???????????...'
// //                 checkout scm
// //             }
// //         }
        
// //         stage('Build Docker Image') {
// //             steps {
// //                 echo 'Docker Image Build ???????????...'
// //                 sh 'docker build -t ecommerce231 .'
// //             }
// //         }
        
// //         stage('Stop Old Container') {
// //             steps {
// //                 echo 'Old Container ?????????????...'
// //                 sh 'docker stop ecommerce-app || true'
// //                 sh 'docker rm ecommerce-app || true'
// //             }
// //         }
        
// //         stage('Deploy') {
// //             steps {
// //                 echo 'New Container Deploy ???????????...'
// //                 sh 'docker run -d --name ecommerce-app -p 3000:80 ecommerce231'
// //             }
// //         }
        
// //         stage('Done') {
// //             steps {
// //                 echo 'Deployment Complete! App Ready at port 3000 ?'
// //             }
// //         }
// //     }
    
// //     post {
// //         success {
// //             echo 'Pipeline Successfully Complete ??????! ??'
// //         }
// //         failure {
// //             echo 'Pipeline Failed ??????! Logs ??????.'
// //         }
// //     }
// // }


// pipeline {
//     agent any
    
//     environment {
//         RENDER_API_KEY = credentials('rnd_bJVKXisNnxD6jkCFT2OYcFCb4FSG')
//     }
    
//     stages {
//         stage('Deploy to Render') {
//             steps {
//                 echo 'Render కి Deploy చేస్తున్నాం...'
//                 sh '''
//                     curl -X POST \
//                     -H "Authorization: Bearer $RENDER_API_KEY" \
//                     https://api.render.com/v1/services/srv-d7q4cipj2pic73fefnsg/deploys
//                 '''
//             }
//         }
        
//         stage('Done') {
//             steps {
//                 echo 'Deploy Complete! ✅'
//             }
//         }
//     }
// }


pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/HareeshGangula99/ecommerce231.git'
            }
        }
        stage('Deploy to Render') {
            steps {
                withCredentials([string(credentialsId: 'RENDER_API_KEY', variable: 'API_KEY')]) {
                    sh 'curl -s -X POST -H "Authorization: Bearer $API_KEY" https://api.render.com/v1/services/srv-d7q4cipj2pic73fefnsg/deploys'
                }
            }
        }
        stage('Done') {
            steps {
                echo 'Deploy Complete! ✅'
            }
        }
    }
}