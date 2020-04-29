pipeline {
    environment {
        dockerImage = ''
        dockerVersion = ''
    }
    agent any
    stages {
        stage('Checkout Git') {
            steps {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: '*/master'], [name: '*/dev']], 
                    doGenerateSubmoduleConfigurations: false, 
                    extensions: [], submoduleCfg: [], 
                    userRemoteConfigs: [[credentialsId: 'github', url: 'https://github.com/BernhardSchiffer/mywebsite-backend']]
                ])
            }
        }

        stage('Build') { 
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        dockerVersion = 'stable'
                    } else if (env.BRANCH_NAME == 'dev') {
                        dockerVersion = 'latest'
                    } else {
                        dockerVersion = env.BRANCH_NAME
                    }
                    dockerImage = docker.build("bernhardschiffer/mywebsite-backend:${dockerVersion}")
                }
            }
        }
        
        stage('Publish') { 
            steps {
                script {
                    docker.withRegistry('https://registry.schiffer.dev/v2/', 'docker-registry') {
                        dockerImage.push()
                    }
                } 
            }
        }

        stage('Deploy') { 
            when { branch 'master' }
            steps {
                echo "Not yet implemented"
            }
        }

        stage('Remove Unused docker image') {
            steps{
                sh "docker rmi bernhardschiffer/mywebsite-backend:${dockerVersion}"
            }
        }
    }
}