pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "smitalipatekar/sample-app"
        IMAGE_TAG = "latest"
        GIT_REPO = "https://github.com/smitalipatekarwohlig/gitops.git"
        GIT_BRANCH = "main"
        K8S_MANIFEST_PATH = "k8s/deployment.yaml"
        ARGOCD_APP_NAME = "sample-app"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/smitalipatekarwohlig/demo-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $DOCKER_IMAGE:$IMAGE_TAG ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    sh "docker push $DOCKER_IMAGE:$IMAGE_TAG"
                }
            }
        }

        stage('Update Kubernetes Manifests') {
            steps {
                script {
                    sh """
                    git clone $GIT_REPO argo-cd-repo
                    cd argo-cd-repo
                    sed -i '' 's|image: .*|image: $DOCKER_IMAGE:$IMAGE_TAG|' $K8S_MANIFEST_PATH
                    git config --global user.email "jenkins@ci.com"
                    git config --global user.name "Jenkins CI"
                    git add $K8S_MANIFEST_PATH
                    git commit -m "Updated image to $DOCKER_IMAGE:$IMAGE_TAG"
                    git push origin $GIT_BRANCH
                    """
                }
            }
        }

        stage('Argo CD Sync') {
            steps {
                sh "argocd app sync $ARGOCD_APP_NAME --grpc-web"
            }
        }
    }

    post {
        success {
            echo 'Deployment successful! 🚀'
        }
        failure {
            echo 'Pipeline failed! ❌'
        }
    }
}
