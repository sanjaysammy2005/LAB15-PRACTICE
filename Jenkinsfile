pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactemployeeapi" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactemployeeapi"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactemployeeapi"
                xcopy /E /I /Y frontend\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactemployeeapi"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('EmployeemanagementSystem') {
                    bat 'mvn clean package'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
    stage('Deploy Backend to Tomcat') {
        steps {
            bat '''
            if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootemployeeapi.war" (
                del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootemployeeapi.war"
            )
            if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootemployeeapi" (
                rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootemployeeapi"
            )
            copy "EmployeemanagementSystem\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootemployeeapi.war"
            '''
        }
    }

    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Pipeline Failed.'
        }
    }
}
